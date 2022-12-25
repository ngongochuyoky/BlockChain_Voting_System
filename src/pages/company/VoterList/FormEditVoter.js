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
} from '@mui/material';
import { updateVoter } from '~/api/voter';
import { useState } from 'react';

import Title from '~/layout/component/Title';
import useSnackMessages from '~/utils/hooks/useSnackMessages';

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
    const handleClose = () => props.setOpenFormEditVoter(false);
    const [name, setName] = useState(props.source.name);
    const [password, setPassword] = useState('');
    const { showErrorSnackbar, showSuccessSnackbar } = useSnackMessages();

    const changeName = (event) => {
        setName(event.target.value);
    };
    const changePassword = (event) => {
        setPassword(event.target.value);
    };

    const handleUpdate = async (event) => {
        event.preventDefault();
        const response = await updateVoter({
            id: props.source.id,
            password: password,
            fullName: name,
            electionName: props.electionName,
        });
        if (response?.data) {
            showSuccessSnackbar('Voter account updated successfully');
            props.setOpenFormEditVoter(false);
            props.setReRender(!props.reRender);
        } else showErrorSnackbar('Voter account update failed');
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
                                <Title>Edit Voter Account</Title>
                                <IconButton onClick={handleClose}>
                                    <CloseIcon />
                                </IconButton>
                            </Stack>
                        </Grid>

                        <Grid item sx={{ pt: 2 }}>
                            <Divider sx={{ width: '100%' }} />
                            <Grid container direction="row" sx={{ mt: 4 }}>
                                <Box component="form" onSubmit={handleUpdate} validate="true" autoComplete="off">
                                    <Grid container direction="row">
                                        <Grid item lg={12} xs={12} sx={{ pt: 2 }}>
                                            <Grid container spacing={2}>
                                                {/* Input Voter Name */}
                                                <Grid item lg={6} xs={12}>
                                                    <InputLabel htmlFor="name" sx={{ fontWeight: 700 }}>
                                                        Full Name
                                                    </InputLabel>
                                                    <TextField
                                                        required
                                                        fullWidth
                                                        id="name"
                                                        name="name"
                                                        onChange={changeName}
                                                        value={name}
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
                                                        disabled
                                                        fullWidth
                                                        id="email"
                                                        name="email"
                                                        value={props.source.email}
                                                        placeholder="abc@gmail.com"
                                                    />
                                                </Grid>
                                                {/* Input password */}
                                                <Grid item lg={6} xs={12}>
                                                    <InputLabel htmlFor="password" sx={{ fontWeight: 700 }}>
                                                        Password
                                                    </InputLabel>
                                                    <TextField
                                                        required
                                                        fullWidth
                                                        id="password"
                                                        name="password"
                                                        onChange={changePassword}
                                                        value={password}
                                                        placeholder="abc123@"
                                                    />
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        {/* Button Submit */}
                                        <Grid item lg={12} sx={{ mt: 4, pb: 4 }}>
                                            <Divider sx={{ width: '100%' }} />
                                            <Box sx={{ float: 'right' }}>
                                                <Button type="submit" variant="contained" sx={{ mt: 3, pl: 4, pr: 4 }}>
                                                    Update
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
    setOpenFormEditVoter: PropTypes.func.isRequired,
    setReRender: PropTypes.func.isRequired,
    reRender: PropTypes.bool.isRequired,
    electionName: PropTypes.string.isRequired,
};

export default TransitionsModal;
