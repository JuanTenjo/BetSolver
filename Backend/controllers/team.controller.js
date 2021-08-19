const { ValidaIDLiga, ValidaTeam, ValidaNameTeam } = require('../models/validation.models')
const { register, update, erase, teams } = require('../models/team.model')
const { validarNulo } = require('../utils/validationPatters')
const controller = {};


controller.register = async function (req, res) {

    if (req.user[0].idRol === 3) {

        //Acepta idLigas, nombreEquipo

        const params = req.body;

        console.log(params);


        const ErroresValidacion = [];

        await ValidaTeam(params) ? ErroresValidacion.push(`El equipo ya existe`) : true;

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

            const estado = await register(params);

            if (estado.error || estado === false) {

                res.status(400).json({ "message": estado.mensaje ? estado.mensaje : "No se registro el equipo" });

            } else {

                res.status(200).json({ "message": "Registro Exitoso" });

            }

        }

    } else {
        res.status(403).json({ "message": "Lo siento pero no tiene los permisos necesarios para hacer esta peticion" });
    }

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
