import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UserSidebar from "../components/layout/UserSidebar";
import { handleSuccessToast, handleErrorToast } from "../utils";

export default function PortfolioEditPage() {
  const [category, setCategory] = useState("");
  const [templates, setTemplates] = useState([]);
  const [categories, setCategories] = useState([]);
  const [tempId, setTempId] = useState("");

  const navigate = useNavigate();
  const { user } = useAuth();
  const userId = user?.id || null;

  const Baseurl = "http://localhost/Profilein-Backend/";

  useEffect(() => {
    if (!userId) {
      navigate("/login");
    }
  }, [userId, navigate]);

 useEffect(() => {
    const verifyInfo = async () => {
      try {
        const response = await fetch(`${Baseurl}verifyInfo.php?userId=${userId}`, {
          method: "GET",
          headers: { Accept: "application/json" },
          credentials: "include",
        });
        const data = await response.json();
        if (!data.success) {
          navigate("/userInfoForm");
          handleErrorToast("Please add information first.");
        } 
      } catch (err) {
        handleErrorToast("Error fetching user info.", err);
        console.error("Verification error:", err);

      }
    };

    verifyInfo();
  }, []);




  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${Baseurl}getCategories.php`, {
          method: "GET",
          headers: { Accept: "application/json" },
          credentials: "include",
        });
        const data = await response.json();
        if (data.success) {
          setCategories(data.categories);
        } else {
          handleErrorToast("Failed to fetch categories:", data.error);
        }
      } catch (err) {
        handleErrorToast("Error fetching categories:", err);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryChange = async (e) => {
    const selectedCategory = e.target.value;
    setCategory(selectedCategory);
    setTempId(""); // Reset selection

    try {
      const response = await fetch(
        `${Baseurl}getTemplatesByCategory.php?category=${
          selectedCategory || "all"
        }`,
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
        handleErrorToast("Failed to fetch templates:", data.error);
        setTemplates([]);
      }
    } catch (error) {
      handleErrorToast("Error fetching templates:", error);
      setTemplates([]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!tempId) {
      return handleErrorToast("Please select a template.");
    }

    try {
      const response = await axios.post(
        `${Baseurl}saveSelection.php`,
        { tempId, userId },
        { withCredentials: true }
      );

      if (response.data.success) {
        console.log("Selection saved:", response.data);
        window.open(response.data.path, "_blank");
        navigate("/portfolio");
      } else {
        handleErrorToast("Save failed:", response.data.error);
      }
    } catch (err) {
      handleErrorToast("Error during save:", err);
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
          >
            <option value="" disabled>Select a Category</option>
            {categories.map((ctr) => (
              <option key={ctr.id} value={ctr.name}>
                {ctr.name}
              </option>
            ))}
          </select>

          <select
            value={tempId}
            className="w-full border border-gray-300 rounded-md p-2"
            onChange={(e) => {
              const selectedId = e.target.value;
              setTempId(selectedId);
              const selected = templates.find(
                (tpl) => tpl.tmpId === selectedId
              );
              setTemplate(selected?.Title || "");
            }}
            required
            disabled={!templates.length}
          >
            <option value="" disabled>
              Select Template
            </option>
            {templates.map((tpl) => (
              <option key={tpl.tmpId} value={tpl.tmpId}>
                {tpl.Title}
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
