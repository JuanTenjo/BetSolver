
const pool = require("../database");

module.exports = function () {

    const RegistrarLigas = async(req) => {
        try {
            
            // let numero = "d";
            // if(isNaN(numero)){
            //     throw new Error("El caracter digitado no es un numero");
            // }

            let query = `INSERT INTO ligas(CodiPais,NombreLiga) Values('${req.CodiPais}','${req.NombreLiga}')`
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

    

    return {
        RegistrarLigas,
    }
}
