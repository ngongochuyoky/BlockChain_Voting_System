import { Grid, Paper, Divider, Box, Avatar, Typography  } from '@mui/material';
import ListTable from './ListTable';
import FormCreateVoter from './FormCreateVoter';
import PeopleIcon from '@mui/icons-material/PeopleOutlined';
import ethers from '~/ethereum/ethers';
import { Fragment, useEffect, useState } from 'react';
import { allVoter } from '~/api/voter';

// Data form
function createData(id, email, password, name) {
    return {
        id,
        email,
        password,
        name,
    };
}
function VoterList() {
    const [electionName, setElectionName] = useState('');
    const [reRender, setReRender] = useState(false);
    const [rows, setRows] = useState([]);

    useEffect(() => {
        const componentDidMount = async () => {
            try {
                await ethers.connectWallet();
                const contract = ethers.getElectionContract();
                const summary = await contract.getElectionDetails();
                setElectionName(summary[0]);
                const response = await allVoter();
                // console.log(response);
                const voters = response.data.map((voter) =>
                    createData(voter._id, voter.email, voter.password, voter.full_name),
                );
                setRows(voters);
            } catch (err) {
                console.log(err.message);
            }
        };
        componentDidMount();
    }, [reRender]);
    return (
        <Fragment>
            <Paper sx={{ display: 'flex', mb: 2, p: '36px' }}>
                <Grid container>
                    <Grid item>
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
                        <Avatar
                    variant="rounded"
                        sx={{
                            background: 'rgb(255, 163, 25)',
                            boxShadow: 'rgb(255 163 25 / 25%) 0px 1px 4px, rgb(255 163 25 / 35%) 0px 3px 12px 2px',
                            height: 70,
                            width: 70,

                        }}
                    >
                        <PeopleIcon />
                    </Avatar>
                            <Typography variant="h5" color="rgb(255, 163, 25)" sx={{ml: 2}}>
                                Voter List
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Paper>
            <Grid container spacing={3}>
            {/* Title */}
            <Grid item xs={12}>
                <Paper sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Grid container direction="row" justifyContent="end" alignItems="center" sx={{ p: 2 }}>
                        <Grid item>
                            <FormCreateVoter
                                electionName={electionName}
                                reRender={reRender}
                                setReRender={setReRender}
                            />
                        </Grid>
                    </Grid>

                    <Divider />
                    <Grid container direction="row" justifyContent="space-between" alignItems="center">
                        <ListTable
                            rows={rows}
                            electionName={electionName}
                            reRender={reRender}
                            setReRender={setReRender}
                        />
                    </Grid>
                </Paper>
            </Grid>
        </Grid>
        </Fragment>
        
    );
}

export default VoterList;
