import PropTypes from 'prop-types';
import { Add as AddIcon, Close as CloseIcon } from '@mui/icons-material';

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
} from '@mui/material';
import { useState } from 'react';

import Title from '~/layout/component/Title';
import useSnackMessages from '~/utils/hooks/useSnackMessages';
import { createVoter } from '~/api/voter';
import Cookies from 'js-cookie';

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
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const { showErrorSnackbar, showSuccessSnackbar } = useSnackMessages();

    const handleCreateNew = async (event) => {
        event.preventDefault();
        const dataForm = new FormData(event.currentTarget);
        const response = await createVoter({
            email: dataForm.get('email'),
            fullName: dataForm.get('name'),
            electionAddress: Cookies.get('companyElectionAddress'),
            electionName: props.electionName,
        });
        if (response?.data) {
            showSuccessSnackbar('Voter account created successfully');
            handleClose();
            props.setReRender(!props.reRender);
        } else showErrorSnackbar('New Account creation failed!!!');
    };
    return (
        <div>
            <Button onClick={handleOpen} variant="contained" startIcon={<AddIcon />}>
                Add
            </Button>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <Box sx={style}>
                        <Grid container direction="column">
                            <Grid item>
                                <Stack direction="row" justifyContent="space-between" alignItems="center">
                                    <Title>Create Voter Account</Title>
                                    <IconButton onClick={handleClose}>
                                        <CloseIcon />
                                    </IconButton>
                                </Stack>
                            </Grid>

                            <Grid item sx={{ pt: 2 }}>
                                <Divider sx={{ width: '100%' }} />
                                <Box component="form" onSubmit={handleCreateNew} validate="true" autoComplete="off">
                                    <Grid container direction="row" sx={{ mt: 4 }}>
                                        <Grid item lg={12} xs={12} sx={{ pt: 2 }}>
                                            <Grid container spacing={2}>
                                                {/* Input Voter Name */}
                                                <Grid item lg={6} xs={12}>
                                                    <InputLabel
                                                        htmlFor="name"
                                                        sx={{ fontWeight: 700, color: 'secondary.main' }}
                                                    >
                                                        Full Name
                                                    </InputLabel>
                                                    <TextField
                                                        required
                                                        fullWidth
                                                        id="name"
                                                        name="name"
                                                        placeholder="Alex Z"
                                                    />
                                                </Grid>

                                                {/* Input email */}
                                                <Grid item lg={6} xs={12}>
                                                    <InputLabel
                                                        htmlFor="email"
                                                        sx={{ fontWeight: 700, color: 'secondary.main' }}
                                                    >
                                                        Email
                                                    </InputLabel>
                                                    <TextField
                                                        fullWidth
                                                        id="email"
                                                        name="email"
                                                        placeholder="abc@gmail.com"
                                                    />
                                                </Grid>
                                                {/* Input password */}
                                                {/* <Grid item lg={6} xs={12}>
                                                    <InputLabel htmlFor="password" sx={{ fontWeight: 700, color: 'secondary.main' }}>
                                                        Password
                                                    </InputLabel>
                                                    <TextField  
                                                        required
                                                        fullWidth
                                                        id="password"
                                                        name="password"
                                                        placeholder="abc123@"
                                                    />
                                                </Grid> */}
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
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}

TransitionsModal.propTypes = {
    setReRender: PropTypes.func.isRequired,
    reRender: PropTypes.bool.isRequired,
};

export default TransitionsModal;
