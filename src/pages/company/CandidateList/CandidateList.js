import { Grid, Paper, Divider, Box, Avatar, Typography } from '@mui/material';
import Title from '~/layout/component/Title';
import CandidateListTable from './ListTable';
import { Fragment, useEffect, useState } from 'react';
import useSnackMessages from '~/utils/hooks/useSnackMessages';
import ethers from '~/ethereum/ethers';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import {createCandidateData} from '~/utils/CreateData';



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
                        newData[positionID].rows.push(createCandidateData(candidateID, positionID, ...rest));
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
                        result[candidate[0]].rows.push(createCandidateData(i, ...candidate));
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
        <Fragment>
            <Paper sx={{ display: 'flex', mb: 2, p: '36px' }}>
                <Grid container>
                    <Grid item>
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
                            <Avatar
                                variant="rounded"
                                sx={{
                                    backgroundColor: 'rgb(85, 105, 255)',
                                    boxShadow:
                                        'rgb(85 105 255 / 25%) 0px 1px 4px, rgb(85 105 255 / 35%) 0px 3px 12px 2px',
                                    height: 70,
                                    width: 70,
                                }}
                            >
                                <HowToRegIcon />
                            </Avatar>
                            <Typography variant="h5" color="primary" sx={{ml: 2}}>
                                Candidate List
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Paper>
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
                                    <Title>{position.positionName}</Title>
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
        </Fragment>
    );
}

export default CandidateList;
