import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditTemplate = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [template, setTemplate] = useState({
    Title: '',
    Category: '',
    Feature1:'',
    Feature2:'',
    Feature3:'',
    Image: '',
  });

  const [message, setMessage] = useState('');
useEffect(() => {
  console.log("Template state updated", template);
}, [template]);

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
      const response = await axios.post(`http://localhost/Profilein-Backend/updatetemplate.php`, { ...template, id });
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
          <input name="Title" value={template.Title} onChange={handleChange} className="w-full border px-3 py-2 rounded-lg border-sky-300" placeholder="Title" required />
          <input name="Category" value={template.Category} onChange={handleChange} className="w-full border px-3 py-2 rounded-lg border-sky-300" placeholder="Category" required />
          <input name="Feature1" value={template.Feature1} onChange={handleChange} className="w-full border px-3 py-2 rounded-lg border-sky-300" placeholder="Feature1" />
          <input name="Feature2" value={template.Feature2} onChange={handleChange} className="w-full border px-3 py-2 rounded-lg border-sky-300" placeholder="Feature2" />
          <input name="Feature3" value={template.Feature3} onChange={handleChange} className="w-full border px-3 py-2 rounded-lg border-sky-300" placeholder="Feature3" />
          <input name="Image" value={template.Image} onChange={handleChange} className="w-full border px-3 py-2 rounded-lg border-sky-300" placeholder="Image URL" />
         
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">Update Template</button>
        </form>
      </div>
    </div>
  );
};

export default EditTemplate;
