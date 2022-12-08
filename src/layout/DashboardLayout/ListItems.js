import { Fragment, useState } from 'react';
import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import RecentActorsIcon from '@mui/icons-material/RecentActors';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import List from '@mui/material/List';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import CreateIcon from '@mui/icons-material/Create';
import Collapse from '@mui/material/Collapse';
import PeopleIcon from '@mui/icons-material/People';
import { Link as RouteLink } from 'react-router-dom';
import config from '~/config';

function MainListItems() {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [open, setOpen] = useState(true);

    const handleClick = () => {
        setOpen(!open);
    };
    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
    };

    return (
        <Fragment>
            <ListItemButton
                to={config.routes.companyDashboard}
                component={RouteLink}
                selected={selectedIndex === 0}
                onClick={(event) => handleListItemClick(event, 0)}
            >
                <ListItemIcon>
                    <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
            </ListItemButton>

            <ListItemButton onClick={handleClick}>
                <ListItemIcon>
                    <InboxIcon />
                </ListItemIcon>
                <ListItemText primary="Candidate" />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItemButton
                        sx={{ pl: 4 }}
                        to={config.routes.companyCandidateList}
                        component={RouteLink}
                        selected={selectedIndex === 1}
                        onClick={(event) => handleListItemClick(event, 1)}
                    >
                        <ListItemIcon>
                            <RecentActorsIcon />
                        </ListItemIcon>
                        <ListItemText primary="Candidate List" />
                    </ListItemButton>
                    <ListItemButton
                        sx={{ pl: 4 }}
                        to={config.routes.createCandidate}
                        component={RouteLink}
                        selected={selectedIndex === 2}
                        onClick={(event) => handleListItemClick(event, 2)}
                    >
                        <ListItemIcon>
                            <CreateIcon />
                        </ListItemIcon>
                        <ListItemText primary="Create Candidate" />
                    </ListItemButton>
                </List>
            </Collapse>

            <ListItemButton
                to={config.routes.companyVoterList}
                component={RouteLink}
                selected={selectedIndex === 3}
                onClick={(event) => handleListItemClick(event, 2)}
            >
                <ListItemIcon>
                    <PeopleIcon />
                </ListItemIcon>
                <ListItemText primary="Voter List" />
            </ListItemButton>
        </Fragment>
    );
}

export { MainListItems };
