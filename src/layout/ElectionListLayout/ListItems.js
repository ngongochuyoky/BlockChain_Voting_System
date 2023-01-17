import { Fragment, useState } from 'react';
import { ListItemButton, ListItemIcon as MuiListItemIcon, ListItemText } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { Link as RouteLink } from 'react-router-dom';
import {styled} from '@mui/material/styles';
import config from '~/config';

const ListItemIcon = styled(MuiListItemIcon)(({theme}) => ({
    color: '#fff'
}))

function MainListItems() {
    const [selectedIndex, setSelectedIndex] = useState(0);

    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
    };

    return (
        <Fragment>
            <ListItemButton
                to={config.routes.voterElectionList}
                component={RouteLink}
                selected={selectedIndex === 0}
                onClick={(event) => handleListItemClick(event, 0)}
            >
                <ListItemIcon>
                    <DashboardIcon sx={{ color: '#fff' }} />
                </ListItemIcon>
                <ListItemText primary="Election List" />
            </ListItemButton>
        </Fragment>
    );
}

export { MainListItems };
