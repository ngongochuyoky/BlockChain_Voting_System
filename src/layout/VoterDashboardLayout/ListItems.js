import { Fragment, useState } from 'react';
import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ViewListIcon from '@mui/icons-material/ViewList';
import PeopleIcon from '@mui/icons-material/People';
import { Link as RouteLink } from 'react-router-dom';
import config from '~/config';

function MainListItems() {
    const [selectedIndex, setSelectedIndex] = useState(0);

    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
    };

    return (
        <Fragment>
            <ListItemButton
                to={config.routes.voterDashboard}
                component={RouteLink}
                selected={selectedIndex === 0}
                onClick={(event) => handleListItemClick(event, 0)}
            >
                <ListItemIcon>
                    <DashboardIcon sx={{ color: '#fff' }} />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
            </ListItemButton>

            <ListItemButton
                to={config.routes.voterCandidateList}
                component={RouteLink}
                selected={selectedIndex === 1}
                onClick={(event) => handleListItemClick(event, 1)}
            >
                <ListItemIcon>
                    <ViewListIcon sx={{ color: '#fff' }} />
                </ListItemIcon>
                <ListItemText primary="Candidate List" />
            </ListItemButton>
            <ListItemButton
                to={config.routes.voted}
                component={RouteLink}
                selected={selectedIndex === 4}
                onClick={(event) => handleListItemClick(event, 4)}
            >
                <ListItemIcon>
                    <PeopleIcon sx={{ color: '#fff' }} />
                </ListItemIcon>
                <ListItemText primary="Voted" />
            </ListItemButton>
        </Fragment>
    );
}

export { MainListItems };
