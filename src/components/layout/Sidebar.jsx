// src/components/Sidebar.jsx
import { NavLink } from "react-router-dom";
import { AuthProvider, useAuth } from "../../contexts/AuthContext";
import { aside } from "framer-motion/client";
import {ChartNoAxesCombined, UserRoundCog, Folder, MessageSquareMore} from  "lucide-react";
const Sidebar = () => {
  const { logout } = useAuth();
  const handleLogout = async () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (!confirmLogout) return;
    await logout();
    navigate("/login");
  };
    const navLinkClass = `cursor-pointer p-2 title-font font-medium inline-flex flex flex-row items-center leading-none tracking-wider rounded-t hover:text-[#6366F1] hover:bg-[#F3F4F6] hover:border-[#6366F1] text-white border-[#3B82F6]`;

  return (
    <aside className="min-h-screen">
      <div className="sidebar m-3 w-[250px] min-h-screen rounded-xl flex flex-col bg-[#6366F1] text-white p-4">
      <h2 className="text-xl font-bold mb-8">Admin Panel</h2>
      <nav className="flex flex-col space-y-4">
        <ul>
          <li className={navLinkClass}>
            <NavLink to="/admin/dashboard" className="flex flex-row items-center">
              <ChartNoAxesCombined className="ml-0 mr-2" /> Dashboard
            </NavLink>
          </li>
          <li className={navLinkClass}>
            <NavLink to="/admin/users" className="flex flex-row items-center">
              <UserRoundCog className="ml-0 mr-2" /> Manage Users
            </NavLink>
          </li>
          <li className={navLinkClass}>
            <NavLink to="/admin/templates" className="flex flex-row items-center">
              <Folder className="ml-0 mr-2"/> Manage Templates
            </NavLink>
          </li>
          <li className={navLinkClass}>
            <NavLink to="/admin/usercontact" className="flex flex-row items-center">
              <MessageSquareMore className="ml-0 mr-2"/> User Messages
            </NavLink>
          </li>
          <li>
            <button
              onClick={handleLogout}
              className="m-2 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
            >
              Logout
            </button>
          </li>
        </ul>
      </nav>
    </div>
    </aside>
    
  );
};

export default Sidebar;
