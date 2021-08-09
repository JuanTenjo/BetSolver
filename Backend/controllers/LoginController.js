const express = require('express');
const router = express.Router();


async function findOne(email) {
    try {
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
                email: findOne[0].email,
                genero: findOne[0].genero,
                password: findOne[0].password,
            }
    
            return user;
    
        }else{
            return false;  
        }
    } catch (err) {
        return { error: true, message: `Error en el controlador LoginController en la funcion findone ERROR: ${err}`, respuesta: false}
    }    
}

module.exports = {
    findOne,
}