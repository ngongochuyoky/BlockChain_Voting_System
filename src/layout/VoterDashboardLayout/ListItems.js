import { Fragment, useState } from 'react';
import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import RecentActorsIcon from '@mui/icons-material/RecentActors';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import List from '@mui/material/List';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import ViewListIcon from '@mui/icons-material/ViewList';
import CreateIcon from '@mui/icons-material/Create';
import Collapse from '@mui/material/Collapse';
import PeopleIcon from '@mui/icons-material/People';
import { Link as RouteLink } from 'react-router-dom';
import config from '~/config';

function MainListItems() {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [openCandidate, setOpenCandidate] = useState(true);

    const handleClickCandidate = () => {
        setOpenCandidate(!openCandidate);
    };

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
                    <DashboardIcon sx={{color: '#fff'}}/>
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
                    <ViewListIcon sx={{color: '#fff'}}/>
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
                    <PeopleIcon sx={{color: '#fff'}}/>
                </ListItemIcon>
                <ListItemText primary="Voted" />
            </ListItemButton>
            
        </Fragment>
    );
}

export { MainListItems };
