import { Fragment, useEffect, useState } from 'react';
import {
    Stack,
    Divider,
    Card,
    CardContent,
    Grid,
    Typography,
    Paper,
    Box,
    Button,
    Avatar as MuiAvatar,
    CardActions,
} from '@mui/material';
import imageEmpty from '~/assets/images/empty.png';

// import AvatarDefault from '~/assets/images/avatar_default.jpg';
import BallotIcon from '@mui/icons-material/Ballot';
import HowToVoteIcon from '@mui/icons-material/HowToVote';
import LowPriorityIcon from '@mui/icons-material/LowPriority';
import BlockIcon from '@mui/icons-material/Block';
import ethers from '~/ethereum/ethers';
import { searchByVoterId } from '~/api/election';
import Cookies from 'js-cookie';
import { createElectionData } from '~/utils/CreateData';
import { useContext } from 'react';
import config from '~/config';
import { UpdateRoutes } from '~/App';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';

function ElectionList() {
    const [elections, setElections] = useState([]);
    const navigate = useNavigate();
    const updateRoutes = useContext(UpdateRoutes);

    useEffect(() => {
        const componentDidMount = async () => {
            try {
                await ethers.connectWallet();

                const response = await searchByVoterId({
                    voterId: Cookies.get('voterId'),
                    token: Cookies.get('voterToken'),
                });
                const elections = [];
                if (response.data) {
                    for (let i = 0; i < response.data.length; i++) {
                        const contract = ethers.getElectionContract(response.data[i].election_address);
                        let status = 'watting';
                        if(response.data[i]?.time){
                            let totalSeconds = dayjs(response.data[i].time).diff(dayjs(), 'second');  
                            if(totalSeconds >= 0) status = 'voting';
                            else status = 'end';
                        }
                                       
                        const election = await contract.getElectionDetails();
                        elections.push(
                            createElectionData(
                                response.data[i].election_address,
                                response.data[i].company.company_name,
                                election[0],
                                election[1],
                                response.data[i].voters.length,
                                status,
                            ),
                        );
                    }
                }
                elections.length && setElections(elections);
            } catch (err) {
                console.log(err.message);
            }
        };
        componentDidMount();
    }, []);

    const handleClick = (event, data) => {
        Cookies.set('voterElectionAddress', data.electionAddress);
        updateRoutes();
        navigate(config.routes.voterDashboard);
    };

    return (
        <Fragment>
            <Paper sx={{ display: 'flex', mb: 2, p: '36px' }}>
                <Grid container>
                    <Grid item>
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <MuiAvatar
                                variant="rounded"
                                sx={{
                                    background: 'rgb(51, 194, 255)',
                                    boxShadow:
                                        'rgb(51 194 255 / 25%) 0px 1px 4px, rgb(51 194 255 / 35%) 0px 3px 12px 2px',
                                    height: 70,
                                    width: 70,
                                }}
                            >
                                <BallotIcon />
                            </MuiAvatar>
                            {elections.length ? (
                                <Typography variant="h5" color="rgb(51, 194, 255)" sx={{ ml: 2 }}>
                                    List of elections
                                </Typography>
                            ) : (
                                <Typography variant="h5" color="rgb(51, 194, 255)" sx={{ ml: 2 }}>
                                    You not have a permission !!
                                </Typography>
                            )}
                        </Box>
                    </Grid>
                </Grid>
            </Paper>

            <Grid container spacing={2}>
                {elections.length ? (
                    elections.map((election, index) => (
                        <Grid item key={index}>
                            <Card sx={{ maxWidth: 345 }}>
                                {election.status === 'voting' ? (
                                    <Box sx={{ backgroundColor: 'rgb(87, 202, 34)', height: '5px' }} />
                                ) : election.status === 'end' ? (
                                    <Box sx={{ backgroundColor: 'error.main', height: '5px' }} />
                                ) : (
                                    <Box sx={{ backgroundColor: 'warning.main', height: '5px' }} />
                                )}

                                <CardContent align="center" sx={{ p: 6 }}>
                                    <Typography variant="h3" color="rgb(255, 25, 67)">
                                        {election.companyName}
                                    </Typography>
                                    <Typography variant="h4" sx={{ fontWeight: 500, lineHeight: '30px', mt: 2 }}>
                                        {election.name}
                                    </Typography>
                                    <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
                                        {election.description}
                                    </Typography>
                                    <Button
                                        variant="outlined"
                                        sx={{ mt: 3 }}
                                        onClick={(event) => handleClick(event, election)}
                                    >
                                        Participate
                                    </Button>
                                </CardContent>
                                <Divider />
                                <CardActions
                                    disableSpacing
                                    sx={{
                                        backgroundColor: 'rgba(34, 51, 84, 0.02)',
                                        justifyContent: 'space-between',
                                        p: 2,
                                    }}
                                >
                                    <Stack direction="row" sx={{ ml: 1 }}>
                                        <Typography color="#1976d2">Voters:</Typography>
                                        <Typography sx={{ fontWeight: 600, ml: 1 }}>{election.numVoters}</Typography>
                                    </Stack>
                                    {election.status === 'voting' ? (
                                        <Stack direction="row" sx={{ mr: 1 }}>
                                            <HowToVoteIcon color="success" />
                                            <Typography color="rgb(87, 202, 34)">happenning...</Typography>
                                        </Stack>
                                    ) : election.status === 'watting' ? (
                                        <Stack direction="row" sx={{ mr: 1 }}>
                                            <LowPriorityIcon color="warning" />
                                            <Typography color="warning.main" sx={{ ml: 1 }}>
                                                waiting...
                                            </Typography>
                                        </Stack>
                                    ) : (
                                        <Stack direction="row" sx={{ mr: 1 }}>
                                        <BlockIcon color="error" />
                                        <Typography color="error.main" sx={{ ml: 1 }}>
                                           ending...
                                        </Typography>
                                    </Stack>
                                    )}
                                </CardActions>
                            </Card>
                        </Grid>
                    ))
                ) : (
                    <Grid item xs={12}>
                        <Box
                            sx={{
                                backgroundImage: `url(${imageEmpty})`,
                                backgroundRepeat: 'no-repeat',
                                backgroundSize: 'contain',
                                backgroundPosition: 'center',
                                height: '40vh',
                            }}
                        />
                    </Grid>
                )}
            </Grid>
        </Fragment>
    );
}

export default ElectionList;
