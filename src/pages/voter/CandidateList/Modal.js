import PropTypes from 'prop-types';
import { Close as CloseIcon } from '@mui/icons-material';

import {
    Grid,
    Stack,
    IconButton,
    Backdrop,
    Box,
    Modal,
    Fade,
    Divider,
    Typography,
    Avatar as MuiAvatar,
    Paper,
    Button,
} from '@mui/material';

import Title from '~/layout/component/Title';
import HowToVoteIcon from '@mui/icons-material/HowToVote';
import {styled} from '@mui/material/styles';

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

const Avatar = styled(MuiAvatar) (({theme})=> ({
    boxShadow: 'rgb(87, 202, 34) 0px 0px 0px 3px',
    border: '3px solid rgb(255, 255, 255)',
}))

function TransitionsModal(props) {
    const handleClose = () => props.setOpen(false);
    // Read image file, save image in IPFS
    const handleClickVote = () => {
        props.votedList.splice(props.source.positionID, 1, props.source.candidateID);
        props.setVoted(props.source.candidateID);
    };
    const voteCount = props.source.voteCount + (props.voted === props.source.candidateID ? 1 : 0)

    return (
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
                                    <Stack direction="column" justifyContent="center" alignItems="center" spacing={2}>
                                        <Avatar
                                            alt="Avatar"
                                            src={props.source.imgHash}
                                            sx={{ width: 200, height: 200 }}
                                        />
                                        <Typography variant="h6" sx={{ fontWeight: 700 }}>
                                            {props.source.name}
                                        </Typography>
                                    </Stack>
                                </Grid>
                                <Grid item lg={8} xs={12}>
                                    <Grid container direction="row">
                                        <Grid item lg={6} xs={12}>
                                            <Paper sx={{ borderRadius: '10px',  }} elevation={24}>
                                                <Stack
                                                    justifyContent="center"
                                                    alignItems="center"
                                                    sx={{ pt: 2, pb: 2 }}
                                                >
                                                    <Typography variant="h5" color="primary" sx={{ fontWeight: 700 }}>
                                                        {props.endedElection ? voteCount : '?'}
                                                    </Typography>
                                                    <Typography variant="subtitle2">Vote Count</Typography>
                                                </Stack>
                                            </Paper>
                                        </Grid>
                                        <Grid item lg={6} xs={12}></Grid>
                                        <Grid item lg={12} xs={12} sx={{ mt: 3 }}>
                                            <Paper sx={{ borderRadius: '10px' }} elevation={24}>
                                                <Stack sx={{ p: 2 }} direction="column">
                                                    <Stack direction="row" alignItems="center">
                                                        <Typography variant="body1" sx={{ fontWeight: 600 }}>
                                                            Email
                                                        </Typography>
                                                        <Typography variant="subtitle2" sx={{ ml: 2 }}>
                                                            {props.source.email}
                                                        </Typography>
                                                    </Stack>
                                                    <Stack direction="row" alignItems="center">
                                                        <Typography variant="body1" sx={{ fontWeight: 600 }}>
                                                            Date of birth:
                                                        </Typography>
                                                        <Typography variant="subtitle2" sx={{ ml: 2 }}>
                                                            {props.source.dateOfBirth}
                                                        </Typography>
                                                    </Stack>
                                                    <Stack direction="row" alignItems="center">
                                                        <Typography variant="body1" sx={{ fontWeight: 600 }}>
                                                            Description
                                                        </Typography>
                                                        <Typography variant="subtitle2" sx={{ ml: 2 }}>
                                                            {props.source.description}
                                                        </Typography>
                                                    </Stack>
                                                </Stack>
                                            </Paper>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item lg={12} xx={12}>
                                    <Divider sx={{ mb: 4, mt: 2 }} />
                                    <Stack justifyContent="center" alignItems="center">
                                        <Button
                                            onClick={handleClickVote}
                                            disabled={props.isVoted || props.voted === props.source.candidateID}
                                            variant="contained"
                                            startIcon={<HowToVoteIcon />}
                                            sx={{ pl: 3, pr: 3, backgroundColor: 'rgb(87, 202, 34)' }}
                                        >
                                            Vote
                                        </Button>
                                    </Stack>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
            </Fade>
        </Modal>
    );
}

TransitionsModal.propTypes = {
    source: PropTypes.object.isRequired,
    setOpen: PropTypes.func.isRequired,
    isVoted: PropTypes.bool.isRequired,
    setVoted: PropTypes.func.isRequired,
    voted: PropTypes.number.isRequired,
    votedList: PropTypes.array.isRequired,
};

export default TransitionsModal;
