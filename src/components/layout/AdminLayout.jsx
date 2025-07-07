// src/layouts/AdminLayout.jsx
import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
export default function AdminLayout () {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-6 bg-gray-100">
        <Outlet />
      </main>
    </div>
  );
};
