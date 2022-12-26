import { Avatar, Card, CardContent, Grid, Typography } from '@mui/material';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import PropTypes from 'prop-types';

function NumCandidate(props) {
    return (
        <Card sx={{ height: '100%' }}>
            <CardContent>
                <Grid container spacing={5} sx={{ alignItems: 'center' }}>
                    <Grid item sx={{ ml: 3 }}>
                        <Avatar
                            variant="rounded"
                            sx={{
                                background: 'rgb(85, 105, 255)',
                                boxShadow: 'rgb(85 105 255 / 25%) 0px 1px 4px, rgb(85 105 255 / 35%) 0px 3px 12px 2px',
                                height: 70,
                                width: 70,
                            }}
                        >
                            <HowToRegIcon />
                        </Avatar>
                    </Grid>
                    <Grid item>
                        <Typography color="textPrimary" variant="h4">
                            {props.numCandidate}
                        </Typography>
                    </Grid>
                </Grid>
                <Grid container sx={{ ml: 3, mt: 2 }}>
                    <Grid item>
                        <Typography color="textPrimary" variant="h5">
                            Candidates
                        </Typography>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
}
NumCandidate.propTypes = {
    numCandidate: PropTypes.number.isRequired,
};

export default NumCandidate;
