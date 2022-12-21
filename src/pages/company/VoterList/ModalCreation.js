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
    InputLabel,
    TextField,
    Button,
    Typography,
    Avatar,
    Paper,
} from '@mui/material';

import Title from '~/layout/component/Title';

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

function TransitionsModal(props) {
    const handleClose = () => props.setOpen(false);
    // Read image file, save image in IPFS
    const handleCreateNew = async (event) => {
        event.preventDefault();
        const dataForm = new FormData(event.currentTarget);
    };
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
                                <Title>Voter Infomation</Title>
                                <IconButton onClick={handleClose}>
                                    <CloseIcon />
                                </IconButton>
                            </Stack>
                        </Grid>

                        <Grid item sx={{ pt: 2 }}>
                            <Divider sx={{ width: '100%' }} />
                            <Grid container direction="row" sx={{ mt: 4 }}>
                                <Box component="form" onSubmit={handleCreateNew} validate="true" autoComplete="off">
                                    <Grid container direction="row">
                                        <Grid item lg={12} xs={12} sx={{ pt: 2 }}>
                                            <Grid container spacing={2}>
                                                {/* Input Voter Name */}
                                                <Grid item lg={6} xs={12}>
                                                    <InputLabel htmlFor="full-name" sx={{ fontWeight: 700 }}>
                                                        Full Name
                                                    </InputLabel>
                                                    <TextField
                                                        required
                                                        fullWidth
                                                        id="full-name"
                                                        name="full-name"
                                                        placeholder="Alex Z"
                                                    />
                                                </Grid>

                                                <Grid item lg={6} xs={12} />
                                                {/* Input email */}
                                                <Grid item lg={6} xs={12}>
                                                    <InputLabel htmlFor="email" sx={{ fontWeight: 700 }}>
                                                        Email
                                                    </InputLabel>
                                                    <TextField
                                                        required
                                                        fullWidth
                                                        id="email"
                                                        name="email"
                                                        placeholder="abc@gmail.com"
                                                    />
                                                </Grid>
                                                {/* Input password */}
                                                <Grid item lg={6} xs={12}>
                                                    <InputLabel htmlFor="email" sx={{ fontWeight: 700 }}>
                                                        Password
                                                    </InputLabel>
                                                    <TextField
                                                        required
                                                        fullWidth
                                                        id="email"
                                                        name="email"
                                                        placeholder="abc@gmail.com"
                                                    />
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        {/* Button Submit */}
                                        <Grid item lg={12} sx={{ mt: 4, pb: 4 }}>
                                            <Divider sx={{ width: '100%' }} />
                                            <Box sx={{ float: 'right' }}>
                                                <Button type="submit" variant="contained" sx={{ mt: 3, pl: 4, pr: 4 }}>
                                                    Create
                                                </Button>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </Box>
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
};

export default TransitionsModal;
