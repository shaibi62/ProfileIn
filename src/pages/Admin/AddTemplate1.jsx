import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddTemplate = () => {
  const [templateData, setTemplateData] = useState({
    title: '',
    category: '',
    feature1:'',
    feature2:'',
    feature3:'',
    imageUrl: '',
    
  });

  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setTemplateData({
      ...templateData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost/Profilein-Backend/addtemplate.php', templateData);

      if (response.data.success) {
        setMessage('✅ Template added successfully!');
        setTimeout(() => navigate('/admin/templates'), 1500); // redirect after success
      } else {
        setMessage('❌ Failed to add template.');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('❌ Server error. Try again later.');
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 p-6">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg  ">
        <h2 className="text-2xl font-bold mb-4 text-blue-600 text-center ">Add New Template</h2>

        {message && (
          <p className={`text-center mb-4 font-semibold ${message.includes('✅') ? 'text-green-600' : 'text-red-600'}`}>
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="title"
            placeholder="Template Title"
            value={templateData.title}
            onChange={handleChange}
            required
            className="w-full p-2 pr-10 border border-sky-300 rounded-lg focus:outline-none focus:ring-2  focus:ring-sky-400"
          />

          <input
            type="text"
            name="category"
            placeholder="Category"
            value={templateData.category}
            onChange={handleChange}
            required
            className="w-full p-2 pr-10 border border-sky-300 rounded-lg focus:outline-none focus:ring-2  focus:ring-sky-400"
          />

            <input
            type="text"
            name="feature1"
            placeholder="Feature"
            value={templateData.feature1}
            onChange={handleChange}
            required
            className="w-full p-2 pr-10 border border-sky-300 rounded-lg focus:outline-none focus:ring-2  focus:ring-sky-400"
          />
            <input
            type="text"
            name="feature2"
            placeholder="Feature"
            value={templateData.feature2}
            onChange={handleChange}
            required
            className="w-full p-2 pr-10 border border-sky-300 rounded-lg focus:outline-none focus:ring-2  focus:ring-sky-400"
          />
            <input
            type="text"
            name="feature3"
            placeholder="Feature"
            value={templateData.feature3}
            onChange={handleChange}
            required
            className="w-full p-2 pr-10 border border-sky-300 rounded-lg focus:outline-none focus:ring-2  focus:ring-sky-400"
          />
          <input
            type="text"
            name="imageUrl"
            placeholder="Image URL"
            value={templateData.imageUrl}
            onChange={handleChange}
            required
            className="w-full p-2 pr-10 border border-sky-300 rounded-lg focus:outline-none focus:ring-2  focus:ring-sky-400"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
          >
            Add Template
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTemplate;
