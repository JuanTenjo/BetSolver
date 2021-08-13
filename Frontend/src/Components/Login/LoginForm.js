import React from 'react';
import logo from '../../assets/Logo.png';
import Message from '../Necesarios/Message';
import {
    Grid,
    TextField,
    Typography,
    makeStyles,
    Button
} from '@material-ui/core'
import UseForm from '../../Hooks/useForm'


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


const initialForm = {
    //Lo hacemos para inicializar las variables del formulario y no nos salgan warning
    email: '',
    password: '',
}

const validationForm = (form) => {
    let error = {};
  
    //let regexName = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/; //Validacion para nombre
    let regexEmail = /^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/; //Validacion para correo
    // let regexComments = /^.{1,255}$/;//Vaya de 1 a 255 caracteres
    //let regexPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/; //Mayuscula, Minuscula y Numero
  
    //Trim se hace para bloquear que no se termine ni empiece con un caracter especial o un espacio en blanco
    if (!form.password.trim()) {
      error.password = "Ingresa tu contraseña"
    }

    if (!form.email.trim()) {
      error.email = "Ingresa tu correo"
    }else if(!regexEmail.test(form.email.trim())){
      error.email = "El email es incorrecto"
    }

    return error;

  };



const LoginForm = ({Auth}) => {

    const styles = useStyles();

    const {
        form,
        error,
        response,
        color,
        success,
        handleChange,
        handleBlur,
        handleSubmitLogin
      } = UseForm(initialForm, validationForm);



    const AuthPrueba = () => {
      return Auth()
    }
      

    return (
      <div>
        <Grid container justifyContent="center" alignContent="center">
          <Grid item xs={12}>
            <center>
              <img src={logo} alt="Logo Bet Solver" width="40%" />
            </center>
          </Grid>
          <Grid item xs={12} sm={12} md={8}>

            <Typography align="center" variant="h5">
              Iniciar Sesion
            </Typography>

            <form onSubmit={handleSubmitLogin} className={styles.form}>
              <TextField
                type="email"
                name="email"
                value={form.email}
                className={styles.text}
                onChange={handleChange}
                onBlur={handleBlur}
                label="Email"
                variant="outlined"
              />
              {error.email && <p>{error.email}</p>}
              <TextField
                autoComplete="on"
                type="password"
                name="password"
                value={form.password}
                className={styles.text}
                onChange={handleChange}
                onBlur={handleBlur}
                label="Contraseña"
                variant="outlined"
              />
             {error.password && <p>{error.password}</p>}
              <Button
                className={styles.boton}
                type="submit"
                variant="contained"
                color="primary"
              >
                Ingresar
              </Button>
            </form>
            
            {response &&  <Message msg={response} bgColor={color}/>}

            {success && AuthPrueba()}
            
          </Grid>
        </Grid>
      </div>
    );
}

export default LoginForm;