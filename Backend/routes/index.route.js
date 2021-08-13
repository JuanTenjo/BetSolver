const router = require('express').Router();
const AuthRoutes = require('./auth.route');

router.use('/auth', AuthRoutes);



// router.use('/', require('./Login'))
// router.use('/login', require('./Login'))
// router.use('/registro', require('./registrar'))
// router.use('/RegistrarPais', require('./RegistrarPais'))


module.exports = router;