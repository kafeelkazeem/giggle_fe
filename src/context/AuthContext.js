import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';
import { ApiUrl, localApiUrl } from '../util/apiUrl';

// Create the context
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  // Function to log in a user
  const login = async (email, password) => {
    try {
      const response = await axios.post(`${localApiUrl}/technicianLogin`, {
        email,
        password,
      });

      // Assuming the API returns user data and a token
      const { user, token } = response.data;
      setUser(user);

      // Store token in localStorage or cookies for future requests
      localStorage.setItem('token', token);

      setError(null); // Clear any previous errors
      return true; // Indicate successful login
    } catch (error) {
      // Handle error (wrong credentials, network issues, etc.)
      setError('Invalid credentials or network error');
      return false; // Indicate failed login
    }
  };

  // Function to log out the user
  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, error }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};
