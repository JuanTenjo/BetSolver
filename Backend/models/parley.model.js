const pool = require("../config/database");

const model = {};

model.register = async (params) => {
  try {

    let query = `INSERT INTO parleys(cuotaTotal) Values('${params.cuotaTotal}')`;

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


model.traerUltimoIDParley = async () => {
  try {

      let query = `SELECT MAX(idparleys) AS MaxID FROM parleys`

      const result = await pool.query(query);
  
      return result[0].MaxID;

  } catch (err) {
      return {
          error: true,
          mensaje:[ `Hubo un error trare el ultimo id de los parleys el Model: parley.model, en la funcion: traerUltimoIDParley. ERROR: ${err.sqlMessage} `],
          respuesta: false
      };
  }
}


model.registerDetalle = async (idParley, idCompetencia) => {
  try {

    let query = `INSERT INTO detalleparley(idparleys,idCompeticiones) Values(${idParley},${idCompetencia})`;

    const InsertParley = await pool.query(query);

    let estado = InsertParley.affectedRows > 0 ? true : false;

    return estado;
  } catch (err) {
    return {
      error: true,
      mensaje:[ `Hubo un error al insertar el detalle del parley: parley.model, en la funcion: registerDetalle. ERROR: ${err.sqlMessage} `],
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
      mensaje: [`Hubo un error al desabilitar el equipo en el Model: parley.model, en la funcion: erase. ERROR: ${err.sqlMessage} `],
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
      mensaje: [`Hubo un error al traer las ligas en el Model: parley.model, en la funcion: teams. ERROR: ${err.sqlMessage} `],
      respuesta: false,
    };
  }
};

model.teamsAvalible = async (idLiga = null) => {
  try {

      let query = `SELECT comp.idCompeticiones, comp.habiliParley,
      l1.codiPais as codiPaisLocal, comp.idLigaLocal, l1.nombreLiga as ligaLocal,
      l2.codiPais as codiPaisVisi, comp.idLigaVisitante, l2.nombreLiga as ligaVisitante, 
      comp.idEquipoLocal, e1.nombreEquipo as equipoLocal,
      comp.idEquipoVisitante, e2.nombreEquipo as equipoVisitante,  
      DATE_FORMAT(comp.fechaCompeticion, "%Y-%m-%d") as fechaCompeticion, comp.horaCompeticion, comp.golesLocal,
      comp.golesVisitante, comp.habiliParley, comp.habilitado
      FROM competencias as comp 
      INNER JOIN ligas l1 ON comp.idLigaLocal = l1.idLigas 
      INNER JOIN ligas l2 ON comp.idLigaVisitante = l2.idLigas 
      INNER JOIN equipos e1 ON comp.idEquipoLocal = e1.idEquipos 	
      INNER JOIN equipos e2 ON comp.idEquipoVisitante = e2.idEquipos
      WHERE comp.habiliParley = 1 and comp.fechaCompeticion >= CURDATE()
      order by comp.fechaCompeticion, comp.horaCompeticion;`;

      const TeamsA = await pool.query(query);

      return TeamsA;

    
  } catch (err) {
    return {
      error: true,
      mensaje: [`Hubo un error al traer las competiciones habilitadas en el Model: parley.model, en la funcion: teamsAvalible. ERROR: ${err.sqlMessage} `],
      respuesta: false,
    };
  }
};


model.parleys = async (idLiga = null) => {
  try {

      let query = `SELECT idparleys, cuotaTotal, date_format(fechaIngreso, '%d/%m/%Y') as fechaIngreso
      FROM databetsolver.parleys order by fechaIngreso asc`;

      const TeamsA = await pool.query(query);

      return TeamsA;

    
  } catch (err) {
    return {
      error: true,
      mensaje: [`Hubo un error al traer las competiciones habilitadas en el Model: parley.model, en la funcion: teamsAvalible. ERROR: ${err.sqlMessage} `],
      respuesta: false,
    };
  }
};
module.exports = model;
