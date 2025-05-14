// src/layouts/AdminLayout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-100 p-4 shadow-md">
        <h2 className="text-xl font-bold mb-4">Admin Panel</h2>
       { <ul className="space-y-2">
          <li><a href="/admin/dashboard" className="text-blue-600 hover:underline">Dashboard</a></li>
          <li><a href="/admin/users" className="text-blue-600 hover:underline">Manage Users</a></li>
          <li><a href="/admin/templates" className="text-blue-600 hover:underline">Manage Templates</a></li>
        </ul> }
      </aside>

      {/* Page Content */}
      <main className="flex-1 p-6 bg-white">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
