import React from 'react';
import logo from '../../assets/Logo.png';
import {
    Grid,
    TextField,
    Typography,
    makeStyles,
    Button
} from '@material-ui/core'
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';

const useStyles = makeStyles(() => ({
    text: {
        marginTop: '10px',
        width:'100%'
    },
    form: {
        padding: '5px',
    },
    boton: {
        width: '100%',
        marginTop: '20px'
    }
}));

const handleSubmit = (e) => {
    e.preventDefault(); //Para que no se recargue la pagina en el submit
    window.alert("asd");
}


const LoginForm = () => {

    const styles = useStyles();

    return (
        <div>
            <Grid container justifyContent="center" alignContent="center">
                <Grid item xs={12}>
                    <center>
                        <img src={logo} alt='Logo Bet Solver' width='40%' />
                    </center>
                </Grid>
                <Grid item xs={12} sm={12} md={8}>

                    <Typography align="center" variant="h5">
                        Iniciar Sesion
                    </Typography>

                    <form onSubmit={handleSubmit} className={styles.form}>
                        <TextField  required type="email" className={styles.text} label="Email" variant="outlined" />
                        <TextField  required type="password" className={styles.text} label="Password" variant="outlined" />

                        <Button
                            className={styles.boton} 
                            type="submit"
                            variant="contained"
                            color="primary"
                            endIcon={<KeyboardArrowRightIcon />}
                        >
                            Ingresar
                        </Button>
                    </form>

                </Grid>
            </Grid>




        </div>

    );
}

export default LoginForm;