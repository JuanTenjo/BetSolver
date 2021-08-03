const express = require('express');
const router = express.Router();
const Registro = require('../controllers/Registro');

router.get('/', (req, res) => {
    res.send('Ruta inicial');
});

router.post('/usuario', async(req,res) =>{

    const DATOS = req.body;

    const RegistrarLiga = await Registro.RegistrarLigas(DATOS);
    
    res.send(RegistrarLiga);

});

router.post('/RegistrarLiga', async(req,res) =>{

    const DATOS = req.body;
    const RegistrarLiga = await Registro.RegistrarLigas(DATOS);
    res.send(RegistrarLiga);

});

module.exports = router;