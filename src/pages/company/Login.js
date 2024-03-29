import { TextField, FormControlLabel, Checkbox, Link, Paper, Box, Grid, Typography } from '@mui/material';
import imageLogin from '~/assets/images/photo1.jpg';
import { useContext } from 'react';
import Cookies from 'js-cookie';
import { useNavigate, Link as RouteLink } from 'react-router-dom';
import ethers from '~/ethereum/ethers';
import config from '~/config';
import useSnackMessages from '~/utils/hooks/useSnackMessages';
import { companyLogin } from '~/api/auth';
import { UpdateRoutes } from '~/App';
import { ButtonFullWidth } from '~/layout/component/CustomStyle';

function LoginSide() {
    const navigate = useNavigate();
    const updateRoutes = useContext(UpdateRoutes);
    const { showErrorSnackbar } = useSnackMessages();

    const handleLogin = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const response = await companyLogin({ email: formData.get('email'), password: formData.get('password') });
        if (response?.data) {
            Cookies.set('companyToken', response.data.token);
            Cookies.set('companyEmail', response.data.email);
            Cookies.set('companyId', response.data.id);
            updateRoutes();
            handleNavigate();
        } else showErrorSnackbar('Login Failed !!!');
    };

    const handleNavigate = async () => {
        try {
            await ethers.connectWallet();
            const contract = ethers.getElectionFactContract();
            const summary = await contract.getDeployedElection(Cookies.get('companyId'));
            if (summary[2] === 'Create an election') {
                navigate(config.routes.createElection);
            } else {
                Cookies.set('companyElectionAddress', summary[0]);
                navigate(config.routes.companyDashboard);
            }
        } catch (err) {
            showErrorSnackbar(ethers.getError());
        }
    };

    return (
        <Grid container component="main" sx={{ height: '85vh' }}>
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
            ></Grid>

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
                        <Grid container sx={{ mt: 2 }}>
                            <Grid item xs>
                                <Link href="#" variant="body2" underline="hover">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link component={RouteLink} to="/company_register" variant="body2" underline="hover">
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
