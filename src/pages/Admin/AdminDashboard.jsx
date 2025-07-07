import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../../components/layout/Sidebar'; // Optional, if needed
import { useNavigate } from 'react-router-dom';
import { AuthProvider, useAuth } from '../../contexts/AuthContext';
import {ChartNoAxesCombined, User, Folder} from  "lucide-react";
import { handleSuccessToast, handleErrorToast } from '../../utils';


const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalTemplates: 0
  });
const navigate = useNavigate();
const {admin} = useAuth();
useEffect(() => {
    if (!admin) {
      navigate('/');
    }
  }, [admin, navigate]);
  
  useEffect(() => {
    axios.get('http://localhost/Profilein-Backend/dashboardstats.php')
      .then(res => {
        if (res.data.success) {
          setStats({
            totalUsers: res.data.totalUsers,
            totalTemplates: res.data.totalTemplates
          });
        }
      })
      .catch(err => {
        handleErrorToast('Error fetching stats:', err);
      });
  }, []);

  return (
    <div className="flex">
      
      {/* Sidebar can be removed if not used */}
      <div className="ml-10 p-8 w-full">
        <h1 className="text-2xl font-bold mb-6 text-[#1e293b]">Dashboard Analytics</h1>
        <div className="flex gap-6">
          <div className="bg-green-100 px-6 py-4 rounded shadow text-xl text-[#1e293b]">
            <User /> Total Users: {stats.totalUsers}
          </div>
          <div className="bg-blue-100 px-6 py-4 rounded shadow text-xl text-[#1e293b]">
            <Folder  /> Templates: {stats.totalTemplates}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
