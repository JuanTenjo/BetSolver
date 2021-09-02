import React, { useState } from 'react';
import FormLeague from '../Components/LeagueComponent/FormLeague';
import TableLeague from '../Components/LeagueComponent/TableLeague';


import { makeStyles, Grid } from "@material-ui/core";

const useStyle = makeStyles((theme) => ({
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        marginTop :theme.spacing(3),
    }
}));

const PageLeague = () => {

    let classes = useStyle();
    const [dataToEdit, setDataToEdit] = useState(false);

    return (
        <div className={classes.content}>
            <div className={classes.toolbar}>
                <Grid
                    container direction="row"
                >
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>

                        <FormLeague dataToEdit={dataToEdit} />

                    </Grid>

                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>

                        <TableLeague setdataToEdit={setDataToEdit} />

                    </Grid>

                </Grid>
            </div>
        </div>
    );
}

export default PageLeague;