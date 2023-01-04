import { Grid, Paper, Typography, Button, Box } from '@mui/material';
import NumCandidate from './NumCandidate';
import NumPosition from './NumPosition';
import NumVoter from './NumVoter';
import Voted from './Voted';
import { Fragment, useEffect, useState } from 'react';
import ethers from '~/ethereum/ethers';
import { totalVoters, allVoter } from '~/api/voter';
import useSnackMessages from '~/utils/hooks/useSnackMessages';
import { resultMail } from '~/api/company';

function createData(candidateID, positionID, name, dateOfBirth, description, imgHash, voteCount, email, ...args) {
    return {
        candidateID,
        name,
        dateOfBirth,
        description,
        imgHash,
        voteCount,
        positionID,
        email,
    };
}
function DashboardContent() {
    const [voted, setVoted] = useState(0);
    const [numPosition, setNumPosition] = useState(0);
    const [numCandidate, setNumCandidate] = useState(0);
    const [numVoter, setNumVoter] = useState(0);
    const [electionName, setElectionName] = useState('Election Name');
    const [winners, setWinners] = useState([]);
    const [endedElection, setEndedElection] = useState(false);
    const { showSuccessSnackbar, showErrorSnackbar } = useSnackMessages();
    useEffect(() => {
        const componentDidMount = async () => {
            try {
                await ethers.connectWallet();
                const contract = await ethers.getElectionContract();

                const status = await contract.getStatus();
                status && setEndedElection(status);
                const numPosition = await contract.getNumOfPosition();
                numPosition && setNumPosition(numPosition);
                const numCandidate = await contract.getNumOfCandidates();
                numCandidate && setNumCandidate(numCandidate);

                const response = await allVoter();
                if (response?.data) {
                    for (let i = 0; i < response.data.length; i++) {
                        const voter = await contract.getVoter(response.data[i]._id);
                        voter?.[0] === true && setVoted((pre) => pre + 1);
                    }
                    const numVoter = await totalVoters();
                    numVoter && setNumVoter(numVoter.data);
                }

                const election = await contract.getElectionDetails();
                election && setElectionName(election[0]);
                //Get Winners
                const positions = await contract.getPositions();
                const winnersID = await contract.winner();
                const winners = [];
                for (let i = 0; i < winnersID.length; i++) {
                    const candidate = await contract.getCandidate(winnersID[i]);
                    winners.push(createData(winnersID[i], ...candidate));
                }
                const result = winners.map(winner => ({...winner, positionName: positions[winner.positionID]}));
                console.log(result)
                setWinners(result);
            } catch (err) {
                console.log(err);
            }
        };
        componentDidMount();
    }, []);

    const handleEndElection = async () => {
        await ethers.connectWallet();
        const contract = await ethers.getElectionContract();
        const bool = await contract.setEnd();
        bool && setEndedElection(true);
    };

    const handleresultEmail = async () => {
        const response = await resultMail({ electionName: electionName, winners: winners });
        response?.data
            ? showSuccessSnackbar('Send email to report successful results')
            : showErrorSnackbar('Send email reporting failed results !!!');
    };
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
                    <Grid item>
                        <Button disabled={endedElection} variant="contained" color="error" onClick={handleEndElection}>
                            End election
                        </Button>
                        <Button
                            disabled={!endedElection}
                            variant="contained"
                            color="warning"
                            sx={{ ml: 2 }}
                            onClick={handleresultEmail}
                        >
                            Result Mail
                        </Button>
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
