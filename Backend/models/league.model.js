const pool = require('../config/database')

const model = {};

model.register = async (params) => {
    try {

        let query = `INSERT INTO ligas(CodiPais,nombreLiga) Values('${params.CodiPais}','${params.nombreLiga}')`

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

        let query = `UPDATE ligas SET CodiPais = '${params.CodiPais}', nombreLiga = '${params.nombreLiga}', habilitada = '${params.habilitada}' WHERE idLigas = ${params.idLigas}`

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

model.erase = async (ID) => {
    try {

        let query = `DELETE FROM usuarios WHERE idUsuarios = ${ID}`

        const DeleteUser = await pool.query(query);

        let estado = DeleteUser.affectedRows > 0 ?  true : false
        
        return estado;

    } catch (err) {
        return {
            error: true,
            mensaje: `Hubo un error al eliminar el usuario en el Model: user.model, en la funcion: deleteUser. ERROR: ${err.sqlMessage} `,
            respuesta: false
        };
    }
}

model.leagues = async (ID) => {
    try {

        let query = `SELECT idUsuarios, usuarios.idRol, roles.Nombre as NombreRol, CodiPais, usuarios.nombre, apellidos, email, genero, usuario, celular FROM usuarios inner join roles on usuarios.idRol = roles.idRol`

        const Users = await pool.query(query);

        return Users;

    } catch (err) {
        return {
            error: true,
            mensaje: `Hubo un error al traer los usuarios en el Model: user.model, en la funcion: users. ERROR: ${err.sqlMessage} `,
            respuesta: false
        };
    }
}

module.exports = model;