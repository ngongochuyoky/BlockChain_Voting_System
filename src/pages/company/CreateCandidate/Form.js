import { useEffect, useMemo, useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Avatar from '@mui/material/Avatar';
import AvatarDefault from '~/assets/images/avatar_default.jpg';

import { Web3Storage } from 'web3.storage';
import ethers from '~/ethereum/ethers';

import useSnackMessages from '~/utils/hooks/useSnackMessages';
// import dayjs from 'dayjs';
import { Grid, Stack, InputLabel, Box, Button, Divider, TextField, Typography, Select, MenuItem } from '@mui/material';

const style = {
    bgcolor: 'background.paper',
    borderRadius: '10px',
    p: 4,
};

function TransitionsModal() {
    const [avatar, setAvatar] = useState(
        'https://bafybeigpzhpw3klgflpclub26kozd6jqlqbdoa5tpe7gl4abm5jr6gvx74.ipfs.w3s.link/avatar_default.jpg',
    );
    const [positionID, setPositionID] = useState('');
    const [positions, setPositions] = useState([]);
    const [buffer, setBuffer] = useState(null);
    const [value, setValue] = useState();
    const [files, setFiles] = useState('');
    const { showInfoSnackbar, showErrorSnackbar } = useSnackMessages();

    const client = useMemo(() => new Web3Storage({ token: process.env.REACT_APP_API_TOKEN }), []);

    useEffect(() => {
        const componentDidMount = async () => {
            //Get Positions
            try {
                await ethers.connectWallet();
                const contract = await ethers.getElectionContract();
                const positions = await contract.getPositions();
                setPositions(positions);
            } catch (err) {
                ethers.getError() && showErrorSnackbar(ethers.getError());
            }
        };
        componentDidMount();
    }, [showErrorSnackbar]);
    useEffect(() => {
        return () => {
            URL.revokeObjectURL(avatar);
        };
    }, [avatar]);

    const handleChangePosition = (event) => {
        setPositionID(event.target.value);
    };

    //Preview Avatar and File to Buffer
    const handlePreviewAvatar = async (e) => {
        const file = e.target.files[0];
        const avatarPreview = URL.createObjectURL(file);
        setAvatar(avatarPreview);
        setFiles(e.target.files);
    };

    // Create New Candidate
    const handleCreateNew = async (event) => {
        event.preventDefault();
        const dataForm = new FormData(event.currentTarget);

        let imgHash = avatar;
        if (files) {
            const rootCid = await client.put(files);
            imgHash = encodeURI(`https://${rootCid}.ipfs.w3s.link/${files[0].name}`);
            console.log(imgHash);
        }

        try {
            await ethers.connectWallet();
            const contract = ethers.getElectionContract();
            const bool = await contract.addCandidate(
                positionID,
                dataForm.get('candidate-name'),
                dataForm.get('date-of-birth'),
                dataForm.get('description'),
                imgHash,
                dataForm.get('email'),
            );
            bool && showInfoSnackbar('Blockchain is processing');
        } catch (error) {
            ethers.getError()
                ? showErrorSnackbar(ethers.getError())
                : showErrorSnackbar('New position creation failed!!!');
        }
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
                                        id="position-id"
                                        value={positionID}
                                        labelId="position-label"
                                        onChange={handleChangePosition}
                                    >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        {positions &&
                                            positions.map((position, index) => (
                                                <MenuItem value={index} key={index}>
                                                    {position}
                                                </MenuItem>
                                            ))}
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
