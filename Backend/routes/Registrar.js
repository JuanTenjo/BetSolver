const express = require('express');
const router = express.Router();
const Registro = require('../controllers/Registro');

router.get('/', (req, res) => {
    res.send('Error 404');
});

router.post('/usuario', async(req,res) =>{

    const DATOS = req.body;

    const RegisUser = await Registro.RegistrarUsuario(DATOS);

    RegisUser.error ? res.status(400).json(RegisUser):false;

    res.status(200).json(RegisUser);
    
});

router.post('/RegistrarLiga', async(req,res) =>{

    const DATOS = req.body;
    const RegistrarLiga = await Registro.RegistrarUsuario(DATOS);
    res.send(RegistrarLiga);

});

module.exports = router;