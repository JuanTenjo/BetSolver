const pool = require("../config/database");

const model = {};

model.register = async (params) => {
  try {

    let query = `INSERT INTO parleys(competencia1,competencia2,competencia3,competencia4,cuotaTotal) Values('${params.competencia1}','${params.competencia2}','${params.competencia3}','${params.competencia4}','${params.cuotaTotal}')`;

    const InsertParley = await pool.query(query);

    let estado = InsertParley.affectedRows > 0 ? true : false;

    return estado;
  } catch (err) {
    return {
      error: true,
      mensaje:[ `Hubo un error al insertar el parley: parley.model, en la funcion: register. ERROR: ${err.sqlMessage} `],
      respuesta: false,
    };
  }
};

model.update = async (params) => {
  try {
    let query = `UPDATE parleys SET competencia1 = '${params.competencia1}', competencia2 = '${params.competencia2}', competencia3 = '${params.competencia3}',competencia4 = '${params.competencia4}',cuotaTotal = '${params.cuotaTotal}' WHERE idparleys  = ${params.idparleys}`;

    const UpdateParley = await pool.query(query);

    let estado = UpdateParley.affectedRows > 0 ? true : false;

    return estado;
  } catch (err) {
    return {
      error: true,
      mensaje: [`Hubo un error al actualizar la liga en el Model: parley.model, en la funcion: update. ERROR: ${err.sqlMessage} `],
      respuesta: false,
    };
  }
};

model.erase = async (idEquipos) => {
  try {
    let query = `UPDATE equipos SET habilitado = 0 WHERE idEquipos = ${idEquipos}`;

    const DeleteEquipo = await pool.query(query);

    let estado = DeleteEquipo.affectedRows > 0 ? true : false;

    return estado;
  } catch (err) {
    return {
      error: true,
      mensaje: [`Hubo un error al desabilitar el equipo en el Model: team.model, en la funcion: erase. ERROR: ${err.sqlMessage} `],
      respuesta: false,
    };
  }
};

model.teams = async (idLiga = null) => {
  try {
    if (idLiga) {
      let query = `SELECT * FROM equipos WHERE idLigas = ${idLiga}`;

      const Teams = await pool.query(query);

      return Teams;
    } else {
      let query = `SELECT * FROM equipos`;

      const Teams = await pool.query(query);

      return Teams;
    }
  } catch (err) {
    return {
      error: true,
      mensaje: [`Hubo un error al traer las ligas en el Model: league.model, en la funcion: leagues. ERROR: ${err.sqlMessage} `],
      respuesta: false,
    };
  }
};

module.exports = model;
