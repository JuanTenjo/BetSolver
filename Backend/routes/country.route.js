const router = require('express').Router();
const {country} = require('../controllers/country.controller');

//Traer 
router.get('/', country);

module.exports = router;