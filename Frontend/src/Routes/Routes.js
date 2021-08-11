import React from 'react';
import {HashRouter, Redirect, Route, Switch} from "react-router-dom"
import LoginApp from '../Pages/PageLogin';
import Home from '../Pages/PageHome';
import PrivateRoute from './PrivateRoute';
//import PageLogin from '../Pages/PageLogin';
const Routes = () => {
    return (
        <div>
            <HashRouter>
                <Switch>            
                    <PrivateRoute exact path='/Home' component={Home} />
                    <Route exact path='/IniciarSesion' component={LoginApp} />
                    <Route exact path='/'>
                        <Redirect to='/IniciarSesion'/>
                    </Route>
                </Switch>
            </HashRouter>
        </div>
    );
}

export default Routes;


