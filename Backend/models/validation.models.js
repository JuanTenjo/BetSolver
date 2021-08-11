const pool = require('../config/database')

const model = {};

model.validarLiga = async (NombreLiga) => {

    const sql = `SELECT COUNT(nombreLiga) AS Existe FROM ligas WHERE nombreLiga = '${NombreLiga}' `
    const result = await pool.query(sql);
    
    if(result.Existe > 0){
        return true;
    }else{
        return false;
    }

}

model.ValidarPais = async (email) => {

    const sql = `Select count(codigoPais) as Existe FROM paises WHERE codigoPais = '${CodiPais}'`
    const result = await pool.query(sql);

    if(result[0].Existe > 0){
        return true;
    }else{
        return false;
    }

}

model.ValidarCorreo = async function(correo){
    const sql = `Select count(email) as Existe FROM usuarios WHERE email = '${correo}'`
    const result = await pool.query(sql);
    if(result[0].Existe > 0){
        return true;
    }else{
        return false;
    }

}

model.ValidarUser = async function(email){
    try {
        
    const sql = `SELECT idUsuarios,idRol,nombre,apellidos,email,genero,password,usuario FROM usuarios where email = '${email}'`
    const result = await pool.query(sql);
    return result
    
    }catch (err) {
        return {
            error: true,
            mensaje: `Hubo un error al validar el usuario en el Model: ModelLogin, en la funcion: ValidaUser. ERROR: ${err.sqlMessage} `
        };
    }

}


module.exports = model;