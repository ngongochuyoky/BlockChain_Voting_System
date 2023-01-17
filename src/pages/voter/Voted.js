import { Fragment, useEffect, useState } from 'react';
import {
    Stack,
    Divider,
    Card,
    CardContent,
    Grid,
    Typography,
    Paper,
    IconButton,
    Backdrop,
    Fade,
    Box,
    Modal,
    Button,
    Avatar as MuiAvatar,
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import imageEmpty from '~/assets/images/empty.png';

// import AvatarDefault from '~/assets/images/avatar_default.jpg';
import BallotIcon from '@mui/icons-material/Ballot';
import ethers from '~/ethereum/ethers';
import Title from '~/layout/component/Title';
import Cookies from 'js-cookie';
import { styled } from '@mui/material/styles';
import { createCandidateData } from '~/utils/CreateData';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: '10px',
    width: '50vw',
    p: 4,
};

const Avatar = styled(MuiAvatar)(({ theme }) => ({
    boxShadow: 'rgb(87, 202, 34) 0px 0px 0px 3px',
    border: '3px solid rgb(255, 255, 255)',
}));

function Voted() {
    const [candidates, setCandidates] = useState([]);
    const [positions, setPositions] = useState([]);
    const [open, setOpen] = useState(false);
    const [source, setSource] = useState();
    const [endedElection, setEndedElection] = useState(false);

    const handleClose = () => setOpen(false);
    const handleClickShow = (event, candidate) => {
        setSource(candidate);
        setOpen(true);
    };

    useEffect(() => {
        const componentDidMount = async () => {
            try {
                await ethers.connectWallet();
                const contract = ethers.getElectionContract(Cookies.get('voterElectionAddress'));
                const positions = await contract.getPositions();
                const status = await contract.getStatus();
                setEndedElection(status);
                setPositions(positions);
                const voter = await contract.getVoter(Cookies.get('voterId'));
                if (voter[0]) {
                    const result = [];
                    for (let i = 0; i < voter[1].length; i++) {
                        const candidate = await contract.getCandidate(voter[1][i]);
                        result.push(createCandidateData(voter[1][i], ...candidate));
                    }
                    setCandidates(result);
                }
            } catch (err) {}
        };
        componentDidMount();
    }, []);
    return (
        <Fragment>
            <Paper sx={{ display: 'flex', mb: 2, p: '36px' }}>
                <Grid container>
                    <Grid item>
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <MuiAvatar
                                variant="rounded"
                                sx={{
                                    background: 'rgb(255, 163, 25)',
                                    boxShadow:
                                        'rgb(255 163 25 / 25%) 0px 1px 4px, rgb(255 163 25 / 35%) 0px 3px 12px 2px',
                                    height: 70,
                                    width: 70,
                                }}
                            >
                                <BallotIcon />
                            </MuiAvatar>
                            {candidates.length ? (
                                <Typography variant="h5" color="primary" sx={{ ml: 2 }}>
                                    You voted for the candidates
                                </Typography>
                            ) : (
                                <Typography variant="h5" color="primary" sx={{ ml: 2 }}>
                                    Can't see your vote results !!
                                </Typography>
                            )}
                        </Box>
                    </Grid>
                </Grid>
            </Paper>

            <Grid container spacing={2}>
                {candidates.length ? candidates.map((candidate, index) => (
                    <Grid item key={index}>
                        <Card
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                height: '100%',
                                width: '300px',
                            }}
                        >
                            <CardContent>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        pb: 3,
                                    }}
                                >
                                    <Avatar sx={{ height: 100, width: 100 }} src={candidate.imgHash} />
                                </Box>
                                <Typography align="center" color="textPrimary" gutterBottom variant="h5">
                                    {candidate.name}
                                </Typography>
                                <Typography align="center" variant="body2" color="text.secondary">
                                    Position: {positions[candidate.positionID]}
                                </Typography>
                            </CardContent>
                            <Box sx={{ flexGrow: 1 }} />
                            <Divider />
                            <Stack direction="row" justifyContent="center" alignItems="center">
                                <Button
                                    color="primary"
                                    sx={{ width: '100%' }}
                                    onClick={(event) => handleClickShow(event, candidate)}
                                >
                                    Show
                                </Button>
                            </Stack>
                        </Card>
                    </Grid>
                )) : (
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
            {open && (
                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    open={true}
                    onClose={handleClose}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}
                >
                    <Fade in={true}>
                        <Box sx={style}>
                            <Grid container direction="column">
                                <Grid item>
                                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                                        <Title>Candidate Infomation</Title>
                                        <IconButton onClick={handleClose}>
                                            <CloseIcon />
                                        </IconButton>
                                    </Stack>
                                </Grid>

                                <Grid item sx={{ pt: 2 }}>
                                    <Divider sx={{ width: '100%' }} />
                                    <Grid container direction="row" sx={{ mt: 4 }}>
                                        <Grid item lg={4} xs={12}>
                                            <Stack
                                                direction="column"
                                                justifyContent="center"
                                                alignItems="center"
                                                spacing={2}
                                            >
                                                <Avatar
                                                    alt="Avatar"
                                                    src={source.imgHash}
                                                    sx={{ width: 200, height: 200 }}
                                                />
                                                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                                                    {source.name}
                                                </Typography>
                                            </Stack>
                                        </Grid>
                                        <Grid item lg={8} xs={12}>
                                            <Grid container direction="row">
                                                <Grid item lg={6} xs={12}>
                                                    <Paper sx={{ borderRadius: '10px' }}>
                                                        <Stack
                                                            justifyContent="center"
                                                            alignItems="center"
                                                            sx={{ pt: 2, pb: 2 }}
                                                        >
                                                            <Typography
                                                                variant="h5"
                                                                color="primary"
                                                                sx={{ fontWeight: 700 }}
                                                            >
                                                                {endedElection ? source.voteCount : '?'}
                                                            </Typography>
                                                            <Typography variant="subtitle2">Vote Count</Typography>
                                                        </Stack>
                                                    </Paper>
                                                </Grid>
                                                <Grid item lg={6} xs={12}></Grid>
                                                <Grid item lg={12} xs={12} sx={{ mt: 3 }}>
                                                    <Paper sx={{ borderRadius: '10px' }}>
                                                        <Stack sx={{ p: 2 }} direction="column">
                                                            <Stack direction="row" alignItems="center">
                                                                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                                                                    Email
                                                                </Typography>
                                                                <Typography variant="subtitle2" sx={{ ml: 2 }}>
                                                                    {source.email}
                                                                </Typography>
                                                            </Stack>
                                                            <Stack direction="row" alignItems="center">
                                                                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                                                                    Date of birth:
                                                                </Typography>
                                                                <Typography variant="subtitle2" sx={{ ml: 2 }}>
                                                                    {source.dateOfBirth}
                                                                </Typography>
                                                            </Stack>
                                                            <Stack direction="row" alignItems="center">
                                                                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                                                                    Description
                                                                </Typography>
                                                                <Typography variant="subtitle2" sx={{ ml: 2 }}>
                                                                    {source.description}
                                                                </Typography>
                                                            </Stack>
                                                        </Stack>
                                                    </Paper>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item lg={12} xx={12}>
                                            <Divider sx={{ mb: 4, mt: 2 }} />
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Box>
                    </Fade>
                </Modal>
            )}
        </Fragment>
    );
}

export default Voted;
