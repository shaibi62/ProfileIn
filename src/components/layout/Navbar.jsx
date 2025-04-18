import { useState } from 'react';
import logo from '../../assets/logo-bg.png';
import './Navbar.css'; 
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';


export default function Header() {
const [menuOpen, setMenuOpen] = useState(false);
const classNav = "cursor-pointer mr-5 sm:px-6 py-3 w-1/2 sm:w-auto sm:justify-start border-b-2 border-[#3B82F6] title-font font-medium bg-transparent inline-flex items-center leading-none text-[#3B82F6] tracking-wider rounded-t hover:text-[#6366F1] hover:bg-[#F3F4F6] hover:border-[#6366F1]";

 const { isAuthenticated, user, logout, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login'); // Redirect to login after logout
  };


return (

<>
<header className="bg-white w-full fixed block shadow-lg shadow-blue-500/50 h-auto justify-center">

      <div className="container mx-auto w-full inset-shadow-2xs flex flex-wrap px-5 flex-row md:flex-row items-center justify-between">
        
        {/* Logo */}
        <a className="flex title-font font-medium items-center text-gray-900 md:mb-0">
          <img src={logo} alt="Logo" className="ml-3 h-15 p-2" />
        </a>

        {/* Burger Button */}
        <button
          className="md:hidden text-gray-800 focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        {/* Navigation */}
        <nav
          className={`${
            menuOpen ? 'flex' : 'hidden'
          } ml-auto md:flex md:ml-auto flex-col md:flex-row items-center text-base justify-start sm:bg-white w-full md:w-auto`}
          
        >
          {/* HOME */}
          <a className={classNav} >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                 stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                 className="w-5 h-5 mr-3">
              <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1V9.5z" />
            </svg> <Link to={"/"}>HOME</Link>
          </a>

          {/* TEMPLATES */}
          <a className={classNav} >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                 stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                 className="w-5 h-5 mr-3">
              <rect x="3" y="4" width="18" height="16" rx="2" ry="2" />
              <line x1="3" y1="10" x2="21" y2="10" />
              <line x1="8" y1="4" x2="8" y2="10" />
            </svg> <Link to="/templates">TEMPLATES</Link>
          </a>

          {/* SIGNUP */}
          <a className={classNav} >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                 stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                 className="w-5 h-5 mr-3">
              <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="8.5" cy="7" r="4" />
              <line x1="20" y1="8" x2="20" y2="14" />
              <line x1="17" y1="11" x2="23" y2="11" />
            </svg> <Link to={"/Signup"}>SIGNUP</Link>
          </a>

          {/* LOGIN */}
          <a className={classNav} >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                 stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                 className="w-5 h-5 mr-3">
              <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
              <polyline points="10 17 15 12 10 7" />
              <line x1="15" y1="12" x2="3" y2="12" />
            </svg> <Link to={"/Login"}>LOGIN</Link>
          </a>

        </nav>
      </div>
    </header>
</>
);
}