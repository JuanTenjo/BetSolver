const {countries} = require('../models/country.model')
const controller = {};


controller.country = async function(req, res) {

    const estado = await countries();

    if(estado.error || estado === false){
        res.status(400).json(estado);
    }
    else{
        res.status(200).json(estado);
    }
            
};


module.exports = controller;
