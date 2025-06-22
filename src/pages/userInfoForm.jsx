import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bars } from "react-loader-spinner";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthProvider, useAuth } from "../contexts/AuthContext";
import { title } from "framer-motion/client";
import { handleSuccessToast, handleErrorToast } from '../utils';

const inputDesign =
  "w-full p-2 border border-sky-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400 resize-none";
const ErrorMessage = ({ error }) =>
  error && <p className="text-red-500 text-sm mt-1">{error}</p>;
const FormInput = ({
  name,
  value,
  onChange,
  placeholder,
  type = "text",
  error,
}) => (
  <div className="mb-4">
    <label
      htmlFor={name}
      className="block text-sm font-medium text-gray-700 mb-1"
    >
      {placeholder}
    </label>
    <input
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      type={type}
      className={`${inputDesign} ${error ? "border-red-500" : ""}`}
    />
    <ErrorMessage error={error} />
  </div>
);

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
};
const ArrayFieldGroup = ({
  section,
  fields,
  formData,
  handleChange,
  removeField,
  addField,
  template,
  title,
}) => (
  <motion.div variants={itemVariants} className="space-y-4 mb-6 w-full">
    <h3 className="text-lg font-medium text-gray-800 mb-2">{title}</h3>

    {formData[section].map((field, i) => (
      <motion.div
        key={i}
        className="bg-white p-4 rounded-lg border border-sky-200 relative w-full"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="space-y-4 w-full pr-10">
          {Object.keys(fields).map((key) => (
            <div key={key} className="relative w-full">
              {fields[key].type === "select" ? (
                <>
                  <label
                    htmlFor={`${section}-${i}-${key}`}
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    {fields[key].label}
                  </label>
                  <select
                    id={`${section}-${i}-${key}`}
                    value={field[key]}
                    onChange={(e) => handleChange(e, i, section, key)}
                    className={`${inputDesign} text-gray-500`}
                  >
                    {fields[key].options.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </>
              ) : fields[key].type === "textarea" ? (
                <FormTextarea
                  name={`${section}-${i}-${key}`}
                  value={field[key]}
                  onChange={(e) => handleChange(e, i, section, key)}
                  placeholder={fields[key].label}
                />
              ) : (
                <FormInput
                  name={`${section}-${i}-${key}`}
                  value={field[key]}
                  onChange={(e) => handleChange(e, i, section, key)}
                  placeholder={fields[key].label}
                  type={fields[key].type || "text"}
                />
              )}
            </div>
          ))}
        </div>

        {formData[section].length > 1 && (
          <button
            type="button"
            onClick={() => removeField(section, i)}
            className="absolute top-4 right-4 text-red-500 hover:text-red-700"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        )}
      </motion.div>
    ))}

    <button
      type="button"
      onClick={() => addField(section, template)}
      className="flex items-center gap-2 text-sm text-sky-600 hover:underline"
    >
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
        />
      </svg>
      Add {title}
    </button>
  </motion.div>
);
const FormTextarea = ({ name, value, onChange, placeholder, error }) => (
  <div className="mb-4">
    <label
      htmlFor={name}
      className="block text-sm font-medium text-gray-700 mb-1"
    >
      {placeholder}
    </label>
    <textarea
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      className={`${inputDesign} ${error ? "border-red-500" : ""}`}
      rows={4}
    />
    <ErrorMessage error={error} />
  </div>
);

export default function UserInfoForm() {
  const { user } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  // State definitions
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [formData, setFormData] = useState({
    userId: user?.id || "",
    name: "",
    email: "",
    phone: "",
    address: "",
    profilePic: null,
    profession: "",
    tagline: "",
    aboutMe: "",
    xLink: "https://x.com/",
    githubLink: "https://github.com/",
    linkedinLink: "https://linkedin.com/",
    fbLink: "https://facebook.com/",
    instaLink: "https://instagram.com/",
    education: [
      { degree: "", institution: "", startYear: "", endYear: "", grade: "" },
    ],
    certifications: [{ title: "", institution: "", issueDate: "" }],
    skills: [{ title: "", experience: "" }],
    jobs: [
      { title: "", company: "", description: "", startdate: "", enddate: "" },
    ],
    services: [{ title: "", description: "" }],
    projects: [{ title: "", description: "", link: "" }],
  });
  const [errors, setErrors] = useState({});
  const fileInputRef = useRef(null);

  // Calculate progress
  const totalSteps = 9;
  const progressBarWidth = ((step - 1) / (totalSteps - 1)) * 100;

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
    exit: {
      opacity: 0,
      y: 20,
      transition: { duration: 0.2 },
    },
  };

  // Handler functions
  const handleChange = (e, index, section, field) => {
    const { name, value, files } = e.target;
    if (section) {
      const updated = [...formData[section]];
      updated[index][field] = value;
      setFormData({ ...formData, [section]: updated });
    } else if (name === "profilePic") {
      setFormData({ ...formData, profilePic: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
    // Clear error when user types
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const addField = (section, template) => {
    setFormData({ ...formData, [section]: [...formData[section], template] });
  };

  const removeField = (section, index) => {
    const updated = formData[section].filter((_, i) => i !== index);
    setFormData({ ...formData, [section]: updated });
  };

  const validateStep = (currentStep) => {
    const newErrors = {};

    if (currentStep === 1) {
      if (!formData.name.trim()) newErrors.name = "Name is required";
      if (!formData.email.trim()) {
        newErrors.email = "Email is required";
      } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
        newErrors.email = "Please enter a valid email";
      }
      if (!formData.profilePic)
        newErrors.profilePic = "Profile picture is required";
    }

    if (currentStep === 2) {
      if (!formData.profession.trim())
        newErrors.profession = "Profession is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(step)) {
      setStep(step + 1);
    }
  };

  const prevStep = () => setStep(step - 1);

  const handleSubmit = async () => {
    if (!validateStep(step)) return;

    setIsLoading(true);
    setMessage(null);

    console.log("Form data to send:", formData);

    try {
      const formDataToSend = new FormData();

      // Append simple fields
      formDataToSend.append("userId", formData.userId);
      formDataToSend.append("name", formData.name);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("phone", formData.phone);
      formDataToSend.append("address", formData.address);
      formDataToSend.append("profession", formData.profession);
      formDataToSend.append("tagline", formData.tagline);
      formDataToSend.append("aboutMe", formData.aboutMe);
      formDataToSend.append("xLink", formData.xLink);
      formDataToSend.append("fbLink", formData.fbLink);
      formDataToSend.append("instaLink", formData.instaLink);
      formDataToSend.append("linkedinLink", formData.linkedinLink); // spelling check
      formDataToSend.append("githubLink", formData.githubLink);

      // Append profile picture file
      if (formData.profilePic) {
        formDataToSend.append("profilePic", formData.profilePic);
      }

      // Append array fields as JSON strings
      formDataToSend.append("education", JSON.stringify(formData.education));
      formDataToSend.append(
        "certifications",
        JSON.stringify(formData.certifications)
      );
      formDataToSend.append("skills", JSON.stringify(formData.skills));
      formDataToSend.append("jobs", JSON.stringify(formData.jobs));
      formDataToSend.append("services", JSON.stringify(formData.services));
      formDataToSend.append("projects", JSON.stringify(formData.projects));

      // Log FormData contents for debugging
      for (let [key, value] of formDataToSend.entries()) {
        console.log(key, value);
      }

      const response = await axios.post(
        "http://localhost/Profilein-Backend/userInfo.php",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.success) {
        handleSuccessToast({ text: "✅ Profile saved successfully!", type: "success" });
        setTimeout(() => navigate("/userprofile"), 1500);
      } else {
        handleErrorToast({ text: response.data.error || "❌ Failed to save profile", type: "error" });
      }
    } catch (error) {
      console.error("Submission error:", error);
      let errorMessage = "❌ An error occurred. Please try again.";

      if (error.response) {
        errorMessage = error.response.data?.error || error.response.statusText;
      } else if (error.request) {
        errorMessage = "No response from server. Check your connection.";
      }

      handleErrorToast({ text: errorMessage, type: "error" });
     
    } finally {
      setIsLoading(false);
    }
  };

  // Reusable components
  const ErrorMessage = ({ error }) =>
    error && <p className="text-red-500 text-sm mt-1">{error}</p>;

  const NavButtons = ({ prevStep, nextStep, isLastStep = false }) => (
    <div className="flex justify-between mt-6 w-full">
      <button
        type="button"
        onClick={prevStep}
        disabled={isLoading}
        className="bg-gray-100 text-gray-700 px-6 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors disabled:opacity-50"
      >
        Back
      </button>
      <button
        type={isLastStep ? "submit" : "button"}
        onClick={isLastStep ? handleSubmit : nextStep}
        disabled={isLoading}
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition duration-200 flex justify-center items-center gap-2 disabled:opacity-50"
      >
        {isLoading ? (
          <>
            <Bars height={20} width={20} color="#ffffff" />
            {isLastStep ? "Submitting..." : "Processing..."}
          </>
        ) : isLastStep ? (
          "Submit"
        ) : (
          "Continue"
        )}
      </button>
    </div>
  );

  const FileUpload = () => (
    <div
      onClick={() => fileInputRef.current.click()}
      className={`w-full border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
        errors.profilePic
          ? "border-red-300 bg-red-50"
          : "border-sky-300 bg-gray-50 hover:border-sky-500"
      }`}
    >
      <input
        ref={fileInputRef}
        name="profilePic"
        type="file"
        onChange={handleChange}
        className="hidden"
        accept="image/*"
      />
      <div className="flex flex-col items-center justify-center">
        <svg
          className="w-10 h-10 text-gray-400 mb-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
        <p className="text-gray-500">
          {formData.profilePic
            ? formData.profilePic.name
            : "Upload profile picture"}
        </p>
        <ErrorMessage error={errors.profilePic} />
      </div>
    </div>
  );

  // Render steps
  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <motion.div
            key="step1"
            variants={containerVariants}
            className="space-y-4 w-full"
          >
            <motion.h2
              variants={itemVariants}
              className="text-3xl my-10 font-bold mb-6 text-center text-blue-600"
            >
              Personal Information
            </motion.h2>

            <FormInput
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Full Name"
              error={errors.name}
            />

            <FormInput
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              type="email"
              error={errors.email}
            />

            <FormInput
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone"
              type="tel"
            />

            <FormInput
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Address"
            />

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Profile Picture
              </label>
              <FileUpload />
            </div>

            <NavButtons prevStep={prevStep} nextStep={nextStep} />
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            key="step2"
            variants={containerVariants}
            className="space-y-4 w-full"
          >
            <motion.h2
              variants={itemVariants}
              className="text-3xl my-10 font-bold mb-6 text-center text-blue-600"
            >
              Professional Information
            </motion.h2>

            <FormInput
              name="profession"
              value={formData.profession}
              onChange={handleChange}
              placeholder="Profession"
              error={errors.profession}
            />

            <FormTextarea
              name="tagline"
              value={formData.tagline}
              onChange={handleChange}
              placeholder="Tagline or Bio"
            />
            <FormTextarea
              name="aboutMe"
              value={formData.aboutMe}
              onChange={handleChange}
              placeholder="write about yourself"
            />

            <NavButtons prevStep={prevStep} nextStep={nextStep} />
          </motion.div>
        );
      case 3:
        return (
          <motion.div
            key="step3"
            variants={containerVariants}
            className="space-y-4 w-full"
          >
            <motion.h2
              variants={itemVariants}
              className="text-3xl my-10 font-bold mb-6 text-center text-blue-600"
            >
              Professional Information
            </motion.h2>

            <FormInput
              name="xLink"
              value={formData.xLink}
              onChange={handleChange}
              placeholder="x/twitter profile link"
              error={errors.xLink}
            />
            <FormInput
              name="fbLink"
              value={formData.fbLink}
              onChange={handleChange}
              placeholder="facebook profile link"
              error={errors.fbLink}
            />
            <FormInput
              name="instaLink"
              value={formData.instaLink}
              onChange={handleChange}
              placeholder="instagram profile link"
              error={errors.instaLink}
            />
            <FormInput
              name="linkedinLink"
              value={formData.linkedinLink}
              onChange={handleChange}
              placeholder="linkedin profile link"
              error={errors.linkedinLink}
            />
            <FormInput
              name="githubLink"
              value={formData.githubLink}
              onChange={handleChange}
              placeholder="github profile link"
              error={errors.githubLink}
            />

            <NavButtons prevStep={prevStep} nextStep={nextStep} />
          </motion.div>
        );

      case 4:
        return (
          <motion.div
            key="step4"
            variants={containerVariants}
            className="space-y-4 w-full"
          >
            <motion.h2
              variants={itemVariants}
              className="text-3xl my-10 font-bold mb-6 text-center text-blue-600"
            >
              Education
            </motion.h2>

            <ArrayFieldGroup
              section="education"
              fields={{
                degree: { label: "Degree" },
                institution: { label: "Institution" },
                startYear: { label: "Start Year", type: "date" },
                endYear: { label: "End Year", type: "date" },
                grade: { label: "Grade" },
              }}
              formData={formData}
              handleChange={handleChange}
              removeField={removeField}
              addField={addField}
              template={{
                degree: "",
                institution: "",
                startYear: "",
                endYear: "",
                grade: "",
              }}
              title="Education"
            />

            <NavButtons prevStep={prevStep} nextStep={nextStep} />
          </motion.div>
        );

      case 5:
        return (
          <motion.div
            key="step5"
            variants={containerVariants}
            className="space-y-4 w-full"
          >
            <motion.h2
              variants={itemVariants}
              className="text-3xl my-10 font-bold mb-6 text-center text-blue-600"
            >
              Certifications
            </motion.h2>

            <ArrayFieldGroup
              section="certifications"
              fields={{
                title: { label: "Title" },
                institution: { label: "Institution" },
                issueDate: { label: "Issue Date", type: "date" },
              }}
              formData={formData}
              handleChange={handleChange}
              removeField={removeField}
              addField={addField}
              template={{
                title: "",
                institution: "",
                issueDate: "",
              }}
              title="Certification"
            />

            <NavButtons prevStep={prevStep} nextStep={nextStep} />
          </motion.div>
        );

      case 6:
        return (
          <motion.div
            key="step6"
            variants={containerVariants}
            className="space-y-4 w-full"
          >
            <motion.h2
              variants={itemVariants}
              className="text-3xl my-10 font-bold mb-6 text-center text-blue-600"
            >
              Skills
            </motion.h2>

            <ArrayFieldGroup
              section="skills"
              fields={{
                title: { label: "Skill Title" },
                experience: {
                  label: "Experience Level",
                  type: "select",
                  options: [
                    { value: "", label: "Select Experience" },
                    { value: "Beginner", label: "Beginner" },
                    { value: "Intermediate", label: "Intermediate" },
                    { value: "Expert", label: "Expert" },
                  ],
                },
              }}
              formData={formData}
              handleChange={handleChange}
              removeField={removeField}
              addField={addField}
              template={{ title: "", experience: "" }}
              title="Skill"
            />

            <NavButtons prevStep={prevStep} nextStep={nextStep} />
          </motion.div>
        );
      case 7:
        return (
          <motion.div
            key="step7"
            variants={containerVariants}
            className="space-y-4 w-full"
          >
            <motion.h2
              variants={itemVariants}
              className="text-3xl my-10 font-bold mb-6 text-center text-blue-600"
            >
              Jobs
            </motion.h2>

            <ArrayFieldGroup
              section="jobs"
              fields={{
                title: { label: "job" },
                company: { label: "company" },
                description: { label: "description" },
                startdate: { label: "Start date", type: "date" },
                enddate: { label: "End date", type: "date" },
              }}
              formData={formData}
              handleChange={handleChange}
              removeField={removeField}
              addField={addField}
              template={{
                title: "",
                company: "",
                description: "",
                startdate: "",
                enddate: "",
              }}
              title="Job"
            />

            <NavButtons prevStep={prevStep} nextStep={nextStep} />
          </motion.div>
        );
      case 8:
        return (
          <motion.div
            key="step8"
            variants={containerVariants}
            className="space-y-4 w-full"
          >
            <motion.h2
              variants={itemVariants}
              className="text-3xl my-10 font-bold mb-6 text-center text-blue-600"
            >
              Services
            </motion.h2>

            <ArrayFieldGroup
              section="services"
              fields={{
                title: { label: "Service Title" },
                description: { label: "description" },
              }}
              formData={formData}
              handleChange={handleChange}
              removeField={removeField}
              addField={addField}
              template={{
                title: "",
                description: "",
              }}
              title="Service"
            />

            <NavButtons prevStep={prevStep} nextStep={nextStep} />
          </motion.div>
        );

      case 9:
        return (
          <motion.div
            key="step9"
            variants={containerVariants}
            className="space-y-4 w-full"
          >
            <motion.h2
              variants={itemVariants}
              className="text-3xl my-10 font-bold mb-6 text-center text-blue-600"
            >
              Projects
            </motion.h2>

            <ArrayFieldGroup
              section="projects"
              fields={{
                title: { label: "Project Title" },
                description: { label: "Description", type: "textarea" },
                link: { label: "Project Link (optional)", type: "url" },
              }}
              formData={formData}
              handleChange={handleChange}
              removeField={removeField}
              addField={addField}
              template={{ title: "", description: "", link: "" }}
              title="Project"
            />

            <NavButtons
              prevStep={prevStep}
              nextStep={nextStep}
              isLastStep={true}
            />
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-8">
      <div className="bg-white p-4 md:p-8 rounded-xl shadow-lg w-full md:w-2/3 lg:w-1/2 xl:w-1/3 border border-sky-200 mx-4">
        {/* Message display */}
        {message && (
          <div
            className={`mb-4 p-3 rounded ${
              message.type === "success"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {message.text}
          </div>
        )}

        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex justify-between mb-2 text-sm">
            <span className="text-gray-600">
              Step {step} of {totalSteps}
            </span>
            <span className="text-blue-600 font-medium">
              {Math.round(progressBarWidth)}%
            </span>
          </div>
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-blue-600 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progressBarWidth}%` }}
              transition={{ duration: 0.4 }}
            />
          </div>
        </div>

        {/* Form container */}
        <AnimatePresence mode="wait">{renderStep()}</AnimatePresence>
      </div>
    </div>
  );
}
