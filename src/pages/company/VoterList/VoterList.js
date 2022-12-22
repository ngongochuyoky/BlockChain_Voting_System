import { Grid, Paper, Divider } from '@mui/material';
import Title from '~/layout/component/Title';
import ListTable from './ListTable';
import FormCreateVoter from './FormCreateVoter';
import ethers from '~/ethereum/ethers';
import { useEffect, useState } from 'react';
import { allVoter } from '~/api/voter';


// Data form
function createData(email, password, name) {
    return {
        email,
        password,
        name,
    };
}
function VoterList() {
    const [electionName, setElectionName] = useState('');
    const [update, setUpdate] = useState(false);
    const [rows, setRows] = useState([]);
    

    useEffect(() => {
        const componentDidMount = async () => {
            try {
                await ethers.connectWallet();
                const contract = ethers.getElectionContract();
                const summary = await contract.getElectionDetails();
                setElectionName(summary[0]);

                const response = await allVoter();
                const voters = response.data.map((voter) => createData(voter.email, voter.password, voter.full_name));
                setRows(voters);
            } catch (err) {
                console.log(err.message);
            }
        };
        componentDidMount();
    }, [update]);
    return (
        <Grid container spacing={3}>
            {/* Title */}
            <Grid item xs={12}>
                <Paper sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Grid container direction="row" justifyContent="space-between" alignItems="center" sx={{ p: 2 }}>
                        <Grid item>
                            <Title>Voter List </Title>
                        </Grid>
                        <Grid item>
                            <FormCreateVoter electionName={electionName} update={update} setUpdate={setUpdate} />
                        </Grid>
                    </Grid>

                    <Divider />
                    <Grid container direction="row" justifyContent="space-between" alignItems="center">
                        <ListTable rows={rows} electionName={electionName} update={update} setUpdate={setUpdate} />
                    </Grid>
                </Paper>
            </Grid>
        </Grid>
    );
}

export default VoterList;
