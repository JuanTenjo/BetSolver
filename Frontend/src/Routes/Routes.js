import React, { useState, useEffect } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Home from "../Pages/PageHome";
import GestionUserApp from "../Components/UserComponents/gestionUserApp";
import PrivateRoute from "./PrivateRoute";
import NavBar from "../Components/Navbar/NavbarApp";
import { Hidden, makeStyles } from "@material-ui/core";
import Cajon from "../Components/Home/cajon";
import PageLogin from "../Pages/PageLogin";
import PageHome from "../Pages/PageHome";
import axios from "axios";

const useStyle = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

const RoutesLogged = ({ nombreUser }) => {

  const classes = useStyle();
  const [abrir, setAbrir] = useState(false);

  const AccionAbrir = () => {
    setAbrir(!abrir);
  };

  return (
    <div className={classes.root}>

      <NavBar accionAbrir={AccionAbrir} />
      <Hidden xsDown>
        <Cajon variant="permanent" nombreUser={nombreUser} open={true} />
      </Hidden>
      <Hidden smUp>
        <Cajon variant="temporary" nombreUser={nombreUser} open={abrir} onClose={AccionAbrir} />
      </Hidden>

      <div className={classes.content}>
        <div className={classes.toolbar}>
          <PageHome />
        </div>
      </div>

      <Switch>
        <Route exact path="/gestionUser" component={GestionUserApp} />
        {/* <Route exact path="/gestionUser" render={props => <GestionUserApp {...props} />} /> */}
        <PrivateRoute exact path="/Home" component={Home} />
        {/* <Route exact path="/IniciarSesion" component={LoginApp} />
            <Route exact path="/">
              <Redirect to="/IniciarSesion" />
            </Route> */}
      </Switch>
    </div>
  );
};

const Routes = () => {

  const [auth, setAuth] = useState(false);
  const [nombreUser, setNombreUser] = useState('');

  useEffect(() => {
    AccionAuth();
  }, []); //Cuando el arrayt de dependencia esta vacios solo se va a ejecuar una vez al cargar el componente

  const AccionAuth = () => {

    const Logged = window.localStorage.getItem("LoggedAppUser");

    if (Logged) {

      const token = JSON.parse(Logged);

      const requestUser = async () => {

        const config = {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }

        const requestUser = await axios.get("http://localhost:4000/auth/getinfotoken", config);
        setNombreUser(requestUser.data[0].usuario)

      }

      requestUser();

      setAuth(token);
    } else {
      setAuth(false);
    }

  };

  return <>{auth ? <RoutesLogged nombreUser={nombreUser} /> : <PageLogin Auth={AccionAuth} />}</>;

};

export default Routes;
