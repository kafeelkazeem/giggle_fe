import React, { createContext, useContext, useState } from 'react';

// Create a context
const RegisterFormContext = createContext();

// Create a provider component
export const GlobalProvider = ({ children }) => {
  const [value, setValue] = useState({});

  return (
    <RegisterFormContext.Provider value={{ value, setValue }}>
      {children}
    </RegisterFormContext.Provider>
  );
};

// Custom hook to use the global context
export const useFormContext = () => useContext(RegisterFormContext);
