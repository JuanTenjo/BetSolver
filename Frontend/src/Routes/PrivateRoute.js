import { Route } from "react-router";
import { Redirect } from "react-router-dom";





let auth = false;
//para colocarle un alias a una props cuando utilizamos destructuracion lo hacemos con dos puntos :
const PrivateRoute = (props) => {
    return (
    <Route exact={props.exact} path={props.path}>
        {auth ? <props.component/> : <Redirect to="/IniciarSesion"/>} 
    </Route>
    );
}


//Simular autenticacion

 
export default PrivateRoute;