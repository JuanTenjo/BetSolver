import React from 'react';
import { 
    List,
    ListItem,
    ListItemIcon,
    ListItemText
} from '@material-ui/core';
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
// import { useHistory } from "react-router-dom";
import { withRouter } from "react-router-dom";

const Listas = (props) => {

    const { history } = props;

    const itemsList = [
      {
        text: "Home",
        icon: <InboxIcon />,
        onClick: () => history.push("/Home") 
      },
      {
        text: "GestionUser",
        icon: <MailIcon />,
        onClick: () => history.push("/gestionUser")
      },
      {
        text: "Contact",
        icon: <MailIcon />,
        onClick: () => history.push("/contact")
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
