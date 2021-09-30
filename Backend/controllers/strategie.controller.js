const {strategies} = require('../models/strategie.model')

const controller = {};


controller.strategies = async function(req, res) {

    if(req.user[0].idRol === 3){

        const estado = await strategies();

        if(estado.error || estado === false){

            res.status(400).json(estado);

        }else{

            res.status(200).json(estado);
            
        }    
    
    }else{
        res.status(403).json({"message": "Lo siento pero no tiene los permisos necesarios para hacer esta operacion"});
    }

};



module.exports = controller;
