// src/contexts/AuthContext.jsx

import { Link, useNavigate } from 'react-router-dom';
import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

// 1. Create the context
export const AuthContext = createContext();

// 2. Create the provider
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // Initialize to null
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [templates, setTemplates] = useState([]);
  
      const  navigate = useNavigate();
  // Auto-check on page load (Important:  Uses a separate function)
  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const res = await axios.get('http://localhost/Profilein-Backend/me.php', { withCredentials: true });
        if (res.data.success) {
          setUser(res.data.user);
          console.log("User data after authentication check:", res.data.user);
        } else {
          setUser(null);
          console.log("User not authenticated.");
        }
      } catch (error) {
        setUser(null); // Error during authentication check
        console.error("Error during authentication check:", error);
      } finally {
        setLoading(false);
      }
    };

    checkAuthentication(); // Call the function immediately
  }, []);  // Empty dependency array: runs only once on mount

  const login = async (email, password) => {
    try {
      // 🔐 1. Send login request with credentials
      const res = await axios.post('http://localhost/Profilein-Backend/login.php', {
        email,
        password
      }, {
        withCredentials: true // ⬅️ This is CRUCIAL for cookies
      });
  
      // 🟢 2. If login succeeded, fetch user info
      if (res.data.success) {
        try {
          const meRes = await axios.get('http://localhost/Profilein-Backend/me.php', {
            withCredentials: true // ⬅️ Again, needed for cookie to be sent
          });
  
            setUser(meRes.data.user);
            setIsAuthenticated(true);
            return {
              success: true,
              message: res.data.message
            
          }
          
        } catch (meError) {
          console.error("Fetching user error:", meError);
          return {
            success: false,
            message: "Could not retrieve user data."
          };
        }
      } else {
        return {
          success: false,
          message: res.data.message || "Login failed."
        };
      }
  
    } catch (error) {
      console.error("Login error:", error);
      return {
        success: false,
        message: "Login failed due to a network or server error."
      };
    }
  };
  const signup = async (name, email, password) => {
    try {
      const res = await axios.post('http://localhost/Profilein-Backend/signup.php', {
        name,
        email,
        password
      }, {
        withCredentials: true // ⬅️ This is CRUCIAL for cookies
      });
  
      if (res.data.success) {
        try {
          const meRes = await axios.get('http://localhost/Profilein-Backend/me.php', {
            withCredentials: true // ⬅️ Again, needed for cookie to be sent
          });
  
            setUser(meRes.data.user);
            setIsAuthenticated(true);
            return{
              success: true,
              message: res.data.message
            }
           
        
        } catch (meError) {
          console.error("Fetching user error:", meError);
          return {
            success: false,
            message: "Could not retrieve user data."
          };
        }
      } else {
        return {
          success: false,
          message: res.data.message || "Signup failed."
        };
      }
    } catch (error) {
      console.error("Signup error:", error);
      return {
        success: false,
        message: "Signup failed due to a network or server error."
      };
    }
  };
  // Logout function
  
  const logout = async () => {
    try {
      const res = await axios.post('http://localhost/Profilein-Backend/logout.php', {}, { withCredentials: true });
      setUser(null);
      alert("Logout successful");
       return{
              success: true,
              message: res.data.message
            }
            
    } catch (error) {
      console.error("Logout error:", error);
    }
  };
const getTemplates = async () => {
  try {
    const res = await axios.get('http://localhost/Profilein-Backend/Templates.php');
    if (res.data.success) {
      return res.data.templates;
    } else {
      console.error("Error fetching templates:", res.data.message);
      return [];
    }
  } catch (error) {
    console.error("Error fetching templates:", error);
    return [];
  }
}
  const value = { user,getTemplates, login, logout, loading, signup, isAuthenticated };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// 3. Custom hook
export function useAuth() {
  return useContext(AuthContext);
}