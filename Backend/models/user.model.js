const pool = require('../config/database')

const model = {};

model.registerUser = async (params) => {
    try {

        let query = `INSERT INTO usuarios(idRol,codiPais,nombre,apellidos,email,password,genero,celular) Values('${params.idRol}','${params.codiPais}','${params.nombre}','${params.apellidos}','${params.email}','${params.password}','${params.genero}','${params.celular}')`

        const InsertUser = await pool.query(query);

        let estado = InsertUser.affectedRows > 0 ?  true : false
        
        return estado;

    } catch (err) {
        return {
            error: true,
            mensaje: [`Hubo un error al insertar el usuario en el Model: user.model, en la funcion: registerUser. ERROR: ${err.sqlMessage} `],
            respuesta: false
        };
    }
}

model.updateUser = async (params) => {
    try {

        let query = `UPDATE usuarios SET codiPais = '${params.codiPais}', idRol = '${params.idRol}', nombre = '${params.nombre}', email = '${params.email}', apellidos = '${params.apellidos}'
        , genero = '${params.genero}', celular = '${params.celular}' WHERE idUsuarios = ${params.idUsuarios}`

        const UpdateUser = await pool.query(query);

        let estado = UpdateUser.affectedRows > 0 ?  true : false
        
        return estado;

    } catch (err) {
        return {
            error: true,
            mensaje: [`Hubo un error al actualizar el usuario en el Model: user.model, en la funcion: updateUser. ERROR: ${err.sqlMessage} `],
            respuesta: false
        };
    }
}

model.deleteUser = async (ID) => {
    try {

        let query = `UPDATE usuarios SET habilitado = !habilitado WHERE idUsuarios = ${ID}`

        const DeleteUser = await pool.query(query);

        let estado = DeleteUser.affectedRows > 0 ?  true : false
        
        return estado;

    } catch (err) {
        return {
            error: true,
            mensaje: [`Hubo un error al desabilitar el usuario en el Model: user.model, en la funcion: deleteUser. ERROR: ${err.sqlMessage}`],
            respuesta: false
        };
    }
}

model.users = async (ID) => {
    try {

        let query = `SELECT idUsuarios, usuarios.idRol, roles.Nombre as NombreRol, usuarios.CodiPais, paises.nombrePais, usuarios.nombre, apellidos, email, genero, usuario, celular, usuarios.habilitado 
		FROM usuarios inner join roles on usuarios.idRol = roles.idRol inner join paises on paises.codiPais = usuarios.CodiPais  `

        const Users = await pool.query(query);

        return Users;

    } catch (err) {
        return {
            error: true,
            mensaje: [`Hubo un error al traer los usuarios en el Model: user.model, en la funcion: users. ERROR: ${err.sqlMessage} `],
            respuesta: false
        };
    }
}


model.roles = async (ID) => {
    try {

        let query = `SELECT * FROM roles`

        const Roles = await pool.query(query);

        return Roles;

    } catch (err) {
        return {
            error: true,
            mensaje: [`Hubo un error al traer los roles en el Model: user.model, en la funcion: users. ERROR: ${err.sqlMessage} `],
            respuesta: false
        };
    }
}

module.exports = model;