import { useState } from "react";
import logo from "../../assets/logo-bg.png";
import "./Navbar.css";
import { Link, useNavigate, NavLink } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import {
  Layers,
  Users,
  Info,
  UserPlus,
  PanelsLeftBottom ,
  House,
  LayoutPanelTop,
  Headset,
} from "lucide-react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const classNav =
    "cursor-pointer mr-5 sm:px-6 py-3 w-1/2 sm:w-auto sm:justify-start border-b-2 border-[#3B82F6] title-font font-medium bg-transparent inline-flex items-center leading-none text-[#3B82F6] tracking-wider rounded-t hover:text-[#6366F1] hover:bg-[#F3F4F6] hover:border-[#6366F1]";

  const { isAuthenticated, user, logout, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login"); // Redirect to login after logout
  };

  return (
    <>
      <header className="bg-white fixed w-full z-50 top-0 block shadow-xs shadow-[#6366F1]">
        <div className="container flex flex-wrap mx-auto flex-row items-center justify-between px-3">
          {/* Logo */}
          <a className="flex title-font font-medium items-center text-gray-900">
            <img src={logo} alt="Logo" className="ml-3 h-15 p-2" />
          </a>

          {/* Burger Button */}
          <button
            className="md:hidden text-gray-800 focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              {menuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>

          {/* Navigation */}
          <nav
            className={`${
              menuOpen ? "flex" : "hidden"
            } ml-auto md:flex md:ml-auto flex-col md:flex-row items-center text-base justify-start w-full md:w-auto`}
          >
            {/* HOME */}
            <div className={classNav}>
              <NavLink to={"/"}>
                <House className="w-5 h-5 mr-3" />
              </NavLink>
              <NavLink to={"/"}>HOME </NavLink>
            </div>

            {/* TEMPLATES */}

            <div className={classNav}>
              <NavLink to="/templates">
                <PanelsLeftBottom  className="w-5 h-5 mr-3" />
              </NavLink>
              <NavLink to="/templates"> TEMPLATES </NavLink>
            </div>

            {/* About */}

            <div className={classNav}>
              <NavLink to={"/about"}>
                <Info className="w-5 h-5 mr-3" />
              </NavLink>
              <NavLink to={"/about"}>ABOUT </NavLink>
            </div>

            {/* CONTACT */}

            <div className={classNav}>
              <NavLink to={"contact"}>
                <Headset className="w-5 h-5 mr-3" />
              </NavLink>
              <NavLink to={"contact"}> CONTACT</NavLink>
            </div>

            {/* LOGIN */}

            <div className={classNav}>
              <NavLink to={"/login"}>
                <UserPlus className="w-5 h-5 mr-3" />
                
              </NavLink>
              <NavLink to={"/login"}> LOGIN </NavLink>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
}
