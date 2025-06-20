// src/contexts/AuthContext.jsx

import { Link, useNavigate } from 'react-router-dom';
import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

// 1. Create the context
export const AuthContext = createContext();

// 2. Create the provider
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // Initialize to null
  const [admin, setAdmin] = useState(null); // Initialize to null
  const [loading, setLoading] = useState(true);
  const Baseurl = 'http://localhost/Profilein-Backend/';
  const navigate = useNavigate();

  // Auto-check on page load (Important:  Uses a separate function)
  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const res = await axios.get(Baseurl + 'me.php', { withCredentials: true });
        if (res.data.success) {
          if (res.data.user.role === 'admin') {
            setAdmin(res.data.user);
            setUser(null);
            console.log("Admin data after authentication check:", res.data.user);
          }
          if (res.data.user.role === 'user') {
            console.log("User data after authentication check:", res.data.user);
            setAdmin(null);
            setUser(res.data.user);
          }
        } else {
          setUser(null);
          setAdmin(null);
          console.log("User not authenticated.");
        }
      } catch (error) {
        setUser(null); // Error during authentication check
        setAdmin(null); // Error during authentication check
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
      const res = await axios.post(Baseurl + 'login.php', {
        email,
        password
      }, {
        withCredentials: true // ⬅️ This is CRUCIAL for cookies
      });

      // 🟢 2. If login succeeded, fetch user info
      if (res.data.success) {
        try {
          const meRes = await axios.get(Baseurl + 'me.php', {
            withCredentials: true // ⬅️ Again, needed for cookie to be sent
          });
          if (meRes.data.user && meRes.data.user.role === 'user') {
            setUser(meRes.data.user);
            setAdmin(null);
          }
          return {
            success: true,
            message: res.data.message
          };
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

  const loginAdmin = async (email, password) => {
    try {
      const res = await axios.post(Baseurl + 'loginAdmin.php', {
        email,
        password
      }, {
        withCredentials: true
      });

      if (res.data.success) {
        try {
          const meRes = await axios.get(Baseurl + 'me.php', {
            withCredentials: true
          });
          if (meRes.data.user && meRes.data.user.role === 'admin') {
            setAdmin(meRes.data.user);
            setUser(null);
          }
          return {
            success: true,
            message: res.data.message
          };
        } catch (meError) {
          console.error("Fetching Admin error:", meError);
          return {
            success: false,
            message: "Could not retrieve Admin data."
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
      const res = await axios.post(Baseurl + 'signup.php', {
        name,
        email,
        password
      }, {
        withCredentials: true
      });

      if (res.data.success) {
        try {
          const meRes = await axios.get(Baseurl + 'me.php', {
            withCredentials: true
          });
          setUser(meRes.data.user);
          return {
            success: true,
            message: res.data.message
          };
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

  // 🔐 Send OTP to email & store in pending table
  const sendSignupOTP = async (name, email, password) => {
    try {
      const res = await axios.post(Baseurl + 'send_otp_signup.php', {
        name,
        email,
        password
      });
      return res.data;
    } catch (error) {
      console.error("sendSignupOTP error:", error);
      return { success: false, message: "Failed to send OTP" };
    }
  };

  // 🔐 Verify OTP and complete signup
  const verifySignupOTP = async (email, otp) => {
    try {
      const res = await axios.post(Baseurl + 'verify_otp_signup.php', {
        email,
        otp
      });
      return res.data;
    } catch (error) {
      console.error("verifySignupOTP error:", error);
      return { success: false, message: "OTP verification failed" };
    }
  };

  // Logout function
  const logout = async () => {
    try {
      const res = await axios.post(Baseurl + 'logout.php', {}, { withCredentials: true });
      setUser(null);
      setAdmin(null);
      alert("Logout successful");
      return {
        success: true,
        message: res.data.message
      };
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  // 🔄 Added sendSignupOTP & verifySignupOTP to value
  const value = {
    user,
    admin,
    login,
    logout,
    loading,
    signup,
    loginAdmin,
    sendSignupOTP,
    verifySignupOTP
  };

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
