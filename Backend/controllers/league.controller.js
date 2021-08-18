const {ValidarPais, ValidaLiga, validarNulo} = require('../models/validation.models')
const {register,update, erase, leagues} = require('../models/league.model')

const controller = {};


controller.register = async function (req, res) {

    if(req.user[0].idRol === 3){

        //Acepta nombreLiga, CodiPais

        const params = req.body;
    
        const ErroresValidacion = [];

        (params.nombreLiga.length > 40 || params.nombreLiga.length < 2) ? ErroresValidacion.push("El nombre de la liga es mayor a 45 caracteres o menor 2 caracteres") : true;

        await ValidarPais(params.CodiPais) == false ? ErroresValidacion.push("Codigo del pais invalido") : true;
        await ValidaLiga(params) == false ? ErroresValidacion.push(`La liga con nombre: ${params.nombreLiga} y codigo de pais: ${params.CodiPais} ya esta registrado`) : true;
     
        
        if (ErroresValidacion.length != 0){
            
            res.status(400).json({"message": ErroresValidacion});

        }else{
            
            const estado = await register(params);

            if(estado.error || estado === false){

                res.status(400).json({"message": estado.mensaje ? estado.mensaje : "No se registro la liga" });

            }else{

                res.status(200).json({"message": "Registro Exitoso"});

            }

        }
    
    }else{
        res.status(403).json({"message": "Lo siento pero no tiene los permisos necesarios para hacer esta peticion"});
    }

};

controller.update = async function(req, res) {

    if(req.user[0].idRol === 3){

        //Acepta nombreLiga, codiPais, habilitada, idLigas

        const params = req.body;
    
        const ErroresValidacion = [];

        (params.nombreLiga.length > 40 || params.nombreLiga.length < 2) ? ErroresValidacion.push("El nombre de la liga es mayor a 45 caracteres o menor 2 caracteres") : true;

        await ValidarPais(params.codiPais) == false ? ErroresValidacion.push("Codigo del pais invalido") : true;
        await ValidaLiga(params) == false ? ErroresValidacion.push(`La liga con nombre: ${params.nombreLiga} y codigo de pais: ${params.codiPais} ya esta registrada`) : true;
        await validarNulo(params.codiPais) == false ? ErroresValidacion.push("Codigo del pais no puede estar vacio") : true;
        await validarNulo(params.nombreLiga) == false ? ErroresValidacion.push("Nonbre de la liga no puede estar vacio") : true;
        await validarNulo(params.habilitada) == false ? ErroresValidacion.push("El estado Habilitado no puede estar vacio") : true;
        await validarNulo(params.idLigas) == false ? ErroresValidacion.push("El ID de la liga no puede estar vacio") : true;
        
        if (ErroresValidacion.length != 0){
            
            res.status(400).json({"message": ErroresValidacion});

        }else{
            
            const estado = await update(params);

            if(estado.error || estado === false){

                res.status(400).json({"message": estado.mensaje ? estado.mensaje : "No se actualizo la liga" });

            }else{

                res.status(200).json({"message": "Actualización Exitosa"});

            }

        }
    
    }else{
        res.status(403).json({"message": "Lo siento pero no tiene los permisos necesarios para hacer esta peticion"});
    }

};

controller.erase = async function(req, res) {

    if(req.user[0].idRol === 3){

        const idUser = req.body.id; 
    
        const ErroresValidacion = [];

        await validarNulo(idUser) ?  ErroresValidacion.push('El ID del usuario no puede estar vacio') : true;  

        if (ErroresValidacion.length != 0){
            
            res.status(400).json({"message": ErroresValidacion});

        }else{
        
            const estado = await deleteUser(idUser);

            if(estado.error || estado === false){

                res.status(400).json({"message": estado.mensaje ? estado.mensaje : "No se elimino"});

            }else{

                res.status(200).json({"message": "Eliminación Exitosa"});

            }

        }
    
    }else{
        res.status(403).json({"message": "Lo siento pero no tiene los permisos necesarios para hacer esta operacion"});
    }

};

controller.leagues = async function(req, res) {

    if(req.user[0].idRol === 3){

        const estado = await users();

        if(estado.error || estado === false){

            res.status(400).json(estado);

        }else{

            res.status(200).json(estado);
            
        }    
    
    }else{
        res.status(403).json({"message": "Lo siento pero no tiene los permisos necesarios para hacer esta operacion"});
    }

};



module.exports = controller;
