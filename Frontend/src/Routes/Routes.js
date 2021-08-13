import React from 'react';
import {HashRouter, Redirect, Route, Switch} from "react-router-dom"
import LoginApp from '../Pages/PageLogin';
import Home from '../Pages/PageHome';
import GestionUserApp from '../Components/UserComponents/gestionUserApp';
import PrivateRoute from './PrivateRoute';
const Routes = () => {

    
    return (
        <div>
            <HashRouter>
                <Switch>
                    <PrivateRoute exact path='/GestionUser' component={GestionUserApp} />
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


