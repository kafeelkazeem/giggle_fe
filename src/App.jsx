import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Home from './pages/home';
import Login from './pages/auth/login';
import { AuthProvider } from './context/AuthContext';
import S from './pages/auth/register/layout';
import LandingPage from './pages/landingPage';
import ChangePassword from './pages/changePassword';
import Reviews from './pages/reviews';
import { darkBrown } from './util/colors'; 

// Define MUI theme with darkBrown as the primary color
const theme = createTheme({
  palette: {
    primary: {
      main: darkBrown,
    },
    secondary: {
      main: '#6d4c41', 
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
  },
});

function App() {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline /> {/* Ensures consistent baseline styles */}
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/home" element={<Home />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/changePassword" element={<ChangePassword />} />
            <Route path="/register" element={<S />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
