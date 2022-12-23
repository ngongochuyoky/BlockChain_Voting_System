import { useEffect, useState } from 'react';
import {
    Stack,
    Divider,
    Card,
    CardContent,
    CardMedia,
    Grid,
    Typography,
    Paper,
    IconButton,
    Backdrop,
    Fade,
    Box,
    Modal,
    Button,
    CardActionArea,
    CardActions,
    Avatar,
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';

// import AvatarDefault from '~/assets/images/avatar_default.jpg';
import ethers from '~/ethereum/ethers';
import Title from '~/layout/component/Title';
import Cookies from 'js-cookie';

function createData(candidateID, positionID, name, dateOfBirth, description, imgHash, voteCount, email) {
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

function Voted() {
    const [candidates, setCandidates] = useState([]);
    const [positions, setPositions] = useState([]);
    const [open, setOpen] = useState(false);
    const [source, setSource] = useState();

    const handleClose = () => setOpen(false);
    const handleClickShow = (event, candidate) => {
        setSource(candidate);
        setOpen(true);
    };

    useEffect(() => {
        const componentDidMount = async () => {
            try {
                await ethers.connectWallet();
                const contract = ethers.getElectionContract();
                const positions = await contract.getPositions();
                console.log(positions);
                setPositions(positions);
                const voter = await contract.getVoter(Cookies.get('voterEmail'));
                if (voter[0]) {
                    const result = [];
                    for (let i = 0; i < voter[1].length; i++) {
                        const candidate = await contract.getCandidate(voter[1][i]);
                        result.push(createData(voter[1][i], ...candidate));
                    }
                    setCandidates(result);
                }
            } catch (err) {}
        };
        componentDidMount();
    }, []);
    return (
        <div>
            {candidates.length ? (
                <Typography variant="h5" sx={{ mb: 3 }}>
                    You voted for the candidates
                </Typography>
            ) : (
                <Typography variant="h5" sx={{ mb: 3 }}>
                    You haven't voted yet!!
                </Typography>
            )}
            <Grid container spacing={2}>
                {candidates.map((candidate, index) => (
                    <Grid item key={index}>
                        <Card sx={{ maxWidth: 345 }} key={index}>
                            <CardActionArea>
                                <CardMedia component="img" height="200" image={candidate.imgHash} alt="green iguana" />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {candidate.name}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Position: {positions[candidate.positionID]}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                            <CardActions>
                                <Button
                                    size="small"
                                    color="primary"
                                    onClick={(event) => handleClickShow(event, candidate)}
                                >
                                    Show
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
           {open&&( <Modal
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
                                                            {source.voteCount}
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
            </Modal>)}
        </div>
    );
}

export default Voted;
