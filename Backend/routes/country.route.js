const router = require('express').Router();
const {country, update, register} = require('../controllers/country.controller');
const upload = require('../middlewares/multer.middelware')
const passport  = require('passport');

//Traer 
router.get('/', country);

// router.post('/upload', upload.single('image'), function(req, res){
//     res.send("LLLego");
// });


router.put('/Update',  passport.authenticate('jwt', { session: false }), upload.single('image'), update);

router.post('/Register',  passport.authenticate('jwt', { session: false }), upload.single('image'), register);

module.exports = router;