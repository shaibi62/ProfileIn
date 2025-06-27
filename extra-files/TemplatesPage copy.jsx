import { useTemplate } from "../contexts/handleTemplates";
import { useState, useEffect } from "react";
import { handleSuccessToast, handleErrorToast } from "../utils";
import axios from "axios";
export default function TemplatesPage() {
  const [templates, setTemplates] = useState([]);
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const { getTemplates } = useTemplate();
  useEffect(() => {
    const fetchTemplates = async () => {
      const data = await getTemplates();
      console.log("Fetched templates:", data);
      setTemplates(data);
    };

    fetchTemplates();
  }, []);
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
        handleErrorToast("Failed to fetch templates:", data.error);
        setTemplates([]);
      }
    } catch (error) {
      handleErrorToast("Error fetching templates:", error);
      setTemplates([]);
    }
  };

  return (
    <div className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Our Templates
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose from our collection of professionally designed templates,
            perfect for any industry.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {templates.map((template, index) => (
            <TemplateCard
              key={index}
              title={template.Title}
              category={template.Category}
              image={template.Image}
              features={[
                template.Feature1,
                template.Feature2,
                template.Feature3,
              ]}
              template_Address={template.Template_Address}
              tmpId={template.tmpId} // Pass tmpId here
              onPreview={handlePreview} // Pass handler
            />
          ))}
          <TemplateCard
            title="Creative Portfolio"
            category="Designer"
            image="https://images.unsplash.com/photo-1522542550221-31fd19575a2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
            features={["Gallery Layout", "Project Showcase", "About Section"]}
          />

          <TemplateCard
            title="Business Portfolio"
            category="Consultant"
            image="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
            features={["Services Section", "Testimonials", "Contact Form"]}
          />
          <TemplateCard
            title="Artist Portfolio"
            category="Artist"
            image="https://images.unsplash.com/photo-1513364776144-60967b0f800f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
            features={["Art Gallery", "Exhibition History", "Artist Statement"]}
          />
          <TemplateCard
            title="Writer Portfolio"
            category="Writer"
            image="https://images.unsplash.com/photo-1455390582262-044cdead277a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
            features={["Blog Section", "Publications", "Writing Samples"]}
          />
        </div>
      </div>
    </div>
  );
}

function TemplateCard({
  title,
  category,
  image,
  features,
  template_Address,
  tmpId,
  onPreview,
}) {
  const handleClick = (e) => {
    e.preventDefault();
    onPreview(tmpId); // Call parent function with tmpId
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
      <img src={image} alt={title} className="w-full h-48 object-cover" />
      <div className="p-6">
        <span className="text-sm font-medium text-indigo-600">{category}</span>
        <h3 className="text-xl font-semibold text-gray-900 mt-2 mb-4">
          {title}
        </h3>
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
