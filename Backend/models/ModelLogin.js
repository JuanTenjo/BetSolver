
const pool = require("../database");

module.exports = function () {

    // const ValidarUser = async (username,password) => {
    //     try {
            
    //         let query = `SELECT idUsuarios,idRol,nombre,apellidos,correo,genero,usuario FROM usuarios where (correo = '${username}' or usuario = '${username}') and password = '${password}' `
    //         const session = await pool.query(query);

    //         if(!session[0]){
    //             return {
    //                 session: false,
    //                 error : false,
    //                 message : "Usuario o contraseña incorreccta",
    //                 data: null,
    //                 tipo: "Validacion Login",             
    //                 status : 400,
    //             };
    //         }else{
    //             return {
    //                 session: true,
    //                 error : false,
    //                 message : "Ingreso Exitoso",
    //                 data: session[0],
    //                 tipo: "Validacion Login",             
    //                 status : 200,
    //             };
    //         }



    //     } catch (error) {
    //         return {
    //             session: false,
    //             error : true,
    //             message : "Hubo un error en el Model: ModelLogin en la funcion: ValidarLogin",
    //             data: null,
    //             tipo: error.sqlMessage,             
    //             status : error.sqlState,            
    //         };
    //     }
    // }

    const ValidarUser = async (email) => {
        try {

        let query = `SELEdCT idUsuarios,idRol,nombre,apellidos,correo,genero,usuario,password FROM usuarios where correo = '${email}'`

        const session = await pool.query(query);

        return session;

        }catch (err) {
            return {
                error: true,
                mensaje: `Hubo un error al validar el usuario en el Model: ModelLogin, en la funcion: ValidaUser. ERROR: ${err.sqlMessage} `
            };
        }
    }

    return {
        ValidarUser
    }
}
