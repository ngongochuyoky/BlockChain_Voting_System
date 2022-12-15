import {
    Avatar,
    Button,
    CssBaseline,
    TextField,
    FormControlLabel,
    Checkbox,
    Link,
    Paper,
    Box,
    Grid,
    Typography,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import imageLogin from '~/assets/images/photo1.jpg';
import { useContext } from 'react';
import Cookies from 'js-cookie';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import dapp from '~/component/Dapp';
import config from '~/config';
import { SnackbarProvider, useSnackbar } from 'notistack';
import {UpdateRoutes} from '~/App';

function LoginSide() {
    const navigate = useNavigate();
    const updateRoutes = useContext(UpdateRoutes);

    const { enqueueSnackbar } = useSnackbar();

    const handleLogin = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const response = await fetch('http://localhost:3001/company/login', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: formData.get('email'),
                password: formData.get('password'),
            }),
        });
        const responseObject = await response.json();
        if (responseObject.data === null)
            enqueueSnackbar(responseObject.message, {
                variant: 'error',
                anchorOrigin: { horizontal: 'right', vertical: 'top' },
            });
        else {
            Cookies.set('company_token', responseObject.data.token);
            Cookies.set('company_email', responseObject.data.email);
            updateRoutes();
            handleNavigate();
        }
    };

    const handleNavigate = async () => {
        await dapp.connectWallet();
        const summary = await dapp.getDeployedElection();
        if (summary) {
            if (summary[2] === 'Create an election') {
                navigate(config.routes.createElection);
            } else {
                Cookies.set('election_address', summary[0]);
                navigate(config.routes.companyDashboard);
            }
        } else {
            enqueueSnackbar(dapp.getError(), {
                variant: 'error',
                anchorOrigin: { horizontal: 'right', vertical: 'top' },
            });
        }
    };

    return (
        <Grid container component="main" sx={{ height: '100vh' }}>
            <CssBaseline />
            <Grid
                item
                xs={false}
                sm={4}
                md={7}
                sx={{
                    backgroundImage: `url(${imageLogin})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundColor: (t) => (t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900]),
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            />

            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <Box
                    sx={{
                        my: 8,
                        mx: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Log In
                    </Typography>
                    <Box component="form" validate="true" onSubmit={handleLogin} sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" />
                        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                            Login
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link component={RouterLink} to="/company_register" variant="body2">
                                    {"Don't have an account? Register"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Grid>
        </Grid>
    );
}

export default function IntegrationNotistack() {
    return (
        <SnackbarProvider maxSnack={3}>
            <LoginSide />
        </SnackbarProvider>
    );
}
