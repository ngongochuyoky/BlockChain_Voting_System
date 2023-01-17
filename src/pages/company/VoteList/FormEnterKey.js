import PropTypes from 'prop-types';
import { Close as CloseIcon } from '@mui/icons-material';

import {
    Grid,
    Stack,
    IconButton,
    Backdrop,
    Box,
    Modal,
    Fade,
    Divider,
    InputLabel,
    TextField,
    Button,
} from '@mui/material';
import { decryptContent, updateIsCheck } from '~/api/ballot';
import { useState } from 'react';
import ethers from '~/ethereum/ethers';

import Title from '~/layout/component/Title';
import useSnackMessages from '~/utils/hooks/useSnackMessages';
import Cookies from 'js-cookie';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: '10px',
    width: '50vw',
    p: 4,
};

function TransitionsModal(props) {
    const handleClose = () => props.setOpenFormEnterKey(false);
    const [key, setKey] = useState('');
    const { showErrorSnackbar, showSuccessSnackbar } = useSnackMessages();

    const changeKey = (event) => {
        setKey(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await decryptContent({
            privateKey: key,
            id: props.source.id,
        });
        if (response?.data) {
            try{
                await ethers.connectWallet();
                const contract = ethers.getElectionContract(Cookies.get('companyElectionAddress'));
                const candidateIdList = response.data.content.candidateIdList;
                const voterId = response.data.voterId;
                const bool = await contract.vote(candidateIdList, voterId);
                if (bool) {
                    showSuccessSnackbar('Successful !!!');
                    const responseUpdateIsCheck = await updateIsCheck({ id: props.source.id });
                    console.log(responseUpdateIsCheck);
                    responseUpdateIsCheck && props.setOpenFormEnterKey(false);
                    props.setReRender(!props.reRender);
                }
            }catch(e) {
                showErrorSnackbar('Voters voted');
            }
        } else showErrorSnackbar('Wrong key');
    };
    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={true}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={true}>
                <Box sx={style}>
                    <Grid container direction="column">
                        <Grid item>
                            <Stack direction="row" justifyContent="space-between" alignItems="center">
                                <Title>Check Vote</Title>
                                <IconButton onClick={handleClose}>
                                    <CloseIcon />
                                </IconButton>
                            </Stack>
                        </Grid>

                        <Grid item sx={{ pt: 2 }}>
                            <Divider sx={{ width: '100%' }} />
                            <Box component="form" onSubmit={handleSubmit} validate="true" autoComplete="off">
                                <Grid container direction="row" sx={{ mt: 2 }}>
                                    <Grid item lg={12} xs={12} sx={{ pt: 2 }}>
                                        <InputLabel htmlFor="name" sx={{ fontWeight: 700, color: 'secondary.main' }}>
                                            Enter Private Key
                                        </InputLabel>
                                        <TextField
                                            sx={{ mt: 2 }}
                                            multiline
                                            rows={12}
                                            required
                                            fullWidth
                                            id="key"
                                            name="key"
                                            onChange={changeKey}
                                            value={key}
                                            placeholder="Alex Z"
                                        />
                                    </Grid>
                                    {/* Button Submit */}
                                    <Grid item lg={12} sx={{ mt: 4, pb: 4 }}>
                                        <Divider sx={{ width: '100%' }} />
                                        <Box sx={{ float: 'right' }}>
                                            <Button type="submit" variant="contained" sx={{ mt: 3, pl: 4, pr: 4 }}>
                                                Submit
                                            </Button>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </Fade>
        </Modal>
    );
}

TransitionsModal.propTypes = {
    setOpenFormEnterKey: PropTypes.func.isRequired,
    setReRender: PropTypes.func.isRequired,
    reRender: PropTypes.bool.isRequired,
};

export default TransitionsModal;
