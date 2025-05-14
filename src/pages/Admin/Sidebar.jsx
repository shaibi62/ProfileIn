// src/components/Sidebar.jsx
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-[#1E293B] text-white p-6 fixed">
      <h2 className="text-xl font-bold mb-8">Admin Panel</h2>
      <nav className="flex flex-col space-y-4">
        <NavLink to="/admin/dashboard" className="hover:text-green-400">📊 Dashboard</NavLink>
        <NavLink to="/admin/users" className="hover:text-green-400">👥 Manage Users</NavLink>
        <NavLink to="/admin/templates" className="hover:text-green-400">📁 Manage Templates</NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;
