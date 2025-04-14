import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import './Navbar.css'; // Basic styling
import logo from '../../assets/logo-bg.png';
import home from'../../assets/icons/home.svg'
const Navbar = () => {
  const { isAuthenticated, user, logout, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login'); // Redirect to login after logout
  };
 

  return (
    <>

<header className="body-font bg-white" >
  <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
    {/* Logo */}
    <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
      <img src={logo} alt="Logo" className="ml-3 h-[60px] p-2" />
    </a>

    {/* Navigation Links */}
    <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
      {/* Home Link */}
      <a className="mr-5 hover:text-white sm:px-6 py-3 w-1/2 sm:w-auto justify-center sm:justify-start border-b-2 title-font font-medium bg-transparent inline-flex items-center leading-none border-transparent text-indigo-500 tracking-wider rounded-t"
         style={{ color: 'var(--primary-accent)', borderColor: 'var(--primary-accent)' }}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 mr-3">
          <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1V9.5z" />
        </svg> HOME
      </a>

      {/* Templates Link */}
      <a className="mr-5 hover:text-white sm:px-6 py-3 w-1/2 sm:w-auto justify-center sm:justify-start border-b-2 title-font font-medium bg-transparent inline-flex items-center leading-none border-transparent text-indigo-500 tracking-wider rounded-t"
         style={{ color: 'var(--primary-accent)', borderColor: 'var(--primary-accent)' }}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 mr-3">
          <rect x="3" y="4" width="18" height="16" rx="2" ry="2" />
          <line x1="3" y1="10" x2="21" y2="10" />
          <line x1="8" y1="4" x2="8" y2="10" />
        </svg> TEMPLATES
      </a>

      {/* SignUp Link */}
      <a className="mr-5 hover:text-white sm:px-6 py-3 w-1/2 sm:w-auto justify-center sm:justify-start border-b-2 title-font font-medium bg-transparent inline-flex items-center leading-none border-transparent text-indigo-500 tracking-wider rounded-t"
         style={{ color: 'var(--primary-accent)', borderColor: 'var(--primary-accent)' }}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 mr-3">
          <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="8.5" cy="7" r="4" />
          <line x1="20" y1="8" x2="20" y2="14" />
          <line x1="17" y1="11" x2="23" y2="11" />
        </svg> SIGNUP
      </a>

      {/* Login Link */}
      <a className="mr-5 hover:text-white sm:px-6 py-3 w-1/2 sm:w-auto justify-center sm:justify-start border-b-2 title-font font-medium bg-transparent inline-flex items-center leading-none border-transparent text-indigo-500 tracking-wider rounded-t"
         style={{ color: 'var(--primary-accent)', borderColor: 'var(--primary-accent)' }}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 mr-3">
          <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
          <polyline points="10 17 15 12 10 7" />
          <line x1="15" y1="12" x2="3" y2="12" />
        </svg> LOGIN
      </a>
    </nav>

    
  </div>
</header>




<header className="body-font" style={{ backgroundColor: 'var(--surface-cards)', padding: '20px 0', borderBottom: '1px solid var(--border-light)' }}>
  <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
    {/* Logo */}
    <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
      <img src={logo} alt="Logo" className="ml-3 h-15 p-2" />
    </a>

    {/* Navigation Links */}
    <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
      {/* Home Link */}
      <a className="mr-5 hover:text-white sm:px-6 py-3 w-1/2 sm:w-auto justify-center sm:justify-start border-b-2 title-font font-medium bg-transparent inline-flex items-center leading-none border-transparent text-indigo-500 tracking-wider rounded-t"
         style={{ color: 'var(--primary-accent)', borderColor: 'var(--primary-accent)' }}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 mr-3">
          <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1V9.5z" />
        </svg> HOME
      </a>

      {/* Templates Link */}
      <a className="mr-5 hover:text-white sm:px-6 py-3 w-1/2 sm:w-auto justify-center sm:justify-start border-b-2 title-font font-medium bg-transparent inline-flex items-center leading-none border-transparent text-indigo-500 tracking-wider rounded-t"
         style={{ color: 'var(--primary-accent)', borderColor: 'var(--primary-accent)' }}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 mr-3">
          <rect x="3" y="4" width="18" height="16" rx="2" ry="2" />
          <line x1="3" y1="10" x2="21" y2="10" />
          <line x1="8" y1="4" x2="8" y2="10" />
        </svg> TEMPLATES
      </a>

      {/* SignUp Link */}
      <a className="mr-5 hover:text-white sm:px-6 py-3 w-1/2 sm:w-auto justify-center sm:justify-start border-b-2 title-font font-medium bg-transparent inline-flex items-center leading-none border-transparent text-indigo-500 tracking-wider rounded-t"
         style={{ color: 'var(--primary-accent)', borderColor: 'var(--primary-accent)' }}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 mr-3">
          <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="8.5" cy="7" r="4" />
          <line x1="20" y1="8" x2="20" y2="14" />
          <line x1="17" y1="11" x2="23" y2="11" />
        </svg> SIGNUP
      </a>

      {/* Login Link */}
      <a className="mr-5 hover:text-white sm:px-6 py-3 w-1/2 sm:w-auto justify-center sm:justify-start border-b-2 title-font font-medium bg-transparent inline-flex items-center leading-none border-transparent text-indigo-500 tracking-wider rounded-t"
         style={{ color: 'var(--primary-accent)', borderColor: 'var(--primary-accent)' }}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 mr-3">
          <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
          <polyline points="10 17 15 12 10 7" />
          <line x1="15" y1="12" x2="3" y2="12" />
        </svg> LOGIN
      </a>
    </nav>

    {/* Search Bar */}
    <div className="flex items-center mt-4 md:mt-0">
      <input
        type="text"
        placeholder="Search..."
        className="px-4 py-2 w-64 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        style={{ borderColor: 'var(--border-light)', backgroundColor: 'var(--surface-cards)' }}
      />
      <button className="ml-2 inline-flex items-center bg-indigo-500 text-white rounded-lg p-2 hover:bg-indigo-600 focus:outline-none">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
          <circle cx="11" cy="11" r="8" />
          <line x1="16" y1="16" x2="22" y2="22" />
        </svg>
      </button>
    </div>
  </div>
</header>




    <header className="text-gray-600 body-font">
    <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
      
      <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
        <img src={logo} alt="Logo" className="ml-3 text-xl h-15 text-white p-2" />
      </a>

      <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
        <a className="mr-5 hover:text-gray-900 sm:px-6 py-3 w-1/2 sm:w-auto justify-center sm:justify-start border-b-2 title-font font-medium bg-gray-100 inline-flex items-center leading-none border-indigo-500 text-indigo-500 tracking-wider rounded-t">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="w-5 h-5 mr-3">
          <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1V9.5z" />
        </svg>HOME
        </a>
  
      <a className="mr-5 hover:text-gray-900 sm:px-6 py-3 w-1/2 sm:w-auto justify-center sm:justify-start border-b-2 title-font font-medium bg-gray-100 inline-flex items-center leading-none border-indigo-500 text-indigo-500 tracking-wider rounded-t">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="w-5 h-5 mr-3" >
          <rect x="3" y="4" width="18" height="16" rx="2" ry="2" />
          <line x1="3" y1="10" x2="21" y2="10" />
          <line x1="8" y1="4" x2="8" y2="10" />
        </svg>TEMPLATES
      </a>
      <a className="mr-5 hover:text-gray-900 sm:px-6 py-3 w-1/2 sm:w-auto justify-center sm:justify-start border-b-2 title-font font-medium bg-gray-100 inline-flex items-center leading-none border-indigo-500 text-indigo-500 tracking-wider rounded-t">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="w-5 h-5 mr-3" >
          <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="8.5" cy="7" r="4" />
          <line x1="20" y1="8" x2="20" y2="14" />
          <line x1="17" y1="11" x2="23" y2="11" />
        </svg> SIGNUP
      </a>
      <a className="mr-5 hover:text-gray-900 sm:px-6 py-3 w-1/2 sm:w-auto justify-center sm:justify-start border-b-2 title-font font-medium bg-gray-100 inline-flex items-center leading-none border-indigo-500 text-indigo-500 tracking-wider rounded-t">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="w-5 h-5 mr-3">
          <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
          <polyline points="10 17 15 12 10 7" />
          <line x1="15" y1="12" x2="3" y2="12" />
        </svg> LOGIN
      </a>

      </nav>
      <button className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">Button
        <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-4 h-4 ml-1" viewBox="0 0 24 24">
          <path d="M5 12h14M12 5l7 7-7 7"></path>
        </svg>
      </button>
    </div>
  </header>
  
   
   <nav className="navbar">
      <>
      <Link to="/" className="navbar-brand"><img src={logo} height="30px" alt="Logo" /></Link>
      </>
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
    </>
  );
};

export default Navbar;