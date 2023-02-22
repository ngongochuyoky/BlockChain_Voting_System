import {
    Grid,
    Paper,
    Divider,
    Typography,
    Box,
    Avatar as MuiAvatar,
    Stack,
    MenuItem as MuiMenuItem,
    MenuList,
    ListItemIcon,
    ListItemText,
    TextField,
    InputLabel,
    Button,
    ListItem,
} from '@mui/material';
import Cookies from 'js-cookie';
import { styled } from '@mui/material/styles';
import AvatarDefault from '~/assets/images/avatar_default_setting.jpg';
import PersonIcon from '@mui/icons-material/Person';
import SecurityIcon from '@mui/icons-material/Security';
import LogoutIcon from '@mui/icons-material/Logout';
import config from '~/config';
import { generateKey, getHashSignature } from '~/api/key';
import { useNavigate } from 'react-router-dom';
import { getCompanyById } from '~/api/company';
import { searchElection } from '~/api/election';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Fragment, useEffect, useState } from 'react';

import useSnackMessages from '~/utils/hooks/useSnackMessages';

const Avatar = styled(MuiAvatar)(({ theme }) => ({
    boxShadow: 'rgb(87, 202, 34) 0px 0px 0px 3px',
    border: '3px solid rgb(255, 255, 255)',
}));

const MenuItem = styled(MuiMenuItem)(({ theme }) => ({
    padding: 16,
    '&.Mui-selected, &.Mui-selected:hover': {
        backgroundColor: 'rgba(85, 105, 255, 0.1)',
    },
    '&:hover': {
        backgroundColor: 'rgba(85, 105, 255, 0.1)',
    },
}));

function AccountSetting() {
    const navigate = useNavigate();
    const [tab, setTab] = useState(1);
    const [company, setCompany] = useState({});
    const [hashSignature, setHashSignature] = useState(null);

    const { showSuccessSnackbar } = useSnackMessages();
    const [key, setKey] = useState(null);
    useEffect(() => {
        const componentDidMount = async () => {
            //Lấy dữ liệu company
            const response = await getCompanyById({
                id: Cookies.get('companyId'),
            });

            //lấy dữ liệu election
            const election = await searchElection({
                companyId: Cookies.get('companyId'),
                token: Cookies.get('companyToken'),
            });
            const company = {
                id: response.data._id,
                name: response.data.company_name,
                email: response.data.email,
                electionAddress: election.data.election_address,
            };
            setCompany(company);

            //Kiểm tra xem đã tạo key chưa
            const responseCheck = await getHashSignature();
            console.log(responseCheck);
            responseCheck && setHashSignature(responseCheck);
        };
        componentDidMount();
    }, []);

    const handleClick = (event, index) => {
        setTab(index);
    };

    const handleClickLogout = () => {
        Cookies.remove('companyId');
        Cookies.remove('companyToken');
        Cookies.remove('companyElectionAddress');
        Cookies.remove('companyEmail');
        Cookies.remove('electionAddress');
        navigate(config.routes.home);
    };

    const handleCreateNew = () => {};
    const handleGenerateKey = async () => {
        const response = await generateKey();
        if (response.data) {
            setKey(response.data.privateKey);
            showSuccessSnackbar('Successful key generation!!!');
        }
    };

    return (
        <Fragment>
            <Grid container spacing={4}>
                <Grid item xs={4}>
                    <Paper sx={{ display: 'flex', mb: 2 }}>
                        <Stack>
                            <Stack justifyContent="center" alignItems="center" sx={{ mt: 5 }}>
                                <Avatar alt="Avatar" sx={{ width: '55%', height: 'auto' }} src={AvatarDefault} />
                                <Typography variant="h5" sx={{ mt: 2 }}>
                                    Admin
                                </Typography>
                                <Typography>{company.name}</Typography>
                            </Stack>
                            <Stack>
                                <MenuList sx={{ mt: 4 }}>
                                    <MenuItem selected={tab === 1} onClick={(event) => handleClick(event, 1)}>
                                        <ListItemIcon>
                                            <PersonIcon />
                                        </ListItemIcon>
                                        <ListItemText>My profile</ListItemText>
                                    </MenuItem>
                                    <MenuItem selected={tab === 2} onClick={(event) => handleClick(event, 2)}>
                                        <ListItemIcon>
                                            <SecurityIcon />
                                        </ListItemIcon>
                                        <ListItemText>Digital signatures</ListItemText>
                                    </MenuItem>
                                    <Divider />
                                    <MenuItem onClick={handleClickLogout}>
                                        <ListItemIcon>
                                            <LogoutIcon />
                                        </ListItemIcon>
                                        <ListItemText>Logout</ListItemText>
                                    </MenuItem>
                                </MenuList>
                            </Stack>
                        </Stack>
                    </Paper>
                </Grid>
                <Grid item xs={8}>
                    <Box hidden={tab !== 1}>
                        <Paper sx={{ display: 'flex', mb: 2, p: '36px' }}>
                            <Grid container>
                                <Grid item xs={12}>
                                    <Typography align="center" color="rgb(85, 105, 255)" variant="h5">
                                        Profile Infomation
                                    </Typography>
                                </Grid>
                                {Object.keys(company).length && (
                                    <Grid item xs={12} sx={{ mt: 6, mb: 6 }}>
                                        <Box
                                            component="form"
                                            onSubmit={handleCreateNew}
                                            validate="true"
                                            autoComplete="off"
                                        >
                                            <Stack>
                                                <Box>
                                                    <Grid container spacing={5}>
                                                        {/* Input User ID */}
                                                        <Grid item xs={6}>
                                                            <InputLabel
                                                                htmlFor="candidate-name"
                                                                sx={{ fontWeight: 700, mb: 1 }}
                                                            >
                                                                User ID
                                                            </InputLabel>
                                                            <TextField
                                                                required
                                                                fullWidth
                                                                disabled
                                                                value={company.id}
                                                                id="user-name"
                                                                name="user-name"
                                                                placeholder="Alex Z"
                                                            />
                                                        </Grid>

                                                        {/* Input Email */}

                                                        <Grid item xs={6}>
                                                            <InputLabel htmlFor="email" sx={{ fontWeight: 700, mb: 1 }}>
                                                                Email
                                                            </InputLabel>
                                                            <TextField
                                                                disabled
                                                                required
                                                                fullWidth
                                                                id="email"
                                                                value={company.email}
                                                                name="email"
                                                                placeholder="abc@gmail.com"
                                                            />
                                                        </Grid>
                                                        {/* Input Company Name */}
                                                        <Grid item xs={6}>
                                                            <InputLabel htmlFor="email" sx={{ fontWeight: 700, mb: 1 }}>
                                                                Company Name
                                                            </InputLabel>
                                                            <TextField
                                                                disabled
                                                                required
                                                                fullWidth
                                                                value={company.name}
                                                                id="name"
                                                                name="name"
                                                                placeholder="company name"
                                                            />
                                                        </Grid>
                                                        {/* Input Election Address */}
                                                        <Grid item xs={6}>
                                                            <InputLabel htmlFor="email" sx={{ fontWeight: 700, mb: 1 }}>
                                                                Election Address
                                                            </InputLabel>
                                                            <TextField
                                                                disabled
                                                                required
                                                                fullWidth
                                                                value={company.electionAddress}
                                                                id="election-address"
                                                                name="election-address"
                                                                placeholder="123445"
                                                            />
                                                        </Grid>
                                                    </Grid>
                                                </Box>
                                            </Stack>
                                        </Box>
                                    </Grid>
                                )}
                            </Grid>
                        </Paper>
                    </Box>
                    <Box hidden={tab !== 2}>
                        <Paper sx={{ display: 'flex', mb: 2, p: '36px' }}>
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <Stack
                                        direction="row"
                                        justifyContent="space-between"
                                        alignItems="center"
                                        spacing={2}
                                    >
                                        <Typography color="rgb(85, 105, 255)" variant="h5">
                                            Digital signatures
                                        </Typography>
                                        <Button
                                            variant="contained"
                                            onClick={handleGenerateKey}
                                            startIcon={<AddCircleIcon />}
                                            disabled={hashSignature ? true : false}
                                        >
                                            Generate Key
                                        </Button>
                                    </Stack>
                                </Grid>
                                <Grid item xs={12}>
                                    <ListItem
                                        sx={{
                                            border: '1px solid rgb(255, 163, 25)',
                                            borderRadius: '5px',
                                            height: '76px',
                                            p: 0,
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                backgroundColor: 'rgb(255, 163, 25)',
                                                width: '35px',
                                                height: '100%',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                            }}
                                        >
                                            <PriorityHighIcon sx={{ color: '#fff' }} />
                                        </Box>
                                        <Box
                                            sx={{
                                                backgroundColor: 'rgba(255, 163, 25, 0.4)',
                                                flexGrow: 1,
                                                height: '100%',
                                                display: 'flex',
                                                alignItems: 'center',
                                                pl: 5,
                                            }}
                                        >
                                            <Typography>
                                                The code is generated only once. Please do not share this code with
                                                anyone.
                                            </Typography>
                                        </Box>
                                    </ListItem>
                                </Grid>

                                <Grid item xs={12}>
                                    <Typography variant="h6" sx={{ ml: 1, mb: 1 }} color="rgb(255, 25, 67)">
                                        Key
                                    </Typography>
                                    <Box
                                        sx={{
                                            border: '2px solid rgba(34, 51, 84, 0.1)',
                                            borderRadius: '5px',
                                            backgroundColor: 'rgba(34, 51, 84, 0.1)',
                                            display: 'flex',
                                            minHeight: '45px',
                                            alignItems: 'center',
                                            pl: 5,
                                        }}
                                    >
                                        <Typography>{key}</Typography>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Box>
                </Grid>
            </Grid>
        </Fragment>
    );
}

export default AccountSetting;
