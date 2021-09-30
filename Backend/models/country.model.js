const pool = require('../config/database')

const model = {};

model.countries = async () => {
    try {

        let query = "SELECT * FROM paises ORDER BY nombrePais,codiPais  ASC"

        const country = await pool.query(query);
     
        return country;

    } catch (err) {
        return {
            error: true,
            mensaje: [`Hubo un error al traer los paises en el Model: country, en la funcion: countries. ERROR: ${err.sqlMessage} `],
            respuesta: false
        };
    }
}


model.registerCountry = async(nombrePais, logoPais, codiPais) => {
    try {

        let query = "";
        
        query = `INSERT INTO paises (nombrePais, logoPais, codiPais) VALUES ('${nombrePais}','${logoPais}','${codiPais}')`;
 
        const country = await pool.query(query);
     
        return country;

    } catch (err) {
        return {
            error: true,
            mensaje: [`Hubo un error al insertar pais en el Model: country model , en la funcion: registerCountry. ERROR: ${err.sqlMessage} `],
            respuesta: false
        };
    }
}

model.updateCountry = async (nombrePais, logoPais = null, codiPais) => {
    try {

        let query = "";
        
        if(logoPais != null) {
            query = `UPDATE paises SET nombrePais = '${nombrePais}', logoPais = '${logoPais}' WHERE codiPais = '${codiPais}'`;
        }else{
            query = `UPDATE paises SET nombrePais = '${nombrePais}' WHERE codiPais = '${codiPais}'`;
        }

        const country = await pool.query(query);
     
        return country;

    } catch (err) {
        return {
            error: true,
            mensaje: [`Hubo un error al actualizar el pais en el Model: country model , en la funcion: updateCountry. ERROR: ${err.sqlMessage} `],
            respuesta: false
        };
    }
}


module.exports = model;