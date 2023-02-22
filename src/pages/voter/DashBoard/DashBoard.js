import { Grid, Paper, Typography, Box } from '@mui/material';
import Cookies from 'js-cookie';
import NumCandidate from '~/layout/component/NumCandidate';
import NumPosition from '~/layout/component/NumPosition';
import NumVoter from '~/layout/component/NumVoter';
import Voted from '~/layout/component/Voted';
import BarChart from '~/layout/component/BarChart';
import PieChart from '~/layout/component/PieChart';

import { Fragment, useEffect, useRef, useState } from 'react';
import ethers from '~/ethereum/ethers';
import { searchByElectionAddress } from '~/api/election';
import { createCandidateData } from '~/utils/CreateData';
import { getVotersVoted } from '~/api/ballot';
import dayjs from 'dayjs';

function DashboardContent() {
    const [voted, setVoted] = useState(0);
    const [numPosition, setNumPosition] = useState(0);
    const [numCandidate, setNumCandidate] = useState(0);
    const [numVoter, setNumVoter] = useState(0);
    const [election, setElection] = useState({});
    const [electionName, setElectionName] = useState('Election Name');
    const [dataChart, setDataChart] = useState([]);
    const [statusElection, setStatusElection] = useState(false);
    const [endedElection, setEndedElection] = useState(false)

    //Time CountDown
    const [days, setDays] = useState(0);
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const timeId = useRef();
    useEffect(() => {
        const componentDidMount = async () => {
            try {
                await ethers.connectWallet();
                const contract = await ethers.getElectionContract(Cookies.get('voterElectionAddress'));
                const end = await contract.getStatus();
                setEndedElection(end)
                //Number of positions
                const numPosition = await contract.getNumOfPosition();
                setNumPosition(numPosition);
                const positions = await contract.getPositions();
                //Number of candidates
                const numCandidate = await contract.getNumOfCandidates();
                setNumCandidate(numCandidate);

                //Candidates
                const candidates = [];
                for (let i = 0; i < numCandidate; i++) {
                    const candidate = await contract.getCandidate(i);
                    candidates.push(createCandidateData(i, ...candidate));
                }

                //Data chart
                const dataChart = positions.map((position) => ({
                    positionName: position,
                    rows: [],
                }));
                candidates.forEach((candidate) => {
                    dataChart[candidate.positionID].rows.push(candidate);
                });
                setDataChart(dataChart);

                //get Election
                const responseElection = await searchByElectionAddress({
                    electionAddress: Cookies.get('voterElectionAddress'),
                    token: Cookies.get('voterToken'),
                });
                const election = {
                    companyId: responseElection.data.company,
                    voters: responseElection.data.voters,
                    startTime: responseElection.data.startTime,
                    time: responseElection.data.time,
                };
                setElection(election);
                election.time && timeCountDown(election);
                //Election Status
                const status = election.start ? true : false;
                setStatusElection(status);

                //The number of voters
                setNumVoter(election.voters.length);

                //The number of voters who voted
                const responseNumbVoted = await getVotersVoted({
                    companyId: responseElection.data.company,
                    token: Cookies.get('voterToken'),
                });
                setVoted(responseNumbVoted.data.number);

                const electionDetails = await contract.getElectionDetails();
                setElectionName(electionDetails[0]);
            } catch (err) {
                console.log(err);
            }
        };
        componentDidMount();
    }, []);

    const timeCountDown = (election) => {
        timeId.current = setInterval(() => {
            let totalSeconds = dayjs(election.time).diff(dayjs(), 'second');
            if (totalSeconds <= 0) {
                clearInterval(timeId.current);
            }else{
                let totalDays = Math.floor(totalSeconds / (60 * 60 * 24));
                setDays(totalDays);
                totalSeconds = totalSeconds - totalDays * 60 * 60 * 24;
    
                let totalHours = Math.floor(totalSeconds / (60 * 60));
                setHours(totalHours);
    
                // console.log({ totalHours });
                totalSeconds = totalSeconds - totalHours * 60 * 60; // Pull those hours out of totalSeconds
    
                let totalMinutes = Math.floor(totalSeconds / 60); //With hours out this will retun minutes
                setMinutes(totalMinutes);
                totalSeconds = totalSeconds - totalMinutes * 60;
                setSeconds(totalSeconds);
            }
            
        }, 1000);
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
                    <Grid item sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', ml: 24 }}>
                        <Box>
                            <Typography variant="h4">
                                {days > 0 ? days : '00'} : {hours > 0 ? hours : '00'} : {minutes > 0 ? minutes : '00'} :{' '}
                                {seconds > 0 ? seconds : '00'}
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
                {dataChart.length !== 0 &&
                    endedElection &&
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
