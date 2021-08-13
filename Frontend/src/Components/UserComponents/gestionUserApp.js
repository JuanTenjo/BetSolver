import React from "react";
import { makeStyles } from "@material-ui/core";

const useStyle = makeStyles((theme) => ({
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

const GestionUserApp = () => {
  const classes = useStyle();

  return (
    <div className={classes.content}>
      <div className={classes.toolbar}>
        <h1>Gestion Usasder</h1>
        <h1>Gestion User</h1>
        <h1>Gestion User</h1>
        <h1>Gestion User</h1>
        <h1>Gestion User</h1>
        <h1>Gestion User</h1>
        <h1>Gestion User</h1>
        <h1>Gestion User</h1>
        <h1>Gestion User</h1>
        <h1>Gestion User</h1>
        <h1>Gestion User</h1>
        <h1>Gestion User</h1>
        <h1>Gestion User</h1>
        <h1>Gestion User</h1>
      </div>
    </div>
  );
};

export default GestionUserApp;
