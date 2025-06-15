import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthProvider, useAuth } from '../../contexts/AuthContext';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const {admin} = useAuth();
  useEffect(() => {
      if (!admin) {
        navigate('/');
      }
    }, [admin, navigate]);
    
  useEffect(() => {
    axios.get('http://localhost/Profilein-Backend/getusers.php')
      .then(response => {
        if (response.data.success) {
          setUsers(response.data.users); // assuming your PHP returns { success: true, users: [...] }
        } else {
          setError('Failed to fetch users.');
        }
      })
      .catch(err => {
        console.error(err);
        setError('Server error while fetching users.');
      });
  }, []);

  return (
    <div className="p-8 w-full">
      <h1 className="text-2xl font-bold mb-6">Manage Users</h1>

      {error && (
        <p className="text-red-600 bg-red-100 border border-red-400 px-4 py-2 rounded mb-4">{error}</p>
      )}

      <table className="w-full bg-white shadow-md rounded">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-3">ID</th>
            <th className="p-3">Name</th>
            <th className="p-3">Email</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user) => (
              <tr key={user.usrId} className="text-center border-b">
                <td className="p-3">{user.usrId}</td>
                <td className="p-3">{user.Name}</td>
                <td className="p-3">{user.Email}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="p-3 text-center text-gray-500">
                No users found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ManageUsers;
