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
import { UpdateRoutes } from '~/App';
import { SnackbarProvider, useSnackbar } from 'notistack';

function RegisterSide() {
    const navigate = useNavigate();
    const updateRoutes = useContext(UpdateRoutes);
    const { enqueueSnackbar } = useSnackbar();

    async function handleRegister(event) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        console.log(formData.get('company-name'));
        if (formData.get('password') !== formData.get('confirm-password')) {
            enqueueSnackbar('Password does not match!!!', {
                variant: 'error',
                anchorOrigin: { horizontal: 'right', vertical: 'top' },
            });
        }
        const response = await fetch('http://localhost:3001/company/register', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: formData.get('email'),
                password: formData.get('password'),
                company_name: formData.get('company-name'),
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
            updateRoutes();
            navigate('/election_administration/company');
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
                        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                            Register
                        </Button>
                        <Grid container>
                            <Grid item>
                                <Link component={RouterLink} to="/company_login" variant="body2">
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

export default function IntegrationNotistack() {
    return (
      <SnackbarProvider maxSnack={3} >
        <RegisterSide />
      </SnackbarProvider>
    );
}