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

        let query = `INSERT INTO competencias(idLigas,idEquipoLocal,idEquipoVisitante,fechaCompeticion,horaCompeticion,habiliParley)
        Values(${params.idLigas},${params.idEquipoLocal},${params.idEquipoVisitante},'${params.fechaCompeticion}','${params.horaCompeticion}',${params.habiliParley})`

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

model.registerEstrategias = async (estrategias,IDCompeticion) => {
    try {

        let query = `INSERT INTO detallecompentencia(idCompeticion,idEstrategia,PorceLocal,PorceVisitante,PorceEmpate,cuotaLocal,cuotaVisitante,cuotaEmpate)
        Values('${IDCompeticion}','${estrategias.idEstrategia}','${estrategias.PorceLocal}','${estrategias.PorceVisitante}','${estrategias.PorceEmpate}','${estrategias.cuotaLocal}','${estrategias.cuotaVisitante}','${estrategias.cuotaEmpate}')`

        const InsertDetail = await pool.query(query);

        let estado = InsertDetail.affectedRows > 0 ?  true : false
        
        return estado;

    } catch (err) {
        return {
            error: true,
            mensaje: `Hubo un error al insertar el detalle de la competicion en el Model: comptetition.model, en la funcion: registerEstrategias. ERROR: ${err.sqlMessage} `,
            respuesta: false
        };
    }
}

model.deleteEstrategias = async (idCompeticiones) => {
    try {

        let query = `DELETE FROM detallecompentencia WHERE idCompeticion =  ${idCompeticiones}`

        const deleteDetail = await pool.query(query);

        let estado = deleteDetail.affectedRows > 0 ?  true : false
        
        return estado;

    } catch (err) {
        return {
            error: true,
            mensaje: `Hubo un error al actualizar el detalle de la competicion en el Model: comptetition.model, en la funcion: deleteEstrategias. ERROR: ${err.sqlMessage} `,
            respuesta: false
        };
    }
}

model.update = async (params) => {
    try {

        let query = `UPDATE competencias SET idLigas = ${params.idLigas}, idEquipoLocal = ${params.idEquipoLocal}, idEquipoVisitante = ${params.idEquipoVisitante}, golesLocal = '${params.golesLocal}', golesVisitante = '${params.golesVisitante}',
        fechaCompeticion = '${params.fechaCompeticion}', horaCompeticion = '${params.horaCompeticion}', habilitado = ${params.habilitado}, habiliParley = ${params.habiliParley} WHERE idCompeticiones = ${params.idCompeticiones}`
   
        const UpdateCompeticion = await pool.query(query);

        let estado = UpdateCompeticion.affectedRows > 0 ?  true : false
        
        return estado;

    } catch (err) {
        return {
            error: true,
            mensaje: `Hubo un error al actualizar el enfrentamiento, en el Model: competition.model, en la funcion: update. ERROR: ${err.sqlMessage} `,
            respuesta: false
        };
    }
}

model.erase = async (idCompeticiones) => {
    try {

        let query = `DELETE FROM competencias WHERE idCompeticiones = ${idCompeticiones}`

        const DeleteCompe = await pool.query(query);

        let estado = DeleteCompe.affectedRows > 0 ?  true : false
        
        return estado;

    } catch (err) {
        return {
            error: true,
            mensaje: `Hubo un error al desabilitar el equipo en el Model: competition.model, en la funcion: erase. ERROR: ${err.sqlMessage} `,
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