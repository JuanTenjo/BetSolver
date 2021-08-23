const { ValidaIDLiga, ValidaIDTeam, ValidaNameTeam } = require('../models/validation.models')
const { register, update, erase } = require('../models/parley.model')
const { validarNulo } = require('../utils/validationPatters')
const controller = {};


controller.register = async function (req, res) {

    if (req.user[0].idRol === 3) {

        //Acepta idLigas, idEquipoLocal, idEquipoVisitante, fechaCompeticion, hora competicion

        const params = req.body;

        const ErroresValidacion = [];

        let competenciasNulas = 0;
   
        if(params.competencia1){

            let value = params.competencia1;

            if(value === params.competencia2 || value === params.competencia3 || value === params.competencia4){
                ErroresValidacion.push("No puedes repetir una competencia en un parley")
            }

        }else{
            competenciasNulas += 1;
        }
        if(params.competencia2){

            let value = params.competencia2;

            if(value === params.competencia1 || value === params.competencia3 || value === params.competencia4){
                ErroresValidacion.push("No puedes repetir una competencia en un parley")
            }

        }else{
            competenciasNulas += 1;
        }
        if(params.competencia3){

            let value = params.competencia3;

            if(value === params.competencia1 || value === params.competencia2 || value === params.competencia4){
                ErroresValidacion.push("No puedes repetir una competencia en un parley")
            }

        }else{
            competenciasNulas += 1;
        }
        if(params.competencia4){

            let value = params.competencia4;

            if(value === params.competencia1 || value === params.competencia2 || value === params.competencia3){
                ErroresValidacion.push("No puedes repetir una competencia en un parley")
            }

        }else{
            competenciasNulas += 1;
        }

        competenciasNulas > 2 ? ErroresValidacion.push("Es un parley se deben registrar minimo dos competencias") : true;
     
        // params.idEquipoLocal === params.idEquipoVisitante ?  ErroresValidacion.push(`No puede registrar una competición con el mismo equipo`) : true;

        // const hoy = new Date();      

        // let fechaCompeticion =new Date(params.fechaCompeticion); // 2020/2/29 / 2021-08-18 / 18-08-2021

        // if(isNaN(fechaCompeticion)){
        //     ErroresValidacion.push("Fecha de la competicion no tiene un formato valido por favor ingrese yyyy-MM-dd")
        // }

        // fechaCompeticion < hoy ?  ErroresValidacion.push(`No puede registrar una competicion con una fecha anteriora hoy`) : true;

        res.send(ErroresValidacion)

        // if (ErroresValidacion.length != 0) {

        //     res.status(400).json({ "message": ErroresValidacion });

        // } else {

        //     const estado = await register(params);

        //     if (estado.error || estado === false) {

        //         res.status(400).json({ "message": estado.mensaje ? estado.mensaje : "No se registro la competición" });

        //     } else {
         
        //         const IDCompeticion = await traerUltimoID();

        //         if(IDCompeticion){

        //             if(params.estrategias){
        //                 const estadoDetalle = await registerDetalle(params.estrategias,IDCompeticion)

        //                 if(estadoDetalle.error){
    
        //                     res.status(400).json({ "message": `Se registro la competencia pero quedo sin estrategias. Motivo:${estadoDetalle.error}`});
                            
        //                 }else{
        
        //                     res.status(200).json({ "message": "Registro Exitoso" });
        
        //                 }
        //             }else{
        //                 res.status(200).json({ "message": "Registro exitoso" });
        //             }
        //         }

        //     }

        // }

    } else {
        res.status(403).json({ "message": "Lo siento pero no tiene los permisos necesarios para hacer esta peticion" });
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

        if(params.golesLocal){
            Number.isInteger(params.golesLocal) == false  ? ErroresValidacion.push("Se esperara un numero entero en el marcador del local") : false;
            params.golesLocal.toString().length > 2 ? ErroresValidacion.push("Se esperaba un marcador de uno o maximo dos digitos del local") : false;
            params.golesLocal < 0 ? ErroresValidacion.push("Se esperaba un marcador del local mayor o igual a 0") : false;
        }
        if(params.golesVisitante){
            Number.isInteger(params.golesVisitante) == false ? ErroresValidacion.push("Se esperara un numero entero en el marcador del visitante") : false;
            params.golesVisitante.toString().length > 2 ? ErroresValidacion.push("Se esperaba un marcador de uno o maximo dos del visitante") : false;
            params.golesVisitante < 0 ? ErroresValidacion.push("Se esperaba un marcador del visitante mayor o igual a 0") : false;
        }

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


                if(params.estrategias){
                    
                    const stateDeleteStrategy = await deleteEstrategias(params.idCompeticiones);

                    if(stateDeleteStrategy){
    
    
    
                        const estadoDetalle = await registerDetalle(params.estrategias,params.idCompeticiones)
    
                        if(estadoDetalle.error){
        
                            res.status(400).json({ "message": `Se actualizo la competencia pero quedo sin estrategias. Motivo:${estadoDetalle.error}`});
                            
                        }else{
        
                            res.status(200).json({ "message": "Actualizacion Exitosa" });
        
                        }
                        
                    }

                }else{
                    res.status(200).json({ "message": "Actualizacion Exitosa" });
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




module.exports = controller;
