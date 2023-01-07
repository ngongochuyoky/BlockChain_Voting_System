import {
    Grid,
    Paper,
    Divider,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Typography,
    Box, 
    Avatar,

} from '@mui/material';
import Title from '~/layout/component/Title';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import CandidateListTable from './ListTable';
import { Fragment, useEffect, useState } from 'react';
import useSnackMessages from '~/utils/hooks/useSnackMessages';
import ethers from '~/ethereum/ethers';
import Cookies from 'js-cookie';
import { createCandidateData } from '~/utils/CreateData';

function CandidateList() {
    const [data, setData] = useState([{ positionName: '', rows: [] }]);
    const { showSuccessSnackbar, showErrorSnackbar, showInfoSnackbar } = useSnackMessages();
    const [electionName, setElectionName] = useState('');
    const [openAlertSubmit, setOpenAlertSubmit] = useState(false);
    const [isVoted, setIsVoted] = useState(true);
    const [votedList, setVotedList] = useState([]);
    const [endedElection, setEndedElection] = useState(true);

    useEffect(() => {
        const addCandidateListener = (result) => {
            const contract = ethers.getElectionContract();
            contract.on('AddCandidate', (positionID, candidateID, name, ...rest) => {
                //So sánh Candidate ID xem đã tồn tại chưa -> chưa -> thêm vào
                if (!(result[positionID].rows?.[result[positionID].rows.length - 1]?.candidateID === candidateID)) {
                    showSuccessSnackbar(`New candidate: ${name}`);
                    setData((preData) => {
                        const newData = JSON.parse(JSON.stringify(preData));
                        newData[positionID].rows.push(createCandidateData(candidateID, positionID, name, ...rest));
                        return newData;
                    });
                }
            });
        };
        const voteListener = () => {
            const contract = ethers.getElectionContract();
            contract.on('Vote', (voterId) => {
                if (voterId === Cookies.get('voterId')) {
                    showSuccessSnackbar('Voted successfully');
                }
            });
        };
        const getData = async () => {
            try {
                await ethers.connectWallet();
                const contract = ethers.getElectionContract();
                const positions = await contract.getPositions();
                const summary = await contract.getElectionDetails();
                const status = await contract.getStatus();
                setEndedElection(status);

                setElectionName(summary[0]);
                const result = positions.map((position) => ({
                    positionName: position,
                    rows: [],
                }));
                if (positions.length) {
                    //Array of voted candidate
                    //Nếu chưa vote, Khởi tạo 1 mảng -1, trước lúc submit, filter lại mảng, vì candidateID >= 0
                    const voter = await contract.getVoter(Cookies.get('voterId'));

                    if (!voter[0]) {
                        const votedList = positions.map((position) => -1);
                        setVotedList(votedList);
                        setIsVoted(false);
                    } else setIsVoted(true);
                    const numOfCandidates = await contract.getNumOfCandidates();
                    for (let i = 0; i < numOfCandidates; i++) {
                        const candidate = await contract.getCandidate(i);
                        result[candidate[0]].rows.push(createCandidateData(i, ...candidate));
                    }
                    setData(result);
                }
                addCandidateListener(result);
                voteListener();
            } catch (err) {
                ethers.getError() && showErrorSnackbar(ethers.getError());
            }
        };

        getData();
    }, [showSuccessSnackbar, showErrorSnackbar]);

    const handleClickSubmit = () => setOpenAlertSubmit(true);

    //Handle Alert
    const handleCloseAlertSubmit = () => setOpenAlertSubmit(false);
    const handleAgreementSubmit = async () => {
        setOpenAlertSubmit(false);
        setIsVoted(true);
        const candidateIDList = votedList.filter((candidateID) => candidateID >= 0);
        try {
            await ethers.connectWallet();
            const contract = ethers.getElectionContract();
            const bool = await contract.vote(candidateIDList, Cookies.get('voterId'));
            bool && showInfoSnackbar('Blockchain is processing');
        } catch (err) {
            setIsVoted(false);
            ethers.getError() && showErrorSnackbar(ethers.getError());
        }
    };

    return (
        <Fragment>
            <Paper sx={{ display: 'flex', mb: 2, p: '36px' }}>
                <Grid container>
                    <Grid item>
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
                            <Avatar
                                variant="rounded"
                                sx={{
                                    backgroundColor: 'rgb(85, 105, 255)',
                                    boxShadow:
                                        'rgb(85 105 255 / 25%) 0px 1px 4px, rgb(85 105 255 / 35%) 0px 3px 12px 2px',
                                    height: 70,
                                    width: 70,
                                }}
                            >
                                <HowToRegIcon />
                            </Avatar>
                            <Typography variant="h5" color="primary" sx={{ml: 2}}>
                                Candidate List
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Paper>
            <Grid container spacing={3}>
            {/* Title */}
            {data.map((position, index) => (
                <Grid item xs={12} key={index}>
                    <Paper sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Grid
                            container
                            direction="row"
                            justifyContent="space-between"
                            alignItems="center"
                            sx={{ p: 2 }}
                        >
                            <Grid item>
                                <Title>{position.positionName}</Title>
                            </Grid>
                        </Grid>

                        <Divider />
                        <Grid container direction="row" justifyContent="space-between" alignItems="center">
                            <CandidateListTable
                                rows={position.rows}
                                electionName={electionName}
                                positionName={position.positionName}
                                votedList={votedList}
                                setVotedList={setVotedList}
                                isVoted={isVoted}
                                endedElection={endedElection}
                            />
                        </Grid>
                    </Paper>
                </Grid>
            ))}
            {!isVoted && !endedElection &&(
                <Grid item lg={12}>
                    <Button onClick={handleClickSubmit} variant="contained" sx={{ float: 'right', mb: 8 }}>
                        Submit
                    </Button>
                </Grid>
            )}
            {/* Dialog Submit */}
            <div>
                <Dialog
                    open={openAlertSubmit}
                    onClose={handleCloseAlertSubmit}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">Confirm Submit</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Are you sure you want to vote for these candidates?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseAlertSubmit}>Disagree</Button>
                        <Button onClick={handleAgreementSubmit} autoFocus>
                            Agree
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        </Grid>
        </Fragment>
       
    );
}

export default CandidateList;
