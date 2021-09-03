import React, { useState, useEffect } from 'react';
import { helpHttpAxios } from '../../Helpers/helpHttpsAxios'
import Loader from '../Necesarios/Loader'
import Message from '../Necesarios/Message'
import UserForm from '../../Hooks/useForm';
import Alert from '@material-ui/lab/Alert';
import Box from '@material-ui/core/Box';

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
    idLigas: null,
}

//Validaciones
const validationForm = (form) => {
    let error = {};

    let regexName = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/; //Validacion para nombre

    //Trim se hace para bloquear que no se termine ni empiece con un caracter especial o un espacio en blanco
    if (!form.nombreLiga.trim()) {
        error.nombreLiga = "El campo nombre liga es requerido"
    } else if (!regexName.test(form.nombreLiga.trim())) {
        error.nombreLiga = "El campo nombre liga solo acepta letras y espacios en blanco"
    }

    if (!form.codiPais.trim()) {
        error.codiPais = "El codigo del pais es requerido"
    }

    return error;
};


const FormLeague = ({ dataToEdit,setDataToEdit }) => {

    let classes = useStyle();
   // let urlPaises = "http://localhost:4000/country";
    let urlRegisLiga = "http://localhost:4000/league/register";
    
    const [dataPaises, setDataPaises] = useState();

    const {
        form,
        setForm,
        error,
        loading,
        response,
        handleChange,
        handleBlur,
        handleSubmit,
    } = UserForm(initialForm, validationForm, urlRegisLiga);


    useEffect(() => { //Evalua cualquier cambio que tenga esa variable, esta oyendo siempre

        dataToEdit ? setForm(dataToEdit) : setForm(initialForm);

    },[dataToEdit,setForm]);
    useEffect(() => {
        const traerPais = async () => {
            const data = await helpHttpAxios().get("http://localhost:4000/country");
            setDataPaises(data);
        }
        traerPais();
    }, []);


    const handleSubmitForm = async (e) => {

        e.preventDefault();

        if (Object.keys(error).length === 0) {
            if(form.idLigas === null){
                handleSubmit(e);
            }else{
                console.log("Deberia Actualizar");
            }
        }
        setDataToEdit(initialForm);
        setForm(initialForm);
    }


    return (
        <>
            <Grid container justifyContent="center" >
                <h3>{dataToEdit ? "Actualizar Liga" : "Ingresar Liga"}</h3>
            </Grid>

            <form onSubmit={handleSubmitForm}>
                <Grid container justifyContent="center" spacing={1}>

                    <Grid item xs={6}>

                        <FormControl variant="outlined" className={classes.formControl} size="small">
                            <InputLabel htmlFor="outlined-age-native-simple">Pais</InputLabel>
                            <Select
                                native
                                value={form.codiPais}
                                onChange={handleChange}
                                label="Pais"
                                onBlur={handleBlur}
                                name="codiPais"
                                id="codiPais"
                            >
                                <option aria-label="None" value="" />
                                {dataPaises && dataPaises.map((el) => {
                                    return <option key={el.codiPais} value={el.codiPais}>{el.nombrePais}</option>
                                })}

                            </Select>
                        </FormControl>

                        {error.codiPais && <Alert severity="warning">{error.codiPais}</Alert>}

                    </Grid>
                    <Grid item xs={6}>

                        <TextField
                            value={form.nombreLiga}
                            type="text"
                            name="nombreLiga"
                            label="Nombre Liga"
                            onChange={handleChange}
                            InputProps={{
                                readOnly: false,
                            }}
                            onBlur={handleBlur}
                            className={classes.text}
                            variant="outlined"
                            size="small"
                            id="nombreLiga"
                        />

                        {error.nombreLiga && <Alert severity="warning">{error.nombreLiga}</Alert>}

                    </Grid>
                </Grid>
                <Grid container justifyContent="center" spacing={1}>
                    <Grid item xs={6}>
                        <Button variant="outlined" type='submit' color="primary" className={classes.boton}>Limpiar</Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button variant="outlined" type='submit' color="primary" className={classes.boton}>Enviar</Button>
                    </Grid>

                    {loading && <Loader />}

                    <Box m={0.3} />

                    {error.errores && error.errores.map((el) => {
                        return (
                            <Message key={el} msg={el} estado={false} />
                        );
                    })}

                    {response && <Message msg={response} estado={true} />}

                </Grid>
            </form>
        </>
    );

}

export default FormLeague;