const express = require('express');
const router = express.Router();
const MostrarDatos = require('../controllers/MostrarDatos');

router.get('/', (req, res) => {
    res.send('Ruta inicial');
});


router.get('/MostrarPaises', async(req,res) =>{
    const MOSTRARPAISES = await MostrarDatos.MostrarPaises();
    res.json({MOSTRARPAISES});
});

module.exports = router;