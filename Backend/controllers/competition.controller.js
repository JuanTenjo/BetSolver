const { ValidaIDLiga, ValidaIDTeam, ValidaNameTeam } = require('../models/validation.models')
const { register, update, erase, teams, validarCompetition, traerUltimoID, registerEstrategias, deleteEstrategias } = require('../models/competition.model')
const { validarNulo } = require('../utils/validationPatters')
const controller = {};


controller.register = async function (req, res) {

    if (req.user[0].idRol === 3) {

        //Acepta idLigas, idEquipoLocal, idEquipoVisitante, fechaCompeticion, hora competicion

        const params = req.body;

        const ErroresValidacion = [];
   
        await validarNulo(params.idLigas) ? ErroresValidacion.push("Codigo de la liga no puede estar vacio") : true; 
        await validarNulo(params.idEquipoLocal) ? ErroresValidacion.push("No se selecciono un equipo local") : true;    
        await validarNulo(params.idEquipoVisitante) ? ErroresValidacion.push("No se selecciono un equipo visitante") : true;   
        await validarNulo(params.horaCompeticion) ? ErroresValidacion.push("No se ingreso la hora de la competicion") : true;      
        await validarNulo(params.fechaCompeticion) ? ErroresValidacion.push("No se ingreso la fecha de la competicion") : true;     
        await ValidaIDLiga(params) == false ? ErroresValidacion.push(`La liga ingresada es invalida o esta desabilitada`) : true;
        await ValidaIDTeam(params.idEquipoLocal) == false ? ErroresValidacion.push(`El equipo local ingresado ya no existe o esta desabilitado`) : true;
        await ValidaIDTeam(params.idEquipoVisitante) == false ? ErroresValidacion.push(`El equipo visitante ingresado ya no existe o esta desabilitado`) : true;
        await validarCompetition(params) ? ErroresValidacion.push(`Esta competición ya existe`) : true;

        params.idEquipoLocal === params.idEquipoVisitante ?  ErroresValidacion.push(`No puede registrar una competición con el mismo equipo`) : true;

        const hoy = new Date();      

        let fechaCompeticion =new Date(params.fechaCompeticion); // 2020/2/29 / 2021-08-18 / 18-08-2021

        if(isNaN(fechaCompeticion)){
            ErroresValidacion.push("Fecha de la competicion no tiene un formato valido por favor ingrese yyyy-MM-dd")
        }

        fechaCompeticion < hoy ?  ErroresValidacion.push(`No puede registrar una competicion con una fecha anteriora hoy`) : true;

        if (ErroresValidacion.length != 0) {

            res.status(400).json({ "message": ErroresValidacion });

        } else {

            const estado = await register(params);

            if (estado.error || estado === false) {

                res.status(400).json({ "message": estado.mensaje ? estado.mensaje : "No se registro la competición" });

            } else {
         
                const IDCompeticion = await traerUltimoID();

                if(IDCompeticion){

                    const estadoDetalle = await registerDetalle(params.estrategias,IDCompeticion)

                    if(estadoDetalle.error){

                        res.status(400).json({ "message": `Se registro la competencia pero quedo sin estrategias. Motivo:${estadoDetalle.error}`});
                        
                    }else{
    
                        res.status(200).json({ "message": "Registro Exitoso" });
    
                    }

                }

            }

        }

    } else {
        res.status(403).json({ "message": "Lo siento pero no tiene los permisos necesarios para hacer esta peticion" });
    }
};


const registerDetalle = async function (estrategias, IDCompeticion) {

    //Acepta idLigas, idEquipoLocal, idEquipoVisitante, fe

    const ErroresValidacion = [];

    let estrategiasRepetidas = false;

    estrategias.forEach(estrategiasRow => {

        let ValidaEstrategia = estrategias.filter(estrategias => estrategias.idEstrategia === estrategiasRow.idEstrategia);

        if(ValidaEstrategia.length > 1){

            estrategiasRepetidas = true;

        }

        estrategiasRow.PorceLocal.toString().length > 2 || estrategiasRow.PorceVisitante.toString().length > 2 ? ErroresValidacion.push(" Se espera un numero entero de dos digitos") : false;
        estrategiasRow.idEstrategia == null ? ErroresValidacion.push(" Una de las estrategias esta vacia") : false;
        estrategiasRow.PorceLocal == null || estrategiasRow.PorceLocal == "" ? ErroresValidacion.push(" Uno de las porcentajes del local esta vacio") : false;
        estrategiasRow.PorceVisitante == null || estrategiasRow.PorceVisitante == "" ? ErroresValidacion.push(" Una de las porcentajes del visitante esta vacio") : false;
        Number.isInteger(estrategiasRow.PorceVisitante) == false ? ErroresValidacion.push(" Se esperara un numero entero en porce visitante") : false;
        Number.isInteger(estrategiasRow.PorceLocal) == false ? ErroresValidacion.push(" Se esperara un numero entero en porce local") : false;

    });

    estrategiasRepetidas ? ErroresValidacion.push(" Ha introducido dos o mas veces la misma estrategia") : false;

    if (ErroresValidacion.length != 0) {

        return {"error": ErroresValidacion};

    } else {

        let estado;

        estrategias.forEach(estrategiasRow => {

            estado = registerEstrategias(estrategiasRow,IDCompeticion);

        });

        estado = await estado;

        if (estado.error || estado === false) {

            return {"error": estado.mensaje ? estado.mensaje : " No se registro el detalle de la competencia"}


        } else {

            return true

        }

    }
};


controller.update = async function (req, res) {

    if (req.user[0].idRol === 3) {

        //Acepta idCompeticion, idLigas, idEquipoLocal, idEquipoVisitante, fechaCompeticion, hora competicion

        const params = req.body;

        const ErroresValidacion = [];
   
        await validarNulo(params.idCompeticiones) ? ErroresValidacion.push("Codigo de la competicion no puede estar vacio") : true; 
        await validarNulo(params.idLigas) ? ErroresValidacion.push("Codigo de la liga no puede estar vacio") : true; 
        await validarNulo(params.idEquipoLocal) ? ErroresValidacion.push("No se selecciono un equipo local") : true;    
        await validarNulo(params.idEquipoVisitante) ? ErroresValidacion.push("No se selecciono un equipo visitante") : true;   
        await validarNulo(params.horaCompeticion) ? ErroresValidacion.push("No se ingreso la hora de la competicion") : true;      
        await validarNulo(params.fechaCompeticion) ? ErroresValidacion.push("No se ingreso la fecha de la competicion") : true;     
        await ValidaIDLiga(params) == false ? ErroresValidacion.push(`La liga ingresada es invalida o esta desabilitada`) : true;
        await ValidaIDTeam(params.idEquipoLocal) == false ? ErroresValidacion.push(`El equipo local ingresado ya no existe o esta desabilitado`) : true;
        await ValidaIDTeam(params.idEquipoVisitante) == false ? ErroresValidacion.push(`El equipo visitante ingresado ya no existe o esta desabilitado`) : true;

        params.idEquipoLocal === params.idEquipoVisitante ?  ErroresValidacion.push(`No puede actualizar una competición con el mismo equipo`) : true;

        const hoy = new Date();      

        let fechaCompeticion =new Date(params.fechaCompeticion); // 2020/2/29 / 2021-08-18 / 18-08-2021

        if(isNaN(fechaCompeticion)){
            ErroresValidacion.push("Fecha de la competicion no tiene un formato valido por favor ingrese yyyy-MM-dd")
        }

        fechaCompeticion < hoy ?  ErroresValidacion.push(`No puede actualizar una competicion con una fecha anterior a hoy`) : true;

        if (ErroresValidacion.length != 0) {

            res.status(400).json({ "message": ErroresValidacion });

        } else {

            const estado = await update(params);

            if (estado.error || estado === false) {

                res.status(400).json({ "message": estado.mensaje ? estado.mensaje : "No se actualizo la competición" });

            } else {

                const stateDeleteStrategy = await deleteEstrategias(params.idCompeticiones);

                if(stateDeleteStrategy){

                    const estadoDetalle = await registerDetalle(params.estrategias,params.idCompeticiones)

                    if(estadoDetalle.error){
    
                        res.status(400).json({ "message": `Se actualizo la competencia pero quedo sin estrategias. Motivo:${estadoDetalle.error}`});
                        
                    }else{
    
                        res.status(200).json({ "message": "Actualizacion Exitosa" });
    
                    }
                    
                }

            }

        }

    } else {
        res.status(403).json({ "message": "Lo siento pero no tiene los permisos necesarios para hacer esta peticion" });
    }

};

controller.erase = async function (req, res) {

    if (req.user[0].idRol === 3) {

        const idCompeticiones = req.body.idCompeticiones;

        const ErroresValidacion = [];

        await validarNulo(idCompeticiones) ? ErroresValidacion.push('El ID de la competicion no puede estar vacio') : true;

        if (ErroresValidacion.length != 0) {

            res.status(400).json({ "message": ErroresValidacion });

        } else {

            const estado = await erase(idCompeticiones);

            if (estado.error || estado === false) {

                res.status(400).json({ "message": estado.mensaje ? estado.mensaje : "No se elimino" });

            } else {

                res.status(200).json({ "message": `De elimino la competicion y sus estrategias exitosamente` });

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
