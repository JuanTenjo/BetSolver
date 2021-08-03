const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
//const User = require('../../controllers/LoginController');
const bcryptjs = require('bcrypt');


const local = function(app) {
    passport.use(new localStrategy({
        usernameField: 'email',
        passwordField: 'password',
        },
        async function(username,password,done){
            console.log(username);
            console.log(password);
            let passwordHash = await bcryptjs.hash(password, 8);

            if(username === 'Tenjo2001@gmail.com'){
                if(password === '12345'){
                    return done(null,{id: 1, name: "Tenjo2001@gmail.com",password: passwordHash});
                }else{
                    return done(null,false);
                }
            }else{
                return done(null,false);
            }

        }
    ));

    // app.post('/loginPassport', passport.authenticate('local', {
    //     //successRedirect: '/Home',
    //     successRedirect: '/Home',
    //     failureRedirect: '/LoginPrueba/IniciarSesion',
    // }))
};



module.exports = local;