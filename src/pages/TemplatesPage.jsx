import { useTemplate } from "../contexts/handleTemplates";
import { useState, useEffect } from "react";
import { handleSuccessToast, handleErrorToast } from "../utils";
import axios from "axios";

export default function TemplatesPage() {
  const [templates, setTemplates] = useState([]);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const { getTemplates } = useTemplate();

  useEffect(() => {
    fetchCategories();
    fetchTemplates(); // Fetch all initially
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch("http://localhost/Profilein-Backend/getCategories.php", {
        method: "GET",
        headers: { Accept: "application/json" },
        credentials: "include",
      });
      const data = await response.json();
      if (data.success) {
        setCategories(data.categories);
      } else {
        handleErrorToast(`Failed to fetch categories: ${data.error}`);
      }
    } catch (err) {
      handleErrorToast(`Error fetching categories: ${err.message}`);
    }
  };

  const fetchTemplates = async (selectedCategory = "") => {
    try {
      let data;

      if (selectedCategory === "") {
        data = await getTemplates(); // all templates
      } else {
        const response = await fetch(
          `http://localhost/Profilein-Backend/getTemplatesByCategory.php?category=${selectedCategory}`,
          {
            method: "GET",
            headers: { Accept: "application/json" },
            credentials: "include",
          }
        );
        const result = await response.json();
        if (!result.success) throw new Error(result.error);
        data = result.templates;
      }

      setTemplates(data);
    } catch (error) {
      handleErrorToast(`Error fetching templates: ${error.message}`);
      setTemplates([]);
    }
  };

  const handleCategoryChange = async (e) => {
    const selectedCategory = e.target.value;
    setCategory(selectedCategory);
    fetchTemplates(selectedCategory);
  };

  const handlePreview = (tmpId) => {
    axios
      .post("http://localhost/Profilein-Backend/injectDummy.php", {
        tempId: tmpId,
      })
      .then((response) => {
        if (response.data.success) {
          handleSuccessToast("Template preview opened successfully");
          window.open(response.data.path, "_blank");
        } else {
          handleErrorToast(response.data.message);
        }
      })
      .catch((error) => {
        handleErrorToast("Error opening template preview");
        console.error(error);
      });
  };

  return (
    <div className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <select
          value={category}
          onChange={handleCategoryChange}
          className="w-full border border-gray-300 rounded-md p-2"
        >
          <option value="">All Categories</option>
          {categories.map((ctr) => (
            <option key={ctr.id} value={ctr.name}>
              {ctr.name}
            </option>
          ))}
        </select>

        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Templates</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose from our collection of professionally designed templates, perfect for any industry.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {templates.map((template, index) => (
            <TemplateCard
              key={index}
              title={template.Title}
              category={template.Category}
              image={template.Image}
              features={[template.Feature1, template.Feature2, template.Feature3]}
              template_Address={template.Template_Address}
              tmpId={template.tmpId}
              onPreview={handlePreview}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function TemplateCard({ title, category, image, features, tmpId, onPreview }) {
  const handleClick = (e) => {
    e.preventDefault();
    onPreview(tmpId);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
      <img src={image} alt={title || "Template Preview"} className="w-full h-48 object-cover" />
      <div className="p-6">
        <span className="text-sm font-medium text-indigo-600">{category}</span>
        <h3 className="text-xl font-semibold text-gray-900 mt-2 mb-4">{title}</h3>
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center text-gray-600">
              <div className="w-1.5 h-1.5 bg-indigo-600 rounded-full mr-2"></div>
              {feature}
            </li>
          ))}
        </ul>
        <button
          onClick={handleClick}
          className="w-1/2 block mt-3 bg-gray-100 text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
        >
          Preview Template
        </button>
      </div>
    </div>
  );
}
