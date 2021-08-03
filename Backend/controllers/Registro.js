const express = require('express');
const router = express.Router();
const ModelRegistro = require('../models/ModelRegistro')
const ModelValidacion = require('../models/ModelValidation')

const ValidarNulo = (Campo) =>{

    if(Campo == '' || Campo == null){
        return true;
    }else{
        return false;
    }
}

const ValidarPais = async (codigoPais) => {

    const Validacion = await ModelValidacion().ValidarPais(codigoPais);

    return Validacion;
    //Cambiarlo por un if ternario

}


async function RegistrarUsuario(params) { 

    



}

async function RegistrarLigas(params) {

    if(ValidarNulo(params.CodiPais)){
        return 'El codigo del pais no puede ir vacio'
    }else{
        const vali = await ValidarPais(params.CodiPais);

       if(vali){
            return "Si existe";
            
       }else{
            return "El codigo de pais enviado no existe en la base de datos de paises";
       }

    }

    // if(ValidarNulo(params.NombreLiga)){
    //     return 'El Nombre de la liga no puede estar vacio'
    // }else{
    //     if(params.NombreLiga.length > 255){
    //         return 'El Nombre de la lida no puede tener mas de 255 caracteres';
    //     }else{
    //         const ValidarLiga = await ModelValidacion().ValidarLiga(params.NombreLiga);
    //         if(ValidarLiga){
    //             return 'El nombre de la liga que ingreso ya existe';
    //         }
    //     }
    // }   


    //const RegistrarLiga = await ModelRegistro().RegistrarLigas(params);
    //return RegistrarLiga;

}

async function RegistrarPais(body) {
  
    for (let value of body) {
        const RegistrarPais = await ModelRegistro().RegistrarPais(value.alpha2Code, value.name, value.flag);
    }

    return true;
}


module.exports = {
    RegistrarLigas,
    RegistrarPais,
    RegistrarUsuario
}