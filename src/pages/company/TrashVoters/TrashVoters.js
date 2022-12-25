import { Grid, Paper, Divider } from '@mui/material';
import Title from '~/layout/component/Title';
import ListTable from './ListTable';
import { useEffect, useState } from 'react';
import { findDeletedVoters } from '~/api/voter';

// Data form
function createData(id, email, password, name) {
    return {
        id,
        email,
        password,
        name,
    };
}

function TrashVoters() {
    const [reRender, setReRender] = useState(false);
    const [rows, setRows] = useState([]);

    useEffect(() => {
        const componentDidMount = async () => {
            try{
                const response = await findDeletedVoters();
            
            const voters = response?.data.map((voter) =>
                createData(voter._id, voter.email, voter.password, voter.full_name),
            );
            voters && setRows(voters);
            }catch(err){
                console.log(err.message)
            }
        };
        componentDidMount();
    }, [reRender]);
    return (
        <Grid container spacing={3}>
            {/* Title */}
            <Grid item xs={12}>
                <Paper sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Grid container direction="row" justifyContent="space-between" alignItems="center" sx={{ p: 2 }}>
                        <Grid item>
                            <Title>Trash Voters </Title>
                        </Grid>
                    </Grid>

                    <Divider />
                    <Grid container direction="row" justifyContent="space-between" alignItems="center">
                        <ListTable rows={rows} reRender={reRender} setReRender={setReRender} />
                    </Grid>
                </Paper>
            </Grid>
        </Grid>
    );
}

export default TrashVoters;
