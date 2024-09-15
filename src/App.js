// App.js
import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './pages/home';
import Login from './pages/auth/login';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
          <Routes>
            <Route path='/home' element={<Home />} />
            <Route path='/' element={<Login />} />
          </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
