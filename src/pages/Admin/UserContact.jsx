import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { handleSuccessToast, handleErrorToast } from '../../utils';

const UserContact = () => {
  const [contactMessages, setContactMessages] = useState([]);
  const navigate = useNavigate();
  const { admin } = useAuth();

  useEffect(() => {
    if (admin === false) {
      navigate('/');
    }
  }, [admin, navigate]);

  useEffect(() => {
    axios.get('http://localhost/Profilein-Backend/getContactData.php')
      .then(response => {
        if (response.data.success) {
          setContactMessages(response.data.Contacts || []);
        } else {
          handleErrorToast('Failed to fetch contact messages.');
        }
      })
      .catch(err => {
        handleErrorToast('Server error while fetching contact messages.', err);
      });
  }, []);

  return (
    <div className="p-8 w-full">
      <h1 className="text-2xl font-bold mb-6">User Contact Messages</h1>
      <table className="w-full bg-white shadow-md rounded">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-3">Name</th>
            <th className="p-3">Email</th>
            <th className="p-3">Message</th>
          </tr>
        </thead>
        <tbody>
          {contactMessages.length > 0 ? (
            contactMessages.map((msg, idx) => (
              <tr key={msg.usrId || idx} className="text-center border-b">
                <td className="p-3">{msg.Name}</td>
                <td className="p-3">{msg.Email}</td>
                <td className="p-3">{msg.Message}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="p-3 text-center text-gray-500">
                No contact messages found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserContact;
