const express = require("express")
const morgan = require("morgan") //ver todo los end poins que estamos requiriendo al usar la api
const cors = require("cors") //para hacer trasminitir recursos tanto en el frontend como en el backend
const bodyParser = require("body-parser") //Para hacer los submits
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('connect-flash');

const app = express(); //instancias

//middlewares

app.use(morgan('dev')); //Para observar que hacen las peticiones
app.use(bodyParser.json()); //Obtener datos json
app.use(express.json());
app.use(express.urlencoded({extended: true}));  //Permite leer los datos que viene por un formulario
app.use(cors());
app.use(express.json());
require('dotenv').config(); //Para tener nuestras variables protegidas
app.use(cookieParser('Mi Secreto'));
app.use(session({
    secret: "Mi Secreto", //Debemos pasarle un secreto
    resave: true, //Resave cuando esta true significa que en cada peticion, aunque la session no haya sido modificada, la vamos a volver a guardar
    saveUninitialized: true //Cuendo esta true significa que si inicializamos una session en una peticion  y no le guardamos nada, aun asi se va a guardar
}));
app.use(flash()) //Libreria para mensajes flash con express




//Configuraciones

app.set('appName', 'BETFOOBALL'); //Se crean variables
app.set('port', process.env.PORT || 4000); //Asigna el puerto 4000 y si esta ocupado asigneme otro

//PassportConfig

require('./config/passport')(app);


//Routes

//app.use('/Home', require('./routes/MostrarDatos'))
app.use('/Registro', require('./routes/Registrar'))
app.use('/RegistrarPais', require('./routes/RegistrarPais'))
app.use('/login', require('./routes/Login'))




//Siempre nuestros directorio publico va a hacer public

app.use(express.static(path.join(__dirname, 'public'))); 

//listen.port

app.listen(app.get("port"), () => {
    console.log(app.get('appName'));
    console.log('Aplicacion de MYSQL corriendo en el puerto 4000');
})  

