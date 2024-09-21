// App.js
import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './pages/home';
import Login from './pages/auth/login';
import { AuthProvider } from './context/AuthContext';
import Register from './pages/auth/register';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
          <Routes>
            <Route path='/home' element={<Home />} />
            <Route path='/' element={<Register />} />
            <Route path='/login' element={<Login />} />
          </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
