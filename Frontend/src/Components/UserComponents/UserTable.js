import React from 'react';

import {
    makeStyles,
    Grid
} from '@material-ui/core'

//Estilos
const useStyle = makeStyles((theme) => ({
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    }
}));

const UserTable = ({setdataToEdit}) => {
    let classes = useStyle();
    return (
        <div className={classes.content}>
            <div className={classes.toolbar}>
                <Grid container>
                <h1>UserTable</h1>

                </Grid>
            </div>
        </div>
    );
}

export default UserTable;