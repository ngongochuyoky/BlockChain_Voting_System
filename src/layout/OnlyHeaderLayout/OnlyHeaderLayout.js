import { ThemeProvider } from '@mui/material/styles';
import {
    CssBaseline,
    Box,
    Toolbar,
    Container,
    Link
} from '@mui/material';
import { PropTypes } from 'prop-types';
import { theme } from '~/utils/theme';
import {  Link as RouteLink } from 'react-router-dom';
import config from '~/config';
import {AppBarFullWidth} from '~/layout/component/CustomStyle'


function DashboardLayout(props) {
   
    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBarFullWidth position="absolute">
                    <Toolbar
                        sx={{
                            pr: '24px', // keep right padding when drawer closed
                        }}
                    >
                       
                       <Link
                            component={RouteLink}
                            underline="none"
                            color="#fff"
                            sx={{ fontSize: '1.25rem', ml: 4 }}
                            to={config.routes.home}
                        >
                            Home
                        </Link>
                        <Box sx={{ flexGrow: 1 }} />
                        
                    </Toolbar>
                </AppBarFullWidth>

                <Box
                    component="main"
                    sx={{
                        flexGrow: 1,
                        height: '100vh',
                        overflow: 'auto',
                    }}
                >
                    <Toolbar />
                    <Container maxWidth="xl" sx={{ mt: 3, mb: 3 }}>
                        {props.children}
                    </Container>
                </Box>
            </Box>
        </ThemeProvider>
    );
}

DashboardLayout.propTypes = {
    children: PropTypes.node,
};

export default DashboardLayout;
