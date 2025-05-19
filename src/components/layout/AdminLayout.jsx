// src/layouts/AdminLayout.jsx
import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-[#1f2937] text-white px-6 py-8">
        <h2 className="text-lg font-bold mb-6">Admin Panel</h2>
        <nav className="space-y-4">
          <NavLink
            to="/admin/dashboard"
            className={({ isActive }) =>
              `flex items-center gap-2 hover:text-blue-400 ${isActive ? 'text-blue-400' : ''}`
            }
          >
            📊 Dashboard
          </NavLink>
          <NavLink
            to="/admin/users"
            className={({ isActive }) =>
              `flex items-center gap-2 hover:text-blue-400 ${isActive ? 'text-blue-400' : ''}`
            }
          >
            👥 Manage Users
          </NavLink>
          <NavLink
            to="/admin/templates"
            className={({ isActive }) =>
              `flex items-center gap-2 hover:text-blue-400 ${isActive ? 'text-blue-400' : ''}`
            }
          >
            📁 Manage Templates
          </NavLink>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8 bg-white">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
