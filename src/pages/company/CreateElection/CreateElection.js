import {
    CssBaseline,
    AppBar,
    Box,
    Container,
    Toolbar,
    Paper,
    Button,
    Typography,
    Grid,
    TextField,
    FormControlLabel,
    Checkbox,
} from '@mui/material';
import Cookies from 'js-cookie';
import { Fragment, useEffect, useState } from 'react';
import dapp from '~/component/Dapp';
import config from '~/config';
import { useNavigate } from 'react-router-dom';
import { SnackbarProvider, useSnackbar } from 'notistack';

function CreateElection() {
    const navigate = useNavigate();
    const [isDisable, setIsDisable] = useState(false);

    const { enqueueSnackbar } = useSnackbar();
    useEffect(() => {
        return () => {
            const componentUnMount = async () => {
                await dapp.connectWallet();
                const electionFactContract = dapp.getElectionFactContract();
                electionFactContract.off('CreateElection');
            }
            componentUnMount();
        }
    },[])

    const handleCreateElection = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        //Create Elction successfully
        const result = await dapp.createElection({
            electionName: formData.get('election-name'),
            electionDescription: formData.get('election-description'),
        });
        if (result) {
            setIsDisable(true);
            enqueueSnackbar('Blockchain is processing', {variant: 'info', anchorOrigin: { horizontal: 'right', vertical: 'top' }});
            const electionFactContract = dapp.getElectionFactContract();
            electionFactContract.on('CreateElection', (electionAddress) => {
                Cookies.set('election_address', electionAddress);                
                navigate(config.routes.companyDashboard);
            });
        } else {
            const message = dapp.getError();
            enqueueSnackbar(message, { variant: 'error', anchorOrigin: { horizontal: 'right', vertical: 'top' } });
        }
    };

    return (
        <Fragment>
            <CssBaseline />
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
                    <Typography variant="h6" color="inherit" noWrap>
                        Company name
                    </Typography>
                </Toolbar>
            </AppBar>
            <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
                <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                    <Typography component="h1" variant="h4" align="center">
                        Create Election
                    </Typography>
                    <Fragment>
                        <Box component="form" validate="true" onSubmit={handleCreateElection} sx={{ mt: 1 }}>
                            <Fragment>
                                <Grid container spacing={3}>
                                    <Grid item xs={12}>
                                        <TextField
                                            id="email"
                                            label="Email"
                                            defaultValue={Cookies.get('company_email')}
                                            disabled
                                            fullWidth
                                            variant="standard"
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            disabled={isDisable}
                                            id="election-name"
                                            name="election-name"
                                            label="Election Name"
                                            fullWidth
                                            variant="standard"
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            disabled={isDisable}
                                            id="election-description"
                                            name="election-description"
                                            label="Election Description"
                                            fullWidth
                                            autoComplete="shipping address-line2"
                                            variant="standard"
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <FormControlLabel
                                            control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
                                            label="Use this information to create a new Election"
                                        />
                                    </Grid>
                                </Grid>
                            </Fragment>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                <Button variant="contained" disabled={isDisable} type="submit" sx={{ mt: 3, ml: 1 }}>
                                    Create
                                </Button>
                            </Box>
                        </Box>
                    </Fragment>
                </Paper>
            </Container>
        </Fragment>
    );
}

export default function IntegrationNotistack() {
    return (
        <SnackbarProvider maxSnack={3}>
            <CreateElection />
        </SnackbarProvider>
    );
}
