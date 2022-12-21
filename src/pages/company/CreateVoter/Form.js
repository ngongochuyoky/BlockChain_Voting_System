import { useEffect, useState } from 'react';

import useSnackMessages from '~/utils/hooks/useSnackMessages';
// import dayjs from 'dayjs';
import { Grid, InputLabel, Box, Button, Divider, TextField } from '@mui/material';

const style = {
    bgcolor: 'background.paper',
    borderRadius: '10px',
    p: 4,
};

function TransitionsModal() {
    // const [value, setValue] = useState();
    const { showInfoSnackbar, showErrorSnackbar } = useSnackMessages();

    useEffect(() => {
        const componentDidMount = async () => {};
        componentDidMount();
    }, [showErrorSnackbar]);

    // Create New Voter
    const handleCreateNew = async (event) => {
        event.preventDefault();
        const dataForm = new FormData(event.currentTarget);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={style}>
                <Box component="form" onSubmit={handleCreateNew} validate="true" autoComplete="off">
                    <Grid container direction="row">
                        <Grid item lg={8} xs={12} sx={{ pt: 2 }}>
                            <Grid container spacing={2}>
                                {/* Input Voter Name */}
                                <Grid item lg={6} xs={12}>
                                    <InputLabel htmlFor="full-name" sx={{ fontWeight: 700 }}>
                                        Full Name
                                    </InputLabel>
                                    <TextField
                                        required
                                        fullWidth
                                        id="full-name"
                                        name="full-name"
                                        placeholder="Alex Z"
                                    />
                                </Grid>

                                <Grid item lg={6} xs={12} />
                                {/* Input email */}
                                <Grid item lg={6} xs={12}>
                                    <InputLabel htmlFor="email" sx={{ fontWeight: 700 }}>
                                        Email
                                    </InputLabel>
                                    <TextField 
                                        required 
                                        fullWidth 
                                        id="email" 
                                        name="email" 
                                        placeholder="abc@gmail.com" 
                                    />
                                </Grid>
                                {/* Input password */}
                                <Grid item lg={6} xs={12}>
                                    <InputLabel htmlFor="email" sx={{ fontWeight: 700 }}>
                                        Password
                                    </InputLabel>
                                    <TextField 
                                        required
                                        fullWidth
                                        id="email"
                                        name="email"
                                        placeholder="abc@gmail.com"
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                        {/* Button Submit */}
                        <Grid item lg={12} sx={{ mt: 4, pb: 4 }}>
                            <Divider sx={{ width: '100%' }} />
                            <Box sx={{ float: 'right' }}>
                                <Button type="submit" variant="contained" sx={{ mt: 3, pl: 4, pr: 4 }}>
                                    Create
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Box>
    );
}

export default TransitionsModal;
