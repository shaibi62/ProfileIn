import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UserSidebar from "../components/layout/UserSidebar";


export default function PortfolioEditPage() {
  const [category, setCategory] = useState("");
  const [template, setTemplate] = useState("");
  const [templates, setTemplates] = useState([]);
  const [categories, setCategories] = useState([]);
  const [tempId, setTempId] = useState(""); // Assuming you need to store a template ID
  const navigate = useNavigate();
  const { user } = useAuth();
  const userId = user?.id || null; // Assuming user context provides user ID
  if (!userId) {
    navigate("/login"); // Redirect to login if user is not authenticated
  }
  const Baseurl = "http://localhost/Profilein-Backend/";
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        Baseurl + "saveSelection.php",
        { tempId, userId },
        { withCredentials: true }
      );

      if (response.data.success) {
        console.log('Selection saved:', response.data);
        window.open(response.data.path, '_blank');
        navigate("/userprofile");
    }
 else {
        console.error("Save failed:", response.data.error);
      }
    } catch (err) {
      console.error("Error during save:", err);
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          "http://localhost/Profilein-Backend/getCategories.php",
          {
            method: "GET",
            headers: { Accept: "application/json" },
            credentials: "include",
          }
        );
        const data = await response.json();
        if (data.success) {
          setCategories(data.categories);
        } else {
          console.error("Failed to fetch categories:", data.error);
        }
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryChange = async (e) => {
    const selectedCategory = e.target.value;
    setCategory(selectedCategory);
    setTemplate(""); // Reset template selection

    try {
      const response = await fetch(
        `http://localhost/Profilein-Backend/getTemplatesByCategory.php?category=${selectedCategory}`,
        {
          method: "GET",
          headers: { Accept: "application/json" },
          credentials: "include",
        }
      );
      const data = await response.json();
      if (data.success) {
        setTemplates(data.templates);
      } else {
        console.error("Failed to fetch templates:", data.error);
        setTemplates([]);
      }
    } catch (error) {
      console.error("Error fetching templates:", error);
      setTemplates([]);
    }
  };

  const handleTemplateChange = (e) => {
    const selectedTemplateName = e.target.value;
    setTemplate(selectedTemplateName);

    const selected = templates.find((tpl) => tpl.name === selectedTemplateName);
    if (selected) {
      setTempId(selected.id); // store the corresponding ID
    }
  };

  return (
    <div className="flex flex-row min-h-screen w-full bg-gray-50">
      <UserSidebar />
    <div className="flex flex-col items-center justify-center w-full min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">Portfolio Edit</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-6 w-full max-w-md space-y-4"
      >
        <select
          value={category}
          onChange={handleCategoryChange}
          className="w-full border border-gray-300 rounded-md p-2"
          required
        >
          <option value="" disabled>
            Select Category
          </option>
          {categories.map((ctr) => (
            <option key={ctr.id} value={ctr.name}>
              {ctr.name}
            </option>
          ))}
        </select>

        <select
          value={tempId}
          onChange={(e) => {
            setTempId(e.target.value);
            const selected = templates.find((t) => t.id === e.target.value);
            setTemplate(selected?.name || "");
          }}
          className="w-full border border-gray-300 rounded-md p-2"
          required
          disabled={!templates.length}
        >
          <option value="" disabled>
            Select Template
          </option>
          {templates.map((tpl) => (
            <option key={tpl.id} value={tpl.id}>
              {tpl.name}
            </option>
          ))}
        </select>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
        >
          Save Portfolio
        </button>
      </form>
    </div>
    </div>
  );
}
