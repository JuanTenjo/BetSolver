import React from 'react';
import{
    makeStyles,
    Drawer,
    Divider
} from '@material-ui/core'
import Listas from '../Navbar/Listas';
const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
    drawer: {
        [theme.breakpoints.up('sm')]: {
          width: drawerWidth,
          flexShrink: 0,
        },
    },
    drawerPaper: {
        width: drawerWidth,
    },
    toolbar: theme.mixins.toolbar,
}))

const Cajon = ({variant,open,onClose}) => {

    const classes = useStyles();


    return (    
        <Drawer
        className={classes.drawer} 
        classes={{
            paper: classes.drawerPaper,
        }}
        variant={variant}
        open={open}
        onClose={onClose ? onClose : null}
        anchor="left"
        >
        <div className={classes.toolbar}></div>
        <Divider/>
        <Listas/>
        </Drawer>
     );
}
 
export default Cajon;