import React, { createContext, useState, useEffect } from 'react';

// Simulate API calls (replace with actual fetch/axios later)
const FAKE_DELAY = 500;
const simulateLogin = (email, password) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email === 'user@test.com' && password === 'password') {
        // In real app, API returns user data and token
        resolve({ user: { id: 1, name: 'Test User', email }, token: 'fake-jwt-token' });
      } else {
        reject(new Error('Invalid credentials'));
      }
    }, FAKE_DELAY);
  });
};

const simulateLogout = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, FAKE_DELAY / 2);
  });
};

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('authToken') || null);
  const [isLoading, setIsLoading] = useState(false); // Basic loading state
  const [error, setError] = useState(null);       // Basic error state

  // Effect to potentially validate token on initial load (optional)
  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    const storedUser = localStorage.getItem('authUser'); // Simplistic user storage
    if (storedToken && storedUser) {
      setToken(storedToken);
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error("Failed to parse stored user", e);
        localStorage.removeItem('authUser'); // Clear invalid user data
        localStorage.removeItem('authToken');
        setToken(null);
      }
    }
    // In a real app, you might want to verify the token with the backend here
  }, []);

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);
    try {
      const { user: loggedInUser, token: authToken } = await simulateLogin(email, password);
      setUser(loggedInUser);
      setToken(authToken);
      localStorage.setItem('authToken', authToken);
      localStorage.setItem('authUser', JSON.stringify(loggedInUser)); // Simplistic user storage
      setIsLoading(false);
      return true; // Indicate success
    } catch (err) {
      setError(err.message || 'Login failed');
      setIsLoading(false);
      return false; // Indicate failure
    }
  };

  const logout = async () => {
    setIsLoading(true);
    await simulateLogout(); // Simulate API call if needed
    setUser(null);
    setToken(null);
    localStorage.removeItem('authToken');
    localStorage.removeItem('authUser');
    setIsLoading(false);
  };

  const value = {
    user,
    token,
    isAuthenticated: !!token, // Simple check based on token presence
    isLoading,
    error,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};