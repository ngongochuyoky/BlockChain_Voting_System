import { useState, useEffect } from 'react';
import { styled, ThemeProvider } from '@mui/material/styles';
import {
    CssBaseline,
    Drawer as MuiDrawer,
    Box,
    AppBar as MuiAppBar,
    Toolbar,
    List,
    Typography,
    Divider,
    Container,
    IconButton,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import config from '~/config';
import { MainListItems } from './ListItems';
import { PropTypes } from 'prop-types';
import { theme } from '~/utils/theme';
import { getVoterById } from '~/api/voter';
import AccountMenu from '~/layout/component/VoterAccountMenu';
import { AppBar, Drawer} from '~/layout/component/CustomStyle';

function DashboardLayout(props) {
    const [open, setOpen] = useState(true);
    const toggleDrawer = () => {
        setOpen(!open);
    };
    const navigate = useNavigate();
    const [accountName, setAccountName] = useState('Voter Name');

    useEffect(() => {
        const componentDidMount = async () => {
            const response = await getVoterById({ id: Cookies.get('voterId') });
            console.log(response);
            response?.data && setAccountName(response.data.full_name);
        };
        componentDidMount();
    }, []);

    const handleClickLogout = () => {
        Cookies.remove('voterId');
        Cookies.remove('voterToken');
        // Cookies.remove('voterElectionAddress');
        Cookies.remove('voterEmail');
        navigate(config.routes.home);
    };

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <Drawer variant="permanent" open={open}>
                    <Toolbar
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            px: [1],
                            mt: 4,
                        }}
                    >
                        <h2>Voter</h2>
                    </Toolbar>
                    <Box sx={{ px: 2 }}>
                        <Box
                            sx={{
                                alignItems: 'center',
                                backgroundColor: 'rgba(255, 255, 255, 0.04)',
                                cursor: 'pointer',
                                display: 'flex',
                                justifyContent: 'space-between',
                                px: 3,
                                py: '11px',
                                borderRadius: 1,
                            }}
                        >
                            <div>
                                <Typography color="inherit" variant="subtitle1">
                                    {accountName}
                                </Typography>
                                <Typography color="neutral.400" variant="body2">
                                    Email : {Cookies.get('voterEmail')}
                                </Typography>
                            </div>
                        </Box>
                    </Box>
                    <Divider
                        sx={{
                            borderColor: '#2D3748',
                            my: 3,
                        }}
                    />
                    <List component="nav">
                        <MainListItems />
                    </List>
                </Drawer>
                <AppBar position="absolute" open={open}>
                    <Toolbar
                        sx={{
                            pr: '24px', // keep right padding when drawer closed
                        }}
                    >
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            onClick={toggleDrawer}
                            sx={{
                                marginRight: '36px',
                                ...(open && { display: 'none' }),
                            }}
                        >
                            <MenuIcon color="primary" />
                        </IconButton>

                        <Box sx={{ flexGrow: 1 }} />

                        <AccountMenu accountName={accountName} handleClickLogout={handleClickLogout} />
                    </Toolbar>
                </AppBar>

                <Box
                    component="main"
                    sx={{
                        backgroundColor: (theme) =>
                            theme.palette.mode === 'light' ? theme.palette.background : theme.palette.grey[900],
                        flexGrow: 1,
                        height: '100vh',
                        overflow: 'auto',
                    }}
                >
                    <Toolbar />
                    <Container maxWidth="xl" sx={{ mt: 3, mb: 3 }}>
                        {props.children}
                    </Container>
                </Box>
            </Box>
        </ThemeProvider>
    );
}

DashboardLayout.propTypes = {
    children: PropTypes.node,
};

export default DashboardLayout;
