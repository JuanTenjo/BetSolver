import React, { useState, useEffect } from "react";
import { helpHttpAxios } from "../../Helpers/helpHttpsAxios";
import TableCompetition from "./TableCompetition"
import Alert from "@material-ui/lab/Alert";
import { yellow } from "@material-ui/core/colors";
import API from "../../Utils/dominioBackend";
import UpdateIcon from "@material-ui/icons/Update";

import {
  Grid,
  makeStyles,
  Button,
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
  }
}));

//Inicial Form
const initialForm = {
  "competencia1": "",
  "competencia2": "",
  "competencia3": "",
  "competencia4": "",
  "cuotaTotal": ""
};

const initialFormCompe = [{
  "idCompeticiones": 51,
  "habiliParley": 1,
  "codiPaisLocal": "AF",
  "idLigaLocal": 38,
  "ligaLocal": "Aguila",
  "codiPaisVisi": "CO",
  "idLigaVisitante": 47,
  "ligaVisitante": "LigaColombiana",
  "idEquipoLocal": 8,
  "equipoLocal": "HuilaActualizado",
  "idEquipoVisitante": 13,
  "equipoVisitante": "EquipoColombiana2",
  "fechaCompeticion": "2021-10-06",
  "horaCompeticion": "20:00:00",
  "golesLocal": 0,
  "golesVisitante": 0,
  "habilitado": 1
}];





const FormParley = ({ dataToEdit, setDataToEdit, createData, updateData }) => {

  let classes = useStyle();

  const [dataCompetition, setDataCompetition] = useState(null);

  const [parley, setParley] = useState(initialForm);

  const [competitionSelect, setCompetitionSelect] = useState(initialFormCompe);

  useEffect(() => {
    const traerCompeticiones = async () => {
      const data = await helpHttpAxios().get(`${API.URI}/parley/teamAval`);
      setDataCompetition(data);
    };

    traerCompeticiones();

  }, []);

  useEffect(() => {
    //Evalua cualquier cambio que tenga esa variable, esta oyendo siempre
    // if (dataToEdit) {

    //   setForm(dataToEdit);
    //   setError(validationForm(dataToEdit));
    // } else {



    //   setForm(initialForm);
    // }
  }, [dataToEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
  }

  const addCompetitionParley = async (row) => {


    //setCompetitionSelect(competitionSelect => [...competitionSelect, row]);
    setCompetitionSelect([...competitionSelect, row]);
  }


  const handleReset = () => {
    setParley(initialForm);
    setDataToEdit(null);
  };

  return (
    <div>
      <Grid container justifyContent="center">
        <h3>{dataToEdit ? "Actualizar Parley" : "Ingresar Parley"}</h3>
      </Grid>
        <Grid container justifyContent="center" spacing={1}>
          <Grid item xs={6}>

            <TableCompetition addCompetitionParley={addCompetitionParley} dataCompetition={dataCompetition}/>
       
          </Grid>
          <Grid item xs={6}>
          <h5>Competencias del parley</h5>
          {competitionSelect ?
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
                    <TableCell align="center">Fecha</TableCell>
                    <TableCell align="center">Hora</TableCell>
                    <TableCell align="center">Local</TableCell>
                    <TableCell align="center">vs</TableCell>
                    <TableCell align="center">Visitante</TableCell>
                    <TableCell align="center">Agregar</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                    {competitionSelect.map((row) => (
                      <TableRow key={row.idCompeticiones}>

                        <TableCell style={{ display: "none" }} align="center">{row.idCompeticiones}</TableCell>
                        <TableCell align="center">{row.fechaCompeticion}</TableCell>
                        <TableCell align="center">{row.horaCompeticion}</TableCell>
                        <TableCell align="center">{row.equipoLocal}</TableCell>
                        <TableCell align="center">VS</TableCell>
                        <TableCell align="center">{row.equipoVisitante}</TableCell>
                        <TableCell align="center">
                          <IconButton
                            aria-label="UpdateIcon"
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
          : <h5>Selecciona las competencias para agregar al parley</h5>}
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
    </div>
  );
};

export default FormParley;
