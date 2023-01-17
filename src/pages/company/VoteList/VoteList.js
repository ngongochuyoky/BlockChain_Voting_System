import { Grid, Paper, Divider, Box, Avatar, Typography } from '@mui/material';
import ListTable from './ListTable';
import PeopleIcon from '@mui/icons-material/PeopleOutlined';
import ethers from '~/ethereum/ethers';
import { Fragment, useEffect, useState } from 'react';
import { getVotes } from '~/api/ballot';
import { createVoteData } from '~/utils/CreateData';
import Cookies from 'js-cookie';

function VoterList() {
    const [electionName, setElectionName] = useState('');
    const [reRender, setReRender] = useState(false);
    const [rows, setRows] = useState([]);

    useEffect(() => {
        const componentDidMount = async () => {
            try {
                await ethers.connectWallet();
                const contract = ethers.getElectionContract(Cookies.get('companyElectionAddress'));
                const summary = await contract.getElectionDetails();
                setElectionName(summary[0]);
                const response = await getVotes({
                    companyId: Cookies.get('companyId'),
                    token: Cookies.get('companyToken'),
                });
                const votes = response.data.map((vote) =>
                createVoteData(vote._id, vote.voter.email, vote.voter.full_name, vote.createdAt, vote.isCheck),
                );
                setRows(votes);
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
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Avatar
                                variant="rounded"
                                sx={{
                                    background: 'rgb(85, 105, 255)',
                                    boxShadow:
                                        'rgb(85 105 255 / 25%) 0px 1px 4px, rgb(85 105 255 / 35%) 0px 3px 12px 2px',
                                    height: 70,
                                    width: 70,
                                }}
                            >
                                <PeopleIcon />
                            </Avatar>
                            <Typography variant="h5" color="rgb(85, 105, 255)" sx={{ ml: 2 }}>
                                Vote List
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Paper>
            <Grid container spacing={3}>
                {/* Title */}
                <Grid item xs={12}>
                    <Paper sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Box sx={{ p: 4 }} />

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
