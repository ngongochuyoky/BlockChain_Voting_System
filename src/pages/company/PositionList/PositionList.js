import { Grid, Paper, Divider, Typography, Box, Avatar } from '@mui/material';
import WhereToVoteIcon from '@mui/icons-material/WhereToVote';
import { deepPurple } from '@mui/material/colors';

import PositionListTable from './ListTable';
import FormCreatePosition from './FormCreatePosition';
import useSnackMessages from '~/utils/hooks/useSnackMessages';
import { Fragment, useEffect, useState } from 'react';
import ethers from '~/ethereum/ethers';
import {createPositionData} from '~/utils/CreateData'


function PositionList() {
    const [rows, setRows] = useState([]);
    const { showSuccessSnackbar, showErrorSnackbar } = useSnackMessages();

    useEffect(() => {
        const addPositionListener = (data) => {
            const contract = ethers.getElectionContract();
            contract.on('AddPosition', (positionID, positionName) => {
                if (!(data?.[data.length - 1]?.positionID === positionID)) {
                    showSuccessSnackbar('Successfully created new position');
                    setRows((preState) => {
                        return [...preState, createPositionData(positionID, positionName)];
                    });
                }
            });
        };
        const getPositions = async () => {
            try {
                await ethers.connectWallet();
                const contract = ethers.getElectionContract();
                const positions = await contract.getPositions();
                let data = [];
                if (positions.length) {
                    data = positions.map((position, index) => {
                        return createPositionData(index, position);
                    });
                    setRows(data);
                }
                addPositionListener(data);
            } catch (err) {
                showErrorSnackbar(ethers.getError());
            }
        };
        getPositions();
    }, [showSuccessSnackbar, showErrorSnackbar]);

    return (
        <Fragment>
            <Paper sx={{ display: 'flex', mb: 2, p: '36px' }}>
                <Grid container>
                    <Grid item>
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Avatar
                                variant="rounded"
                                sx={{
                                    backgroundColor: deepPurple[500],
                                    boxShadow:
                                        'rgb(85 105 255 / 25%) 0px 1px 4px, rgb(85 105 255 / 35%) 0px 3px 12px 2px',
                                    height: 70,
                                    width: 70,
                                }}
                            >
                                <WhereToVoteIcon />
                            </Avatar>
                            <Typography variant="h5" color="primary" sx={{ ml: 2 }}>
                                Position List
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Paper>
            <Grid container spacing={3}>
                {/* Title */}
                <Grid item xs={12}>
                    <Paper sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Grid
                            container
                            direction="row"
                            justifyContent="space-between"
                            alignItems="center"
                            sx={{ p: 2 }}
                        >
                            <Grid item></Grid>
                            <Grid item>
                                <FormCreatePosition />
                            </Grid>
                        </Grid>

                        <Divider />
                        <Grid container direction="row" justifyContent="space-between" alignItems="center">
                            <PositionListTable rows={rows} />
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        </Fragment>
    );
}

export default PositionList;
