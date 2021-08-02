const express = require('express');
const router = express.Router();
const Registro = require('../controllers/Registro');

router.post('/', async(req,res) => {
    const DatosPais =  req.body;

    const RegistrarLiga = await Registro.RegistrarPais(DatosPais);

    res.send("Listo")

});

module.exports = router;