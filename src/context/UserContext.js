// src/context/UserContext.js
import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [role, setRole] = useState('guest'); // Example role, adjust as needed

  return (
    <UserContext.Provider value={{ role, setRole }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserRole = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUserRole must be used within a UserProvider');
  }
  return context;
};
