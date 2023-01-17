import { Grid, Paper, Divider, Box, Avatar, Typography, Stack, Button as MuiButton } from '@mui/material';
import { Fragment, useEffect, useState } from 'react';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';

import List from '@mui/material/List';
import MuiListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { styled } from '@mui/material/styles';
import { getAllVoter } from '~/api/voter';
import { getVoterList, saveChange, searchByElectionAddress } from '~/api/election';
import { createVoterDataExtend } from '~/utils/CreateData';
import useSnackMessages from '~/utils/hooks/useSnackMessages';
import Cookies from 'js-cookie';

const Button = styled(MuiButton)(({ theme }) => ({
    borderRadius: 0,
    width: '100%',
}));

const ListItemButton = styled(MuiListItemButton)(({ theme }) => ({
    backgroundColor: theme.palette.neutral[100],
    borderRadius: '5px',
    margin: '2px',
    '&.Mui-selected, &.Mui-selected:hover': {
        color: '#fff',
        backgroundColor: 'rgb(87, 202, 34)',
    },
    '&:hover': {
        backgroundColor: 'rgb(87, 202, 34)',
        color: '#fff',
    },
}));

function AddVoters() {
    const [rows, setRows] = useState([]);
    const [voterList, setVoterList] = useState([]);
    const { showSuccessSnackbar } = useSnackMessages();
    const [startElection, setStartElection] = useState(true);


    useEffect(() => {
        const componentDidMount = async () => {
            //Lấy tất cả voter có trong database
            const responseAllVoter = await getAllVoter();
            const allVoter = responseAllVoter.data.map((voter) =>
                createVoterDataExtend(voter._id, voter.email, voter.password, voter.full_name),
            );

            //Lấy những voter có quyền vote
            const responseVoterList = await getVoterList({
                companyId: Cookies.get('companyId'),
                token: Cookies.get('companyToken'),
            });
            const votersAllowed = responseVoterList.data.map((voter) =>
                createVoterDataExtend(voter._id, voter.email, voter.password, voter.full_name ),
            );
            //Lấy ra những voter chưa có quyền vote
            const votersAllowedId = votersAllowed.map((voter) => voter.id);
            const voterNotAllowed = allVoter.filter((voter) => votersAllowedId.indexOf(voter.id) < 0);
            setRows(voterNotAllowed);
            setVoterList(votersAllowed);

            //Ẩn các nút khi election start 
            const responseElection = await searchByElectionAddress({
                electionAddress: Cookies.get('companyElectionAddress'),
                token: Cookies.get('companyToken'),
            });
            const startElection = responseElection.data.startTime ? true : false;
            setStartElection(startElection);
        };
        componentDidMount();
    }, []);

    //Xóa quyền vote của một hoặc một vài voter
    const handleRemove = () => {
        const votersAllowed = voterList.filter((voter) => !voter.selected);
        setVoterList(votersAllowed);

        const voterNotAllowed = voterList
            .filter((voter) => voter.selected)
            .map((voter) => {
                voter.selected = false; //Đặt selected thành false khi chuyển qua mảng mới
                return voter;
            })
            .concat(rows);
        setRows(voterNotAllowed);
    };

    //Xóa quyền vote của tất cả voter
    const handleRemoveAll = () => {
        const voterNotAllowed = voterList
            .map((voter) => {
                voter.selected = false; //Đặt selected thành false khi chuyển qua mảng mới
                return voter;
            })
            .concat(rows);
        setRows(voterNotAllowed);
        setVoterList([]);
    };

    //Cho phép 1 hoặc nhiều voter có quyền vote
    const handleAdd = () => {
        //Lấy những voter không được chọn
        const voterNotAllowed = rows.filter((voter) => !voter.selected);
        setRows(voterNotAllowed);

        //Lấy những voter được chọn
        const votersAllowed = rows
            .filter((voter) => voter.selected)
            .map((voter) => {
                voter.selected = false; //Đặt selected thành false khi chuyển qua mảng mới
                return voter;
            })
            .concat(voterList);
        setVoterList(votersAllowed);
    };

    //Cho phép tất cả voter có quyền vote
    const handleAddAll = () => {
        const votersAllowed = rows
            .map((voter) => {
                voter.selected = false; //Đặt selected thành false khi chuyển qua mảng mới
                return voter;
            })
            .concat(voterList);
        setRows([]);
        setVoterList(votersAllowed);
    };

    //Hành động chọn 1 voter trong danh sách chưa cho phép vote
    const handleSelectAddOne = (event, data) => {
        const voterNotAllowed = rows.map((voter) => {
            if (voter.id === data.id) {
                voter.selected = !voter.selected;
            }
            return voter;
        });
        setRows(voterNotAllowed);
    };

    //Hành động chọn 1 voter trong danh sách cho phép vote
    const handleSelectRemoveOne = (event, data) => {
        const votersAllowed = voterList.map((voter) => {
            if (voter.id === data.id) {
                voter.selected = !voter.selected;
            }
            return voter;
        });
        setVoterList(votersAllowed);
    };

    //Xử lý lưu những thay đổi
    const handleSaveChanges = async () => {
        const voters = voterList.map((voter) => voter.id);
        const response = await saveChange({ voters: voters });
        response && showSuccessSnackbar('Save the changes successfully');
    };

    return (
        <Fragment>
            <Paper sx={{ display: 'flex', mb: 2, p: '36px' }}>
                <Grid container>
                    <Grid item>
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Avatar
                                variant="rounded"
                                sx={{
                                    background: 'rgb(87, 202, 34)',
                                    boxShadow: 'rgb(68 214 0 / 25%) 0px 1px 4px, rgb(68 214 0 / 35%) 0px 3px 12px 2px',
                                    height: 70,
                                    width: 70,
                                }}
                            >
                                <AddCircleIcon />
                            </Avatar>
                            <Typography variant="h5" color="rgb(87, 202, 34)" sx={{ ml: 2 }}>
                                Add Voters
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Paper>

            <Paper sx={{ display: 'flex', flexDirection: 'column', pt: 2 }}>
                <Grid container direction="row" justifyContent="end" alignItems="center" sx={{ p: 4 }} spacing={6}>
                    <Grid item xs={6}>
                        <Stack spacing={2}>
                            <Typography align="center" variant="h5">
                                Object list
                            </Typography>
                            <Box sx={{ border: '2px solid #9CA3AF', p: 4, borderRadius: '10px', height: '70vh' }}>
                                <Stack direction="row">
                                    <Button
                                        variant="contained"
                                        onClick={handleAddAll}
                                        sx={{ borderTopLeftRadius: '10px' }}
                                    >
                                        <KeyboardDoubleArrowRightIcon />
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="info"
                                        onClick={handleAdd}
                                        sx={{ borderTopRightRadius: '10px' }}
                                    >
                                        <KeyboardArrowRightIcon />
                                    </Button>
                                </Stack>
                                <Box sx={{ mt: 2, height: '100%' }}>
                                    <List
                                        sx={{
                                            width: '100%',
                                            height: '90%',
                                            p: 2,
                                            bgcolor: 'background.paper',
                                            border: '1px solid rgb(255, 25, 67)',
                                            borderRadius: '2px',
                                            overflow: 'auto',
                                        }}
                                        component="nav"
                                        aria-labelledby="nested-list-subheader"
                                    >
                                        {rows.map((voter, index) => (
                                            <ListItemButton
                                                selected={voter.selected}
                                                key={index}
                                                onClick={(event) => handleSelectAddOne(event, voter)}
                                            >
                                                <ListItemText primary={`${voter.name} - ${voter.email}`} />
                                            </ListItemButton>
                                        ))}
                                    </List>
                                </Box>
                            </Box>
                            {rows.length ? (
                                <Box>
                                    <Typography sx={{ fontWeight: 500 }}>Show all {rows.length}</Typography>
                                </Box>
                            ) : (
                                <Box>
                                    <Typography sx={{ fontWeight: 500 }}>Empty list</Typography>
                                </Box>
                            )}
                        </Stack>
                    </Grid>
                    <Grid item xs={6}>
                        <Stack spacing={2}>
                            <Typography align="center" variant="h5">
                                Voter list
                            </Typography>
                            <Box sx={{ border: '2px solid #9CA3AF', p: 4, borderRadius: '10px', height: '70vh' }}>
                                <Stack direction="row">
                                    <Button
                                        variant="contained"
                                        color="info"
                                        onClick={handleRemove}
                                        sx={{ borderTopLeftRadius: '10px' }}
                                    >
                                        <KeyboardArrowLeftIcon />
                                    </Button>
                                    <Button
                                        variant="contained"
                                        onClick={handleRemoveAll}
                                        sx={{ borderTopRightRadius: '10px' }}
                                    >
                                        <KeyboardDoubleArrowLeftIcon />
                                    </Button>
                                </Stack>
                                <Box sx={{ mt: 2, height: '100%' }}>
                                    <List
                                        sx={{
                                            width: '100%',
                                            height: '90%',
                                            p: 2,
                                            bgcolor: 'background.paper',
                                            border: '1px solid rgb(255, 25, 67)',
                                            borderRadius: '2px',
                                            overflow: 'auto',
                                        }}
                                        component="nav"
                                        aria-labelledby="nested-list-subheader"
                                    >
                                        {voterList.map((voter, index) => (
                                            <ListItemButton
                                                selected={voter.selected}
                                                key={index}
                                                onClick={(event) => handleSelectRemoveOne(event, voter)}
                                            >
                                                <ListItemText primary={`${voter.name} - ${voter.email}`} />
                                            </ListItemButton>
                                        ))}
                                    </List>
                                </Box>
                            </Box>
                            {voterList.length ? (
                                <Box>
                                    <Typography sx={{ fontWeight: 500 }}>Show all {voterList.length}</Typography>
                                </Box>
                            ) : (
                                <Box>
                                    <Typography sx={{ fontWeight: 500 }}>Empty list</Typography>
                                </Box>
                            )}
                        </Stack>
                    </Grid>
                    <Grid item xs={12}>
                        <Divider />
                    </Grid>
                    <Grid item xs={12} align="right">
                        <MuiButton disabled={startElection} variant="contained" onClick={handleSaveChanges}>
                            Save Changes
                        </MuiButton>
                    </Grid>
                </Grid>
            </Paper>
        </Fragment>
    );
}

export default AddVoters;
