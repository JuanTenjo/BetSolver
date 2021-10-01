import React, { useState, useEffect } from "react";
import { helpHttpAxios } from "../../Helpers/helpHttpsAxios";
import UserForm from "../../Hooks/useForm";
import { yellow } from "@material-ui/core/colors";
import UpdateIcon from "@material-ui/icons/Update";
import ModalCompetition from './ModalCompetition';
import API from "../../Utils/dominioBackend";
import {
  Grid,
  makeStyles,
  Button,
  InputLabel,
  FormControl,
  TextField,
  Select,
  Checkbox,
  FormControlLabel,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
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
  },
  InputTime: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
}));

//Inicial Form

const initialForm = {
  idCompeticiones: null,
  idLigaLocal: "",
  idLigaVisitante: "",
  idEquipoLocal: "",
  idEquipoVisitante: "",
  fechaCompeticion: "",
  horaCompeticion: "",
  habiliParley: false,
  estrategias: [],
};

const validationForm = (form) => {
  let error = {};

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
  const {
    form,
    setForm,
    error,
    setError,
    handleChange,
    handleBlur,
    handleChangechecked,
  } = UserForm(initialForm, validationForm);

  const traerPais = async () => {
    const data = await helpHttpAxios().get(`${API.URI}/country`);
    setDataPaises(data);
  };

  useEffect(() => {
    traerPais();
  }, []);



  useEffect(() => {
    const traerLigaLocal = async () => {
      const data = await helpHttpAxios().get(
        `${API.URI}/league/${CodiPaisLocal}`
      );
      setDataLigaLocal(data);
    };

    traerLigaLocal();
  }, [CodiPaisLocal]);

  useEffect(() => {
    const traerLigaVisitante = async () => {
      const data = await helpHttpAxios().get(
        `${API.URI}/league/${CodiPaisVisitante}`
      );
      setDataLigaVisitante(data);
    };

    traerLigaVisitante();
  }, [CodiPaisVisitante]);

  useEffect(() => {
    const traerEquipos = async () => {
      const data = await helpHttpAxios().get(
        `${API.URI}/team/${form.idLigaLocal}`
      );
      setDataEquipoLocal(data);
    };

    traerEquipos();
  }, [form.idLigaLocal]);

  useEffect(() => {
    const traerEquipos = async () => {
      const data = await helpHttpAxios().get(
        `${API.URI}/team/${form.idLigaVisitante}`
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

  // const handleChangeChek = (event) => {
  //   setState({ ...state, [event.target.name]: event.target.checked });
  // };

  const handleUpdate = (data) => {
    console.log(data);
  };

  const handleSubmitDetalleStrategy = (data) => {
    form.estrategias.push(data);
  }

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
                  name="fechaCompeticion"
                  defaultValue={form.fechaCompeticion}
                  label="Fecha de la competencia"
                  onChange={handleChange}
                  type="date"
                  className={classes.DatePicket}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
            </Grid>

            <Grid
              container
              justifyContent="center"
              alignItems="center"
              spacing={1}
            >
              <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                <TextField
                  required={true}
                  name="horaCompeticion"
                  label="Hora de la competencia"
                  onChange={handleChange}
                  type="time"
                  defaultValue={form.horaCompeticion}
                  className={classes.InputTime}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  inputProps={{
                    step: 300, // 5 min
                  }}
                />

                {/* <FormControl
                  variant="outlined"
                  className={classes.formControl}
                  size="small"
                >
                  <InputLabel htmlFor="outlined-age-native-simple">
                    Estrategias
                  </InputLabel>
                  <Select
                    required
                    native
                    value={CodiPaisLocal}
                    onChange={handleSelectPais}
                    label="Estrategias"
                    name="CodiPaisLocal"
                  >
                    <option aria-label="None" value="" />
                    {strategies &&
                      strategies.map((el) => {
                        return (
                          <option key={el.idEstrategia} value={el.idEstrategia}>
                            {el.nombreEstrategia}
                          </option>
                        );
                      })}
                  </Select>
                </FormControl> */}
              </Grid>
              <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={form.habiliParley}
                      onChange={handleChangechecked}
                      name="habiliParley"
                      color="primary"
                    />
                  }
                  label="Habilita Parley"
                />
              </Grid>
            </Grid>

            <Grid container justifyContent="center" spacing={1}>        
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <ModalCompetition handleSubmitDetalleStrategy={handleSubmitDetalleStrategy} />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <h3>Lista de estrategias</h3>
            <TableContainer component={Paper}>
              <Table
                className={classes.table}
                size="small"
                aria-label="a dense table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell style={{ display: "none" }} align="center">
                      ID
                    </TableCell>
                    <TableCell align="center">Estrategia</TableCell>
                    <TableCell align="center">%Local</TableCell>
                    <TableCell align="center">%Visitante</TableCell>
                    <TableCell align="center">$Empate</TableCell>
                    <TableCell align="center">Cuota Local</TableCell>
                    <TableCell align="center">Cuota Visi</TableCell>
                    <TableCell align="center">Cuota Empate</TableCell>
                    <TableCell align="center">Eliminar</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {form.estrategias &&
                    form.estrategias.map((row) => (
                      <TableRow key={row.idEstrategia}>
                        <TableCell style={{ display: "none" }} align="center">
                          {row.idEstrategia}
                        </TableCell>
                        <TableCell align="center">
                          {row.nombreEstrategia}
                        </TableCell>
                        <TableCell align="center">{row.PorceLocal}</TableCell>
                        <TableCell align="center">
                          {row.PorceVisitante}
                        </TableCell>
                        <TableCell align="center">{row.PorceEmpate}</TableCell>
                        <TableCell align="center">{row.cuotaLocal}</TableCell>
                        <TableCell align="center">
                          {row.cuotaVisitante}
                        </TableCell>
                        <TableCell align="center">{row.cuotaEmpate}</TableCell>
                        <TableCell align="center">
                          <IconButton
                            aria-label="UpdateIcon"
                            onClick={() => handleUpdate(row)}
                          >
                            <UpdateIcon
                              style={{ color: yellow[700] }}
                              fontSize="small"
                            />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
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
