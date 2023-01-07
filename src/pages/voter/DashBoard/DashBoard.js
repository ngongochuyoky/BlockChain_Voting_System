import { Grid, Paper, Typography, Box } from '@mui/material';
import NumCandidate from '~/layout/component/NumCandidate';
import NumPosition from '~/layout/component/NumPosition';
import NumVoter from '~/layout/component/NumVoter';
import Voted from '~/layout/component/Voted';
import BarChart from '~/layout/component/BarChart';
import PieChart from '~/layout/component/PieChart';

import { Fragment, useEffect, useState } from 'react';
import ethers from '~/ethereum/ethers';
import { totalVoters, allVoter } from '~/api/voter';
import { createCandidateData } from '~/utils/CreateData';

function DashboardContent() {
    const [voted, setVoted] = useState(0);
    const [numPosition, setNumPosition] = useState(0);
    const [numCandidate, setNumCandidate] = useState(0);
    const [numVoter, setNumVoter] = useState(0);
    const [electionName, setElectionName] = useState('Election Name');
    const [dataChart, setDataChart] = useState([]);
    const [endedElection, setEndedElection] = useState(true);


    useEffect(() => {
        const componentDidMount = async () => {
            try {
                await ethers.connectWallet();
                const contract = await ethers.getElectionContract();
                //Number of positions
                const numPosition = await contract.getNumOfPosition();
                numPosition && setNumPosition(numPosition);
                const positions = await contract.getPositions();
                //Number of candidates
                const numCandidate = await contract.getNumOfCandidates();
                numCandidate && setNumCandidate(numCandidate);

                //Candidates
                const candidates = [];
                for (let i = 0; i < numCandidate; i++) {
                    const candidate = await contract.getCandidate(i);
                    candidates.push(createCandidateData(i, ...candidate));
                }
                //Election Status
                const status = await contract.getStatus();
                console.log(status)
                setEndedElection(status);
                
                //Data chart
                const dataChart = positions.map((position) => ({
                    positionName: position,
                    rows: [],
                }));
                candidates.forEach((candidate) => {
                    dataChart[candidate.positionID].rows.push(candidate);
                });
                dataChart && setDataChart(dataChart);

                //Number of voters
                const numVoter = await totalVoters();
                numVoter && setNumVoter(numVoter.data);
                //The number of voters who voted
                const response = await allVoter();
                if(response?.data) {
                    for(let i = 0; i < response.data.length; i++) {
                        const voter = await contract.getVoter(response.data[i]._id);
                        (voter?.[0] === true)&&setVoted(pre=>pre+1);
                    }
                    const numVoter = await totalVoters();
                    numVoter && setNumVoter(numVoter.data);
                }
                
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
                {dataChart.length !== 0 && endedElection &&
                    dataChart.map((data, index) => (
                        <Fragment key={index}>
                            <Grid item xs={6}>
                                <PieChart candidates={data.rows} positionName={data.positionName} />
                            </Grid>
                            <Grid item xs={6}>
                                <BarChart candidates={data.rows} positionName={data.positionName} />
                            </Grid>
                        </Fragment>
                    ))}
            </Grid>
        </Fragment>
    );
}

export default DashboardContent;
