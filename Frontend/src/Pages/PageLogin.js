import React, { useState, useEffect } from 'react';
import {
    Grid,
    Box,
    makeStyles,
    Hidden

} from '@material-ui/core'
import LoginForm from '../Components/Login/LoginForm';
import Banner from '../assets/Banner.jpg';



const useStyles = makeStyles(() => ({
    container: {
        display: "flex",
        alignItems: "center",
        height:"100%"
    },
    Banner: {
        
    },
}));

const PageLogin = () => {
    const styles = useStyles();

    const AltoImagen = (e) => {
        setWidth((window.screen.width / 2) - 100)
        setMaxHeight(window.screen.height - 200)
    }

    const [MaxHeight, setMaxHeight] = useState(150);
    const [width, setWidth] = useState(150);
    return (
        <div className={styles.container}>
            <Grid         
                container
                alignItems="center"
            >
                <Grid item xs={12} sm={6} md={6}  >
                    <LoginForm />
                </Grid>
                <Hidden xsDown>
                        <center>
                            <img onLoad={AltoImagen} src={Banner} alt="Banner Bet Solver" style={{maxHeight:MaxHeight,width:width, margin:10}} />
                        </center>                
                </Hidden>
            </Grid>
        </div>
    );
}

export default PageLogin;