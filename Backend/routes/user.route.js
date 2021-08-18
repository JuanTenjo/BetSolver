const {registerUser, updateUser, deleteUser, users} = require('../controllers/user.controller');
const passport  = require('passport');

const router = require('express').Router();

//Registrar Usuario 
router.post('/register',passport.authenticate('jwt', { session: false }), registerUser);

//Actualizar Usuarrio
router.put('/update', passport.authenticate('jwt', { session: false }), updateUser);

//Eliminar Usuario
router.delete('/delete', passport.authenticate('jwt', { session: false }), deleteUser);

//Traer Usuarios
router.get('/', passport.authenticate('jwt', { session: false }), users);

module.exports = router;