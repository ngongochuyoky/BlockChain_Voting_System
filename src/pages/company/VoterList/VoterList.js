import { Grid, Paper, Divider } from '@mui/material';
import Title from '~/layout/component/Title';
import CandidateListTable from './ListTable';
import { useEffect, useState } from 'react';
import useSnackMessages from '~/utils/hooks/useSnackMessages';
import { allVoter } from '~/api/voter';

function createData(email, password, name) {
    return {
        email,
        password,
        name,
    };
}

function VoterList() {
    const [rows, setRows] = useState([]);
    const { showSuccessSnackbar, showErrorSnackbar } = useSnackMessages();

    useEffect(() => {
        const getVoters = async () => {
            try {
                const response = await allVoter();
                const voters = response.data.map(voter => createData(voter.email, voter.password, voter.full_name));
                setRows(voters)
            } catch (err) {
                console.log(err.message);
            }
        };
        getVoters();
    }, [showSuccessSnackbar, showErrorSnackbar]);

    return (
        <Grid container spacing={3}>
            {/* Title */}
            <Grid item xs={12}>
                <Paper sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Grid container direction="row" justifyContent="space-between" alignItems="center" sx={{ p: 2 }}>
                        <Grid item>
                            <Title>Voter List </Title>
                        </Grid>
                    </Grid>

                    <Divider />
                    <Grid container direction="row" justifyContent="space-between" alignItems="center">
                        <CandidateListTable
                            rows={rows}
                        />
                    </Grid>
                </Paper>
            </Grid>
        </Grid>
    );
}

export default VoterList;
