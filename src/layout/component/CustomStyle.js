import { styled } from '@mui/material/styles';
import {
    Drawer as MuiDrawer,
    AppBar as MuiAppBar,
    Button as MuiButton,
   
} from '@mui/material';

const drawerWidth = 260;

//Appbar for Dashboard
export const AppBar = styled(MuiAppBar, { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    backgroundColor: theme.palette.neutral[900],

    boxShadow: theme.shadows[2],
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));


//Drawer for Dashboard
export const Drawer = styled(MuiDrawer)(({ theme }) => ({
    '& .MuiDrawer-paper': {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,

        boxSizing: 'border-box',
        backgroundColor: theme.palette.neutral[900],
        color: '#FFFFFF',
    },
}));

//App Bar full width 
export const AppBarFullWidth = styled(MuiAppBar)(({ theme }) => ({
    backgroundColor: theme.palette.neutral[900],
    boxShadow: theme.shadows[2],
}));

//Button full width
export const ButtonFullWidth = styled(MuiButton)(({ theme }) => ({
    borderRadius: 10,
    width: '100%',
    padding: 10,
    fontSize: '1rem'
}));
