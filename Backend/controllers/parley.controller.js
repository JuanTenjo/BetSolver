const {
  ValidaIDLiga,
  ValidaIDTeam,
  ValidaNameTeam,
} = require("../models/validation.models");
const { register, update, erase,teamsAvalible } = require("../models/parley.model");
const { validarNulo } = require("../utils/validationPatters");
const controller = {};

controller.register = async function (req, res) {
  if (req.user[0].idRol === 3) {
    //Acepta idLigas, idEquipoLocal, idEquipoVisitante, fechaCompeticion, hora competicion

    const params = req.body;

    const ErroresValidacion = [];

    let competenciasNulas = 0;
    let competenciaRepet = 0;

    if (params.competencia1) {
      let value = params.competencia1;

      if (
        value === params.competencia2 ||
        value === params.competencia3 ||
        value === params.competencia4
      ) {
        competenciaRepet += 1;
      }
    } else {
      competenciasNulas += 1;
    }
    if (params.competencia2) {
      let value = params.competencia2;

      if (
        value === params.competencia1 ||
        value === params.competencia3 ||
        value === params.competencia4
      ) {
        competenciaRepet += 1;
      }
    } else {
      competenciasNulas += 1;
    }
    if (params.competencia3) {
      let value = params.competencia3;

      if (
        value === params.competencia1 ||
        value === params.competencia2 ||
        value === params.competencia4
      ) {
        competenciaRepet += 1;
      }
    } else {
      competenciasNulas += 1;
    }
    if (params.competencia4) {
      let value = params.competencia4;

      if (
        value === params.competencia1 ||
        value === params.competencia2 ||
        value === params.competencia3
      ) {
        competenciaRepet += 1;
        ErroresValidacion.push(
          "No puedes repetir una competencia en un parley"
        );
      }
    } else {
      competenciasNulas += 1;
    }

    competenciasNulas > 2
      ? ErroresValidacion.push(
          "En un parley se deben registrar minimo dos competencias"
        )
      : true;
    competenciaRepet >= 1
      ? ErroresValidacion.push("No puedes repetir una competencia en un parley")
      : true;

    await validarNulo(params.cuotaTotal) ? ErroresValidacion.push("La cuota del parley no puede estar vacia") : true;


    if (ErroresValidacion.length != 0) {
      res.status(400).json({ message: ErroresValidacion });
    } else {
      const estado = await register(params);

      if (estado.error || estado === false) {
        res
          .status(400)
          .json({
            message: estado.mensaje
              ? estado.mensaje
              : "No se registro la competición",
          });
      } else {
        res.status(200).json({ message: "Registro exitoso" });
      }
    }
  } else {
    res
      .status(403)
      .json({
        message:
          "Lo siento pero no tiene los permisos necesarios para hacer esta peticion",
      });
  }
};

controller.update = async function (req, res) {
  if (req.user[0].idRol === 3) {
    //Acepta idCompeticion, idLigas, idEquipoLocal, idEquipoVisitante, fechaCompeticion, hora competicion

    const params = req.body;

    const ErroresValidacion = [];

    let competenciasNulas = 0;
    let competenciaRepet = 0;

    if (params.competencia1) {
      let value = params.competencia1;

      if (
        value === params.competencia2 ||
        value === params.competencia3 ||
        value === params.competencia4
      ) {
        competenciaRepet += 1;
      }
    } else {
      competenciasNulas += 1;
    }
    if (params.competencia2) {
      let value = params.competencia2;

      if (
        value === params.competencia1 ||
        value === params.competencia3 ||
        value === params.competencia4
      ) {
        competenciaRepet += 1;
      }
    } else {
      competenciasNulas += 1;
    }
    if (params.competencia3) {
      let value = params.competencia3;

      if (
        value === params.competencia1 ||
        value === params.competencia2 ||
        value === params.competencia4
      ) {
        competenciaRepet += 1;
      }
    } else {
      competenciasNulas += 1;
    }
    if (params.competencia4) {
      let value = params.competencia4;

      if (
        value === params.competencia1 ||
        value === params.competencia2 ||
        value === params.competencia3
      ) {
        competenciaRepet += 1;
        ErroresValidacion.push(
          "No puedes repetir una competencia en un parley"
        );
      }
    } else {
      competenciasNulas += 1;
    }

    competenciasNulas > 2
      ? ErroresValidacion.push(
          "En un parley se deben registrar minimo dos competencias"
        )
      : true;
    competenciaRepet >= 1
      ? ErroresValidacion.push("No puedes repetir una competencia en un parley")
      : true;

    await validarNulo(params.cuotaTotal) ? ErroresValidacion.push("La cuota del parley no puede estar vacia") : true;
    await validarNulo(params.idparleys) ? ErroresValidacion.push("El Identificador del parley esta vacio") : true;

    if (ErroresValidacion.length != 0) {
      res.status(400).json({ message: ErroresValidacion });
    } else {

      const estado = await update(params);

      if (estado.error || estado === false) {
        res
          .status(400)
          .json({
            message: estado.mensaje
              ? estado.mensaje
              : "No se actualizo el parley",
          });
      } else {

        res.status(200).json({ message: "Actualizacion Exitosa" });

      }
    }
  } else {
    res
      .status(403)
      .json({
        message:
          "Lo siento pero no tiene los permisos necesarios para hacer esta peticion",
      });
  }

};

controller.erase = async function (req, res) {
  if (req.user[0].idRol === 3) {
    const idCompeticiones = req.body.idCompeticiones;

    const ErroresValidacion = [];

    (await validarNulo(idCompeticiones))
      ? ErroresValidacion.push("El ID de la competicion no puede estar vacio")
      : true;

    if (ErroresValidacion.length != 0) {
      res.status(400).json({ message: ErroresValidacion });
    } else {
      const estado = await erase(idCompeticiones);

      if (estado.error || estado === false) {
        res
          .status(400)
          .json({ message: estado.mensaje ? estado.mensaje : "No se elimino" });
      } else {
        res
          .status(200)
          .json({
            message: `De elimino la competicion y sus estrategias exitosamente`,
          });
      }
    }
  } else {
    res
      .status(403)
      .json({
        message:
          "Lo siento pero no tiene los permisos necesarios para hacer esta operacion",
      });
  }
};


controller.teamAvailable = async function (req, res) {

  if (req.user[0].idRol === 3) {

    const estado = await teamsAvalible();

    if(estado.error || estado === false){

        res.status(400).json(estado);

    }else{

        res.status(200).json(estado);
        
    }    
    

  }else {
    res
      .status(403)
      .json({
        message:
          "Lo siento pero no tiene los permisos necesarios para hacer esta operacion",
      });
  }
};

module.exports = controller;
