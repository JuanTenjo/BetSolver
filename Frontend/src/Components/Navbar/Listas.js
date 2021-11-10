import React from 'react';
import { 
    List,
    ListItem,
    ListItemIcon,
    ListItemText
} from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import { withRouter } from "react-router-dom";

const Listas = (props) => {

    const { history } = props;

    const itemsList = [
      {
        text: "Home",
        icon: <HomeIcon />,
        onClick: () => history.push("/") 
      },
      {
        text: "Gestionar Usuarios",
        icon: <PlaylistAddIcon />,
        onClick: () => history.push("/gestionUser")
      },
      {
        text: "Gestionar Equipos",
        icon: <PlaylistAddIcon />,
        onClick: () => history.push("/gestionTeam")
      },
      {
        text: "Gestionar Ligas",
        icon: <PlaylistAddIcon />,
        onClick: () => history.push("/gestionLeague")
      },
      {
        text: "Gestionar Competencias",
        icon: <PlaylistAddIcon />,
        onClick: () => history.push("/gestionCompetition")
      },
      {
        text: "Gestionar Parleys",
        icon: <PlaylistAddIcon />,
        onClick: () => history.push("/gestionParley")
      },
      {
        text: "Gestionar paises",
        icon: <PlaylistAddIcon />,
        onClick: () => history.push("/gestionPais")
      }
    ];
    
    return ( 
        <div>
            <List component='nav'>
            {itemsList.map((item, index) => {
            const { text, icon, onClick } = item;
            return (
                <ListItem button key={text} onClick={onClick}>
                {icon && <ListItemIcon>{icon}</ListItemIcon>}
                <ListItemText primary={text} />
                </ListItem>
            );
            })}
            </List>
        </div>
     );
}

export default withRouter(Listas);
