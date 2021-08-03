const express = require('express');
const validator = require("email-validator");
const router = express.Router();
const ModelRegistro = require('../models/ModelRegistro')
const ModelValidacion = require('../models/ModelValidation')

const ValidarNulo = (Campo) => {

    if (Campo == '' || Campo == null) {
        return true;
    } else {
        return false;
    }
}

const ValidarPais = async (codigoPais) => {

    const Validacion = await ModelValidacion().ValidarPais(codigoPais);


    return Validacion;
    //Cambiarlo por un if ternario

}

async function RegistrarUsuario(params) {
    try {
        // El patterns que vamos a comprobar
        const pattern = new RegExp('^[A-Z]+$', 'i');
        const patternPassword = new RegExp('^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$');

        let espacios = false;
        let cont = 0;

        while (!espacios && (cont < params.password.length)) {
            if (params.password.charAt(cont) == " ")
                espacios = true;
            cont++;
        }

        const ErroresValidacion = [];

        !validator.validate(params.email) ? ErroresValidacion.push('Email invalido') : true;
        !ValidarPais(params.idPais) ? ErroresValidacion.push("Codigo del pais invalido") : true;
        (params.nombreUsuario.length > 45 || params.nombreUsuario.length < 5) ? ErroresValidacion.push("El campo nombre es mayor a 45 caracteres o menor a 5 caracteres") : true;
        isNaN(params.celular) ?  ErroresValidacion.push("El campo celular solo acepta numeros") : true;
        (params.apellidoUsuario.length > 45 || params.nombreUsuario.length < 4) ? ErroresValidacion.push("El campo apellido es mayor a 45 caracteres o menor 4 caracteres") : true;
        !pattern.test(params.nombreUsuario) ? ErroresValidacion.push("El campo nombre solo acepta letras") : true;
        !pattern.test(params.apellidoUsuario) ? ErroresValidacion.push("El campo apellido solo acepta letras") : true;
        (params.genero != 'Masculino' || params.genero != 'Femenino') ? ErroresValidacion.push("El campo genero solo acepta Masculino o Femenino") : true;
        !patternPassword.test(params.password) ? ErroresValidacion.push("El campo contraseña necesita Mayusculas, minusculas y numeros") : true;
        (params.password.length > 12 || params.password.length < 7) ? ErroresValidacion.push("La contraseña que ingreso es mayor a 12 caracteres o menor a 7 caracteres") : true;
        espacios ? ErroresValidacion.push("La contraseña no puede contener espacios en blanco") : true;

        if (ErroresValidacion.length != 0) return { error: false, message: ErroresValidacion, respuesta: false }


        const RegistraUser = await ModelRegistro().RegistrarUsuario(params);

        if (RegistraUser.error) return { error: true, message: RegistraUser.mensaje, respuesta: false }

        if (!RegistraUser) return { error: false, message: "Registro Incorrecto", respuesta: false }

        if (RegistraUser) return { error: false, message: "Registro Exitoso", respuesta: true }
    

    } catch (err) {

        return { error: true, message: `Error en el controlador RegistrarUsuario ERROR: ${err}`, respuesta: false}

    }
}

async function RegistrarLigas(params) {

    if (ValidarNulo(params.CodiPais)) {
        return 'El codigo del pais no puede ir vacio'
    } else {
        const vali = await ValidarPais(params.CodiPais);

        if (vali) {
            return "Si existe";

        } else {
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