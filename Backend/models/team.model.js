const pool = require('../config/database')

const model = {};

model.register = async (params) => {
    try {

        let query = `INSERT INTO equipos(idLigas,nombreEquipo) Values('${params.idLigas}','${params.nombreEquipo}')`

        const InsertLiga = await pool.query(query);

        let estado = InsertLiga.affectedRows > 0 ?  true : false
        
        return estado;

    } catch (err) {
        return {
            error: true,
            mensaje: [`Hubo un error al insertar el equipo en el Model: team.model, en la funcion: register. ERROR: ${err.sqlMessage} `],
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
            mensaje: [`Hubo un error al actualizar el equipo en el Model: team.model, en la funcion: update. ERROR: ${err.sqlMessage} `],
            respuesta: false
        };
    }
}

model.erase = async (idEquipos) => {
    try {

        let query = `UPDATE equipos SET habilitado = !habilitado WHERE idEquipos = ${idEquipos}`

        const DeleteEquipo = await pool.query(query);

        let estado = DeleteEquipo.affectedRows > 0 ?  true : false
        
        return estado;

    } catch (err) {
        return {
            error: true,
            mensaje: [`Hubo un error al desabilitar el equipo en el Model: team.model, en la funcion: erase. ERROR: ${err.sqlMessage} `],
            respuesta: false
        };
    }
}

model.teams = async (idLiga = null) => {
    try {  

        if(idLiga){

            let query = `SELECT p.*, l.nombreLiga, l.codiPais FROM equipos as p, ligas as l WHERE p.idLigas = l.idLigas and p.idLigas = ${idLiga} order by nombreLiga, NombreEquipo`;

            const Teams = await pool.query(query);
    
            return Teams;
            
        }else{
            let query = `SELECT p.*, l.nombreLiga, l.codiPais FROM equipos as p, ligas as l where p.idLigas = l.idLigas order by nombreLiga, NombreEquipo`

            const Teams = await pool.query(query);
    
            return Teams;          
        }

    } catch (err) {
        return {
            error: true,
            mensaje: [`Hubo un error al traer los equipos en el Model: team.model, en la funcion: teams. ERROR: ${err.sqlMessage} `],
            respuesta: false
        };
    }
}

module.exports = model;