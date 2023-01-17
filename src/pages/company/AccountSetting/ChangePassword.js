function ChangePassword() {
    return (
        <Paper sx={{ display: 'flex', mb: 2, p: '36px' }}>
            <Grid container>
                <Grid item xs={12}>
                    <Typography align="center" color="rgb(85, 105, 255)" variant="h5">
                        Change password
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Grid container spacing={5}>
                        {/* Input User ID */}
                        <Grid item xs={6}>
                            <InputLabel htmlFor="candidate-name" sx={{ fontWeight: 700, mb: 1 }}>
                                Old password
                            </InputLabel>
                            <TextField required fullWidth id="-name" name="user-name" placeholder="Alex Z" />
                        </Grid>

                        {/* Input Election Address */}
                        <Grid item xs={6}>
                            <InputLabel htmlFor="email" sx={{ fontWeight: 700, mb: 1 }}>
                                New password
                            </InputLabel>
                            <TextField
                                required
                                fullWidth
                                id="election-address"
                                name="election-address"
                                placeholder="123445"
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Paper>
    );
}

export default ChangePassword;
