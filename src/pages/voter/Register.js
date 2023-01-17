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
import { UpdateRoutes } from '~/App';
import { voterRegister } from '~/api/auth';
import config from '~/config';
import useSnackMessages from '~/utils/hooks/useSnackMessages';
import { ButtonFullWidth } from '~/layout/component/CustomStyle';
 
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
            const response = await voterRegister({
                email: formData.get('email'),
                password: formData.get('password'),
                fullName: formData.get('voter-name'),
            });
            if (response?.data) {
                Cookies.set('voterToken', response.data.token);
                Cookies.set('voterEmail', response.data.email);
                Cookies.set('voterId', response.data.id);
                updateRoutes();
                navigate(config.routes.voterElectionList);
            } else snackMessages.showErrorSnackbar('Account creation failed');
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
                        my: 4,
                        mx: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                     <Typography variant="h4" color='primary.main' sx={{fontWeight: 900, mt: 3}}>
                        Register
                    </Typography>
                    <Box component="form" validate="true" onSubmit={handleRegister} sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="voter-name"
                            label="Voter Name"
                            name="voter-name"
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
                        <ButtonFullWidth type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2, p: '10px' }}>
                            Register
                        </ButtonFullWidth>
                        <Grid container>
                            <Grid item>
                                <Link component={RouteLink} underline='hover' to="/voter_login" variant="body2">
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
