const pool = require('../config/database')

const model = {};

model.strategies = async () => {
    try {

        let query = `SELECT * FROM databetsolver.estrategias ORDER BY nombreEstrategia asc`

        const strategies = await pool.query(query);

        return strategies;

    } catch (err) {
        return {
            error: true,
            mensaje: [`Hubo un error al traer las estrategias en el Model: strategie.model, en la funcion: strategies. ERROR: ${err.sqlMessage} `],
            respuesta: false
        };
    }
}



module.exports = model;