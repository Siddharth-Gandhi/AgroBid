import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { Avatar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import ListItemIcon from '@mui/material/ListItemIcon';
import { Link, useLocation, useHistory } from 'react-router-dom';
// import HomeIcon from '@mui/icons-material/Home';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Logout from '@mui/icons-material/Logout';
// import LoginIcon from '@mui/icons-material/Login';
// import PersonAddIcon from '@mui/icons-material/PersonAdd';
// import { AuthContext } from '../../Context/auth';

// const drawerWidth = 240;

export default function MenuAppBar(props) {
  // eslint-disable-next-line no-unused-vars
  // const auth = React.useContext(AuthContext)
  const { setUser } = props;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const user = JSON.parse(localStorage.getItem("profile"));

  const location = useLocation();
  let history = useHistory();

  // if (location.pathname === '/login' || location.pathname === '/signup') {
  //   return <></>;
  // }

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = () => {
    localStorage.clear();
    setUser(null);
    history.push("/");
    handleClose();
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        sx={{
          // width: { sm: `calc(100% - ${drawerWidth}px)` },
          // ml: { sm: `${drawerWidth}px` },
          zIndex: (theme) => theme.zIndex.drawer + 1
        }}>
        <Toolbar>
          {!(location.pathname === '/') && user && <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={props.handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>}
          <div style={{ flexGrow: 1 }}>
            <Typography
              variant="h5"
              component={Link}
              to="/"
              sx={{ flexGrow: 1, textDecoration: 'none', color: 'text.primary' }}
            >
              AgroBid
            </Typography>
          </div>
          {location.pathname === '/' && user && <Button
            sx={{ marginRight: '10px', display: { xxs: 'none', xs: 'inline-flex' } }}
            component={Link}
            to="/auction"
            variant="contained"
            color="secondary"
            startIcon={<ShoppingCartIcon />}
          >
            Auction
          </Button>}
          {/*location.pathname !== '/marketplace' ? <Button
            sx={{ marginRight: '10px' }}
            component={Link}
            to="/marketplace"
            variant="contained"
            color="secondary"
            startIcon={<ShoppingCartIcon />}
          >
            Marketplace
          </Button> : <Button
            sx={{ marginRight: '10px' }}
            component={Link}
            to="/"
            variant="contained"
            color="secondary"
            startIcon={<HomeIcon />}
          >
            Home
          </Button>*/}
          {user && (
            <>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
              >
                <Avatar sx={{ bgcolor: "secondary.main" }}>{`${user.firstName[0]}${user.lastName[0]}`}</Avatar>
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'center',
                  horizontal: 'left',
                }}
                keepMounted
                PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: 'visible',
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                    mt: 1.5,
                    '& .MuiAvatar-root': {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    '&:before': {
                      content: '""',
                      display: 'block',
                      position: 'absolute',
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: 'background.paper',
                      transform: 'translateY(-50%) rotate(45deg)',
                      zIndex: 0,
                    },
                  },
                }}
                transformOrigin={{ horizontal: 'left', vertical: 'center' }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem component={Link} to="/profile" onClick={handleClose}>
                  <ListItemIcon>
                    <AccountCircle fontSize="small" />
                  </ListItemIcon>
                  Profile
                </MenuItem>
                {/* <MenuItem onClick={handleClose}>My account</MenuItem> */}
                <MenuItem sx={{ display: { xxs: 'flex', sm: 'none' } }} component={Link} to="/auction" onClick={handleClose}>
                  <ListItemIcon>
                    <ShoppingCartIcon fontSize="small" />
                  </ListItemIcon>
                  Auction
                </MenuItem>
                <MenuItem onClick={logout}>
                  <ListItemIcon>
                    <Logout fontSize="small" />
                  </ListItemIcon>
                  Logout
                </MenuItem>
              </Menu>
            </>
          )}
          {!user && (<>
            <>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'center',
                  horizontal: 'left',
                }}
                keepMounted
                PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: 'visible',
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                    mt: 1.5,
                    '& .MuiAvatar-root': {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    '&:before': {
                      content: '""',
                      display: 'block',
                      position: 'absolute',
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: 'background.paper',
                      transform: 'translateY(-50%) rotate(45deg)',
                      zIndex: 0,
                    },
                  },
                }}
                transformOrigin={{ horizontal: 'left', vertical: 'center' }}
                // anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
                // transformOrigin={{
                //   vertical: 'cemter',
                //   horizontal: 'center',
                // }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem component={Link} to="/login" onClick={handleClose}>
                  <ListItemIcon>
                    <AccountCircle fontSize="small" />
                  </ListItemIcon>
                  Login
                </MenuItem>
                <MenuItem component={Link} to="/signup" onClick={handleClose}>
                  <ListItemIcon>
                    <AccountCircle fontSize="small" />
                  </ListItemIcon>
                  Signup
                </MenuItem>
              </Menu>
            </>
          </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
