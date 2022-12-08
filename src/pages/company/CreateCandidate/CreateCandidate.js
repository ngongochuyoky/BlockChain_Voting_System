import { Grid, Paper, Stack, Divider } from '@mui/material';
import Title from '~/layout/component/Title';
import Form from './Form';

function CreateCandidate() {
    return (
        <Grid container spacing={3}>
            {/* Title */}
            <Grid item xs={12}>
                <Paper sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Grid container direction="row" justifyContent="space-between" alignItems="center" sx={{ p: 2 }}>
                        <Grid item>
                            <Title>Create Candidate</Title>
                        </Grid>
                    </Grid>
                    <Divider />
                    <Grid container direction="row" justifyContent="space-between" alignItems="center" >
                        <Form />
                    </Grid>
                </Paper>
            </Grid>
        </Grid>
    );
}

export default CreateCandidate;
