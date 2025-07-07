import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { Bars } from 'react-loader-spinner';
import { handleSuccessToast, handleErrorToast } from '../utils';

const Login = () => {
  const [credentials, setCredentials] = useState({ 
    email: '', 
    password: '' 
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isAdminLogin, setIsAdminLogin] = useState(false);
  const navigate = useNavigate();
  
  const { login, loginAdmin } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({ ...prev, [name]: value }));
  };
  const handleAdminLoginChange = (e) => {
    const { checked } = e.target;
    setIsAdminLogin(checked);
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (isAdminLogin) {
        const res = await loginAdmin(credentials.email, credentials.password);
        if (res.success) {
          handleSuccessToast('Login successful');
          navigate('/admin/dashboard');
        } else handleErrorToast(res.message || 'Invalid email or password');
      } else {
        const res = await login(credentials.email, credentials.password);
        if (res.success) {
          handleSuccessToast('Login successful');
          navigate('/userprofile');
        } else handleErrorToast(res.message || 'Invalid email or password');
      }
    } catch (error) {
      handleErrorToast(error.response?.data?.message || 'Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-4/5 md:w-1/3 border border-sky-200">
        <h2 className="text-3xl my-10 font-bold mb-6 text-center text-blue-600">
          Welcome Back
        </h2>


        <form onSubmit={handleSubmit} className="space-y-4 text-gray-800 w-[90%] md:w-[60%] flex flex-col mx-auto">
          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              value={credentials.email}
              onChange={handleChange}
              className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg 
                        focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none
                        transition duration-200"
              placeholder="your@email.com"
              required
              autoFocus
            />
          </div>

          {/* Password Input */}
          <div>
            <label htmlFor="password" className="block mb-1 text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={credentials.password}
                onChange={handleChange}
                className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg 
                          focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none
                          transition duration-200 pr-10"
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? (
                  <EyeSlashIcon className="w-5 h-5" />
                ) : (
                  <EyeIcon className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
          
              <div >
                <input type="checkbox" name="admin-login" onChange={handleAdminLoginChange} /> Login as Admin?
              </div>
          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg
                      focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                      transition duration-200 flex justify-center items-center gap-2"
          >
            {isLoading ? (
              <>
                <Bars height={18} width={18} color="#fff" />
                Signing in...
              </>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        <div className="mt-6 text-center space-y-3 text-sm text-gray-600">
          <p>
            <Link 
              to="/forgot-password" 
              className="text-blue-600 hover:text-blue-800 hover:underline font-medium"
            >
              Forgot password?
            </Link>
          </p>
          <p>
            Don't have an account?{' '}
            <Link 
              to="/signup" 
              className="text-blue-600 hover:text-blue-800 hover:underline font-medium"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;