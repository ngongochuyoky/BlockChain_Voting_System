import {
    Avatar,
    Button,
    AppBar as MuiAppBar,
    Toolbar,
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
import { styled } from '@mui/material/styles';
import { useContext } from 'react';
import Cookies from 'js-cookie';
import { useNavigate, Link as RouteLink } from 'react-router-dom';
import { UpdateRoutes } from '~/App';
import { companyRegister } from '~/api/auth';
import config from '~/config';
import useSnackMessages from '~/utils/hooks/useSnackMessages';

const AppBar = styled(MuiAppBar)({
    backgroundColor: '#111827',
    boxShadow: 'rgb(34 51 84 / 20%) 0px 2px 8px -3px, rgb(34 51 84 / 10%) 0px 5px 22px -4px',
});
function RegisterSide() {
    const navigate = useNavigate();
    const updateRoutes = useContext(UpdateRoutes);
    const snackMessages = useSnackMessages();

    async function handleRegister(event) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        if (formData.get('password') !== formData.get('confirm-password')) {
            snackMessages.showErrorSnackbar('Password does not match!!!');
        } else {
            const response = await companyRegister(
                formData.get('email'),
                formData.get('password'),
                formData.get('company-name'),
            );
            if (response?.data) {
                Cookies.set('companyToken', response.data.token);
                Cookies.set('companyEmail', response.data.email);
                Cookies.set('companyId', response.data.id);
                updateRoutes();
                navigate(config.routes.createElection);
            } else snackMessages.showErrorSnackbar('Account creation failed');
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
                        Register
                    </Typography>
                    <Box component="form" validate="true" onSubmit={handleRegister} sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="company-name"
                            label="Company Name"
                            name="company-name"
                            autoComplete="off"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
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
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="confirm-password"
                            label="Confirm Password"
                            type="password"
                            id="confirm-password"
                            autoComplete="current-password"
                        />
                        <FormControlLabel
                            control={<Checkbox value="agree" color="primary" />}
                            label="I have read the Terms and Conditions"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2, p: '10px', borderRadius: 2 }}
                        >
                            Register
                        </Button>
                        <Grid container>
                            <Grid item>
                                <Link component={RouteLink} to="/company_login" variant="body2">
                                    {'Have an account'}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Grid>
        </Grid>
    );
}

export default RegisterSide;
