const express = require('express');
const router = express.Router();
const bcryptjs = require('bcrypt');
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const LoginController = require('../controllers/LoginController');


router.post('/', passport.authenticate('local', {
    //successRedirect: '/Home',
    successRedirect: '/login/succesLogin',
    failureRedirect: '/login/FailLogin',
    failureFlash: true,
}))


passport.use(new localStrategy({
    usernameField: 'email',
    passwordField: 'password',
    },
    async function(username,password,done){

        const User = await LoginController.findOne(username);

        if(User.error) return done(null,false,{message: `Error de servidor: ${User.mensaje}`});
        if(!User) return done(null,false,{message: `El email ${username} no existe!`});
       
        
        let compare = bcryptjs.compareSync(password, User.password);

        if(compare){
            return done(null,User);
        }else{
            return done(null,false,{message: `Contraseña incorrecta!`});
        }

    }
));


router.get('/succesLogin', async(req,res,next) =>{
    //Mostrar Solo cuando este autenticado
    if(req.isAuthenticated()) return next() //Esto retorna true si el usuario incicio sesion y false si no
    req.flash('error', 'Debes iniciar sesion primero');
    res.redirect("/login/FailLogin"); //Si no ha iniciado sesion lo redirecccionamos a Home

    // res.send("SuccesLogin");
    // console.log(req.user);

},(req,res) => {

    let respuesta = {
        error: false,
        mensaje: 'Inicio de sesion exitoso',
        respuesta: req.session.passport.user
    };

    res.status(200).json(respuesta)
    //res.status(200).send(respuesta)

});

router.get('/FailLogin', async(req,res) =>{
 
    let error_message = req.flash('error')[0];

    let respuesta = {
        error: true,
        mensaje: error_message,
        respuesta: false
    };

    res.status(200).json(respuesta)

});

// router.post('/',
//   passport.authenticate('local'),
//   function(req, res) {
   
//      // If this function gets called, authentication was successful.
//     // `req.user` contains the authenticated user.
//     let session = {
//         username: req.user,
//     }

//     res.json(session);

//   });



// passport.use(new PassportLocal(async function(username,password,done){

//     const ValidaUser = await LoginController.ValidarLogin(username,password);

//     ValidaUser.session ? done(null,ValidaUser.data) : done(null,false,ValidaUser.message);

// }));






router.get("/Home", (req,res,next) => {
    //Mostrar Solo cuando este autenticado
    if(req.isAuthenticated()) return next() //Esto retorna true si el usuario incicio sesion y false si no
    res.redirect("IniciarSesion"); //Si no ha iniciado sesion lo redirecccionamos a Home
},(req,res) => {
    console.log(req.session);
    res.send("Home");
});




module.exports = router;