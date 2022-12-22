import { Grid, Paper, Divider } from '@mui/material';
import Title from '~/layout/component/Title';
import PositionListTable from './ListTable';
import FormCreatePosition from './FormCreatePosition';
import useSnackMessages from '~/utils/hooks/useSnackMessages';
import { useEffect, useState } from 'react';
import ethers from '~/ethereum/ethers';

function createData(positionID, positionName) {
    return {
        positionID,
        positionName,
    };
}

function PositionList() {
    const [rows, setRows] = useState([]);
    const { showSuccessSnackbar, showErrorSnackbar } = useSnackMessages();

    useEffect(() => {
        const addPositionListener = (data) => {
            const contract = ethers.getElectionContract();
            contract.on('AddPosition', (positionID, positionName) => {
                if( !(data?.[data.length-1]?.positionID === positionID)) {
                    showSuccessSnackbar('Successfully created new position');
                    setRows((preState) => {
                        return [...preState, createData(positionID, positionName)];
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
                        return createData(index, position);
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
        <Grid container spacing={3}>
            {/* Title */}
            <Grid item xs={12}>
                <Paper sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Grid container direction="row" justifyContent="space-between" alignItems="center" sx={{ p: 2 }}>
                        <Grid item>
                            <Title>Position List</Title>
                        </Grid>
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
    );
}

export default PositionList;
