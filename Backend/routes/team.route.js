const {register, update, erase, teams} = require('../controllers/team.controller');
const passport  = require('passport');

const router = require('express').Router();

//Registrar  
router.post('/register',passport.authenticate('jwt', { session: false }), register);

//Actualizar 
router.put('/update', passport.authenticate('jwt', { session: false }), update);

//Eliminar 
router.delete('/delete', passport.authenticate('jwt', { session: false }), erase);

//Traer 
router.get('/', passport.authenticate('jwt', { session: false }), teams);

//TraerConFiltro
router.get('/:idLiga', passport.authenticate('jwt', { session: false }), teams);


module.exports = router;