import { useEffect, useMemo, useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import AvatarDefault from '~/assets/images/avatar_default.jpg';

import * as IPFS from 'ipfs-core';

import { Buffer } from 'buffer/';
import dayjs from 'dayjs';
import { Add as AddIcon, Close as CloseIcon, Pages } from '@mui/icons-material';
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
    Typography,
    Select,
    MenuItem,
    FormControl,
} from '@mui/material';

const style = {
    bgcolor: 'background.paper',
    borderRadius: '10px',
    p: 4,
};

function TransitionsModal() {
    const [avatar, setAvatar] = useState(AvatarDefault);
    const [position, setPosition] = useState(-1);
    const [buffer, setBuffer] = useState(null);
    const [value, setValue] = useState();

    useEffect(() => {
        return () => {
            URL.revokeObjectURL(avatar);
        };
    }, [avatar]);

    const handleChangePosition = (event) => {
        setPosition(event.target.value);
    };

    const handlePreviewAvatar = async (e) => {
        const file = e.target.files[0];
        //test image khong duoc tao

        const avatarPreview = URL.createObjectURL(file);
        const node = await IPFS.create();
        const fileReader = new FileReader();
        const blob = await (await fetch(avatar)).blob();
        const file1 = new File([blob], 'fileName.jpg', { type: 'image/jpeg', lastModified: new Date() });
        console.log(file1);
        await fileReader.readAsArrayBuffer(file1);
        fileReader.onloadend = async function (event) {
            //  const buffer = dataUriToBuffer(AvatarDefault);
            const buffer = await Buffer.from(fileReader.result);
            const { path } = await node.add(buffer);
            console.log('https://ipfs.io/ipfs/', path);
        };

        // try {
        //     const uploadResult = await config.ipfs.add(buffer)
        //     console.log('https://ipfs.io/ipfs/',uploadResult.path)
        // } catch(e) {
        //     console.log(e)
        //     return
        // }
        // setBuffer(buffer);

        setAvatar(avatarPreview);
    };

    const handleCreateNew = (event) => {
        event.preventDefault();
        const dataForm = new FormData(event.currentTarget);
        console.log(dataForm.get('date-of-birth'));
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={style}>
                <Box component="form" onSubmit={handleCreateNew} validate="true" autoComplete="off">
                    <Grid container direction="row">
                        <Grid item lg={4} xs={12}>
                            <Stack
                                direction="column"
                                justifyContent="center"
                                alignItems="center"
                                spacing={2}
                                sx={{ mt: 4 }}
                            >
                                <Typography variant="h6">Image</Typography>
                                <Avatar alt="Avatar" src={avatar} sx={{ width: 200, height: 200 }} />
                                <Typography variant="subtitle2">
                                    Allowed *.jpeg, *.jpg, *.png, *.gif max size of 3.1 MB
                                </Typography>
                                <Button variant="contained" component="label">
                                    Upload
                                    <input hidden accept="image/*" onChange={handlePreviewAvatar} type="file" />
                                </Button>
                            </Stack>
                        </Grid>
                        <Grid item lg={8} xs={12} sx={{ pt: 2 }}>
                            <Grid container spacing={2}>
                                {/* Input Candidate Name */}
                                <Grid item lg={6} xs={12}>
                                    <InputLabel htmlFor="candidate-name" sx={{ fontWeight: 700 }}>
                                        Candidate name
                                    </InputLabel>
                                    <TextField
                                        required
                                        fullWidth
                                        id="candidate-name"
                                        name="candidate-name"
                                        placeholder="Alex Z"
                                    />
                                </Grid>
                                <Grid item lg={6} xs={12}>
                                    <InputLabel id="position-label" sx={{ fontWeight: 700 }}>
                                        Position
                                    </InputLabel>
                                    <Select
                                        sx={{ width: '100%' }}
                                        id="position"
                                        value={position}
                                        labelId="position-label"
                                        onChange={handleChangePosition}
                                    >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        <MenuItem value={0}>Lớp trưởng</MenuItem>
                                        <MenuItem value={1}>Lớp phó</MenuItem>
                                    </Select>
                                </Grid>
                                {/* Input Email */}

                                <Grid item lg={6} xs={12}>
                                    <InputLabel htmlFor="email" sx={{ fontWeight: 700 }}>
                                        Email
                                    </InputLabel>
                                    <TextField required fullWidth id="email" name="email" placeholder="abc@gmail.com" />
                                </Grid>
                                {/* Input Position */}

                                {/* Input Date of Birth */}
                                <Grid item lg={6} xs={12}>
                                    <InputLabel htmlFor="date-of-birth" sx={{ fontWeight: 700 }}>
                                        Date of birth
                                    </InputLabel>
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
                                <Grid item lg={12} xs={12}>
                                    <InputLabel htmlFor="description" sx={{ fontWeight: 700 }}>
                                        Description
                                    </InputLabel>
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
            </Box>
        </Box>
    );
}

export default TransitionsModal;
