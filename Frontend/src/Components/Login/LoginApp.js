import React from 'react';
import {
    Grid,
    Box,
    makeStyles

} from '@material-ui/core'
import LoginForm from './LoginForm';


const useStyles = makeStyles(() => ({
    container: {
        display: "flex",
        alignItems: "center",
        height:"100%"
    },
}));

const LoginApp = () => {
    const styles = useStyles();
    return (
        <div className={styles.container}>
            <Grid         
                container
                alignItems="center"
            >
                <Grid item xs={12} sm={6} md={6}  >
                    <LoginForm />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                    <Box width="100%" height="100%" bgcolor='white'>
                        <h2 style={{ background: 'white' }}>Banner</h2>
                    </Box>
                </Grid>
            </Grid>
        </div>
    );
}

export default LoginApp;