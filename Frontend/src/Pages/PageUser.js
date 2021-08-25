import React from 'react';
import UserForm from '../Components/UserComponents/UserForm';
import UserTable from '../Components/UserComponents/UserTable';
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


const PageUser = () => {

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

            <UserForm />

          </Grid>

          <Grid item xs={12} sm={12} md={12} lg={7} xl={7}>

            <UserTable />

          </Grid>

        </Grid>
      </div>
    </div>
  );


}

export default PageUser;