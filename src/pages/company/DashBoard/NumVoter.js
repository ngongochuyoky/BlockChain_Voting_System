import { Avatar, Card, CardContent, Grid, Typography } from '@mui/material';
import PeopleIcon from '@mui/icons-material/PeopleOutlined';
import PropTypes from 'prop-types';

function NumVoter(props) {
    return (
        <Card sx={{ height: '100%' }}>
            <CardContent>
                <Grid container spacing={5} sx={{ alignItems: 'center' }}>
                    <Grid item sx={{ ml: 3 }}>
                        <Avatar
                            variant="rounded"
                            sx={{
                                background: 'rgb(255, 163, 25)',
                                boxShadow: 'rgb(255 163 25 / 25%) 0px 1px 4px, rgb(255 163 25 / 35%) 0px 3px 12px 2px',
                                height: 70,
                                width: 70,
                            }}
                        >
                            <PeopleIcon />
                        </Avatar>
                    </Grid>
                    <Grid item>
                        <Typography color="textPrimary" variant="h4">
                            {props.numVoter}
                        </Typography>
                    </Grid>
                </Grid>
                <Grid container sx={{ ml: 3, mt: 2 }}>
                    <Grid item>
                        <Typography color="textPrimary" variant="h5">
                            Voters
                        </Typography>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
}
NumVoter.propTypes = {
    numVoter: PropTypes.number.isRequired,
};
export default NumVoter;
