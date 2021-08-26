import React, { useState, useEffect } from 'react';
import { helpHttpAxios } from '../../Helpers/helpHttpsAxios'
import Loader from '../Necesarios/Loader'
import Message from '../Necesarios/Message'
import UserForm from '../../Hooks/useForm';

import {
    Grid,
    TextField,
    makeStyles,
    Button,
    InputLabel,
    FormControl,
    Select
} from '@material-ui/core'

//Estilos
const useStyle = makeStyles((theme) => ({
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    text: {
        marginTop: theme.spacing(1),
        width: '100%'
    },
    boton: {
        marginTop: theme.spacing(2),
        width: '100%'
    },
    formControl: {
        marginTop: theme.spacing(1),
        width: '100%'
    },

}));
//Formulario Inicial
const initialForm = {
    codiPais: '',
    nombreLiga: '',
    habilitada: '',
    idLigas: '',
}
//Validaciones
const validationForm = (form) => {
    let error = {};
  
    let regexName = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/; //Validacion para nombre
  
    //Trim se hace para bloquear que no se termine ni empiece con un caracter especial o un espacio en blanco
    if (!form.nombreLiga.trim()) {
      error.nombreLiga = "El campo nombre liga es requerido"
    }else if(!regexName.test(form.nombreLiga.trim())){
      error.nombreLiga = "El campo nombre liga solo acepta letras y espacios en blanco"
    }

    if (!form.codiPais.trim() ) {
        error.codiPais = "El codigo del pais es requerido"
    }

    return error;
  };


const FormLeague = () => {

    let classes = useStyle();
    let urlPaises = "http://localhost:4000/country";
    let urlRegisLiga = "http://localhost:4000/league/register";
 
    const {
        form,
        error,
        loading,
        response,
        handleChange,
        handleBlur,
        handleSubmit,
    } = UserForm(initialForm, validationForm, urlRegisLiga);


  

    const [dataPaises, setDataPaises] = useState();

    useEffect(() => {

        const traerPais = async () => {

            const data = await helpHttpAxios().get(urlPaises)
            setDataPaises(data)

        }

        traerPais();

    }, [urlPaises]);


    return (

        <div className={classes.content}>
            <div className={classes.toolbar}>
                <Grid container>
                    <Grid container justifyContent="center" >

                        <h1>Registrar League</h1>

                    </Grid>
                    <form onSubmit={handleSubmit}>


                        <Grid container justifyContent="center" spacing={1}>
                            <Grid item xs={6}>

                                <FormControl variant="outlined" className={classes.formControl}>
                                    <InputLabel htmlFor="outlined-age-native-simple">Pais</InputLabel>
                                    <Select
                                        native
                                        value={form.codiPais}
                                        onChange={handleChange}
                                        label="Pais"
                                        onBlur={handleBlur}
                                        name="codiPais"
                                    >
                                        <option aria-label="None" value="" />
                                        {dataPaises && dataPaises.map((el) => {
                                            return <option key={el.codiPais} value={el.codiPais}>{el.nombrePais}</option>
                                        })}

                                    </Select>
                                </FormControl>

                                {error.codiPais && <p>{error.codiPais}</p>}

                            </Grid>
                            <Grid item xs={6}>

                                <TextField
                                    defaultValue={form.nombreLiga}
                                    type="text"
                                    name="nombreLiga"
                                    label="Nombre Liga"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={classes.text}
                                    variant="outlined"

                                />

                                {error.nombreLiga && <p>{error.nombreLiga}</p>}

                            </Grid>
                        </Grid>
                        <Grid container justifyContent="center" spacing={1}>
                            <Button variant="outlined" type='submit' color="primary" className={classes.boton}>Enviar</Button>
                        </Grid>

                    </form>

                    {loading && <Loader/>}
                    {response && <Message msg="El correo se envio correctamente" bgColor="#198754"/>}


                </Grid>


            </div>
        </div>
    );

}

export default FormLeague;