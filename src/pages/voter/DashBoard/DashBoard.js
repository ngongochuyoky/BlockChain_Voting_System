import { Grid, Paper, Typography, Box } from '@mui/material';
import NumCandidate from './NumCandidate';
import NumPosition from './NumPosition';
import NumVoter from './NumVoter';
import Voted from './Voted';
import { Fragment, useEffect, useState } from 'react';
import ethers from '~/ethereum/ethers';
import { totalVoters } from '~/api/voter';

function DashboardContent() {
    const [voted, setVoted] = useState(0);
    const [numPosition, setNumPosition] = useState(0);
    const [numCandidate, setNumCandidate] = useState(0);
    const [numVoter, setNumVoter] = useState(0);
    const [electionName, setElectionName] = useState('Election Name');
    useEffect(() => {
        const componentDidMount = async () => {
            try {
                await ethers.connectWallet();
                const contract = await ethers.getElectionContract();
                const numPosition = await contract.getNumOfPosition();
                numPosition && setNumPosition(numPosition);
                const numCandidate = await contract.getNumOfCandidates();
                numCandidate && setNumCandidate(numCandidate);
                const voted = await contract.getNumOfVoters();
                voted && setVoted(voted);
                const numVoter = await totalVoters();
                numVoter && setNumVoter(numVoter.data);
                const election = await contract.getElectionDetails();
                election&&setElectionName(election[0]);
            } catch (err) {
                console.log(err);
            }
        };
        componentDidMount();
    }, []);

   
    return (
        <Fragment>
            <Paper sx={{ display: 'flex', mb: 2, p: '36px' }}>
                <Grid container justifyContent="space-between" alignItems="center">
                    <Grid item>
                        <Box sx={{ flexDirection: 'column' }}>
                            <Typography variant="h4" sx={{ ml: 2, color: 'info.main' }}>
                                Welcome
                            </Typography>
                            <Typography variant="h6" sx={{ ml: 2 }}>
                                {electionName}
                            </Typography>
                        </Box>
                    </Grid>
                    
                </Grid>
            </Paper>
            <Grid container spacing={3}>
                {/* Recent Orders */}
                <Grid item xs={3}>
                    <Voted voted={voted} />
                </Grid>
                <Grid item xs={3}>
                    <NumCandidate numCandidate={numCandidate} />
                </Grid>
                <Grid item xs={3}>
                    <NumVoter numVoter={numVoter} />
                </Grid>
                <Grid item xs={3}>
                    <NumPosition numPosition={numPosition} />
                </Grid>
            </Grid>
        </Fragment>
    );
}

export default DashboardContent;
