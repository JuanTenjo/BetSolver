import React, { useState, useEffect } from 'react';
import Loader from '../Components/Necesarios/Loader'
import FormLeague from '../Components/LeagueComponent/FormLeague';
import TableLeague from '../Components/LeagueComponent/TableLeague';
import { helpHttpAxios } from '../Helpers/helpHttpsAxios'


import { makeStyles, Grid } from "@material-ui/core";

const useStyle = makeStyles((theme) => ({
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        marginTop: theme.spacing(3),
    }
}));

const PageLeague = () => {

    let classes = useStyle();

    const [dataToEdit, setDataToEdit] = useState(false);
    const [dataLigas, setDataLigas] = useState(null);
    const [loading, setLoading] = useState(false);

    let urlLigas = "http://localhost:4000/league";



    useEffect(() => {

        const traerLigas = async () => {
            setLoading(true)
            const data = await helpHttpAxios().get(urlLigas)
            setDataLigas(data)
            setLoading(false)
        }

        traerLigas();

    }, [dataToEdit]);

    return (
        <div className={classes.content}>
            <div className={classes.toolbar}>
                <Grid
                    container direction="row"
                >
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>

                        <FormLeague dataToEdit={dataToEdit} setDataToEdit={setDataToEdit} />

                    </Grid>

                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>

                        {loading ? <Loader /> : <TableLeague dataLigas={dataLigas} setdataToEdit={setDataToEdit} />}

                    </Grid>

                </Grid>
            </div>
        </div>
    );
}

export default PageLeague;