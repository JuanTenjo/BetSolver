import React from 'react';
import { 
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Divider
} from '@material-ui/core';
import AdbIcon from '@material-ui/icons/Adb';
import BluetoothConnectedIcon from '@material-ui/icons/BluetoothConnected';
const Listas = () => {
    return ( 
        <div>
            <List component='nav'>
                <ListItem button>
                    <ListItemIcon>
                        <AdbIcon/>
                    </ListItemIcon>
                    <ListItemText>
                        mi primer elem
                    </ListItemText>
                </ListItem>
                <ListItem button>
                    <ListItemIcon>
                        <BluetoothConnectedIcon/>
                    </ListItemIcon>
                    <ListItemText primary = "mi segundo elem"/>
                </ListItem>
                <Divider/>
            </List>
        </div>
     );
}
 
export default Listas;