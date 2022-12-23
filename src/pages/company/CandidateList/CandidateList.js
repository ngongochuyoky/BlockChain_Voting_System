import { Grid, Paper, Divider } from '@mui/material';
import Title from '~/layout/component/Title';
import CandidateListTable from './ListTable';
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

function CandidateList() {
    const [data, setData] = useState([{ positionName: '', rows: [] }]);
    const { showSuccessSnackbar, showErrorSnackbar } = useSnackMessages();
    const [electionName, setElectionName] = useState('');

    useEffect(() => {
        const addCandidateListener = (result) => {
            const contract = ethers.getElectionContract();
            contract.on('AddCandidate', (positionID, candidateID, ...rest) => {
                //So sánh Candidate ID xem đã tồn tại chưa -> chưa -> thêm vào
                if (!(result[positionID].rows?.[result[positionID].rows.length - 1]?.candidateID === candidateID)) {
                    showSuccessSnackbar('Successfully created new candidate');
                    setData((preData) => {
                        const newData = JSON.parse(JSON.stringify(preData));
                        newData[positionID].rows.push(createData(candidateID, positionID, ...rest));
                        return newData;
                    });
                }
            });
        };
        const getCandidates = async () => {
            try {
                await ethers.connectWallet();
                const contract = ethers.getElectionContract();
                const positions = await contract.getPositions();
                const summary = await contract.getElectionDetails();

                setElectionName(summary[0]);
                const result = positions.map((position) => ({
                    positionName: position,
                    rows: [],
                }));
                if (positions.length) {
                    const numOfCandidates = await contract.getNumOfCandidates();
                    for (let i = 0; i < numOfCandidates; i++) {
                        const candidate = await contract.getCandidate(i);
                        result[candidate[0]].rows.push(createData(i, ...candidate));
                    }
                    setData(result);
                }
                addCandidateListener(result);
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
                                electionName={electionName}
                                positionName={position.positionName}
                            />
                        </Grid>
                    </Paper>
                </Grid>
            ))}
        </Grid>
    );
}

export default CandidateList;
