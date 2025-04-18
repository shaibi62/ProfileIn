import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import './PageStyles.css'; // Basic styling for forms

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoggedIn(true)
    console.log('Login Submitted:', credentials);
    // Add your login logic here
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md border border-sky-200  ">
        {isLoggedIn && (
  <p className="text-green-600 bg-green-100 border border-green-400 px-4 py-2 rounded-md mb-4 mt-0.5 text-center font-semibold">
    ✅ Login successful!
  </p>
)}
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-600 my-10 ">
          Welcome Back to ProfileIn
        </h2>

        <center>
        <form onSubmit={handleSubmit} className="space-y-4 text-gray-800">
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={credentials.email}
            onChange={handleChange}
            className="w-350px px-4 py-2 mt-10 border border-sky-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400"
            required
          />
          <br></br>
          
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={credentials.password}
            onChange={handleChange}
            className="w-350px px-4 py-2 border border-sky-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400"
            required
          />
          <br></br>
         
          <button
            type="submit"
            className="w-22 bg-blue-600 hover:bg-white-700 text-white py-2 rounded-lg transition duration-200"
          >
            Login
          </button>
        </form>
        </center>
        <p className="mt-4 text-center text-sm text-gray-500">
          Don’t have an account?{' '}
          <a href="/signup" className="text-sky-600 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;



