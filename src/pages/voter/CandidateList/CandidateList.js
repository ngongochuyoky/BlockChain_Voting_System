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
} from '@mui/material';
import Title from '~/layout/component/Title';
import CandidateListTable from './ListTable';
import { useEffect, useState } from 'react';
import useSnackMessages from '~/utils/hooks/useSnackMessages';
import ethers from '~/ethereum/ethers';
import Cookies from 'js-cookie';

function createData(candidateID, positionID, name, dateOfBirth, description, imgHash, voteCount, email, ...args) {
    return {
        candidateID,
        name,
        dateOfBirth,
        description,
        imgHash,
        voteCount,
        positionID,
        email,
    };
}

function CandidateList() {
    const [data, setData] = useState([{ positionName: '', rows: [] }]);
    const { showSuccessSnackbar, showErrorSnackbar, showInfoSnackbar } = useSnackMessages();
    const [electionName, setElectionName] = useState('');
    const [openAlertSubmit, setOpenAlertSubmit] = useState(false);
    const [isVoted, setIsVoted] = useState(false);
    const [votedList, setVotedList] = useState([]);

    useEffect(() => {
        const addCandidateListener = (result) => {
            const contract = ethers.getElectionContract();
            contract.on('AddCandidate', (positionID, candidateID, name, ...rest) => {
                //So sánh Candidate ID xem đã tồn tại chưa -> chưa -> thêm vào
                if (!(result[positionID].rows?.[result[positionID].rows.length - 1]?.candidateID === candidateID)) {
                    showSuccessSnackbar(`New candidate: ${name}`);
                    setData((preData) => {
                        const newData = JSON.parse(JSON.stringify(preData));
                        newData[positionID].rows.push(createData(candidateID, positionID, name, ...rest));
                        return newData;
                    });
                }
            });
        };
        const voteListener = () => {
            const contract = ethers.getElectionContract();
            contract.on('Vote', (email) => {
                if (email === Cookies.get('voterEmail')) {
                    showSuccessSnackbar('Voted successfully');
                    setIsVoted(true);
                }
            });
        };
        const getData = async () => {
            try {
                await ethers.connectWallet();
                const contract = ethers.getElectionContract();
                const positions = await contract.getPositions();
                const summary = await contract.getElectionDetails();

                setElectionName(summary[0]);
                const result = positions.map((position) => ({
                    positionName: position,
                    rows: [],
                }));
                if (positions.length) {
                    //Array of voted candidate
                    //Nếu chưa vote, Khởi tạo 1 mảng -1, trước lúc submit, filter lại mảng, vì candidateID >= 0
                    const voter = await contract.getVoter(Cookies.get('voterEmail'));

                    if (!voter[0]) {
                        const votedList = positions.map((position) => -1);
                        setVotedList(votedList);
                    } else setIsVoted(true);
                    const numOfCandidates = await contract.getNumOfCandidates();
                    for (let i = 0; i < numOfCandidates; i++) {
                        const candidate = await contract.getCandidate(i);
                        result[candidate[0]].rows.push(createData(i, ...candidate));
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
        const candidateIDList = votedList.filter((candidateID) => candidateID >= 0);
        try {
            await ethers.connectWallet();
            const contract = ethers.getElectionContract();
            const bool = await contract.vote(candidateIDList, Cookies.get('voterEmail'));
            bool && showInfoSnackbar('Blockchain is processing');
        } catch (err) {
            ethers.getError() && showErrorSnackbar(ethers.getError());
        }
    };

    return (
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
                                <Title>Candidate List - {position.positionName}</Title>
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
                            />
                        </Grid>
                    </Paper>
                </Grid>
            ))}
            {!isVoted && (
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
    );
}

export default CandidateList;
