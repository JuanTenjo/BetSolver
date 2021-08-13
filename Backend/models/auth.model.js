const pool = require('../config/database')

const model = {};

model.registerUser = async (params) => {
    try {

        let query = `INSERT INTO usuarios(CodiPais,nombre,apellidos,email,password,genero,celular) Values('${params.idPais}','${params.nombreUsuario}','${params.apellidoUsuario}','${params.email}','${params.password}','${params.genero}','${params.celular}')`

        const InsertLiga = await pool.query(query);

        let estado = InsertLiga.affectedRows > 0 ?  true : false
        
        return estado;

    } catch (err) {
        return {
            error: true,
            mensaje: `Hubo un error al validar el usuario en el Model: ModelRegistro, en la funcion: RegistrarUsuario. ERROR: ${err.sqlMessage} `,
            respuesta: false
        };
    }
}

model.findUserByEmail = async function (email) {
    const sql = `SELECT * FROM user where email = '${email}'`;
    const result = await pool.query(sql);
    return result
}

model.findUserById = async function(data){
    console.log(data);
    const sql = `SELECT * FROM usuarios where idUsuarios = ${data.id}`;
    const result = pool.query(sql);
    return result
}

module.exports = model;