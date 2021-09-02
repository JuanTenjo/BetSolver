const pool = require('../config/database')

const model = {};

model.register = async (params) => {
    try {

        let query = `INSERT INTO ligas(codiPais,nombreLiga) Values('${params.codiPais}','${params.nombreLiga}')`

        const InsertLiga = await pool.query(query);

        let estado = InsertLiga.affectedRows > 0 ?  true : false
        
        return estado;

    } catch (err) {
        return {
            error: true,
            mensaje: `Hubo un error al insertar la liga en el Model: league.model, en la funcion: register. ERROR: ${err.sqlMessage} `,
            respuesta: false
        };
    }
}

model.update = async (params) => {
    try {

        let query = `UPDATE ligas SET CodiPais = '${params.codiPais}', nombreLiga = '${params.nombreLiga}', habilitada = '${params.habilitada}' WHERE idLigas = ${params.idLigas}`

        const UpdateLiga = await pool.query(query);

        let estado = UpdateLiga.affectedRows > 0 ?  true : false
        
        return estado;

    } catch (err) {
        return {
            error: true,
            mensaje: `Hubo un error al actualizar la liga en el Model: league.model, en la funcion: update. ERROR: ${err.sqlMessage} `,
            respuesta: false
        };
    }
}

model.erase = async (idLigas) => {
    try {

        let query = `UPDATE ligas SET habilitada = 0 WHERE idLigas = ${idLigas}`

        const DeleteUser = await pool.query(query);

        let estado = DeleteUser.affectedRows > 0 ?  true : false
        
        return estado;

    } catch (err) {
        return {
            error: true,
            mensaje: `Hubo un error al desabilitar la liga en el Model: league.model, en la funcion: erase. ERROR: ${err.sqlMessage} `,
            respuesta: false
        };
    }
}

model.leagues = async (codiPais = null) => {
    try {

        if(codiPais){
            
            let query = `SELECT ligas.*, paises.logoPais, paises.nombrePais FROM ligas inner join paises on ligas.codiPais = paises.codiPais WHERE codiPais = '${codiPais}'`

            const Ligas  = await pool.query(query);
    
            return Ligas;

        }else{
            
            let query = `SELECT ligas.*, paises.logoPais, paises.nombrePais FROM ligas inner join paises on ligas.codiPais = paises.codiPais`

            const Ligas  = await pool.query(query);
    
            return Ligas;

        }


    } catch (err) {
        return {
            error: true,
            mensaje: `Hubo un error al traer las ligas en el Model: league.model, en la funcion: leagues. ERROR: ${err.sqlMessage} `,
            respuesta: false
        };
    }
}

module.exports = model;