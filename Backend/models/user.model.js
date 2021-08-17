const pool = require('../config/database')

const model = {};

model.registerUser = async (params) => {
    try {

        let query = `INSERT INTO usuarios(CodiPais,nombre,apellidos,email,password,genero,celular) Values('${params.CodiPais}','${params.nombre}','${params.apellidos}','${params.email}','${params.password}','${params.genero}','${params.celular}')`

        const InsertUser = await pool.query(query);

        let estado = InsertUser.affectedRows > 0 ?  true : false
        
        return estado;

    } catch (err) {
        return {
            error: true,
            mensaje: `Hubo un error al insertar el usuario en el Model: user.model, en la funcion: registerUser. ERROR: ${err.sqlMessage} `,
            respuesta: false
        };
    }
}

model.updateUser = async (params) => {
    try {

        let query = `UPDATE usuarios SET CodiPais = '${params.CodiPais}', idRol = '${params.idRol}', nombre = '${params.nombre}', apellidos = '${params.apellidos}'
        , genero = '${params.genero}', celular = '${params.celular}' WHERE idUsuarios = ${params.id}`

        const UpdateUser = await pool.query(query);

        let estado = UpdateUser.affectedRows > 0 ?  true : false
        
        return estado;

    } catch (err) {
        return {
            error: true,
            mensaje: `Hubo un error al actualizar el usuario en el Model: user.model, en la funcion: updateUser. ERROR: ${err.sqlMessage} `,
            respuesta: false
        };
    }
}

model.deleteUser = async (ID) => {
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

model.users = async (ID) => {
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