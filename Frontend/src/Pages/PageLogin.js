import React, { useState } from "react";
import { Grid, makeStyles, Hidden } from "@material-ui/core";
import LoginForm from "../Components/Login/LoginForm";
import Banner from "../assets/Banner.jpg";
import Message from "../Components/Necesarios/Message";
import { helpHttpAxios } from "../Helpers/helpHttpsAxios";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    alignItems: "center",
    height: "100%",
  },
  Banner: {},
}));


const PageLogin = ({ Auth }) => {

    const styles = useStyles();
    const [response, setResponse] = useState(null);
    const [error, setError] = useState({});
    
    const handleSubmit = async (data) => {

        let config = {
         data: data,
        };

        const BaseUrl = "http://localhost:4000/auth/login";

        const res = await helpHttpAxios().post(BaseUrl, config);
        console.log(res);

        if (!res.err) {

            if (res.rol === 3) {

                window.localStorage.setItem("LoggedAppUser", JSON.stringify(res.token))

                setResponse(res.msg);

                setTimeout(() => {
                    setResponse(false);
                }, 5000);

            }else{
                let errores = { errores: ["No tienes permiso de Administrador para ingresar"] };
                setError(errores);
                setTimeout(() => {
                    setError(false);
                }, 9000);
            }

        } else {
            let errores = { errores: res.message };
            setError(errores);
            setTimeout(() => {
                setError(false);
            }, 9000);
        }

    };

  const AltoImagen = (e) => {
    setWidth(window.screen.width / 2 - 100);
    setMaxHeight(window.screen.height - 200);
  };

  const [MaxHeight, setMaxHeight] = useState(150);
  const [width, setWidth] = useState(150);
  return (
    <div className={styles.container}>
      <Grid container alignItems="center">
        <Grid item xs={12} sm={6} md={6}>

          <LoginForm handleSubmit={handleSubmit} />
          
          {error.errores &&
            error.errores.map((el) => {
              return <Message key={el} msg={el} estado={false} />;
            })}

          {response && Auth()}

        </Grid>

        <Hidden smDown>
          <center>
            <img
              onLoad={AltoImagen}
              src={Banner}
              alt="Banner Bet Solver"
              style={{ maxHeight: MaxHeight, width: width, margin: 10 }}
            />
          </center>
        </Hidden>
      </Grid>
    </div>
  );
};

export default PageLogin;
