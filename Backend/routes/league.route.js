const {register, update, erase, leagues} = require('../controllers/league.controller');
const passport  = require('passport');

const router = require('express').Router();

//Registrar  
router.post('/register',passport.authenticate('jwt', { session: false }), register);

//Actualizar 
router.put('/update', passport.authenticate('jwt', { session: false }), update);

//Eliminar 
router.delete('/delete', passport.authenticate('jwt', { session: false }), erase);

//Traer 
router.get('/', passport.authenticate('jwt', { session: false }), leagues);


router.get('/:codiPais', passport.authenticate('jwt', { session: false }), leagues);


module.exports = router;