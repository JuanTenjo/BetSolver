const router = require('express').Router();
const {country, update} = require('../controllers/country.controller');
const upload = require('../middlewares/multer.middelware')
//Traer 
router.get('/', country);

router.post('/upload', upload.single('image'), function(req, res){
    res.send("LLLego");
});


router.post('/UpdateCountry', upload.single('image'), update);

module.exports = router;