const {countries, updateCountry, registerCountry} = require('../models/country.model')
const {ValidarPais} = require("../models/validation.models"); 
const { validarNulo } = require('../utils/validationPatters')

const controller = {};

controller.country = async function(req, res) {

    const estado = await countries();

    if(estado.error || estado === false){
        res.status(400).json(estado);
    }
    else{
        res.status(200).json(estado);
    }
            
};

controller.register = async function(req, res) {

    if (req.user[0].idRol === 3) {

        const {appConfig} = require('../config')
        const params = req.body;
        let imgUlr = null;
            
        const ErroresValidacion = [];

        
    
        await validarNulo(params.codiPais) ? ErroresValidacion.push('El codigo del pais no puede estar vacio') : true;
        await validarNulo(params.nombrePais) ? ErroresValidacion.push('El nombre del pais no puede estar vacio') : true;
        await ValidarPais(params.codiPais) ? ErroresValidacion.push('El codigo del pais que ingresaste ya se ha utilizado') : true;
     
        if(req.file){
            imgUlr = `${appConfig.host}:${appConfig.port}/public/${req.file.filename}`;
       }else{
            ErroresValidacion.push('Bandera del pais no puede estar vacia');      
        }
            
        if (ErroresValidacion.length != 0) {
            
            res.status(400).json({ "message": ErroresValidacion });
            
        } else {

            const estado = await registerCountry(params.nombrePais,imgUlr,params.codiPais);

            if (estado.error || estado === false) {

                res.status(400).json({ "message": estado.mensaje ? estado.mensaje : "No se ejecuto ningun cambio" });

            } else {

                res.status(200).json({ "message": `Registro Exitoso` });
      

            }

        }

    } else {
        res.status(403).json({ "message": "Lo siento pero no tiene los permisos necesarios para hacer esta operacion" });
    }

};


controller.update = async function(req, res) {

    if (req.user[0].idRol === 3) {

        const {appConfig} = require('../config')
        const params = req.body;
        let imgUlr = null;
            
        const ErroresValidacion = [];
        await validarNulo(params.codiPais) ? ErroresValidacion.push('El codigo del pais no puede estar vacio') : true;
        await validarNulo(params.nombrePais) ? ErroresValidacion.push('El nombre del pais no puede estar vacio') : true;
        
     
            
        if (ErroresValidacion.length != 0) {
            
            res.status(400).json({ "message": ErroresValidacion });
            
        } else {

            if(req.file){
                imgUlr = `${appConfig.host}:${appConfig.port}/public/${req.file.filename}`;
           }
           
            const estado = await updateCountry(params.nombrePais,imgUlr,params.codiPais);

            if (estado.error || estado === false) {

                res.status(400).json({ "message": estado.mensaje ? estado.mensaje : "No se ejecuto ningun cambio" });

            } else {

                res.status(200).json({ "message": `Actualizacion Exitosa` });
      

            }

        }

    } else {
        res.status(403).json({ "message": "Lo siento pero no tiene los permisos necesarios para hacer esta operacion" });
    }

};



module.exports = controller;
