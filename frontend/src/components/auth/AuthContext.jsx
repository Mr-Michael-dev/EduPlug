import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Create the context
const AuthContext = createContext();

// AuthProvider component to wrap your app
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate(); // For programmatic navigation

  // Function to fetch authenticated user from backend (checkauth)
  const checkAuth = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/v1/users/check-auth', {}, { withCredentials: true });
      if (response.status === 200) {
        setUser(response.data.user);
        setIsAuthenticated(true);
        if (response.data.user.role === 'admin') {
          setIsAdmin(true);
        }
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

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    // Redirect to admin dashboard if user is an admin
    if (isAdmin && isAuthenticated) {
      navigate('/admins/admin-dashboard');
    }
  }, [isAdmin, isAuthenticated, navigate]);

  const login = async () => {
    await checkAuth();
  };

  const logout = async () => {
    try {
      await axios.post('http://localhost:5000/api/v1/users/logout', {}, { withCredentials: true });
      setUser(null);
      setIsAuthenticated(false);
      setIsAdmin(false);
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, loading, isAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};
