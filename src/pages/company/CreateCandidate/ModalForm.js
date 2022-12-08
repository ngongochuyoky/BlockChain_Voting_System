import { useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
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
    const [value, setValue] = useState();
    const handleCreateNew = (event) => {
        event.preventDefault();
        const dataForm = new FormData(event.currentTarget);
        console.log(dataForm.get('date-of-birth'));
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
                                    <Title>Create New Candidate</Title>
                                    <IconButton onClick={handleClose}>
                                        <CloseIcon />
                                    </IconButton>
                                </Stack>
                            </Grid>
                            <Grid item sx={{ pt: 2 }}>
                                <Box component="form" onSubmit={handleCreateNew} validate="true" autoComplete="off">
                                    <Grid container spacing={2}>
                                        {/* Input Email */}
                                        <Grid item md={4} xs={12}>
                                            <InputLabel htmlFor="email" sx={{ fontWeight: 700 }}>
                                                Email
                                            </InputLabel>
                                        </Grid>
                                        <Grid item md={8} xs={12}>
                                            <TextField
                                                required
                                                fullWidth
                                                id="email"
                                                name="email"
                                                placeholder="abc@gmail.com"
                                            />
                                        </Grid>
                                        {/* Input Candidate Name */}
                                        <Grid item md={4} xs={12}>
                                            <InputLabel htmlFor="candidate-name" sx={{ fontWeight: 700 }}>
                                                Candidate name
                                            </InputLabel>
                                        </Grid>
                                        <Grid item md={8} xs={12}>
                                            <TextField
                                                required
                                                fullWidth
                                                id="candidate-name"
                                                name="candidate-name"
                                                placeholder="Alex Z"
                                            />
                                        </Grid>
                                        {/* Input Date of Birth */}
                                        <Grid item md={4} xs={12}>
                                            <InputLabel htmlFor="date-of-birth" sx={{ fontWeight: 700 }}>
                                                Date of birth
                                            </InputLabel>
                                        </Grid>
                                        <Grid item md={8} xs={12}>
                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                <DatePicker
                                                    openTo="year"
                                                    views={['year', 'month', 'day']}
                                                    value={value}
                                                    onChange={(newValue) => {
                                                        setValue(newValue);
                                                    }}
                                                    renderInput={(params) => (
                                                        <TextField
                                                            {...params}
                                                            required
                                                            fullWidth
                                                            id="date-of-birth"
                                                            name="date-of-birth"
                                                        />
                                                    )}
                                                />
                                            </LocalizationProvider>
                                        </Grid>
                                        {/* Input Description */}
                                        <Grid item md={4} xs={12}>
                                            <InputLabel htmlFor="description" sx={{ fontWeight: 700 }}>
                                                Description
                                            </InputLabel>
                                        </Grid>
                                        <Grid item md={8} xs={12}>
                                            <TextField
                                                multiline
                                                rows={3}
                                                required
                                                fullWidth
                                                id="description"
                                                name="description"
                                                placeholder="ACB"
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
