const pool = require('../config/database')

const model = {};

model.countries = async () => {
    try {

        let query = "SELECT * FROM paises"

        const country = await pool.query(query);
     
        return country;

    } catch (err) {
        return {
            error: true,
            mensaje: `Hubo un error al traer los paises en el Model: country, en la funcion: countries. ERROR: ${err.sqlMessage} `,
            respuesta: false
        };
    }
}

module.exports = model;