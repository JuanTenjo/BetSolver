const express = require('express');
const router = express.Router();

const MostrarDatos = require('../models/MostrarDatos')

async function MostrarPaises() {
    const MostrarPaises = await MostrarDatos().MostrarPaises()
    return MostrarPaises
}
async function todasPeliculas() {
    const todasPeliculas = await ModelPeliculas().todasPeliculas()
    return todasPeliculas
}

async function SoloPeliculas() {
    const SoloPeliculas = await ModelPeliculas().SoloPeliculas()
    return SoloPeliculas
}
async function soloSeries() {
    const soloSeries = await ModelPeliculas().soloSeries()
    return soloSeries
}

async function masRecientes() {
    const masRecientes = await ModelPeliculas().masRecientes()
    return masRecientes
}

async function agregarAmiLista(params) {
    const agregarAmiLista = await ModelPeliculas().agregarAmiLista(params)
    return agregarAmiLista
}

async function miLista() {
    const miLista = await ModelPeliculas().miLista()
    return miLista
}

module.exports = {
    MostrarPaises,
    todasPeliculas,
    SoloPeliculas,
    soloSeries,
    masRecientes,
    agregarAmiLista,
    miLista
}