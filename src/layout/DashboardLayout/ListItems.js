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
    const [openPosition, setOpenPosition] = useState(true);
    const [openCandidate, setOpenCandidate] = useState(true);

    const handleClickCandidate = () => {
        setOpenCandidate(!openCandidate);
    };
    const handleClickPosition = () => {
        setOpenPosition(!openPosition);
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
                    <DashboardIcon sx={{color: '#fff'}}/>
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
            </ListItemButton>

            <ListItemButton onClick={handleClickPosition}>
                <ListItemIcon>
                    <InboxIcon sx={{color: '#fff'}}/>
                </ListItemIcon>
                <ListItemText primary="Position" />
                {openPosition ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={openPosition} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItemButton
                        sx={{ pl: 4 }}
                        to={config.routes.companyPositionList}
                        component={RouteLink}
                        selected={selectedIndex === 1}
                        onClick={(event) => handleListItemClick(event, 1)}
                    >
                        <ListItemIcon>
                            <RecentActorsIcon sx={{color: '#fff'}} />
                        </ListItemIcon>
                        <ListItemText primary="Position List" />
                    </ListItemButton>
                    <ListItemButton
                        sx={{ pl: 4 }}
                        to={config.routes.createPosition}
                        component={RouteLink}
                        selected={selectedIndex === 2}
                        onClick={(event) => handleListItemClick(event, 2)}
                    >
                        <ListItemIcon>
                            <CreateIcon sx={{color: '#fff'}}/>
                        </ListItemIcon>
                        <ListItemText primary="Create Position" />
                    </ListItemButton>
                </List>
            </Collapse>

            <ListItemButton onClick={handleClickCandidate}>
                <ListItemIcon>
                    <InboxIcon sx={{color: '#fff'}}/>
                </ListItemIcon>
                <ListItemText primary="Candidate" />
                {openCandidate ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={openCandidate} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItemButton
                        sx={{ pl: 4 }}
                        to={config.routes.companyCandidateList}
                        component={RouteLink}
                        selected={selectedIndex === 3}
                        onClick={(event) => handleListItemClick(event, 3)}
                    >
                        <ListItemIcon>
                            <RecentActorsIcon sx={{color: '#fff'}}/>
                        </ListItemIcon>
                        <ListItemText primary="Candidate List" />
                    </ListItemButton>
                    <ListItemButton
                        sx={{ pl: 4 }}
                        to={config.routes.createCandidate}
                        component={RouteLink}
                        selected={selectedIndex === 4}
                        onClick={(event) => handleListItemClick(event, 4)}
                    >
                        <ListItemIcon>
                            <CreateIcon sx={{color: '#fff'}}/>
                        </ListItemIcon>
                        <ListItemText primary="Create Candidate" />
                    </ListItemButton>
                </List>
            </Collapse>

            <ListItemButton
                to={config.routes.companyVoterList}
                component={RouteLink}
                selected={selectedIndex === 5}
                onClick={(event) => handleListItemClick(event, 5)}
            >
                <ListItemIcon>
                    <PeopleIcon sx={{color: '#fff'}}/>
                </ListItemIcon>
                <ListItemText primary="Voter List" />
            </ListItemButton>
        </Fragment>
    );
}

export { MainListItems };
