import React, { useState, useEffect } from "react";
import { helpHttpAxios } from "../../Helpers/helpHttpsAxios";
import UserForm from "../../Hooks/useForm";

import {
  Grid,
  makeStyles,
  Button,
  InputLabel,
  FormControl,
  TextField,
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
  Label: {
    textAlign: "center",
  },
  DatePicket: {
    width: "100%",
    marginTop: theme.spacing(1),
  }
  
}));

//Inicial Form

const estrategias = {
  idEstrategia: "",
  PorceLocal: "",
  PorceVisitante: "",
  PorceEmpate: "",
  cuotaLocal: "",
  cuotaVisitante: "",
  cuotaEmpate: "",
};

const initialForm = {
  idCompeticiones: null,
  idLigaLocal: "",
  idLigaVisitante: "",
  idEquipoLocal: "",
  idEquipoVisitante: "",
  fechaCompeticion: "",
  horaCompeticion: "",
  habiliParley: "",
  estrategias: [estrategias],
};

const validationForm = (form) => {
  let error = {};

  //let regexName = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/; //Validacion para nombre

  //Trim se hace para bloquear que no se termine ni empiece con un caracter especial o un espacio en blanco
  // if (!form.nombre.trim()) {
  //   error.nombre = "El campo nombre es requerido";
  // }

  // if (!form.apellidos.trim()) {
  //   error.apellidos = "El campo apellido es requerido";
  // }

  // if (form.idUsuarios === null) {

  //   if (!form.password.trim()) {
  //     error.password = "El campo password es requerido";
  //   }else{

  //       if(form.password !== form.passwordConfirm){
  //         error.password = "El campo password y confirme password no son iguales";
  //       }

  //   }

  //     if (!form.passwordConfirm.trim()) {
  //       error.passwordConfirm = "Debes confirmar la password";
  //     }

  // }

  // if (!form.email.trim()) {
  //   error.email = "El campo email es requerido";
  // }
  // if (!form.genero.trim()) {
  //   error.genero = "El campo genero es requerido";
  // }
  // if (!form.celular.trim()) {
  //   error.celular = "El campo celular es requerido";
  // }

  // if (form.idRol === "" || form.idRol === null) {
  //   error.idRol = "El permiso del usuario es requerido";
  // }

  // if (form.codiPais === "" || form.codiPais === null) {
  //   error.codiPais = "El codigo del pais es requerido";
  // }

  return error;
};

const FormCompetition = ({
  dataToEdit,
  setDataToEdit,
  createData,
  updateData,
}) => {
  let classes = useStyle();

  const [dataPaises, setDataPaises] = useState(null);
  const [dataLigaLocal, setDataLigaLocal] = useState(null);
  const [dataLigaVisitante, setDataLigaVisitante] = useState(null);
  const [dataEquipoLocal, setDataEquipoLocal] = useState(null);
  const [dataEquipoVisitante, setDataEquipoVisitante] = useState(null);

  const [CodiPaisLocal, setCodiPaisLocal] = useState("");
  const [CodiPaisVisitante, setCodiPaisVisitante] = useState("");
  //Hood Personalizado para valizado
  const { form, setForm, error, setError, handleChange, handleBlur } = UserForm(
    initialForm,
    validationForm
  );

  const traerPais = async () => {
    const data = await helpHttpAxios().get("http://localhost:4000/country");
    setDataPaises(data);
  };

  useEffect(() => {
    traerPais();
  }, []);

  useEffect(() => {
    const traerLigaLocal = async () => {
      const data = await helpHttpAxios().get(
        `http://localhost:4000/league/${CodiPaisLocal}`
      );
      setDataLigaLocal(data);
    };

    traerLigaLocal();
  }, [CodiPaisLocal]);

  useEffect(() => {
    const traerLigaVisitante = async () => {
      const data = await helpHttpAxios().get(
        `http://localhost:4000/league/${CodiPaisVisitante}`
      );
      setDataLigaVisitante(data);
    };

    traerLigaVisitante();
  }, [CodiPaisVisitante]);

  useEffect(() => {
    const traerEquipos = async () => {
      const data = await helpHttpAxios().get(
        `http://localhost:4000/team/${form.idLigaLocal}`
      );
      setDataEquipoLocal(data);
    };

    traerEquipos();
  }, [form.idLigaLocal]);

  useEffect(() => {
    const traerEquipos = async () => {
      const data = await helpHttpAxios().get(
        `http://localhost:4000/team/${form.idLigaVisitante}`
      );
      setDataEquipoVisitante(data);
    };

    traerEquipos();
  }, [form.idLigaVisitante]);

  // useEffect(() => {
  //   //Evalua cualquier cambio que tenga esa variable, esta oyendo siempre
  //   if (dataToEdit) {

  //     document.getElementById("password").setAttribute("disabled","");
  //     document.getElementById("passwordConfirm").setAttribute("disabled","");

  //     setForm(dataToEdit);
  //     setError(validationForm(dataToEdit));
  //   } else {

  //     document.getElementById("password").removeAttribute("disabled");
  //     document.getElementById("passwordConfirm").removeAttribute("disabled");

  //     setForm(initialForm);
  //   }
  // }, [dataToEdit, setForm, setError]);

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

  const handleSelectPais = (e) => {
    setCodiPaisLocal(e.target.value);
  };
  const handleSelectPaisVisi = (e) => {
    setCodiPaisVisitante(e.target.value);
  };

  return (
    <div>
      <Grid container justifyContent="center">
        <h3>
          {dataToEdit ? "Actualizar Competicion" : "Ingresar Competencia"}
        </h3>
      </Grid>

      <form onSubmit={handleSubmit}>
        <Grid container justifyContent="center" spacing={1}>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <Grid container justifyContent="center" spacing={1}>
              <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                <p className={classes.Label}>Equipo Local</p>

                <FormControl
                  variant="outlined"
                  className={classes.formControl}
                  size="small"
                >
                  <InputLabel htmlFor="outlined-age-native-simple">
                    Pais
                  </InputLabel>
                  <Select
                    required
                    native
                    value={CodiPaisLocal}
                    onChange={handleSelectPais}
                    label="Pais"
                    name="CodiPaisLocal"
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

                {CodiPaisLocal && (
                  <FormControl
                    variant="outlined"
                    className={classes.formControl}
                    size="small"
                  >
                    <InputLabel htmlFor="outlined-age-native-simple">
                      Liga Local
                    </InputLabel>
                    <Select
                      required
                      native
                      value={form.idLigaLocal}
                      onChange={handleChange}
                      label="Liga Local"
                      onBlur={handleBlur}
                      name="idLigaLocal"
                    >
                      <option aria-label="None" value="" />
                      {dataLigaLocal &&
                        dataLigaLocal.map((el) => {
                          return (
                            <option key={el.idLigas} value={el.idLigas}>
                              {el.nombreLiga}
                            </option>
                          );
                        })}
                    </Select>
                  </FormControl>
                )}

                {form.idLigaLocal && (
                  <FormControl
                    variant="outlined"
                    className={classes.formControl}
                    size="small"
                  >
                    <InputLabel htmlFor="outlined-age-native-simple">
                      Equipo Local
                    </InputLabel>
                    <Select
                      required
                      native
                      value={form.idEquipoLocal}
                      onChange={handleChange}
                      label="Equipo Local"
                      onBlur={handleBlur}
                      name="idEquipoLocal"
                    >
                      <option aria-label="None" value="" />
                      {dataEquipoLocal &&
                        dataEquipoLocal.map((el) => {
                          return (
                            <option key={el.idEquipos} value={el.idEquipos}>
                              {el.nombreEquipo}
                            </option>
                          );
                        })}
                    </Select>
                  </FormControl>
                )}
              </Grid>
              <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                <p className={classes.Label}>Equipo Visitante</p>
                <FormControl
                  variant="outlined"
                  className={classes.formControl}
                  size="small"
                >
                  <InputLabel htmlFor="outlined-age-native-simple">
                    Pais
                  </InputLabel>
                  <Select
                    required
                    native
                    value={CodiPaisVisitante}
                    onChange={handleSelectPaisVisi}
                    label="Pais"
                    name="CodiPaisVisitante"
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

                {CodiPaisVisitante && (
                  <FormControl
                    variant="outlined"
                    className={classes.formControl}
                    size="small"
                  >
                    <InputLabel htmlFor="outlined-age-native-simple">
                      Liga Visitante
                    </InputLabel>
                    <Select
                      required
                      native
                      value={form.idLigaVisitante}
                      onChange={handleChange}
                      label="Liga Visitante"
                      onBlur={handleBlur}
                      name="idLigaVisitante"
                    >
                      <option aria-label="None" value="" />
                      {dataLigaVisitante &&
                        dataLigaVisitante.map((el) => {
                          return (
                            <option key={el.idLigas} value={el.idLigas}>
                              {el.nombreLiga}
                            </option>
                          );
                        })}
                    </Select>
                  </FormControl>
                )}

                {form.idLigaVisitante && (
                  <FormControl
                    variant="outlined"
                    className={classes.formControl}
                    size="small"
                  >
                    <InputLabel htmlFor="outlined-age-native-simple">
                      Equipo Visitante
                    </InputLabel>
                    <Select
                      required
                      native
                      value={form.idEquipoVisitante}
                      onChange={handleChange}
                      label="Equipo Visitante"
                      onBlur={handleBlur}
                      name="idEquipoVisitante"
                    >
                      <option aria-label="None" value="" />
                      {dataEquipoVisitante &&
                        dataEquipoVisitante.map((el) => {
                          return (
                            <option key={el.idEquipos} value={el.idEquipos}>
                              {el.nombreEquipo}
                            </option>
                          );
                        })}
                    </Select>
                  </FormControl>
                )}
              </Grid>
            </Grid>
            <Grid container justifyContent="center" spacing={1}>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <TextField
                  required={true}
                  id="date"
                  label="Fecha de la competencia"
                  type="date"
                  defaultValue="2017-05-24"
                  className={classes.DatePicket}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <h1>Tabla Estrategias</h1>
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
        </Grid>
      </form>
    </div>
  );
};

export default FormCompetition;
