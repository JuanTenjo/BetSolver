const { ValidarPais, ValidaLiga, ValidaNombreLiga } = require('../models/validation.models')
const { register, update, erase, leagues } = require('../models/league.model')
const { validarNulo } = require('../utils/validationPatters')
const controller = {};


controller.register = async function (req, res) {

    if (req.user[0].idRol === 3) {

        //Acepta nombreLiga, codiPais

        const params = req.body;


        const ErroresValidacion = [];

        await validarNulo(params.codiPais) ? ErroresValidacion.push("Codigo del pais no puede estar vacio") : true;
        await ValidarPais(params.codiPais) == false ? ErroresValidacion.push("Codigo del pais es invalido") : true;
        await ValidaLiga(params) ? ErroresValidacion.push(`La liga con nombre: ${params.nombreLiga} y codigo de pais: ${params.codiPais} ya esta registrado`) : true;

        if (params.nombreLiga) {
            params.nombreLiga.length > 40 || params.nombreLiga.length <= 2 ? ErroresValidacion.push("El nombre de la liga es mayor a 45 caracteres o menor 2 caracteres") : true
        }else{
            ErroresValidacion.push("Nombre de la liga no puede estar vacio")
        }


        if (ErroresValidacion.length != 0) {

            res.status(400).json({ "message": ErroresValidacion });

        } else {

            const estado = await register(params);

            if (estado.error || estado === false) {

                res.status(400).json({ "message": estado.mensaje ? estado.mensaje : "No se registro la liga" });

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

        //Acepta nombreLiga, codiPais, habilitada, idLigas

        const params = req.body;

        const ErroresValidacion = [];

        console.log(params);

        await validarNulo(params.codiPais) ? ErroresValidacion.push("Codigo del pais no puede estar vacio") : true;
        await ValidarPais(params.codiPais) == false ? ErroresValidacion.push("Codigo del pais invalido") : true;
        await ValidaNombreLiga(params) ? ErroresValidacion.push(`La liga con nombre: ${params.nombreLiga} no esta disponible`) : true;
        await validarNulo(params.habilitada) ? ErroresValidacion.push("El estado del la liga no puede estar vacio") : true;
        await validarNulo(params.idLigas) ? ErroresValidacion.push("El ID de la liga no puede estar vacio") : true;
        
        if (params.nombreLiga) {
            params.nombreLiga.length > 40 || params.nombreLiga.length <= 2 ? ErroresValidacion.push("El nombre de la liga es mayor a 45 caracteres o menor 2 caracteres") : true
        }else{
            ErroresValidacion.push("Nombre de la liga no puede estar vacio")
        }

        if (ErroresValidacion.length != 0) {

            res.status(400).json({ "message": ErroresValidacion });

        } else {

            const estado = await update(params);

            if (estado.error || estado === false) {

                res.status(400).json({ "message": estado.mensaje ? estado.mensaje : "No se actualizo la liga" });

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

        const idLigas = req.body.idLigas;

        const ErroresValidacion = [];

        await validarNulo(idLigas) ? ErroresValidacion.push('El ID de la liga no puede estar vacio') : true;

        if (ErroresValidacion.length != 0) {

            res.status(400).json({ "message": ErroresValidacion });

        } else {

            const estado = await erase(idLigas);

            if (estado.error || estado === false) {

                res.status(400).json({ "message": estado.mensaje ? estado.mensaje : "No se ejecuto ningun cambio" });

            } else {

                res.status(200).json({ "message": `Proceso Exitoso` });

            }

        }

    } else {
        res.status(403).json({ "message": "Lo siento pero no tiene los permisos necesarios para hacer esta operacion" });
    }

};


controller.leagues = async function (req, res) {

    if (req.user[0].idRol === 3) {


        let codiPais = req.params.codiPais;

        const estado = await leagues(codiPais);

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
