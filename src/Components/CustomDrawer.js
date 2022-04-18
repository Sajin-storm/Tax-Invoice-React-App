import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import EmojiTransportationIcon from '@mui/icons-material/EmojiTransportation';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import HandymanRoundedIcon from '@mui/icons-material/HandymanRounded';
import { Link } from "react-router-dom";

export default function CustomDrawer() {
  const [state, setState] = React.useState({
    left: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <ListItem sx={{marginTop:-1,paddingBottom:6, backgroundColor:'#0275d8'}}></ListItem>
        <ListItem button >
          <ListItemIcon><HomeRoundedIcon/></ListItemIcon>
          <ListItemText>
          <Link to="/" style={{color:"black"}}>Home</Link>
          </ListItemText>
          </ListItem>
        <Divider/>
        <ListItem button>
          <ListItemIcon><HandymanRoundedIcon/></ListItemIcon>
          <ListItemText>
          <Link to="/materials" style={{color:"black"}}>Materials</Link>
          </ListItemText>
          </ListItem>
        <Divider/>
        <ListItem button >
          <ListItemIcon><EmojiTransportationIcon/></ListItemIcon>
          <ListItemText>
          <Link to="/companies" style={{color:"black"}}>Companies</Link>
          </ListItemText>
          </ListItem>
        <Divider/>
      </List>
      </Box>
  );

  return (
    <div>
      {['left'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button color='inherit' onClick={toggleDrawer(anchor, true)}><MenuIcon/></Button>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
