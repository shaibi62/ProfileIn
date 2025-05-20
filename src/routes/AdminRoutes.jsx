// src/routes/AdminRoutes.jsx
import { Route } from 'react-router-dom';
import AdminDashboard from '../pages/Admin/AdminDashboard';
import ManageUsers from '../pages/Admin/ManageUsers';
import ManageTemplates from '../pages/Admin/ManageTemplates';

const AdminRoutes = [
  <Route index element={<AdminDashboard />} key="dashboard" />,
  <Route path="dashboard" element={<AdminDashboard />} key="dashboard2" />,
  <Route path="users" element={<ManageUsers />} key="users" />,
  <Route path="templates" element={<ManageTemplates />} key="templates" />
];

export default AdminRoutes;
