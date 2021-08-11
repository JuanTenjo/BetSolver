import React, { useState } from 'react';
import NavBar from '../Components/Navbar/NavbarApp';
import{
    Hidden,
    makeStyles
} from '@material-ui/core'
import Cajon from '../Components/Home/cajon';
import Contenido from '../Components/Home/contenido';

const useStyle = makeStyles(theme => ({
    root:{
        display: 'flex',
    },
      // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
}))

const PageHome = () => {

    const classes = useStyle();

    const [abrir, setAbrir] = useState(false);

    const AccionAbrir = () => {
        setAbrir(!abrir);
    }
    

    return ( 
        <div className={classes.root}>
            <NavBar  accionAbrir={AccionAbrir}/>
            <Hidden xsDown>
                <Cajon  variant="permanent" open={true} />
            </Hidden>
            <Hidden smUp>
                <Cajon  variant="temporary" open={abrir} onClose={AccionAbrir}  />
            </Hidden>

            <div className={classes.content}>
                <div className={classes.toolbar}></div>
                    <Contenido/>
            </div>

        </div>
     );
}
 
export default PageHome;