const express = require("express")
const morgan = require("morgan") //ver todo los end poins que estamos requiriendo al usar la api
const cors = require("cors") //para hacer trasminitir recursos tanto en el frontend como en el backend
const bodyParser = require("body-parser") //Para hacer los submits
const path = require('path');


const app = express(); //instancias


//middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cors());
app.use(express.urlencoded({ extended: false })); //Para recibir url con datos sencillos
app.use(express.json());
require('dotenv').config(); //Para tener nuestras variables protegidas


//Configuraciones
app.set('appName', 'BETFOOBALL'); //Se crean variables
app.set('port', process.env.PORT || 4000); //Asigna el puerto 4000 y si esta ocupado asigneme otro

// routes
app.get('/api/test', (req, res) => {
    res.json({message: "Funciont la api"})
})

//Routes

app.use(require('./routes'));
app.use('/Home', require('./routes/MostrarDatos'))
app.use('/Registro', require('./routes/Registrar'))




app.use(express.static(path.join(__dirname, 'public'))); //Siempre nuestros directorio publico va a hacer public

//listen.port

app.listen(app.get("port"), () => {
    console.log(app.get('appName'));
    console.log('Aplicacion de MYSQL corriendo en el puerto 4000');
})  

