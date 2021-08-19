const { ValidaIDLiga, ValidaIDTeam, ValidaNameTeam } = require('../models/validation.models')
const { register, update, erase, teams, validarCompetition,traerUltimoID } = require('../models/competition.model')
const { validarNulo } = require('../utils/validationPatters')
const controller = {};


controller.register = async function (req, res) {

    if (req.user[0].idRol === 3) {

        // //Acepta idLigas, idEquipoLocal, idEquipoVisitante, fechaCompeticion, hora competicion

        const params = req.body;

        // const ErroresValidacion = [];
   
        // await validarNulo(params.idLigas) ? ErroresValidacion.push("Codigo de la liga no puede estar vacio") : true; 
        // await validarNulo(params.idEquipoLocal) ? ErroresValidacion.push("No se selecciono un equipo local") : true;    
        // await validarNulo(params.idEquipoVisitante) ? ErroresValidacion.push("No se selecciono un equipo visitante") : true;   
        // await validarNulo(params.horaCompeticion) ? ErroresValidacion.push("No se ingreso la hora de la competicion") : true;      
        // await validarNulo(params.fechaCompeticion) ? ErroresValidacion.push("No se ingreso la fecha de la competicion") : true;     
        // await ValidaIDLiga(params) == false ? ErroresValidacion.push(`La liga ingresada es invalida o esta desabilitada`) : true;
        // await ValidaIDTeam(params.idEquipoLocal) == false ? ErroresValidacion.push(`El equipo local ingresado ya no existe o esta desabilitado`) : true;
        // await ValidaIDTeam(params.idEquipoVisitante) == false ? ErroresValidacion.push(`El equipo visitante ingresado ya no existe o esta desabilitado`) : true;
        // await validarCompetition(params) ? ErroresValidacion.push(`Esta competición ya existe`) : true;

        // params.idEquipoLocal === params.idEquipoVisitante ?  ErroresValidacion.push(`No puede registrar una competición con el mismo equipo`) : true;

        // const hoy = new Date();      

        // let fechaCompeticion =new Date(params.fechaCompeticion); // 2020/2/29 / 2021-08-18 / 18-08-2021

        // if(isNaN(fechaCompeticion)){
        //     console.log("Fecha de la competicion no tiene un formato valido por favor ingrese yyyy-MM-dd")
        // }

        // fechaCompeticion < hoy ?  ErroresValidacion.push(`No puede registrar una competicion con una fecha anterior`) : true;

        // if (ErroresValidacion.length != 0) {

        //     res.status(400).json({ "message": ErroresValidacion });

        // } else {

        //     const estado = await register(params);

        //     if (estado.error || estado === false) {

        //         res.status(400).json({ "message": estado.mensaje ? estado.mensaje : "No se registro la competición" });

        //     } else {

        //        

        //         if(IDCompeticion){

                    const IDCompeticion = await traerUltimoID(); //Esta va arriba AAAAAAAAAAAAAA

                    const estadoDetalle = await registerDetalle(params.estrategias,IDCompeticion)

                    res.send("Hola")

                    // if(estadoDetalle.error){

                    //     res.status(400).json({ "message": estadoDetalle.error});
                        
                    // }else{
    
                    //     res.status(200).json({ "message": "Registro Exitoso" });
    
                    // }

        //         }

        //     }

        // }

    } else {
        res.status(403).json({ "message": "Lo siento pero no tiene los permisos necesarios para hacer esta peticion" });
    }
};




const registerDetalle = async function (estrategias, IDCompeticion) {

    //Acepta idLigas, idEquipoLocal, idEquipoVisitante, fe


    const ErroresValidacion = [];
    
    

    estrategias.forEach(estrategiasRow => {

      

        let ValidaEstrategia = estrategias.filter(estrategias => estrategias.idEstrategia === estrategiasRow.idEstrategia);

        if(ValidaEstrategia.length > 1){

            ErroresValidacion.push("Esta repitiendo una estrategia en esta competicion");
            return true;
        }
        
    });

    console.log(ErroresValidacion);

    // if (ErroresValidacion.length != 0) {

    //     res.status(400).json({ "message": ErroresValidacion });

    // } else {

    //     const estado = await register(params);

    //     if (estado.error || estado === false) {

    //         res.status(400).json({ "message": estado.mensaje ? estado.mensaje : "No se registro la competición" });

    //     } else {

    //         res.status(200).json({ "message": "Registro Exitoso" });

    //     }

    // }
};


controller.update = async function (req, res) {

    if (req.user[0].idRol === 3) {

        //Acepta idEquipos, nombreEquipo, idLigas, habilitado

        const params = req.body;

        const ErroresValidacion = [];

        await validarNulo(params.habilitado) ? ErroresValidacion.push("El estado habilitado del equipo no puede estar vacio") : true;      
        await validarNulo(params.idEquipos) ? ErroresValidacion.push("Codigo del equipo no puede estar vacio") : true;      
        await validarNulo(params.idLigas) ? ErroresValidacion.push("Codigo de la liga no puede estar vacio") : true;      
        await ValidaIDLiga(params) == false ? ErroresValidacion.push(`La liga ingresada es invalida o esta desabilitada`) : true;
       
        if (params.nombreEquipo) {   
            await ValidaNameTeam(params) ? ErroresValidacion.push(`El nombre del equipo ${params.nombreEquipo} no esta disponible`) : true;
            params.nombreEquipo.length > 100 || params.nombreEquipo.length <= 2 ? ErroresValidacion.push("El nombre del equipo es mayor a 100 caracteres o menor 2 caracteres") : true
        }else{
            ErroresValidacion.push("Nombre del equipo no puede estar vacio")
        }


        if (ErroresValidacion.length != 0) {

            res.status(400).json({ "message": ErroresValidacion });

        } else {

            const estado = await update(params);

            if (estado.error || estado === false) {

                res.status(400).json({ "message": estado.mensaje ? estado.mensaje : "No se actualizo el equipo" });

            } else {

                res.status(200).json({ "message": "Actualización Exitosa" });

            }

        }

    } else {
        res.status(403).json({ "message": "Lo siento pero no tiene los permisos necesarios para hacer esta peticion" });
    }

};

controller.erase = async function (req, res) {

    if (req.user[0].idRol === 3) {

        const idEquipos = req.body.idEquipos;

        const ErroresValidacion = [];

        await validarNulo(idEquipos) ? ErroresValidacion.push('El ID del equipo no puede estar vacio') : true;

        if (ErroresValidacion.length != 0) {

            res.status(400).json({ "message": ErroresValidacion });

        } else {

            const estado = await erase(idEquipos);

            if (estado.error || estado === false) {

                res.status(400).json({ "message": estado.mensaje ? estado.mensaje : "No se desabilito" });

            } else {

                res.status(200).json({ "message": `De desabilito el equipo Exitosamente` });

            }

        }

    } else {
        res.status(403).json({ "message": "Lo siento pero no tiene los permisos necesarios para hacer esta operacion" });
    }

};

controller.teams = async function (req, res) {

    if (req.user[0].idRol === 3) {

        const estado = await teams();

        if (estado.error || estado === false) {

            res.status(400).json(estado);

        } else {

            res.status(200).json(estado);

        }

    } else {
        res.status(403).json({ "message": "Lo siento pero no tiene los permisos necesarios para hacer esta operacion" });
    }

};



module.exports = controller;
