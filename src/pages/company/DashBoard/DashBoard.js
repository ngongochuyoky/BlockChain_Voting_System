import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Orders from './Orders';

function DashboardContent() {
    return (
        <Grid container spacing={3}>
            {/* Recent Orders */}
            <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                    <Orders />
                </Paper>
            </Grid>
        </Grid>
    );
}

export default DashboardContent;
