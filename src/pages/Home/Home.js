import { Link } from 'react-router-dom';
import { Button as MuiButton, Stack, Box, Grid, CssBaseline, Typography } from '@mui/material';
import electionBackground from '~/assets/images/ElectionBackground.jpg';
import { styled } from '@mui/material/styles';

const styles = {
    paperContainer: {
        height: '100vh',
        backgroundRepeat: 'no-repeat',
        backgroundImage: `url(${electionBackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
};

const Button = styled(MuiButton)(({ theme }) => ({
    width: '120px',
    backgroundColor: theme.palette.warning.main,
    '&:hover': {
        backgroundColor: theme.palette.warning.dark,
        borderColor: '#0062cc',
        boxShadow: 'none',
    },
}));
function Home() {
    return (
        <Box style={styles.paperContainer}>
            <CssBaseline />
            <Grid container direction="column" alignItems="center" height="100%">
                <Grid item sx={{mt: '10%'}}>
                    <Typography variant="h2" sx={{ color: 'rgb(87, 202, 34)', fontWeight: 900 }}>
                        Let's Vote
                    </Typography>
                </Grid>
                <Grid item sx={{mb: 10}}>
                    <Typography variant="h4" sx={{ color: '#fff', fontWeight: 600 }}>
                        Be a part of decision
                    </Typography>
                </Grid>
                <Grid item>
                    <Stack direction="row" spacing={4}>
                        <Button component={Link} variant="contained" to="/voter_login">
                            Voter
                        </Button>
                        <Button component={Link} variant="contained" to="/company_login">
                            Company
                        </Button>
                    </Stack>
                </Grid>
            </Grid>
        </Box>
    );
}

export default Home;
