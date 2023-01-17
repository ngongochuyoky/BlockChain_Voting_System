import {
    Grid,
    Paper,
    Typography,
    Button,
    Box,
    Stack,
    IconButton,
    InputLabel,
    Backdrop,
    Modal,
    Fade,
    Divider,
    TextField,
} from '@mui/material';
import Title from '~/layout/component/Title';
import { Add as AddIcon, Close as CloseIcon } from '@mui/icons-material';

import NumCandidate from '~/layout/component/NumCandidate';
import NumPosition from '~/layout/component/NumPosition';
import NumVoter from '~/layout/component/NumVoter';
import Voted from '~/layout/component/Voted';
import BarChart from '~/layout/component/BarChart';
import PieChart from '~/layout/component/PieChart';
import { Fragment, useEffect, useState } from 'react';
import ethers from '~/ethereum/ethers';
import useSnackMessages from '~/utils/hooks/useSnackMessages';
import { resultMail } from '~/api/company';
import { createCandidateData } from '~/utils/CreateData';
import Cookies from 'js-cookie';
import { getVotersVoted } from '~/api/ballot';
import { searchByElectionAddress, updateTimeStart } from '~/api/election';

import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { getHashSignature } from '~/api/key';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: '10px',
    width: '40vw',
    height: '80vh',
    p: 4,
};

function DashboardContent() {
    const [openFormStart, setOpenFormStart] = useState(false);
    const [value, setValue] = useState(dayjs('2023-01-14T21:11:54')); //Date Start
    const [voted, setVoted] = useState(0);
    const [numPosition, setNumPosition] = useState(0);
    const [numCandidate, setNumCandidate] = useState(0);
    const [numVoter, setNumVoter] = useState(0);
    const [startElection, setStartElection] = useState(true);
    const [election, setElection] = useState({});
    const [electionName, setElectionName] = useState('Election Name');
    const [winners, setWinners] = useState([]);
    const [endedElection, setEndedElection] = useState(false);
    const { showSuccessSnackbar, showErrorSnackbar, showInfoSnackbar } = useSnackMessages();
    const [dataChart, setDataChart] = useState([]);

    const handleOpenFormStart = () => setOpenFormStart(true);
    const handleCloseFormStart = () => setOpenFormStart(false);
    useEffect(() => {
        const componentDidMount = async () => {
            try {
                await ethers.connectWallet();
                const contract = await ethers.getElectionContract(Cookies.get('companyElectionAddress'));
                //Election Status
                const status = await contract.getStatus();
                setEndedElection(status);

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
                    electionAddress: Cookies.get('companyElectionAddress'),
                    token: Cookies.get('companyToken'),
                });
                
                const election = {
                    companyId: responseElection.data.company,
                    voters: responseElection.data.voters,
                    startTime: responseElection.data.startTime,
                    time: responseElection.data.time,
                };
                setElection(election);
                const startElection = election.startTime ? true : false;
                setStartElection(startElection);

                //The number of voters
                setNumVoter(election.voters.length);

                //The number of voters who voted
                const responseNumbVoted = await getVotersVoted({
                    companyId: responseElection.data.company,
                    token: Cookies.get('companyToken'),
                });
                setVoted(responseNumbVoted.data.number);

                const electionDetails = await contract.getElectionDetails();
                setElectionName(electionDetails[0]);
                //Get Winners
                if (status) {
                    const winnersID = await contract.winner();
                    const winners = [];
                    for (let i = 0; i < winnersID.length; i++) {
                        const candidate = await contract.getCandidate(winnersID[i]);
                        winners.push(createCandidateData(winnersID[i], ...candidate));
                    }
                    const result = winners.map((winner) => ({ ...winner, positionName: positions[winner.positionID] }));
                    setWinners(result);
                }
            } catch (err) {
                console.log(err);
            }
        };
        componentDidMount();
    }, []);

    const handleEndElection = async () => {
        await ethers.connectWallet();
        const contract = await ethers.getElectionContract(Cookies.get('companyElectionAddress'));
        const bool = await contract.setEnd();
        bool && setEndedElection(true);
    };

    //Xử lý ngày tháng

    const handleChange = (newValue) => {
        setValue(newValue);
    };

    const handleStartElection = async (event) => {
        event.preventDefault();
        const responseHashSignature = await getHashSignature();
        if(responseHashSignature?.data) {
            const election = await updateTimeStart({
                timeOut: value,
            });
            if (election.data) {
                setStartElection(true);
                showSuccessSnackbar('Successfully started the election');
                setOpenFormStart(false);
            } else showErrorSnackbar('Failed election start');
            
        }else{
            showInfoSnackbar('Please create key first !!!');
        }
    };
    const handleResultEmail = async () => {
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
                        <Button
                            disabled={startElection}
                            variant="contained"
                            color="success"
                            sx={{ mr: 2 }}
                            onClick={handleOpenFormStart}
                        >
                            Start election
                        </Button>

                        <Button disabled={endedElection} variant="contained" color="error" onClick={handleEndElection}>
                            End election
                        </Button>
                        <Button
                            disabled={!endedElection}
                            variant="contained"
                            color="warning"
                            sx={{ ml: 2 }}
                            onClick={handleResultEmail}
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

                {dataChart.length !== 0 &&
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
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={openFormStart}
                onClose={handleCloseFormStart}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={openFormStart}>
                    <Box sx={style}>
                        <Grid container direction="column">
                            <Grid item>
                                <Stack direction="row" justifyContent="space-between" alignItems="center">
                                    <Title>Create a new position</Title>
                                    <IconButton onClick={handleCloseFormStart}>
                                        <CloseIcon />
                                    </IconButton>
                                </Stack>
                            </Grid>
                            <Grid item sx={{ pt: 2 }}>
                                <Box component="form" onSubmit={handleStartElection} validate="true" autoComplete="off">
                                    <Grid container spacing={2}>
                                        {/* Input Description */}
                                        <Grid item md={4} xs={12}>
                                            <InputLabel htmlFor="email" sx={{ fontWeight: 700 }}>
                                                Voting time
                                            </InputLabel>
                                        </Grid>
                                        <Grid item md={8} xs={12}>
                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                <Stack spacing={3}>
                                                    <DateTimePicker
                                                        label="Date&Time picker"
                                                        value={value}
                                                        onChange={handleChange}
                                                        renderInput={(params) => <TextField {...params} />}
                                                    />
                                                </Stack>
                                            </LocalizationProvider>
                                        </Grid>

                                        {/* Button Submit */}
                                        <Grid item md={12} sx={{ mt: '60%' }}>
                                            <Divider sx={{ width: '100%' }} />
                                            <Box sx={{ float: 'right' }}>
                                                <Button
                                                    type="submit"
                                                    variant="contained"
                                                    sx={{ mt: 3, pl: 3, pr: 3, width: '300px' }}
                                                >
                                                    Start
                                                </Button>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                </Fade>
            </Modal>
        </Fragment>
    );
}

export default DashboardContent;
