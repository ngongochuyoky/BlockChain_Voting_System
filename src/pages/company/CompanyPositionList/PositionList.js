import { Grid, Paper, Divider } from '@mui/material';
import Title from '~/layout/component/Title';
import PositionListTable from './PositionListTable';

function PositionList() {
    return (
        <Grid container spacing={3}>
            {/* Title */}
            <Grid item xs={12}>
                <Paper sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Grid container direction="row" justifyContent="space-between" alignItems="center" sx={{ p: 2 }}>
                        <Grid item>
                            <Title>Position List</Title>
                        </Grid>
                    </Grid>

                    <Divider />
                    <Grid container direction="row" justifyContent="space-between" alignItems="center">
                        <PositionListTable />
                    </Grid>
                </Paper>
            </Grid>
        </Grid>
    );
}

export default PositionList;
