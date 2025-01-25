import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Drawer, List, ListItem, ListItemIcon, ListItemText, Divider, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import Logo from '../../assets/imgaes/cover.png';
import { darkBrown } from '../../util/colors';
import { useNavigate } from 'react-router-dom';

const AppBar2 = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const menuItems = [
    { text: 'Profile', icon: <AccountCircleIcon color={darkBrown} />, route: '/home' },
    { text: 'Availability', icon: <AccessTimeIcon color={darkBrown} />, route: '/availability' },
    { text: 'Change Password', icon: <LockOpenIcon color={darkBrown} />, route: '/changePassword' },
    { text: 'Logout', icon: <LogoutIcon color='red' />, action: () => navigate('/login') },
  ];

  return (
    <div>
      <AppBar position="fixed" sx={{ backgroundColor: darkBrown }}>
        <Toolbar>
          {/* Menu Button for Mobile */}
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer(true)}>
            <MenuIcon />
          </IconButton>

          {/* Logo */}
          <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
            <img src={Logo} alt="Logo" className="lg:h-[85px] h-[80px] w-auto" />
          </Box>

          {/* Profile Icon */}
          <IconButton color="inherit">
            <AccountCircleIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Drawer for Side Navigation */}
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
          <Typography variant="h6" sx={{ p: 2, fontWeight: 'bold', textAlign: 'center' }}>
            Menu
          </Typography>
          <Divider />
          <List>
            {menuItems.map((item, index) => (
              <ListItem
                button
                key={index}
                onClick={() => {
                  if (item.route) {
                    navigate(item.route);
                  } else if (item.action) {
                    item.action();
                  }
                }}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </div>
  );
};

export default AppBar2;
