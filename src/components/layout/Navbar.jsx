import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import './Navbar.css'; // Basic styling

const Navbar = () => {
  const { isAuthenticated, user, logout, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login'); // Redirect to login after logout
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">ProfileIn</Link>
      <div className="navbar-links">
        <Link to="/templates">Templates</Link> {/* Example public/semi-public link */}

        {isAuthenticated ? (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/portfolio/edit">Edit Portfolio</Link>
            <span className="navbar-user">Welcome, {user?.name || 'User'}!</span>
            <button onClick={handleLogout} disabled={isLoading} className="navbar-button">
              {isLoading ? 'Logging out...' : 'Logout'}
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;