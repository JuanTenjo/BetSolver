const {login,register,getinfotoken} = require('../controllers/auth.controller');
const passport  = require('passport');


const router = require('express').Router();

// Inciar Sesion
router.post('/login', login);
       
//Registrar Usuario 
router.post('/register', register);

router.get('/getinfotoken',
    passport.authenticate('jwt', { session: false }),
    getinfotoken);


module.exports = router;