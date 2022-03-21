import * as React from 'react';
// import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
// import IconButton from '@mui/material/IconButton';
// import InboxIcon from '@mui/icons-material/MoveToInbox';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// import DashboardIcon from '@mui/icons-material/Dashboard';
// import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AddIcon from '@mui/icons-material/Add';
import List from '@mui/material/List';
// import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import GavelIcon from '@mui/icons-material/Gavel';
import NewReleasesIcon from '@mui/icons-material/NewReleases';
// import MailIcon from '@mui/icons-material/Mail';
// import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
// import Typography from '@mui/material/Typography';
import MenuAppBar from '../CustomAppBar';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { Avatar, Button, CardActions, CardHeader, ListItemButton } from '@mui/material';

const drawerWidth = 240;

const ResponsiveDrawer = (props) => {
  let history = useHistory();

  const drawerLinks = [
    {
      text: 'Profile',
      link: '/profile',
      icon: <AccountCircleIcon />,
    },
    // {
    //   text: 'My Account',
    //   link: '/my-account',
    //   icon: <AccountCircleIcon />
    // },
    {
      text: 'Auction',
      link: '/auction',
      icon: <GavelIcon />
    },
    // {
    //   text: 'Dashboard',
    //   link: '/dashboard',
    //   icon: <DashboardIcon />

    // },
    // {
    //   text: 'Marketplace',
    //   link: '/marketplace',
    //   icon: <ShoppingCartIcon />
    // }
  ]

  const adminLinks = [
    {
      text: 'Add Crop',
      link: '/admin',
      icon: <AddIcon />
    },
    {
      text: 'Create Auction',
      link: '/createauction',
      icon: <NewReleasesIcon />
    }
  ]
  const farmerLinks = [
    // {
    //   text: 'New Crop',
    //   link: '/new-crop',
    //   icon: <AddIcon />
    // },
    {
      text: 'Create Auction',
      link: '/createauction',
      icon: <NewReleasesIcon />
    }
  ]
  const { window, setUser } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const user = JSON.parse(localStorage.getItem("profile"));
  const role = user?.roles[0];

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const logout = () => {
    localStorage.clear();
    setUser(null);
    history.push("/");
  };

  const drawer = user && (
    <>
      <Toolbar sx={{ minHeight: '64px !important' }} />
      <Divider />
      {/* <Card> */}
      <CardHeader avatar={<Avatar>{`${user.firstName[0]}${user.lastName[0]}`}</Avatar>} title={`${user.firstName} ${user.lastName}`} subheader={role} titleTypographyProps={{ component: 'title', variant: 'body1' }} />
      <CardActions>
        {/* <Button variant="contained" sx={{ width: '100%' }}>Signout</Button> */}
      </CardActions>
      {/* </Card> */}
      <Divider />
      <List>
        {drawerLinks.map((link, index) => (
          <ListItemButton component={Link} to={link.link} key={link.link} >
            <ListItemIcon>
              {link.icon}
            </ListItemIcon>
            <ListItemText primary={link.text} />
          </ListItemButton>
        ))}
      </List>
      <Divider />
      <List>
        {role === "farmer" && farmerLinks.map((link, index) => (
          <ListItemButton component={Link} to={link.link} key={link.link} >
            <ListItemIcon>
              {link.icon}
            </ListItemIcon>
            <ListItemText primary={link.text} />
          </ListItemButton>
        ))}
        {role === "admin" && adminLinks.map((link, index) => (
          <ListItemButton component={Link} to={link.link} key={link.link} >
            <ListItemIcon>
              {link.icon}
            </ListItemIcon>
            <ListItemText primary={link.text} />
          </ListItemButton>
        ))}
      </List>
      <Button variant="contained" sx={{ width: '90%', m: 'auto', mb: 3 }} onClick={logout}>Signout</Button>
    </>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  const location = useLocation();

  // if (location.pathname === '/') {
  //   return <></>;
  // }

  return (
    // <Box sx={{ display: 'flex' }}>
    <>
      <CssBaseline />
      <MenuAppBar handleDrawerToggle={handleDrawerToggle} setUser={setUser} />
      {!(['/', '/login', '/signup'].includes(location.pathname)) && user && <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xxs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xxs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>}
    </>
  );
}

export default ResponsiveDrawer;
