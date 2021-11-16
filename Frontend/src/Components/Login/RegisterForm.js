import React, { useState, useEffect } from "react";
import { helpHttpAxios } from "../../Helpers/helpHttpsAxios";
import UserForm from "../../Hooks/useForm";
import Alert from "@material-ui/lab/Alert";
import logo from '../../assets/Logo.png';
import API from "../../Utils/dominioBackend";
import {
  Grid,
  TextField,
  makeStyles,
  Button,
  InputLabel,
  FormControl,
  Select,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  Link
} from "@material-ui/core";


const useStyle = makeStyles((theme) => ({
  text: {
    marginTop: theme.spacing(1),
    width: "100%",
  },
  boton: {
    marginTop: theme.spacing(2),
    width: "100%",
  },
  formControl: {
    marginTop: theme.spacing(1),
    width: "100%",
  },
  Label: {
    textAlign: "center",
  },
  LinkVolver: {
    marginTop: theme.spacing(2),
  }
}));

//Inicial Form
const initialForm = {
  idUsuarios: null,
  idRol: "",
  codiPais: "",
  nombre: "",
  apellidos: "",
  email: "",
  password: "",
  passwordConfirm: "",
  genero: "",
  celular: "",
};

const validationForm = (form) => {
  let error = {};

  //let regexName = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/; //Validacion para nombre

  //Trim se hace para bloquear que no se termine ni empiece con un caracter especial o un espacio en blanco
  if (!form.nombre.trim()) {
    error.nombre = "El campo nombre es requerido";
  }

  if (!form.apellidos.trim()) {
    error.apellidos = "El campo apellido es requerido";
  }

  if (form.idUsuarios === null) {

    if (!form.password.trim()) {
      error.password = "El campo password es requerido";
    }else{  
  
        if(form.password !== form.passwordConfirm){
          error.password = "El campo password y confirme password no son iguales";
        }
  
    }
    
      if (!form.passwordConfirm.trim()) {
        error.passwordConfirm = "Debes confirmar la password";
      }

  }



  if (!form.email.trim()) {
    error.email = "El campo email es requerido";
  }
  if (!form.genero.trim()) {
    error.genero = "El campo genero es requerido";
  }
  if (!form.celular.trim()) {
    error.celular = "El campo celular es requerido";
  }

  if (form.idRol === "" || form.idRol === null) {
    error.idRol = "El permiso del usuario es requerido";
  }

  if (form.codiPais === "" || form.codiPais === null) {
    error.codiPais = "El codigo del pais es requerido";
  }

  return error;
};



const FormUser = ({ setFuncion, setDataToEdit, createData, updateData }) => {
  let classes = useStyle();

  const [dataPaises, setDataPaises] = useState(null);

  //Hood Personalizado para valizado
  const { form, setForm, error, setError, handleChange, handleBlur } = UserForm(
    initialForm,
    validationForm
  );

  //const { data, isPending, error } = useAxios(urlPaises);



  useEffect(() => {
    const traerPais = async () => {
      const data = await helpHttpAxios().get(`${API.URI}/country`);
      setDataPaises(data);
    };

    traerPais();
  }, []);

  useEffect(() => {
    //Evalua cualquier cambio que tenga esa variable, esta oyendo siempre
 
      document.getElementById("password").setAttribute("disabled","");
      document.getElementById("passwordConfirm").setAttribute("disabled","");

      setForm(initialForm);

  }, [setForm, setError]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(validationForm(form));
    if (Object.keys(error).length === 0) {
      if (form.idUsuarios === null) {
        createData(form);
      } else {
        updateData(form);
      }

    }
  };

  const handleReset = () => {
    setForm(initialForm);
    setDataToEdit(null);
  };

  return (
    <div>
    <Grid item xs={12}>
        <center>
            <img src={logo} alt="Logo Bet Solver" width="40%" />
        </center>
        <Typography align="center" variant="h5">
        Registrate Gratis
    </Typography>
    </Grid>

      <form onSubmit={handleSubmit}>
        <Grid container justifyContent="center" spacing={1}>
          <Grid item xs={6}>
            <FormControl
              variant="outlined"
              className={classes.formControl}
              size="small"
            >
              <InputLabel htmlFor="outlined-age-native-simple">Pais</InputLabel>
              <Select
                required
                native
                value={form.codiPais}
                onChange={handleChange}
                label="Pais"
                onBlur={handleBlur}
                name="codiPais"
              >
                <option aria-label="None" value="" />
                {dataPaises &&
                  dataPaises.map((el) => {
                    return (
                      <option key={el.codiPais} value={el.codiPais}>
                        {el.nombrePais}
                      </option>
                    );
                  })}
              </Select>
            </FormControl>

            {error.codiPais && (
              <Alert severity="warning">{error.codiPais}</Alert>
            )}
          </Grid>
          <Grid item xs={6}>
          <TextField
              required
              type="text"
              name="direccion"
              label="Direccion"
              value={form.nombre}
              onChange={handleChange}
              onBlur={handleBlur}
              className={classes.text}
              variant="outlined"
              size="small"
            />
          </Grid>
        
        </Grid>

        <Grid container justifyContent="center" spacing={1}>
          <Grid item xs={6} sm={6} md={3} lg={3} xl={3}>
            <TextField
              required
              type="text"
              name="nombre"
              label="Nombres"
              value={form.nombre}
              onChange={handleChange}
              onBlur={handleBlur}
              className={classes.text}
              variant="outlined"
              size="small"
            />

            {error.nombre && <Alert severity="warning">{error.nombre}</Alert>}
          </Grid>
          <Grid item xs={6} sm={6} md={3} lg={3} xl={3}>
            <TextField
              required
              type="text"
              name="apellidos"
              label="Apellidos"
              value={form.apellidos}
              onChange={handleChange}
              onBlur={handleBlur}
              className={classes.text}
              variant="outlined"
              size="small"
            />

            {error.apellidos && (
              <Alert severity="warning">{error.apellidos}</Alert>
            )}
          </Grid>
          <Grid item xs={6} sm={6} md={3} lg={3} xl={3}>
            <TextField
              required
              type="Email"
              name="email"
              label="Email"
              value={form.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className={classes.text}
              variant="outlined"
              size="small"
            />

            {error.email && <Alert severity="warning">{error.email}</Alert>}
          </Grid>
          <Grid item xs={6} sm={6} md={3} lg={3} xl={3}>
            <TextField
              required
              type="number"
              name="celular"
              label="Celular"
              value={form.celular}
              onChange={handleChange}
              onBlur={handleBlur}
              className={classes.text}
              variant="outlined"
              size="small"
            />

            {error.celular && <Alert severity="warning">{error.celular}</Alert>}
          </Grid>
        </Grid>

        <Grid container justifyContent="center" spacing={1}>
          <Grid item xs={6}>
            <TextField
              value={form.password}
              onChange={handleChange}
              onBlur={handleBlur}
              className={classes.text}
              name="password"
              id="password"
              label="Password"
              type="password"
              autoComplete="current-password"
              variant="outlined"
              size="small"
            />
            {error.password && <Alert severity="warning">{error.password}</Alert>}
          </Grid>

          <Grid item xs={6}>
            <TextField
              value={form.passwordConfirm}
              onChange={handleChange}
              onBlur={handleBlur}
              className={classes.text}
              name="passwordConfirm"
              id="passwordConfirm"
              label="Confirme Password"
              type="password"
              autoComplete="current-password"
              variant="outlined"
              size="small"
            />
            {error.passwordConfirm && <Alert severity="warning">{error.passwordConfirm}</Alert>}
          </Grid>
        </Grid>

        <Grid container justifyContent="center" spacing={1}>
          <Grid item>
            <div className={classes.formControl}>
              <RadioGroup
                required
                row
                aria-label="gender"
                name="genero"
                value={form.genero}
                onBlur={handleBlur}
                onChange={handleChange}
              >
                <FormControlLabel
                  labelPlacement="start"
                  value="Masculino"
                  control={<Radio />}
                  label="Masculino"
                />
                <FormControlLabel
                  labelPlacement="start"
                  value="Femenino"
                  control={<Radio />}
                  label="Femenino"
                />
              </RadioGroup>
            </div>

            {error.genero && <Alert severity="warning">{error.genero}</Alert>}
          </Grid>
        </Grid>

        <Grid container justifyContent="center" spacing={1}>
          <Grid item xs={12}>
            <Button
              variant="contained"
              type="submit"
              color="primary"
              className={classes.boton}
            >
              Enviar
            </Button>
          </Grid>
          <div className={classes.LinkVolver} >
                <Link href="#" underline='hover' className={classes.linkRegistro} onClick={() => setFuncion(1)}>
                  Volver
                </Link>
              </div>
        </Grid>
      </form>
    </div>
  );
};

export default FormUser;
