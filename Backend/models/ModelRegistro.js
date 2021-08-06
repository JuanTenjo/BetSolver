
const pool = require("../database");

module.exports = function () {

    const RegistrarLigas = async(req) => {
        try {
            
            // let numero = "d";
            // if(isNaN(numero)){
            //     throw new Error("El caracter digitado no es un numero");
            // }

            

            let query = `INSERT INTO ligas(codiPais,nombreLiga) Values('${req.CodiPais}','${req.NombreLiga}')`
            const InsertLiga = await pool.query(query);

            if(InsertLiga.affectedRows <= 0){
                throw new Error("No hubieron errores en la consulta pero no se inserto nada en la base de datos");
            }else{
                return "Se registro correctamente";
            }

        } catch (error) {
            return `Se produjo el siguiente error al registrar la liga: ${error}`;
        }
    }

    const RegistrarPais = async(codigo, nombre, urlLogo) => {
        try {

            let query = `INSERT INTO paises(codigoPais,nombrePais,logoPais) Values('${codigo}','${nombre}','${urlLogo}')`
            const InsertLiga = await pool.query(query);

        } catch (error) {
            return `Se produjo el siguiente error al registrar la liga: ${error}`;
        }
    }

    const RegistrarUsuario = async(params) => {
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

    

    return {
        RegistrarLigas,
        RegistrarPais,
        RegistrarUsuario,
    }
}
