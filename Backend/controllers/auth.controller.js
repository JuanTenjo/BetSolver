const validator = require("email-validator");
// const ModelRegistro = require('../models/ModelRegistro')
// const ModelValidacion = require('../models/ModelValidation')
const bcryptjs = require('bcrypt');
const passport  = require('passport');

const ValidarNulo = (Campo) => {

    if (Campo == '' || Campo == null) {
        return true;
    } else {
        return false;
    }
}
const ValidarPais = async (codigoPais) => {

    let Validacion = await ModelValidacion().ValidarPais(codigoPais);

    let res = (Validacion ? true: false)

    return res;
    //Cambiarlo por un if ternario

}
const ValidarCorreo = async (Correo) => {

    let Validacion = await ModelValidacion().ValidarCorreo(Correo);


    let res = (Validacion ? true: false)


    return res;
    //Cambiarlo por un if ternario

}



const controller = {};

controller.login = async function (req,res){
    passport.authenticate("local", (err, user, info) => {
        if (err) throw err;
        if (!user) res.send("No User Exists");
        else {
        req.logIn(user, (err) => {
            if (err) throw err;
            res.send("Successfully Authenticated");
            console.log(req.user);
        });
        }
    })(req, res, next);


    res.json({
        "Data": req.body
    });
};

controller.register = async function (req,res){

    res.json({
        "messagge": "Llego al Register controller"
    });

    // console.log(params);
        
    // // El patterns que vamos a comprobar
    // const pattern = new RegExp(/^[A-Za-z\s]+$/); //Letras y espacios en blanco
    // const patternPassword = new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/); //Mayuscula, Minuscula y Numero

    // let espacios = false;
    // let cont = 0;

    // while (!espacios && (cont < params.password.length)) {
    //     if (params.password.charAt(cont) == " ")
    //         espacios = true;
    //     cont++;
    // }


    // const ErroresValidacion = [];

    // await ValidarNulo(params.email) ?  ErroresValidacion.push('Email no puede estar vacio') : true;  
    // !validator.validate(params.email) ? ErroresValidacion.push('Email invalido') : true;
    // await ValidarCorreo(params.email) ? ErroresValidacion.push(`El correo ${params.email} ya esta registrado`) : true;
    // await ValidarPais(params.idPais) == false ? ErroresValidacion.push("Codigo del pais invalido") : true;
    // (params.nombreUsuario.length > 45 || params.nombreUsuario.length < 5) ? ErroresValidacion.push("El campo nombre es mayor a 45 caracteres o menor a 5 caracteres") : true;
    // isNaN(params.celular) ?  ErroresValidacion.push("El campo celular solo acepta numeros") : true;
    // (params.apellidoUsuario.length > 45 || params.apellidoUsuario.length < 4) ? ErroresValidacion.push("El campo apellido es mayor a 45 caracteres o menor 4 caracteres") : true;
    // !pattern.test(params.nombreUsuario) ? ErroresValidacion.push("El campo nombre solo acepta letras") : true;
    // !pattern.test(params.apellidoUsuario) ? ErroresValidacion.push("El campo apellido solo acepta letras") : true;
    // (params.genero == "Masculino" || params.genero == "Femenino") ? true : ErroresValidacion.push("El campo genero solo acepta Masculino o Femenino");
    // !patternPassword.test(params.password) ? ErroresValidacion.push("El campo contraseña necesita Mayusculas, minusculas y numeros") : true;
    // (params.password.length > 20 || params.password.length < 6) ? ErroresValidacion.push("La contraseña que ingreso es mayor a 20 caracteres o menor a 6 caracteres") : true;
    // espacios ? ErroresValidacion.push("La contraseña no puede contener espacios en blanco") : true;


    // if (ErroresValidacion.length != 0) return { error: false, message: ErroresValidacion, respuesta: false }        

    // let passwordHash = await bcryptjs.hash(params.password, 8);

    // params.password = passwordHash;


    // const RegistraUser = await ModelRegistro().RegistrarUsuario(params);

    // if (RegistraUser.error) return { error: true, message: RegistraUser.mensaje, respuesta: false }

    // if (!RegistraUser) return { error: false, message: "Registro Incorrecto", respuesta: false }

    // if (RegistraUser) return { error: false, message: "Registro Exitoso", respuesta: true }


};

controller.user = async function (req,res){
    res.json({
        "messagge": "Llego al User controller"
    });
};

module.exports = controller;
