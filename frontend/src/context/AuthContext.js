import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token'));

  const [user, setUser] = useState(() => {
    try {
      // Get user from local storage on initial load
      return JSON.parse(localStorage.getItem('user'));
    } catch (e) {
      return null;
    }
  });
  
  const navigate = useNavigate();

  const login = (userData) => {
    // Store token and user object
    localStorage.setItem('token', userData.token);
    localStorage.setItem('user', JSON.stringify(userData)); 
    setToken(userData.token);
    setUser(userData);
    navigate('/'); // Redirect to homepage
  };

  const logout = () => {
    // Clear token and user
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
    navigate('/login'); // Redirect to login page
  };

  // Function to update user data locally (e.g., after adding money)
  const refreshUser = (newUserData) => {
    setUser(newUserData);
    localStorage.setItem('user', JSON.stringify(newUserData));
  };

  // This is the value object that will be available to all children
  const value = {
    token,
    user, // Provide user object
    login,
    logout,
    refreshUser, // Provide refresh function
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// This is a custom hook to easily access the auth context
export const useAuth = () => {
  return useContext(AuthContext);
};