const express = require('express');
const router = express.Router();
const ModelLogin = require('../models/ModelLogin')


async function findOne(email) {

    const findOne = await ModelLogin().ValidarUser(email);

    if(findOne.error){
        return findOne;
    }

    if(findOne[0]){
        let user  = {
            idUsuarios: findOne[0].idUsuarios,
            idRol: findOne[0].idRol,
            nombre: findOne[0].nombre,
            apellidos: findOne[0].apellidos,
            correo: findOne[0].correo,
            genero: findOne[0].genero,
            usuario: findOne[0].usuario,
            password: findOne[0].password,
        }

        return user;

    }else{
        return false;  
    }
    
}





module.exports = {
    findOne,
}