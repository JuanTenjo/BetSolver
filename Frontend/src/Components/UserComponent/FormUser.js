import React, { useState, useEffect } from "react";
import { helpHttpAxios } from "../../Helpers/helpHttpsAxios";
import UserForm from "../../Hooks/useForm";
import Alert from "@material-ui/lab/Alert";

import {
  Grid,
  TextField,
  makeStyles,
  Button,
  InputLabel,
  FormControl,
  Select,
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
}));


//Inicial Form
const initialForm = {
    idUsuarios: null,
    idRol: null,
    CodiPais: "",
    idLigas: "",
    nombreLiga: "",
  };
  


const FormUser = () => {

    //const api = helpHttpAxios();

    let classes = useStyle();

    let urlPaises = "http://localhost:4000/country";

    //const { data, isPending, error } = useAxios(urlPaises);

    useEffect(() => {

        const traerPais = async () => {

            const data = await helpHttpAxios().get(urlPaises)
            console.log(data);
        }

        traerPais();

    },[urlPaises]);



    const [state, setState] = useState({
        age: "",
        name: "hai"
    });



    const handleChangeNative = (event) => {
        const name = event.target.name;
        setState({
            ...state,
            [name]: event.target.value
        });
    };
    return (

        <div>
                <Grid container>
                    <Grid container justifyContent="center" >

                        <h1>Registrar Usuario</h1>

                    </Grid>

                    <Grid container justifyContent="center" spacing={1}>
                        <Grid item xs={6}>

                            <TextField
                                type="text"
                                name="nombre"
                                label="Nombre"
                                className={classes.text}
                                variant="outlined"

                            />

                        </Grid>
                        <Grid item xs={6}>

                            <TextField
                                type="text"
                                name="apellidos"
                                label="Apellidos"
                                className={classes.text}
                                variant="outlined"

                            />

                        </Grid>
                    </Grid>

                    <Grid container justifyContent="center" spacing={1}>

                        <Grid item xs={6} >

                            <FormControl variant="outlined" className={classes.formControl}>
                                <InputLabel htmlFor="outlined-age-native-simple">Pais</InputLabel>
                                <Select
                                    native
                                    value={state.age}
                                    onChange={handleChangeNative}
                                    label="Age"
                                    inputProps={{
                                        name: "age",
                                        id: "outlined-age-native-simple"
                                    }}
                                >
                                    <option aria-label="None" value="" />
                                    <option value={10}>Ten</option>
                                    <option value={20}>Twasasdasddenty</option>
                                    <option value={30}>Thirty</option>
                                </Select>
                            </FormControl>

                        </Grid>

                        <Grid item xs={6}>

                            <FormControl variant="outlined" className={classes.formControl}>
                                <InputLabel htmlFor="outlined-age-native-simple">Rol</InputLabel>
                                <Select
                                    native
                                    value={state.age}
                                    onChange={handleChangeNative}
                                    label="Age"
                                    inputProps={{
                                        name: "age",
                                        id: "outlined-age-native-simple"
                                    }}
                                >
                                    <option aria-label="None" value="" />
                                    <option value={10}>Ten</option>
                                    <option value={20}>Twasasdasddenty</option>
                                    <option value={30}>Thirty</option>
                                </Select>
                            </FormControl>

                        </Grid>

                    </Grid>

                    <Grid container >

                        <Grid item xs={12}>
                            <TextField
                                type="email"
                                name="Email"
                                label="Email"
                                className={classes.text}
                                variant="outlined"

                            />

                            <TextField
                                type="password"
                                name="Contrasena"
                                label="Contrasena"
                                className={classes.text}
                                variant="outlined"
                                autoComplete="on"
                            />

                            <TextField
                                type="text"
                                name="nombre"
                                label="Nombre"
                                className={classes.text}
                                variant="outlined"

                            />

                        </Grid>

                    </Grid>


                    <Button>Enviar</Button>

                </Grid>


            </div>
     
    );

}

export default FormUser;