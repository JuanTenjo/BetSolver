import React from 'react';
import {HashRouter, Redirect, Route, Switch } from "react-router-dom"
import LoginApp from '../Pages/PageLogin';
import Home from '../Pages/PageHome';


const Routes = () => {
    return (
        <div>
            <HashRouter>
                <Switch>
                    <Route exact path='/Home'>              
                        <Home/>
                    </Route>
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


