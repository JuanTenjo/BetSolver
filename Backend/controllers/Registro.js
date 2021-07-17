const express = require('express');
const router = express.Router();
const ModelRegistro = require('../models/ModelRegistro')

async function RegistrarLigas(params) {
    const RegistrarLiga = await ModelRegistro().RegistrarLigas(params);
    return RegistrarLiga;
}

module.exports = {
    RegistrarLigas
}