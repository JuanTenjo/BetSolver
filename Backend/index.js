//----------------------------------------Imports $ Require --------------------------------------------

const express = require("express")
const morgan = require("morgan") //ver todo los end poins que estamos requiriendo al usar la api
const cors = require("cors") //para hacer trasminitir recursos tanto en el frontend como en el backend
const bodyParser = require("body-parser") //Para hacer los submits
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('connect-flash');
const indexRoutes = require('./routes/index.route'); //Trae la routes
const app = express(); //instancias

//----------------------------------------Fin Import & Require -----------------------------------------

//------------------------------------------------ Inicio middleware -------------------------------------------------------

app.use(morgan('dev')); //Para observar que hacen las peticiones
app.use(bodyParser.json()); //Obtener datos json
app.use(express.json());
app.use(express.urlencoded({extended: true}));  //Permite leer los datos que viene por un formulario
app.use(
    cors({
      origin: "http://localhost:3000", // <-- location of the react app were connecting to
      credentials: true,
    })
  );
app.use(express.json());
require('dotenv').config(); //Para tener nuestras variables protegidas
app.use(cookieParser('Mi Secreto'));
app.use(session({
    secret: "Mi Secreto", //Debemos pasarle un secreto
    resave: true, //Resave cuando esta true significa que en cada peticion, aunque la session no haya sido modificada, la vamos a volver a guardar
    saveUninitialized: true //Cuendo esta true significa que si inicializamos una session en una peticion  y no le guardamos nada, aun asi se va a guardar
}));
app.use(flash()) //Libreria para mensajes flash con express

//------------------------------------------------ Fin middleware -------------------------------------------------------


//------------------------------------------------ Inicio Configuraciones -----------------------------------------------

app.set('appName', 'BETFOOBALL'); //De esta forma se crean variables
app.set('port', process.env.PORT || 4000); //Asigna el puerto 4000 y si esta ocupado asigneme otro
app.use(express.static(path.join(__dirname, 'public')));  //Siempre nuestros directorio publico va a hacer public
require('./config/passport')(app);

//------------------------------------------------ Fin Configuraciones -----------------------------------------------

//------------------------------------------------ Routes -----------------------------------------------

app.use(indexRoutes);

//------------------------------------------------ Fin Routes -----------------------------------------------


app.listen(app.get("port"), () => {
    console.log(app.get('appName'));
    console.log('Aplicacion de BETSOLVER corriendo en el puerto 4000');
})  

