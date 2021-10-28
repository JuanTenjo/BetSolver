import React, { useState } from "react";
import { yellow } from "@material-ui/core/colors";
import UpdateIcon from "@material-ui/icons/Update";
import Dialogo from "../Necesarios/Dialogo";

import {
    makeStyles,
    Grid,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
  } from "@material-ui/core";

//Estilos
const useStyle = makeStyles((theme) => ({
    table: {
      minWidth: 10,
    },
  }));

  const initalDialog = {
    tipo: "",
    funcion: false,
    operacion: "",
  };
  

const TableParley = ({setdataToEdit,dataparley,deleteData}) => {

    
    let classes = useStyle();
    
    const [open, setOpen] = useState(false);
    const [InfoDialog, SetInfoDialog] = useState(initalDialog);

    const handleUpdate = (data) => {

      const row = {
        idUsuarios: data.idUsuarios,
        idRol:  data.idRol,
        codiPais:  data.CodiPais,
        nombre:  data.nombre,
        apellidos:  data.apellidos,
        email:  data.email,
        password: "",
        passwordConfirm: "",
        genero:  data.genero,
        celular:  data.celular,
      };
      
      
      setdataToEdit(row);


    };

    const handleDialog = (operacion, ID) => {
        setOpen(!open);
        SetInfoDialog({
        tipo: "Usuario",
        funcion: deleteData,
        operacion,
        ID,
        });
    };
    


    return (
        <Grid container justifyContent="center">
        <h3>Lista de parleys</h3>
        <TableContainer component={Paper}>
          <Table
            className={classes.table}
            size="small"
            aria-label="a dense table"
          >
            <TableHead>
              <TableRow>
                <TableCell align="center">Num Parley</TableCell>
                <TableCell align="center">Fecha Parley</TableCell>
                <TableCell align="center">Cuota Total</TableCell>
                <TableCell align="center">Modificar</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dataparley &&
                dataparley.map((row) => (
                  <TableRow key={row.idparleys}>

                    <TableCell align="center">{row.idparleys}</TableCell>
                    <TableCell align="center">{row.fechaIngreso}</TableCell>
                    <TableCell align="center">{row.cuotaTotal}</TableCell>
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
  
        {open ? (
          <Dialogo handleDialog={handleDialog} InfoDialog={InfoDialog} />
        ) : null}
      </Grid>
    );
}

export default TableParley;