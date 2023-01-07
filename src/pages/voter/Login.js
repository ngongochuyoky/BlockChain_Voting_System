import {
    Avatar,
    Button,
    CssBaseline,
    AppBar as MuiAppBar,
    TextField,
    FormControlLabel,
    Checkbox,
    Link,
    Paper,
    Toolbar,
    Box,
    Grid,
    Typography,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { styled } from '@mui/material/styles';
import imageLogin from '~/assets/images/photo1.jpg';
import { useContext } from 'react';
import Cookies from 'js-cookie';
import { useNavigate, Link as RouteLink } from 'react-router-dom';
import config from '~/config';
import { UpdateRoutes } from '~/App';
import useSnackMessages from '~/utils/hooks/useSnackMessages';
import { login } from '~/api/voter';

export const isRequired = () => {
    throw new Error('params is required');
};
const AppBar = styled(MuiAppBar)({
    backgroundColor: '#111827',
    boxShadow: 'rgb(34 51 84 / 20%) 0px 2px 8px -3px, rgb(34 51 84 / 10%) 0px 5px 22px -4px',
});
function LoginSide() {
    const navigate = useNavigate();
    const updateRoutes = useContext(UpdateRoutes);
    const { showErrorSnackbar } = useSnackMessages();

    async function handleLogin(event) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const response = await login({ email: formData.get('email'), password: formData.get('password') });
        if (response?.data) {
            Cookies.set('voterToken', response.data.token);
            Cookies.set('voterEmail', response.data.email);
            Cookies.set('electionAddress', response.data.electionAddress);
            Cookies.set('voterId', response.data.id);
            updateRoutes();
            navigate(config.routes.voterDashboard);
        } else {
            response?.message ? showErrorSnackbar(response.message) : showErrorSnackbar('Login failed !!!');
        }
    }

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
            >
                <AppBar
                    position="absolute"
                    color="default"
                    elevation={0}
                    sx={{
                        position: 'relative',
                        borderBottom: (t) => `1px solid ${t.palette.divider}`,
                    }}
                >
                    <Toolbar>
                        <Link
                            component={RouteLink}
                            underline="none"
                            color="#fff"
                            sx={{ fontSize: '25px', ml: 4 }}
                            to={config.routes.home}
                        >
                            Home
                        </Link>
                    </Toolbar>
                </AppBar>
            </Grid>

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
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2, p: '10px', borderRadius: 2 }}
                        >
                            Log In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="#" variant="body2">
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

export default LoginSide;
