import React from 'react';
import { AppBar, Toolbar, Box } from '@mui/material';
import { Link, NavLink } from 'react-router-dom';
import Logo from '../assets/imgaes/cover.png';
import { darkBrown } from '../util/colors';

const ApBar = () => {
  return (
    <AppBar position="sticky" sx={{ backgroundColor: darkBrown }}>
      <Toolbar className="flex justify-between items-center">
        {/* Logo Section */}
        <Link to='/'><img src={Logo} alt="Logo" className="lg:h-[85px] h-[75px] -ml-9" /></Link>

        {/* Navigation Buttons */}
        <Box className="flex gap-4">
          <NavLink
            to="/register"
            className={({ isActive }) =>
              `px-4 py-2 rounded ${
                isActive
                  ? 'bg-yellow-500 text-black' // Active styling
                  : 'bg-transparent text-white hover:bg-yellow-400 hover:text-black'
              }`
            }
          >
            Register
          </NavLink>

          <NavLink
            to="/login"
            className={({ isActive }) =>
              `px-4 py-2 rounded ${
                isActive
                  ? 'bg-yellow-500 text-black' // Active styling
                  : 'bg-transparent text-white hover:bg-yellow-400 hover:text-black'
              }`
            }
          >
            Login
          </NavLink>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default ApBar;
