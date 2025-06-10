import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bars } from "react-loader-spinner";

export default function UserInfoForm() {
  // State definitions
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    profilePic: null,
    profession: "",
    tagline: "",
    education: [
      { degree: "", institution: "", startYear: "", endYear: "", grade: "" },
    ],
    certifications: [{ title: "", institution: "", issueDate: "" }],
    skills: [{ title: "", experience: "" }],
    projects: [{ title: "", description: "", link: "" }],
  });
  const [errors, setErrors] = useState({});
  const fileInputRef = useRef(null);

  // Calculate progress
  const progressBarWidth = ((step - 1) / 5) * 100;

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

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 },
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
  };

  const handleArrayChange = (value, index, section) => {
    const updated = [...formData[section]];
    updated[index] = value;
    setFormData({ ...formData, [section]: updated });
  };

  const addField = (section, template) => {
    setFormData({ ...formData, [section]: [...formData[section], template] });
  };

  const removeField = (section, index) => {
    const updated = formData[section].filter((_, i) => i !== index);
    setFormData({ ...formData, [section]: updated });
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);
  const handleSubmit = () => {
    setIsLoading(true);
    console.log("Submitted Data:", formData);
    // Add your submission logic here
  };
  const inputDesign =
    "w-full p-2 border border-sky-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400 resize-none";

  // Reusable components
  const NavButtons = ({ prevStep, nextStep, isLastStep = false }) => (
    <div className="flex justify-between mt-6 w-full">
      <button
        onClick={prevStep}
        className="bg-gray-100 text-gray-700 px-6 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors"
      >
        Back
      </button>
      <button
        onClick={isLastStep ? handleSubmit : nextStep}
        disabled={isLoading}
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition duration-200 flex justify-center items-center gap-2"
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
      className="w-full border-2 border-dashed border-sky-300 rounded-lg p-6 text-center cursor-pointer hover:border-sky-500 transition-colors bg-gray-50"
    >
      <input
        ref={fileInputRef}
        name="profilePic"
        type="file"
        onChange={handleChange}
        className="hidden"
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
            className="space-y-4 w-[90%] md:w-[60%] mx-auto"
          >
            <motion.h2
              variants={itemVariants}
              className="text-3xl my-10 font-bold mb-6 text-center text-blue-600"
            >
              Personal Information
            </motion.h2>

            <input
              name="name"
              value={formData.name}
              className={inputDesign}
              onChange={handleChange}
              placeholder="Full Name"
              type="text"
            />
            <input
              name="email"
              value={formData.email}
              className={inputDesign}
              onChange={handleChange}
              placeholder="Email"
              type="email"
            />
            <input
              name="phone"
              value={formData.phone}
              className={inputDesign}
              onChange={handleChange}
              placeholder="Phone"
              type="tel"
            />
            <input
              name="address"
              value={formData.address}
              className={inputDesign}
              onChange={handleChange}
              placeholder="Address"
              type="text"
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
            className="space-y-4 w-[90%] md:w-[60%] mx-auto"
          >
            <motion.h2
              variants={itemVariants}
              className="text-3xl my-10 font-bold mb-6 text-center text-blue-600"
            >
              Professional Information
            </motion.h2>

            <input
              name="profession"
              type="text"
              className={inputDesign}
              value={formData.profession}
              onChange={handleChange}
              placeholder="Profession"
            />
            <textarea
              className={inputDesign}
              name="tagline"
              value={formData.tagline}
              onChange={handleChange}
              placeholder="Tagline or Bio"
            />

            <NavButtons prevStep={prevStep} nextStep={nextStep} />
          </motion.div>
        );

      case 3:
        return (
          <motion.div variants={itemVariants} className="space-y-4 mb-6 w-full">
            <h3 className="text-lg font-medium text-gray-800 mb-2">
              Education
            </h3>

            {formData.education.map((field, i) => (
              <motion.div
                key={i}
                className="bg-white p-4 rounded-lg border border-sky-200 relative w-full"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="space-y-4 w-full pr-10">
                  {Object.keys(field).map((key) => (
                    <div key={key} className="relative w-full">
                      <input
                        value={field[key]}
                        onChange={(e) => handleChange(e, i, "education", key)}
                        className={inputDesign}
                        placeholder={key
                          .replace(/([A-Z])/g, " $1")
                          .replace(/^./, (str) => str.toUpperCase())}
                      />
                    </div>
                  ))}
                </div>

                {formData.education.length > 1 && (
                  <button
                    onClick={() => removeField("education", i)}
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
              onClick={() =>
                addField("education", {
                  degree: "",
                  institution: "",
                  startYear: "",
                  endYear: "",
                  grade: "",
                })
              }
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
              Add Education
            </button>

            <NavButtons prevStep={prevStep} nextStep={nextStep} />
          </motion.div>
        );

      case 4:
        return (
          <motion.div
            key="step4"
            variants={containerVariants}
            className="space-y-4 w-[90%] md:w-[60%] mx-auto"
          >
            <motion.h2
              variants={itemVariants}
              className="text-3xl my-10 font-bold mb-6 text-center text-blue-600"
            >
              Certifications
            </motion.h2>

            <motion.div
              variants={itemVariants}
              className="space-y-4 mb-6 w-full"
            >
              <h3 className="text-lg font-medium text-gray-800 mb-2">
                Certification
              </h3>

              {formData.certifications.map((field, i) => (
                <motion.div
                  key={i}
                  className="bg-white p-4 rounded-lg border border-sky-200 relative w-full"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="space-y-4 w-full pr-10">
                    {Object.keys(field).map((key) => (
                      <div key={key} className="relative w-full">
                        <input
                          value={field[key]}
                          onChange={(e) =>
                            handleChange(e, i, "certifications", key)
                          }
                          className={inputDesign}
                          placeholder={key
                            .replace(/([A-Z])/g, " $1")
                            .replace(/^./, (str) => str.toUpperCase())}
                        />
                      </div>
                    ))}
                  </div>

                  {formData.certifications.length > 1 && (
                    <button
                      onClick={() => removeField("certifications", i)}
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
                onClick={() =>
                  addField("certifications", {
                    title: "",
                    institution: "",
                    issueDate: "",
                  })
                }
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
                Add Certification
              </button>
            </motion.div>

            <NavButtons prevStep={prevStep} nextStep={nextStep} />
          </motion.div>
        );

      case 5:
        return (
          <motion.div
  key="step6"
  variants={containerVariants}
  className="space-y-4 w-[90%] md:w-[60%] mx-auto"
>
  <motion.h2
    variants={itemVariants}
    className="text-3xl my-10 font-bold mb-6 text-center text-blue-600"
  >
    Skills
  </motion.h2>

  <motion.div variants={itemVariants} className="space-y-4 mb-6 w-full">
    <h3 className="text-lg font-medium text-gray-800 mb-2">Skill</h3>

    {formData.skills.map((field, i) => (
      <motion.div
        key={i}
        className="bg-white p-4 rounded-lg border border-sky-200 relative w-full"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="space-y-4 w-full pr-10">
          {/* Skill Title Input */}
          <div className="relative w-full">
            <input
              value={field.title}
              onChange={(e) => handleChange(e, i, "skills", "title")}
              className={inputDesign}
              placeholder="Skill Title"
            />
          </div>

          {/* Experience Dropdown */}
          <div className="relative w-full">
            <select
              value={field.experience}
              onChange={(e) => handleChange(e, i, "skills", "experience")}
              className={`${inputDesign} text-gray-500`}
            >
              <option value="">Select Experience</option>
              <option value="Beginner">Beginner</option>
              <option value="Expert">Expert</option>
            </select>
          </div>
        </div>

        {formData.skills.length > 1 && (
          <button
            onClick={() => removeField("skills", i)}
            className="absolute top-4 right-4 text-red-500 hover:text-red-700"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        )}
      </motion.div>
    ))}

    <button
      onClick={() => addField("skills", { title: "", experience: "" })}
      className="flex items-center gap-2 text-sm text-sky-600 hover:underline"
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
      </svg>
      Add Skill
    </button>
  </motion.div>

  <NavButtons
    prevStep={prevStep}
    nextStep={nextStep}
  />
</motion.div>

        );

      case 6:
        return (<motion.div
  key="step6"
  variants={containerVariants}
  className="space-y-4 w-[90%] md:w-[60%] mx-auto"
>
  <motion.h2
    variants={itemVariants}
    className="text-3xl my-10 font-bold mb-6 text-center text-blue-600"
  >
    Projects
  </motion.h2>

  <motion.div variants={itemVariants} className="space-y-4 mb-6 w-full">
    <h3 className="text-lg font-medium text-gray-800 mb-2">Project</h3>

    {formData.projects.map((field, i) => (
      <motion.div
        key={i}
        className="bg-white p-4 rounded-lg border border-sky-200 relative w-full"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="space-y-4 w-full pr-10">
          {/* Project Title */}
          <div className="relative w-full">
            <input
              value={field.title}
              onChange={(e) => handleChange(e, i, "projects", "title")}
              className={inputDesign}
              placeholder="Project Title"
            />
          </div>

          {/* Project Description */}
          <div className="relative w-full">
            <textarea
              value={field.description}
              onChange={(e) => handleChange(e, i, "projects", "description")}
              className={inputDesign}
              placeholder="Project Description"
            />
          </div>

          {/* Project Link */}
          <div className="relative w-full">
            <input
              value={field.link}
              onChange={(e) => handleChange(e, i, "projects", "link")}
              className={inputDesign}
              placeholder="Project Link (optional)"
            />
          </div>
        </div>

        {formData.projects.length > 1 && (
          <button
            onClick={() => removeField("projects", i)}
            className="absolute top-4 right-4 text-red-500 hover:text-red-700"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        )}
      </motion.div>
    ))}

    <button
      onClick={() => addField("projects", { title: "", description: "", link: "" })}
      className="flex items-center gap-2 text-sm text-sky-600 hover:underline"
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
      </svg>
      Add Project
    </button>
  </motion.div>

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
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-4/5 md:w-1/3 border border-sky-200">
        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex justify-between mb-2 text-sm">
            <span className="text-gray-600">Step {step} of 6</span>
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
