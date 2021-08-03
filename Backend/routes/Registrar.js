const express = require('express');
const router = express.Router();
const Registro = require('../controllers/Registro');

router.get('/', (req, res) => {
    res.send('Error 404');
});

router.post('/usuario', async(req,res) =>{

    const DATOS = req.body;

    const RegistrarUsuario= await Registro.RegistrarUsuario(DATOS);
    
    // if(RegistrarUsuario.error){
    //     res.status(400).json(RegistrarUsuario);
    // }else if(!RegistrarUsuario){
    //     res.status(200).json(RegistrarUsuario);
    // } else if(RegistrarUsuario.respuesta){
    //     res.status(200).json(RegistrarUsuario);
    // }

    res.send("Aqui estoy");

});

router.post('/RegistrarLiga', async(req,res) =>{

    const DATOS = req.body;
    const RegistrarLiga = await Registro.RegistrarUsuario(DATOS);
    res.send(RegistrarLiga);

});

module.exports = router;