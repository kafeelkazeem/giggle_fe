// App.js
import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './pages/home';
import Login from './pages/auth/login';
import { AuthProvider } from './context/AuthContext';
import S from './pages/auth/register/layout';
import LandingPage from './pages/landingPage';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
          <Routes>
            <Route path='/' element={<LandingPage />} />
            <Route path='/home' element={<Home />} />
            <Route path='/register' element={<S />} />
            <Route path='/login' element={<Login />} />
          </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
