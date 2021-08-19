const pool = require('../config/database')

const model = {};


model.validarCompetition = async (params) => {
    try {

        let query = `SELECT * FROM competencias WHERE (idLigas = '${params.idLigas}' and idEquipoLocal = '${params.idEquipoLocal}' and idEquipoVisitante = '${params.idEquipoVisitante}'
        and fechaCompeticion = '${params.fechaCompeticion}' and horaCompeticion = '${params.horaCompeticion}')`

        const validar = await pool.query(query);

        return validar[0];

    } catch (err) {
        return {
            error: true,
            mensaje: `Hubo un error al insertar el quipo en el Model: comptetition.model, en la funcion: register. ERROR: ${err.sqlMessage} `,
            respuesta: false
        };
    }
}

model.register = async (params) => {
    try {

        let query = `INSERT INTO competencias(idLigas,idEquipoLocal,idEquipoVisitante,fechaCompeticion,horaCompeticion)
        Values('${params.idLigas}','${params.idEquipoLocal}','${params.idEquipoVisitante}','${params.fechaCompeticion}','${params.horaCompeticion}')`

        const InsertCompetition = await pool.query(query);

        let estado = InsertCompetition.affectedRows > 0 ?  true : false
        
        return estado;

    } catch (err) {
        return {
            error: true,
            mensaje: `Hubo un error al insertar el quipo en el Model: comptetition.model, en la funcion: register. ERROR: ${err.sqlMessage} `,
            respuesta: false
        };
    }
}
model.traerUltimoID = async () => {
    try {

        let query = `SELECT MAX(idCompeticiones) AS MaxID FROM competencias`

        const result = await pool.query(query);
    
        return result[0].MaxID;

    } catch (err) {
        return {
            error: true,
            mensaje: `Hubo un error al insertar el quipo en el Model: comptetition.model, en la funcion: traerUltimoID. ERROR: ${err.sqlMessage} `,
            respuesta: false
        };
    }
}

model.update = async (params) => {
    try {

        let query = `UPDATE equipos SET idLigas = '${params.idLigas}', nombreEquipo = '${params.nombreEquipo}', habilitado = '${params.habilitado}' WHERE idEquipos  = ${params.idEquipos}`

        const UpdateLiga = await pool.query(query);

        let estado = UpdateLiga.affectedRows > 0 ?  true : false
        
        return estado;

    } catch (err) {
        return {
            error: true,
            mensaje: `Hubo un error al actualizar la liga en el Model: team.model, en la funcion: update. ERROR: ${err.sqlMessage} `,
            respuesta: false
        };
    }
}

model.erase = async (idEquipos) => {
    try {

        let query = `UPDATE equipos SET habilitado = 0 WHERE idEquipos = ${idEquipos}`

        const DeleteEquipo = await pool.query(query);

        let estado = DeleteEquipo.affectedRows > 0 ?  true : false
        
        return estado;

    } catch (err) {
        return {
            error: true,
            mensaje: `Hubo un error al desabilitar el equipo en el Model: team.model, en la funcion: erase. ERROR: ${err.sqlMessage} `,
            respuesta: false
        };
    }
}

model.teams = async () => {
    try {

        let query = `SELECT * FROM equipos`

        const Users = await pool.query(query);

        return Users;

    } catch (err) {
        return {
            error: true,
            mensaje: `Hubo un error al traer las ligas en el Model: league.model, en la funcion: leagues. ERROR: ${err.sqlMessage} `,
            respuesta: false
        };
    }
}

module.exports = model;