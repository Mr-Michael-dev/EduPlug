import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

// Create the context
const AuthContext = createContext();

// AuthProvider component to wrap your app
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Function to fetch authenticated user from backend (checkauth)
  const checkAuth = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/v1/users/check-auth', {}, { withCredentials: true });
      if (response.status === 200) {
        console.log(response.data)
        setUser(response.data.user);
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error('Error during authentication:', error);
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  // Fetch user info on initial load
  useEffect(() => {
    checkAuth();
  }, []);

  const login = async () => {
    await checkAuth(); // Call this after login to refresh user state
  };

  const logout = async () => {
    try {
      await axios.post('http://localhost:5000/api/v1/users/logout', {}, { withCredentials: true });
      setUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  // Provide the context values to children
  return (
    <AuthContext.Provider value={{ user, isAuthenticated, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};
