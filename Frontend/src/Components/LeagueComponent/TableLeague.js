import React from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import { yellow, red } from '@material-ui/core/colors';
import UpdateIcon from '@material-ui/icons/Update';
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
    IconButton
} from '@material-ui/core'
//Estilos
const useStyle = makeStyles((theme) => ({
    table: {
        minWidth: 10,
    },
}));


const UserTable = ({ setdataToEdit, dataLigas }) => {

    let classes = useStyle();

    return (

        <Grid container justifyContent="center">
            <h3>Lista de ligas</h3>
            <TableContainer component={Paper}>
                <Table className={classes.table} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell style={{ display: 'none', }} align="center">ID</TableCell>
                            <TableCell align="center">Pais</TableCell>
                            <TableCell align="center">Liga</TableCell>
                            <TableCell align="center">Habilitada</TableCell>
                            <TableCell align="center">Editar</TableCell>
                            <TableCell align="center">Eliminar</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {dataLigas && dataLigas.map((row) => (
                            <TableRow key={row.idLigas}>
                                {/* <TableCell component="th" scope="row">
                                            {row.name}
                                        </TableCell> */}
                                <TableCell style={{ display: 'none', }} align="center">{row.idLigas}</TableCell>
                                <TableCell align="center"><img src={row.logoPais} width="40px" alt={row.nombrePais}/><p style={{margin:3}}>{row.nombrePais}</p></TableCell>
                                <TableCell align="center">{row.nombreLiga}</TableCell>
                                <TableCell align="center">{row.habilitada === 1 ? 'Si' : 'No'}</TableCell>
                                <TableCell align="center">
                                    <IconButton aria-label="UpdateIcon" onClick={() => setdataToEdit(row)}>
                                        <UpdateIcon style={{ color: yellow[700] }} fontSize="small" />
                                    </IconButton>
                                </TableCell>
                                <TableCell align="center">
                                    <IconButton aria-label="delete">
                                        <DeleteIcon style={{ color: red[700] }} fontSize="small" />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Grid>
    );
}

export default UserTable;