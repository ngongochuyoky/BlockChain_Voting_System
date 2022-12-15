import { Grid, Paper, Divider } from '@mui/material';
import Title from '~/layout/component/Title';
import CandidateListTable from './CandidateListTable';
import { useEffect, useState } from 'react';
import dapp from '~/component/Dapp';

function createData(candidateID, name, dateOfBirth, description, imgHash, voteCount, positionID, email) {
    return {
        candidateID,
        name,
        dateOfBirth,
        description,
        imgHash,
        voteCount,
        positionID,
        email,
    };
}

function CompanyCandidateList() {
    const [data, setData] = useState([
        {
            positionName: '',
            rows: [],
        },
    ]);
    useEffect(() => {
        const getCandidates = async () => {
            const positions = await dapp.getPositions();
            if (positions.length) {
                const numOfCandidates = await dapp.getNumOfCandidates();
                const result = positions.map((position) => ({
                    positionName: position,
                    rows: [],
                }));

                for (let i = 0; i < numOfCandidates; i++) {
                    const candidate = await dapp.getCandidate(i);
                    data[candidate.positionID].rows.push(
                        createData(
                            candidate.candidateID,
                            candidate.name,
                            candidate.dateOfBirth,
                            candidate.description,
                            candidate.imgHash,
                            candidate.voteCount,
                            candidate.positionID,
                            candidate.email,
                        ),
                    );
                }
                setData(result);
            }
        };
        const addCandidateListener = async () => {
            const electionContract = await dapp.getElectionContract();
            electionContract.on(
                'AddCandidate',
                (candidateID, name, dateOfBirth, description, imgHash, voteCount, positionID, email) => {
                    setData(data=>
                        data[candidateID].rows.push(
                            createData(
                                candidateID,
                                name,
                                dateOfBirth,
                                description,
                                imgHash,
                                voteCount,
                                positionID,
                                email,
                            ),
                        ),
                    );
                },
            );
        };
        const componentDidMount = async () => {
            await dapp.connectWallet();
            await getCandidates();
            await addCandidateListener();
        };
        componentDidMount();
        return () => {
            const componentUnMount = async () => {
                const electionContract = await dapp.getElectionContract();
                await electionContract.off('AddCandidate');
            };
            componentUnMount();
        }
    }, []);

    return (
        <Grid container spacing={3}>
            {/* Title */}
            {
                data.map((position, index) => (
                    <Grid item xs={12} key={index}>
                        <Paper sx={{ display: 'flex', flexDirection: 'column' }}>
                            <Grid
                                container
                                direction="row"
                                justifyContent="space-between"
                                alignItems="center"
                                sx={{ p: 2 }}
                            >
                                <Grid item>
                                    <Title>Candidate List - {position.positionName}</Title>
                                </Grid>
                            </Grid>

                            <Divider />
                            <Grid container direction="row" justifyContent="space-between" alignItems="center">
                                <CandidateListTable rows={position.rows} />
                            </Grid>
                        </Paper>
                    </Grid>
                ))
            }
        </Grid>
    );
}

export default CompanyCandidateList;
