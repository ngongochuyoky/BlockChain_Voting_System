import { Box, Container, Paper, Button, Typography, Grid, TextField, FormControlLabel, Checkbox } from '@mui/material';
import Cookies from 'js-cookie';
import { Fragment, useEffect, useState } from 'react';
import ethers from '~/ethereum/ethers';
import config from '~/config';
import { useNavigate } from 'react-router-dom';
import useSnackMessages from '~/utils/hooks/useSnackMessages';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { createElection, searchElection } from '~/api/election';
import { ButtonFullWidth } from '~/layout/component/CustomStyle';

function CreateElection() {
    const navigate = useNavigate();
    const [success, setSuccess] = useState(false);
    const [isDisable, setIsDisable] = useState(false);
    const { showErrorSnackbar, showInfoSnackbar, showSuccessSnackbar } = useSnackMessages();

    useEffect(() => {
        const componentDidMount = async () => {
            const response = await searchElection({
                companyId: Cookies.get('companyId'),
                token: Cookies.get('companyToken'),
            });
            response.data && navigate(config.routes.companyDashboard);
        };
        componentDidMount();
    }, [navigate]);
    const handleCreateElection = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        //Create Elction
        try {
            await ethers.connectWallet();
            const contract = ethers.getElectionFactContract();
            const bool = await contract.createElection(
                Cookies.get('companyId'),
                formData.get('election-name'),
                formData.get('election-description'),
            );
            if (bool) {
                setIsDisable(true);
                showInfoSnackbar('Blockchain is processing');
                createElectionListerner();
            }
        } catch (err) {
            ethers.getError() ? showErrorSnackbar(ethers.getError()) : showErrorSnackbar('Create election failed');
            setIsDisable(false);
        }
    };
    const createElectionListerner = () => {
        const electionFactContract = ethers.getElectionFactContract();
        electionFactContract.on('CreateElection', (electionAddress) => {
            Cookies.set('companyElectionAddress', electionAddress);
            setSuccess(true);
            showSuccessSnackbar('Successfully created a new election');
        });
    };

    const handleClick = async () => {
        const response = await createElection();
        response.data && navigate(config.routes.companyDashboard);
    };

    return (
        <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
            <Paper sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 4 } }}>
                <Typography variant="h4" color="primary" sx={{ fontWeight: 500, mt: 2 }}>
                    Create Election
                </Typography>
                <Box component="form" validate="true" onSubmit={handleCreateElection} sx={{ mt: 3 }}>
                    <Fragment>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <TextField
                                    id="email"
                                    label="Email"
                                    defaultValue={Cookies.get('companyEmail')}
                                    disabled
                                    fullWidth
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

                    <ButtonFullWidth
                        variant="contained"
                        width="100%"
                        disabled={isDisable}
                        type="submit"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Create
                    </ButtonFullWidth>
                </Box>
            </Paper>
            {success && (
                <Box align="right">
                    <Button variant="contained" endIcon={<ArrowForwardIcon />} onClick={handleClick}>
                        DashBoard
                    </Button>
                </Box>
            )}
        </Container>
    );
}

export default CreateElection;
