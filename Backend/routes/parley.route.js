const {register, update, erase, teamAvailable, parleys, detalleParley} = require('../controllers/parley.controller');
const passport  = require('passport');

const router = require('express').Router();

//Registrar  
router.post('/register',passport.authenticate('jwt', { session: false }), register);

//Actualizar 
router.put('/update', passport.authenticate('jwt', { session: false }), update);

//Eliminar 
router.delete('/delete', passport.authenticate('jwt', { session: false }), erase);

router.get('/', passport.authenticate('jwt', { session: false }), parleys);

router.get('/teamAval', passport.authenticate('jwt', { session: false }), teamAvailable);

router.post('/detalleParley', passport.authenticate('jwt', { session: false }), detalleParley);

module.exports = router;