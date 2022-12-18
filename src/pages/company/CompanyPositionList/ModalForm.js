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

import Title from '~/layout/component/Title';
import ethers from '~/ethereum/ethers';
import useSnackMessages from '~/utils/hooks/useSnackMessages';

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

export default function TransitionsModal() {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const { showInfoSnackbar, showErrorSnackbar } = useSnackMessages;

    const handleCreateNew = async (event) => {
        event.preventDefault();
        const dataForm = new FormData(event.currentTarget);
        try {
            const contract = ethers.getElectionContract();
            const bool = await contract.addPosition(dataForm.get('position-name'));
            if (bool) {
                handleClose();
                showInfoSnackbar('Blockchain is processing');
            }
        } catch (err) {
            ethers.getError()
                ? showErrorSnackbar(ethers.getError())
                : showErrorSnackbar('New position creation failed!!!');
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
