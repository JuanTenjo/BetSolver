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

//Estilos
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
  habilitado: true,
  idEquipos: null,
  nombreEquipo: "",
  idLigas: "",
};

//Validaciones
const validationForm = (form) => {

  let error = {};

  //let regexName = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/; //Validacion para nombre

  //Trim se hace para bloquear que no se termine ni empiece con un caracter especial o un espacio en blanco
  if (!form.nombreEquipo.trim()) {
    error.nombreEquipo = "El campo nombre del equipo es requerido";
  }

  if (!form.idLigas.trim()) {
    error.idLigas = "El codigo de la liga es requerido";
  }

  return error;
};

const FormTeam = ({ dataToEdit, setDataToEdit, createData, updateData }) => {
  let classes = useStyle();

  const [dataLigas, setDataLigas] = useState();

    //Hood Personalizado para valizado
    const {
        form,
        setForm,
        error,
        setError,
        handleChange,
        handleBlur,
      } = UserForm(initialForm, validationForm);

      const handleSubmit = async (e) => {
        e.preventDefault();
        setError(validationForm(form));
        if (Object.keys(error).length === 0) {
          if (form.idLigas === null) {
            createData(form);
          } else {
            console.log(form);
            updateData(form);
          }
          handleReset();
        }
      };
    
      const handleReset = () => {
        setForm(initialForm);
        setDataToEdit(null);
      };

      useEffect(() => {
        //Se trae el options de paises
        const traerLigas = async () => {
          const data = await helpHttpAxios().get("http://localhost:4000/league");
          setDataLigas(data);
        };
        traerLigas();
      }, []);
    
    

  return (
    <div>
      <Grid container justifyContent="center">
        <h3>{dataToEdit ? "Actualizar Equipo" : "Ingresar Equipo"}</h3>
      </Grid>
      <form onSubmit={handleSubmit}>
        <Grid container justifyContent="center" spacing={1}>
          <Grid item xs={6}>
            <FormControl
              variant="outlined"
              className={classes.formControl}
              size="small"
            >
              <InputLabel htmlFor="outlined-age-native-simple">Ligas</InputLabel>
              <Select
                native
                value={form.idLigas}
                onChange={handleChange}
                label="Pais"
                onBlur={handleBlur}
                name="idLigas"
              >
                <option aria-label="None" value="" />
                {dataLigas &&
                    dataLigas.map((el) => {
                    return (
                      <option key={el.idLigas} value={el.idLigas}>
                        {el.nombreLiga}
                      </option>
                    );
                  })}
              </Select>
            </FormControl>

            {error.idLigas && (
              <Alert severity="warning">{error.idLigas}</Alert>
            )}


          </Grid>
          <Grid item xs={6}>
            <TextField
              type="text"
              name="nombreEquipo"
              label="Nombre Equipo"
              value={form.nombreEquipo}
              onChange={handleChange}
              onBlur={handleBlur}
              className={classes.text}
              variant="outlined"
              size="small"
            />

            {error.nombreEquipo && (
              <Alert severity="warning">{error.nombreEquipo}</Alert>
            )}
          </Grid>
        </Grid>
        <Grid container justifyContent="center" spacing={1}>
          <Grid item xs={6}>
            <Button
              variant="outlined"
              onClick={handleReset}
              type="button"
              color="primary"
              className={classes.boton}
            >
              Limpiar
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              variant="outlined"
              type="submit"
              color="primary"
              className={classes.boton}
            >
              Enviar
            </Button>
          </Grid>
          {/* 
                    {error.errores && error.errores.map((el) => {
                        return (
                            <Message key={el} msg={el} estado={false} />
                        );
                    })}

                    {response && <Message msg={response} estado={true} />} */}
        </Grid>
      </form>
    </div>
  );
};

export default FormTeam;
