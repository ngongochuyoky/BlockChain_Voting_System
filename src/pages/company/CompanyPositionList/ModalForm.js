import { useState } from 'react';
import { Add as AddIcon, Close as CloseIcon } from '@mui/icons-material';
import {
    Grid,
    Stack,
    IconButton,
    InputLabel,
    Backdrop,
    Box,
    Modal,
    Fade,
    Button,
    Divider,
    TextField,
} from '@mui/material';
import PropTypes from 'prop-types';

import Title from '~/layout/component/Title';
import dapp from '~/component/Dapp';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: '10px',
    width: '40vw',
    p: 4,
};

export default function TransitionsModal(props) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleCreateNew = async (event) => {
        event.preventDefault();
        const dataForm = new FormData(event.currentTarget);
        const position = await dapp.addPosition(dataForm.get('position-name'));
        if(position) {
            handleClose();
            props.enqueueSnackbar('Blockchain is processing', {variant: 'info', anchorOrigin: { horizontal: 'right', vertical: 'top' }});
        }else{
            const message = dapp.getError();
            props.enqueueSnackbar(message, {variant: 'error', anchorOrigin: { horizontal: 'right', vertical: 'top' }});
        }
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
                                    <Title>Create a new position</Title>
                                    <IconButton onClick={handleClose}>
                                        <CloseIcon />
                                    </IconButton>
                                </Stack>
                            </Grid>
                            <Grid item sx={{ pt: 2 }}>
                                <Box component="form" onSubmit={handleCreateNew} validate="true" autoComplete="off">
                                    <Grid container spacing={2}>
                                        {/* Input Description */}
                                        <Grid item md={4} xs={12}>
                                            <InputLabel htmlFor="email" sx={{ fontWeight: 700 }}>
                                                Position Name
                                            </InputLabel>
                                        </Grid>
                                        <Grid item md={8} xs={12}>
                                            <TextField
                                                required
                                                fullWidth
                                                id="position-name"
                                                name="position-name"
                                                placeholder="ABC"
                                            />
                                        </Grid>
                                       

                                        {/* Button Submit */}
                                        <Grid item md={12}>
                                            <Divider sx={{ width: '100%' }} />
                                            <Box sx={{ float: 'right' }}>
                                                <Button type="submit" variant="contained" sx={{ mt: 3, pl: 3, pr: 3 }}>
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
    enqueueSnackbar: PropTypes.func.isRequired,
}