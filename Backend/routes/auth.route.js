const {login,register,user} = require('../controllers/auth.controller');
const router = require('express').Router();

// Inciar Sesion
router.post('/login', login);
       
//Registrar Usuario 
router.post('/register', register);

//Traer Usuario
router.get('/user', user);


module.exports = router;