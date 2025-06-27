import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { AuthProvider, useAuth } from "../../contexts/AuthContext";
import { handleSuccessToast, handleErrorToast } from '../../utils';
const EditTemplate = () => {
  const { id } = useParams();
  console.log("Template ID:", id); // ✅ Log the ID to check if it's correct
  const [templateData, setTemplateData] = useState({
    title: "",
    category: "",
    features: ["", "", ""],
    previewImage: null,
    templateZip: null,
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { admin } = useAuth();
  useEffect(() => {
    if (!admin) {
      navigate("/");
    }
  }, [admin, navigate]);

  const handleChange = (e) => {
    setTemplateData({
      ...templateData,
      [e.target.name]: e.target.value,
    });
  };

 useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost/Profilein-Backend/get_template_by_id.php?id=${id}`
      );
      if (response.data.success) {
        const data = response.data;

        setTemplateData({
          title: data.template?.Title || "notfound",
          category: data.template?.Category || "notfound",
          features: [
            data.template?.Feature1 || "notfound",
            data.template?.Feature2 || "notfound",
            data.template?.Feature3 || "notfound",
          ],
          previewImage: null,
          templateZip: null
        });
      }
    } catch (err) {
      handleErrorToast("Error loading template data", err);
    }
  };

  if (id) fetchData(); // ✅ Corrected
}, [id, admin]); // ✅ include `id` in the dependency array

  const handleFeatureChange = (index, value) => {
    const newFeatures = [...templateData.features];
    newFeatures[index] = value;
    setTemplateData({ ...templateData, features: newFeatures });
  };

  const handleFileChange = (e) => {
    setTemplateData({
      ...templateData,
      [e.target.name]: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append("id", id);
      formData.append("title", templateData.title);
      formData.append("category", templateData.category);
      formData.append("feature1", templateData.features[0]);
      formData.append("feature2", templateData.features[1]);
      formData.append("feature3", templateData.features[2]);
      formData.append("previewImage", templateData.previewImage);
      formData.append("templateZip", templateData.templateZip);

      const response = await axios.post(
        `http://localhost/Profilein-Backend/edit-template.php`,
        formData,
        id,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.success) {
        handleSuccessToast("Template added successfully!");
        setTimeout(() => navigate("/admin/templates"), 1500);
      } else {
        handleErrorToast("Failed to add template");
      }
    } catch (error) {
      console.error("Upload error:", error);
      handleErrorToast(
        error.response?.data?.error || "Server error. Try again later."
      );
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 p-6">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-4 text-blue-600 text-center">
          Update Template
        </h2>
        <h5 className="mb-4 text-blue-600 text-center">
          Change data need to update
        </h5>


        

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
          encType="multipart/form-data"
        >
          <input
            type="text"
            name="title"
            placeholder="Template Title (Will be folder name)"
            value={templateData.title}
            onChange={handleChange}
            required
            className="w-full p-2 border border-sky-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400"
          />

          <input
            type="text"
            name="category"
            placeholder="Category"
            value={templateData.category}
            onChange={handleChange}
            required
            className="w-full p-2 border border-sky-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400"
          />

          {templateData.features.map((feature, index) => (
            <input
              key={index}
              type="text"
              placeholder={`Feature ${index + 1}`}
              value={feature}
              onChange={(e) => handleFeatureChange(index, e.target.value)}
              required
              className="w-full p-2 border border-sky-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400"
            />
          ))}

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Category Preview Image (Max 2MB)
            </label>
            <input
              type="file"
              name="previewImage"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full p-2 border border-sky-300 rounded-lg"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Template Files (ZIP, Max 15MB)
            </label>
            <input
              type="file"
              name="templateZip"
              accept=".zip"
              onChange={handleFileChange}
              className="w-full p-2 border border-sky-300 rounded-lg"
            />
            <p className="text-xs text-gray-500 mt-1">
              Upload a ZIP file containing HTML, CSS, and images. The folder
              will be named after the template title.
            </p>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Processing...
              </span>
            ) : (
              "Edit Template"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditTemplate;
