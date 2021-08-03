
const pool = require("../database");

module.exports = function () {

    const ValidarLiga = async(NombreLiga) => {
        try{

            let query = `SELECT COUNT(nombreLiga) AS Existe FROM ligas WHERE nombreLiga = '${NombreLiga}' `

            const ValidarLiga = await pool.query(query);

            if(ValidarLiga.Existe > 0){
                return true;
            }else{
                return false;
            }


         } catch (error) {
            return `Se produjo el siguiente error al validar la liga: ${error}`;
        }
    }

    const ValidarPais = async(CodiPais) => {
        try {
            
            let query = `Select count(codigoPais) as Existe FROM paises WHERE codigoPais = '${CodiPais}'`

            const ValidarPais = await pool.query(query);

            console.log(ValidarPais[0].Existe);

            if(ValidarPais[0].Existe > 0){
                return true;
            }else{
                return false;
            }


        } catch (err) {
            return err;
        }
    }

    const ValidarCorreo = async(correo) => {
        try {
            
            let query = `Select count(correo) as Existe FROM usuario WHERE correo = '${correo}'`

            const ValidarCorreo = await pool.query(query);

            if(ValidarCorreo[0].Existe > 0){
                return true;
            }else{
                return false;
            }


        } catch (err) {
            return err;
        }
    }
    

    return {
        ValidarPais,
        ValidarLiga,
        ValidarCorreo
    }
}
