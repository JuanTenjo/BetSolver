const {strategies} = require('../controllers/strategie.controller');
const passport  = require('passport');

const router = require('express').Router();

//Traer Estrategias

router.get('/', passport.authenticate('jwt', { session: false }), strategies);



module.exports = router;