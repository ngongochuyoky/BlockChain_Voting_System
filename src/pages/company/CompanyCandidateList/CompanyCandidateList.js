import { Grid, Paper, Divider } from '@mui/material';
import Title from '~/layout/component/Title';
import CandidateListTable from './CandidateListTable';
import { useEffect, useState } from 'react';
import useSnackMessages from '~/utils/hooks/useSnackMessages';
import ethers from '~/ethereum/ethers';

function createData(candidateID, positionID, name, dateOfBirth, description, imgHash, voteCount, email, ...args) {
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
    const [data, setData] = useState([{ positionName: '', rows: [] }]);
    const { showSuccessSnackbar, showErrorSnackbar } = useSnackMessages();
    const [electionDetails, setElectionDetails] = useState({});

    useEffect(() => {
        const addCandidateListener = async () => {
            const contract = ethers.getElectionContract();
            contract.on('AddCandidate', (positionID, candidateID, ...rest) => {
                showSuccessSnackbar('Successfully created new candidate');
                setData((preData) => {
                    const newData = JSON.parse(JSON.stringify(preData));
                    newData[positionID].rows.push(createData(candidateID, positionID, ...rest));
                    return newData;
                });
            });
        };
        const getCandidates = async () => {
            try {
                await ethers.connectWallet();
                const contract = ethers.getElectionContract();
                const positions = await contract.getPositions();
                const summary = await contract.getElectionDetails();
                setElectionDetails({
                    electionName: summary[0],
                    electionDescription: summary[1],
                });
                if (positions.length) {
                    const result = positions.map((position) => ({
                        positionName: position,
                        rows: [],
                    }));

                    const numOfCandidates = await contract.getNumOfCandidates();
                    for (let i = 0; i < numOfCandidates; i++) {
                        const candidate = await contract.getCandidate(i);
                        result[candidate[0]].rows.push(createData(i, ...candidate));
                    }
                    setData(result);
                }
                addCandidateListener();
            } catch (err) {
                ethers.getError() && showErrorSnackbar(ethers.getError());
            }
        };

        getCandidates();
    }, [showSuccessSnackbar, showErrorSnackbar]);

    return (
        <Grid container spacing={3}>
            {/* Title */}
            {data.map((position, index) => (
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
                            <CandidateListTable
                                rows={position.rows}
                                electionDetails={electionDetails}
                                positionName={position.positionName}
                            />
                        </Grid>
                    </Paper>
                </Grid>
            ))}
        </Grid>
    );
}

export default CompanyCandidateList;
