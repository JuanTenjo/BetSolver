const {register, update, erase} = require('../controllers/parley.controller');
const passport  = require('passport');

const router = require('express').Router();

//Registrar  
router.post('/register',passport.authenticate('jwt', { session: false }), register);

//Actualizar 
router.put('/update', passport.authenticate('jwt', { session: false }), update);

//Eliminar 
router.delete('/delete', passport.authenticate('jwt', { session: false }), erase);


module.exports = router;