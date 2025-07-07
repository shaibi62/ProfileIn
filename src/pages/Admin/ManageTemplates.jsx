import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthProvider, useAuth } from '../../contexts/AuthContext';
import { handleSuccessToast, handleErrorToast } from '../../utils';


const ManageTemplates = () => {
  const [templates, setTemplates] = useState([]);
  const navigate = useNavigate();
const {admin} = useAuth();
useEffect(() => {
    if (!admin) {
      navigate('/');
    }
  }, [admin, navigate]);
  
  const fetchTemplates = async () => {
    try {
      const response = await axios.get('http://localhost/Profilein-Backend/gettemplates.php');
      if (response.data.success) {
        setTemplates(response.data.templates);
      } else {
        handleErrorToast('Failed to fetch templates.');
      };
    } catch (err) {
      handleErrorToast('Server error while fetching templates, error' , err);
    }
  };

  useEffect(() => {
    fetchTemplates();
  }, []);

  const redirectToAdd = () => {
    navigate('/admin/addtemplate');
  };

  // ✅ Delete handler function
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this template?");
    if (!confirmDelete) return;

    try {
      const response = await axios.post('http://localhost/Profilein-Backend/deletetemplate.php', { id });

      if (response.data.success) {
        setTemplates(prev => prev.filter((template) => template.tmpId !== id));
      } else {
        handleErrorToast('Failed to delete the template.');
      }
    } catch (err) {
      handleErrorToast('Server error while deleting template.', err);
    }
  };

  return (
    <div className="flex">
      <div className="ml-10 p-8 w-full">
        <h1 className="text-2xl font-bold mb-6">Manage Templates</h1>

        <button
          className="bg-blue-600 text-white px-4 py-2 rounded mb-4 hover:bg-blue-700"
          onClick={redirectToAdd}
        >
          Add Template
        </button>


        <table className="w-full bg-white shadow-md rounded">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-3">ID</th>
              <th className="p-3">Title</th>
              <th className="p-3">Category</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {templates.map((template) => (
              <tr key={template.tmpId} className="text-center border-b">
                <td className="p-3">{template.tmpId}</td>
                <td className="p-3">{template.Title}</td>
                <td className="p-3">{template.Category}</td>
                <td className="p-3">
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded mr-2"
                    onClick={() => handleDelete(template.tmpId)}
                  >
                    Remove
                  </button>
                  <button
                  className="bg-blue-500 text-white px-3 py-1 rounded w-22"
                  onClick={() => navigate(`/admin/edittemplate/${template.tmpId}`)}
                  >
                 Edit
                  </button>

                </td>
              </tr>
            ))}
            {templates.length === 0 && (
              <tr>
                <td colSpan="4" className="p-4 text-center text-gray-500">
                  No templates found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageTemplates;
