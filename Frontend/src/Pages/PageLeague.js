import React from 'react';
import FormLeague from '../Components/LeagueComponent/FormLeague';
import TableLeague from '../Components/LeagueComponent/TableLeague';


import { makeStyles, Grid } from "@material-ui/core";

const useStyle = makeStyles((theme) => ({
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    marginTopContainer: {
        marginTop: 12,
    }
}));

const PageLeague = () => {

    let classes = useStyle();

    return (
        <div className={classes.content}>
            <div className={classes.toolbar}>
                <Grid
                    container className={classes.marginTopContainer} direction="row"
                    justifyContent="center"
                    alignItems="center"
                >

                    <Grid item xs={12} sm={12} md={12} lg={5} xl={5}>

                        <FormLeague />

                    </Grid>

                    <Grid item xs={12} sm={12} md={12} lg={7} xl={7}>

                        <TableLeague />

                    </Grid>

                </Grid>
            </div>
        </div>
    );
}

export default PageLeague;