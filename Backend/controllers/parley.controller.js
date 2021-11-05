const {
  ValidaIDLiga,
  ValidaIDTeam,
  ValidaNameTeam,
} = require("../models/validation.models");
const { register, update, erase,eraseDetalle, teamsAvalible, parleys,traerUltimoIDParley,registerDetalle,detalleParley } = require("../models/parley.model");
const { validarNulo } = require("../utils/validationPatters");
const controller = {};

controller.register = async function (req, res) {
  
  if (req.user[0].idRol === 3) {
    //Acepta idLigas, idEquipoLocal, idEquipoVisitante, fechaCompeticion, hora competicion

    const params = req.body;

    let competencias = params.competencias;

    const ErroresValidacion = [];

    await validarNulo(params.cuotaTotal) ? ErroresValidacion.push("La cuota del parley no puede estar vacia") : true;

    let estadoDetalle;

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

        const idParley = await traerUltimoIDParley();

        if(idParley != null || idParley != "") {
  
          competencias.forEach(competenciaRow => {
  
            estadoDetalle = registerDetalle(idParley,competenciaRow);
            
          });
  
          if (estadoDetalle.error || estadoDetalle === false) {
            res
              .status(400)
              .json({
                message: estadoDetalle.mensaje
                  ? estadoDetalle.mensaje
                  : "No se registro la competición",
              });
          } else {
            res.status(200).json({ message: "Registro exitoso" });
          }
  
        }
   


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

    let competencias = params.competencias;

    const ErroresValidacion = [];

    await validarNulo(params.cuotaTotal) ? ErroresValidacion.push("La cuota del parley no puede estar vacia") : true;
    await validarNulo(params.parley) ? ErroresValidacion.push("El Identificador del parley esta vacio") : true;

    if (ErroresValidacion.length != 0) {
      res.status(400).json({ message: ErroresValidacion });
    } else {

      await update(params);

      await eraseDetalle(params.parley);

      competencias.forEach(competenciaRow => {
  
        estadoDetalle = registerDetalle(params.parley,competenciaRow);
        
      });


      //falta de aqui para abajo

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


controller.parleys = async function (req, res) {

  if (req.user[0].idRol === 3) {

    const estado = await parleys();

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

controller.detalleParley = async function (req, res) {

  if (req.user[0].idRol === 3) {

  
    const ErroresValidacion = [];

    let idParley = req.body.idParley;

    await validarNulo(idParley) ? ErroresValidacion.push("El id del parley viene vacio") : true;

    if (ErroresValidacion.length != 0) {

      res.status(400).json({ message: ErroresValidacion });

    } else {

      const estado = await detalleParley(idParley);

      if(estado.error || estado === false){
  
          res.status(400).json(estado);
  
      }else{
  
          res.status(200).json(estado);
          
      }    
      
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
