import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { useAuth } from '../Context/Auth/AuthContext';
import { Button, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function NavBar() {
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const {username, isAuthenticated, logout} = useAuth();
  const navigate = useNavigate();

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };


  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
    handleCloseUserMenu();
  }

  const handleLogin = async() => {
    navigate('/login');
  }

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
        <Box 
        sx={{
            display: "flex", 
            flexDirection: "row", 
            justifyContent: "space-between", 
            alignItems: "center",  
            width: "100%"
            }}>
            <Box sx={{display: "flex", flexDirection: "row", alignItems: "center"}}>
          <AdbIcon />
          <Typography
            variant="h6"
            noWrap
            component="a"
            sx={{
              fontFamily: 'monospace',
              fontWeight: 700,
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Tech Hub
          </Typography>
          </Box>


          <Box >
            {isAuthenticated ? (<>
              <Tooltip title="Open settings">
                <Grid container alignItems="center" justifyContent="center" gap={2}>
                  <Grid item>
                    <Typography>{username}</Typography>
                  </Grid>
                  <Grid item>
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <Avatar alt={username || ''} src="/static/images/avatar/2.jpg" />
                    </IconButton>
                  </Grid>
                </Grid>
            </Tooltip>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
                <MenuItem  onClick={handleCloseUserMenu}>
                  <Typography sx={{ textAlign: 'center' }}>My Orders</Typography>
                </MenuItem>
                <MenuItem  onClick={handleLogout}>
                  <Typography sx={{ textAlign: 'center' }}>Logout</Typography>
                </MenuItem>
            </Menu>
            </>) : (<Button onClick={handleLogin} variant='contained' color='success' >Login</Button>)
            }

          </Box>

          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default NavBar;
