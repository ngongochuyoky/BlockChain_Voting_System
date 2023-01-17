import {
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
import imageLogin from '~/assets/images/photo1.jpg';
import { useContext } from 'react';
import Cookies from 'js-cookie';
import { useNavigate, Link as RouteLink } from 'react-router-dom';
import config from '~/config';
import { UpdateRoutes } from '~/App';
import useSnackMessages from '~/utils/hooks/useSnackMessages';
import { voterLogin } from '~/api/auth';
import { ButtonFullWidth } from '~/layout/component/CustomStyle';


export const isRequired = () => {
    throw new Error('params is required');
};

function LoginSide() {
    const navigate = useNavigate();
    const updateRoutes = useContext(UpdateRoutes);
    const { showErrorSnackbar } = useSnackMessages();

    async function handleLogin(event) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const response = await voterLogin({ email: formData.get('email'), password: formData.get('password') });
        if (response?.data) {
            console.log(response.data);
            Cookies.set('voterToken', response.data.token);
            Cookies.set('voterEmail', response.data.email);
            Cookies.set('voterId', response.data.id);
            updateRoutes();
            navigate(config.routes.voterElectionList);
        } else {
            response?.message ? showErrorSnackbar(response.message) : showErrorSnackbar('Login failed !!!');
        }
    }

    return (
        <Grid container component="main" sx={{ height: '85vh' }}>
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
                    
                    <Typography variant="h4" color="primary.main" sx={{ fontWeight: 900, mt: 3, mb: 3 }}>
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
                        <ButtonFullWidth type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2, p: '10px' }}>
                            Login
                        </ButtonFullWidth>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#"  underline='hover' variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link component={RouteLink} underline='hover' to="/voter_register" variant="body2">
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
