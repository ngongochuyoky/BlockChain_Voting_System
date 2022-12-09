import { Grid, Paper, Divider } from '@mui/material';
import Title from '~/layout/component/Title';
import CandidateListTable from './CandidateListTable';

function CompanyCandidateList() {
    return (
        <Grid container spacing={3}>
            {/* Title */}
            <Grid item xs={12}>
                <Paper sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Grid container direction="row" justifyContent="space-between" alignItems="center" sx={{ p: 2 }}>
                        <Grid item>
                            <Title>Candidate List</Title>
                        </Grid>
                    </Grid>

                    <Divider />
                    <Grid container direction="row" justifyContent="space-between" alignItems="center">
                        <CandidateListTable />
                    </Grid>
                </Paper>
            </Grid>
        </Grid>
    );
}

export default CompanyCandidateList;
