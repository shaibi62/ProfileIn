import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditTemplate = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [template, setTemplate] = useState({
       title: '',
    category: '',
    feature1:'',
    feature2:'',
    feature3:'',
    imageUrl: '',
  });

  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get(`http://localhost/Profilein-Backend/get_template_by_id.php?id=${id}`)
      .then((res) => {
        if (res.data.success) {
          setTemplate(res.data.template);
        } else {
          setMessage("Template not found.");
        }
      })
      .catch(() => setMessage("Server error."));
  }, [id]);

  const handleChange = (e) => {
    setTemplate({ ...template, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost/Profilein-Backend/update_template.php`, { ...template, id });
      if (response.data.success) {
        setMessage('✅ Template updated!');
        setTimeout(() => navigate('/admin/templates'), 1500);
      } else {
        setMessage('❌ Update failed.');
      }
    } catch (error) {
      setMessage('❌ Server error.');
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 p-6">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-4 text-blue-600">Edit Template</h2>
        {message && <p className={`mb-4 text-center font-semibold ${message.includes('✅') ? 'text-green-600' : 'text-red-600'}`}>{message}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input name="title" value={template.title} onChange={handleChange} className="w-full border px-3 py-2 rounded-lg border-sky-300" placeholder="Title" required />
          <input name="category" value={template.category} onChange={handleChange} className="w-full border px-3 py-2 rounded-lg border-sky-300" placeholder="Category" required />
          <input name="feature1" value={template.description} onChange={handleChange} className="w-full border px-3 py-2 rounded-lg border-sky-300" placeholder="Description" />
          <input name="feature2" value={template.description} onChange={handleChange} className="w-full border px-3 py-2 rounded-lg border-sky-300" placeholder="Description" />
          <input name="feature3" value={template.description} onChange={handleChange} className="w-full border px-3 py-2 rounded-lg border-sky-300" placeholder="Description" />
          <input name="imageUrl" value={template.imageUrl} onChange={handleChange} className="w-full border px-3 py-2 rounded-lg border-sky-300" placeholder="Image URL" />
         
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">Update Template</button>
        </form>
      </div>
    </div>
  );
};

export default EditTemplate;
