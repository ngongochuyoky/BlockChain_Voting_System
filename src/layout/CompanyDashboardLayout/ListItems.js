import { Fragment, useState } from 'react';
import { ListItemButton, ListItemIcon as MuiListItemIcon, ListItemText, List, Collapse } from '@mui/material';
import {styled} from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import RecentActorsIcon from '@mui/icons-material/RecentActors';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import ViewListIcon from '@mui/icons-material/ViewList';
import HowToVoteIcon from '@mui/icons-material/HowToVote';
import CreateIcon from '@mui/icons-material/Create';
// import RestoreFromTrashIcon from '@mui/icons-material/RestoreFromTrash';
import PeopleIcon from '@mui/icons-material/People';
import { Link as RouteLink } from 'react-router-dom';
import config from '~/config';

const ListItemIcon = styled(MuiListItemIcon)(({theme}) => ({
    color: '#fff'
}))


function MainListItems() {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [openCandidate, setOpenCandidate] = useState(true);
    const [openVoter, setOpenVoter] = useState(true);

    const handleClickCandidate = () => {
        setOpenCandidate(!openCandidate);
    };

    const handleClickVoter = () => {
        setOpenVoter(!openVoter);
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
                <ListItemIcon >
                    <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
            </ListItemButton>

            <ListItemButton
                to={config.routes.companyPositionList}
                component={RouteLink}
                selected={selectedIndex === 1}
                onClick={(event) => handleListItemClick(event, 1)}
            >
                <ListItemIcon>
                    <ViewListIcon />
                </ListItemIcon>
                <ListItemText primary="Position List" />
            </ListItemButton>
            {/* Candidate */}
            <ListItemButton onClick={handleClickCandidate}>
                <ListItemIcon>
                    <InboxIcon />
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
                        selected={selectedIndex === 2}
                        onClick={(event) => handleListItemClick(event, 2)}
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
                        selected={selectedIndex === 3}
                        onClick={(event) => handleListItemClick(event, 3)}
                    >
                        <ListItemIcon>
                            <CreateIcon />
                        </ListItemIcon>
                        <ListItemText primary="Create Candidate" />
                    </ListItemButton>
                </List>
            </Collapse>
            {/* Voter */}
            <ListItemButton onClick={handleClickVoter}>
                <ListItemIcon>
                    <InboxIcon />
                </ListItemIcon>
                <ListItemText primary="Voter" />
                {openVoter ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={openVoter} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItemButton
                        sx={{ pl: 4 }}
                        component={RouteLink}
                        to={config.routes.companyVoterList}
                        selected={selectedIndex === 4}
                        onClick={(event) => handleListItemClick(event, 4)}
                    >
                        <ListItemIcon>
                            <PeopleIcon />
                        </ListItemIcon>
                        <ListItemText primary="Voter List" />
                    </ListItemButton>
                    <ListItemButton
                        sx={{ pl: 4 }}
                        component={RouteLink}
                        to={config.routes.addVoters}
                        selected={selectedIndex === 5}
                        onClick={(event) => handleListItemClick(event, 5)}
                    >
                        <ListItemIcon>
                            <CreateIcon />
                        </ListItemIcon>
                        <ListItemText primary="Add Voters" />
                    </ListItemButton>
                </List>
            </Collapse>
            <ListItemButton
                to={config.routes.voteList}
                component={RouteLink}
                selected={selectedIndex === 6}
                onClick={(event) => handleListItemClick(event, 6)}
            >
                <ListItemIcon>
                    <HowToVoteIcon />
                </ListItemIcon>
                <ListItemText primary="Vote List" />
            </ListItemButton>
            {/* <Divider sx={{ borderColor: '#2D3748', mt: 2, mb: 2 }} />
            <ListItemButton
            
                component={RouteLink}
                to={config.routes.trashVoters}
                selected={selectedIndex === 5}
                onClick={(event) => handleListItemClick(event, 5)}
            >
                <ListItemIcon>
                    <RestoreFromTrashIcon />
                </ListItemIcon>
                <ListItemText primary="Trash Voters" />
            </ListItemButton> */}
        </Fragment>
    );
}

export { MainListItems };
