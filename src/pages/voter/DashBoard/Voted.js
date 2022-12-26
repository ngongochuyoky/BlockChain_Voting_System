import { Avatar, Card, CardContent, Grid, Typography } from '@mui/material';
import MoneyIcon from '@mui/icons-material/Money';
import PropTypes from 'prop-types';

function Voted(props) {
    return (
        <Card sx={{ height: '100%' }}>
            <CardContent>
                <Grid container spacing={5} sx={{  alignItems: 'center', }}>
                <Grid item sx={{ml:3}}>
                        <Avatar
                        variant="rounded"
                            sx={{
                                background: 'rgb(87, 202, 34)',
                                boxShadow: 'rgb(68 214 0 / 25%) 0px 1px 4px, rgb(68 214 0 / 35%) 0px 3px 12px 2px',
                                height: 70,
                                width: 70,

                            }}
                        >
                            <MoneyIcon />
                        </Avatar>
                    </Grid>
                    <Grid item>
                        <Typography color="textPrimary" variant="h4">
                           {props.voted}
                        </Typography>
                    </Grid>
                   
                </Grid>
                <Grid container sx={{ml:3, mt: 2}}>
                    <Grid item>
                        <Typography color="textPrimary" variant="h5">
                            Voted
                        </Typography>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
}

Voted.propTypes = {
    voted: PropTypes.number.isRequired,
}

export default Voted;
