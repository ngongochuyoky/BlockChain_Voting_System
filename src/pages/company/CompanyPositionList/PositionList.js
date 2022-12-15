import { Grid, Paper, Divider } from '@mui/material';
import Title from '~/layout/component/Title';
import PositionListTable from './PositionListTable';
import ModalForm from './ModalForm';
import { SnackbarProvider, useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import dapp from '~/component/Dapp';

function createData(positionID, positionName) {
    return {
        positionID,
        positionName,
    };
}
function PositionList() {
    const { enqueueSnackbar } = useSnackbar();
    const [rows, setRows] = useState([]);
    useEffect(() => {
        const getPositions = async () => {
            const positions = await dapp.getPositions();
            if (positions) {
                const data = positions.map((position, index) => {
                    return createData(index, position);
                });
                setRows(data);
            } else {
                const message = await dapp.getError();
                enqueueSnackbar(message, { variant: 'error', anchorOrigin: { horizontal: 'right', vertical: 'top' } });
            }
        };
        const addPositionListener = async () => {
            const electionContract = await dapp.getElectionContract();
            electionContract.on('AddPosition', (positionID, positionName) => {
                setRows((preState) => {
                    return [...preState, createData(positionID, positionName)];
                });
                enqueueSnackbar('Successfully created new position', {
                    variant: 'success',
                    anchorOrigin: { horizontal: 'right', vertical: 'top' },
                });
            });
        };

        const componentDidMount = async () => {
            await dapp.connectWallet();
            getPositions();
            addPositionListener();
        };
        componentDidMount();

        return () => {
            const componentUnMount = async () => {
                const electionContract = await dapp.getElectionContract();
                await electionContract.off('AddPosition');
            };
            componentUnMount();
        };
    }, [enqueueSnackbar]);

    return (
        <Grid container spacing={3}>
            {/* Title */}
            <Grid item xs={12}>
                <Paper sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Grid container direction="row" justifyContent="space-between" alignItems="center" sx={{ p: 2 }}>
                        <Grid item>
                            <Title>Position List</Title>
                        </Grid>
                        <Grid item>
                            <ModalForm enqueueSnackbar={enqueueSnackbar} />
                        </Grid>
                    </Grid>

                    <Divider />
                    <Grid container direction="row" justifyContent="space-between" alignItems="center">
                        <PositionListTable rows={rows} />
                    </Grid>
                </Paper>
            </Grid>
        </Grid>
    );
}

export default function IntegrationNotistack() {
    return (
        <SnackbarProvider maxSnack={3}>
            <PositionList />
        </SnackbarProvider>
    );
}
