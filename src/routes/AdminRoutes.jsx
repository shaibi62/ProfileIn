// src/routes/AdminRoutes.jsx
import { Route } from 'react-router-dom';
import AdminDashboard from '../pages/Admin/AdminDashboard';
import ManageUsers from '../pages/Admin/ManageUsers';
import ManageTemplates from '../pages/Admin/ManageTemplates';
import AddTemplate from '../pages/Admin/AddTemplate';
import EditTemplate from '../pages/Admin/EditTemplate';







const AdminRoutes = [
  <Route index element={<AdminDashboard />} key="dashboard" />,
  <Route path="dashboard" element={<AdminDashboard />} key="dashboard2" />,
  <Route path="users" element={<ManageUsers />} key="users" />,
  <Route path="templates" element={<ManageTemplates />} key="templates" />,
  <Route path="addtemplate" element={<AddTemplate />} key="template2"/>,
  <Route path="edittemplate/:id" element={<EditTemplate />} key="edittemplate" />,
];

export default AdminRoutes;
