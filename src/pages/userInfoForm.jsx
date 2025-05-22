import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion"
export default function UserInfoForm() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    profilePic: null,
    profession: "",
    tagline: "",
    education: [{ degree: "", institution: "", startYear: "", endYear: "", grade: "" }],
    certifications: [{ title: "", organization: "", issueDate: "", expiryDate: "", credentialID: "" }],
    skills: [""],
    projects: [{ title: "", description: "", link: "", technologies: "" }],
  })
  const fileInputRef = useRef(null)

  const handleChange = (e, index, section, field) => {
    const { name, value, files } = e.target
    if (section) {
      const updated = [...formData[section]]
      updated[index][field] = value
      setFormData({ ...formData, [section]: updated })
    } else if (name === "profilePic") {
      setFormData({ ...formData, profilePic: files[0] })
    } else {
      setFormData({ ...formData, [name]: value })
    }
  }

  const handleArrayChange = (value, index, section) => {
    const updated = [...formData[section]]
    updated[index] = value
    setFormData({ ...formData, [section]: updated })
  }

  const addField = (section, template) => {
    setFormData({ ...formData, [section]: [...formData[section], template] })
  }

  const removeField = (section, index) => {
    const updated = formData[section].filter((_, i) => i !== index)
    setFormData({ ...formData, [section]: updated })
  }

  const nextStep = () => setStep(step + 1)
  const prevStep = () => setStep(step - 1)
  const handleSubmit = () => console.log("Submitted Data:", formData)

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
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 },
    },
  }

  const buttonVariants = {
    hover: {
      scale: 1.05,
      boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)",
      transition: { type: "spring", stiffness: 400, damping: 10 },
    },
    tap: { scale: 0.95 },
  }

  const progressBarWidth = ((step - 1) / 5) * 100

  const NavButtons = ({ prevStep, nextStep, isLastStep = false }) => (
    <div className="flex justify-between mt-6">
      <motion.button
        onClick={prevStep}
        className="bg-gray-100 text-gray-700 px-6 py-3 rounded-full font-medium shadow-sm hover:bg-gray-200 transition-colors"
        variants={buttonVariants}
        whileHover="hover"
        whileTap="tap"
      >
        Back
      </motion.button>
      <motion.button
        onClick={isLastStep ? handleSubmit : nextStep}
        className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-3 rounded-full font-medium shadow-md"
        variants={buttonVariants}
        whileHover="hover"
        whileTap="tap"
      >
        {isLastStep ? "Submit" : "Continue"}
      </motion.button>
    </div>
  )

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <motion.div
            key="step1"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="space-y-6"
          >
            <motion.h2
              variants={itemVariants}
              className="text-3xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600"
            >
              Personal Information
            </motion.h2>

            {["name", "email", "phone", "location"].map((field) => (
              <motion.div key={field} variants={itemVariants} className="relative">
                <input
                  name={field}
                  placeholder=" "
                  value={formData[field]}
                  onChange={handleChange}
                  className="peer w-full border-0 border-b-2 border-gray-300 bg-gray-50 px-4 py-3 rounded-lg text-gray-800 placeholder-transparent focus:outline-none focus:border-purple-600 focus:ring-0 transition-all"
                />
                <label className="absolute left-4 -top-2.5 text-sm text-gray-500 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3.5 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-purple-600">
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                </label>
              </motion.div>
            ))}

            <motion.div variants={itemVariants} className="relative">
              <div
                onClick={() => fileInputRef.current.click()}
                className="w-full border-2 border-dashed border-gray-300 bg-gray-50 rounded-lg p-6 text-center cursor-pointer hover:border-purple-500 transition-colors"
              >
                <input ref={fileInputRef} name="profilePic" type="file" onChange={handleChange} className="hidden" />
                <div className="flex flex-col items-center justify-center">
                  <svg
                    className="w-10 h-10 text-gray-400 mb-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    ></path>
                  </svg>
                  <p className="text-gray-500">
                    {formData.profilePic ? formData.profilePic.name : "Upload profile picture"}
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <NavButtons prevStep={prevStep} nextStep={nextStep} />
            </motion.div>
          </motion.div>
        )

      case 2:
        return (
          <motion.div
            key="step2"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="space-y-6"
          >
            <motion.h2
              variants={itemVariants}
              className="text-3xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600"
            >
              Professional Information
            </motion.h2>

            <motion.div variants={itemVariants} className="relative">
              <input
                name="profession"
                placeholder=" "
                value={formData.profession}
                onChange={handleChange}
                className="peer w-full border-0 border-b-2 border-gray-300 bg-gray-50 px-4 py-3 rounded-lg text-gray-800 placeholder-transparent focus:outline-none focus:border-purple-600 focus:ring-0 transition-all"
              />
              <label className="absolute left-4 -top-2.5 text-sm text-gray-500 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3.5 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-purple-600">
                Profession
              </label>
            </motion.div>

            <motion.div variants={itemVariants} className="relative">
              <textarea
                name="tagline"
                placeholder=" "
                value={formData.tagline}
                onChange={handleChange}
                rows={4}
                className="peer w-full border-0 border-b-2 border-gray-300 bg-gray-50 px-4 py-3 rounded-lg text-gray-800 placeholder-transparent focus:outline-none focus:border-purple-600 focus:ring-0 transition-all resize-none"
              />
              <label className="absolute left-4 -top-2.5 text-sm text-gray-500 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3.5 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-purple-600">
                Tagline or Bio
              </label>
            </motion.div>

            <motion.div variants={itemVariants}>
              <NavButtons prevStep={prevStep} nextStep={nextStep} />
            </motion.div>
          </motion.div>
        )

      case 3:
        return (
          <motion.div
            key="step3"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="space-y-6"
          >
            <motion.h2
              variants={itemVariants}
              className="text-3xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600"
            >
              Education
            </motion.h2>

            <motion.div variants={itemVariants} className="space-y-4">
              {formData.education.map((edu, i) => (
                <motion.div
                  key={i}
                  className="bg-white p-5 rounded-xl shadow-md relative"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.keys(edu).map((field) => (
                      <div key={field} className="relative">
                        <input
                          placeholder=" "
                          value={edu[field]}
                          onChange={(e) => handleChange(e, i, "education", field)}
                          className="peer w-full border-0 border-b-2 border-gray-300 bg-gray-50 px-4 py-3 rounded-lg text-gray-800 placeholder-transparent focus:outline-none focus:border-purple-600 focus:ring-0 transition-all"
                        />
                        <label className="absolute left-4 -top-2.5 text-sm text-gray-500 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3.5 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-purple-600">
                          {field.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}
                        </label>
                      </div>
                    ))}
                  </div>

                  {formData.education.length > 1 && (
                    <motion.button
                      onClick={() => removeField("education", i)}
                      className="absolute top-2 right-2 text-red-500 hover:text-red-700 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        ></path>
                      </svg>
                    </motion.button>
                  )}
                </motion.div>
              ))}
            </motion.div>

            <motion.div variants={itemVariants} className="flex justify-center">
              <motion.button
                onClick={() =>
                  addField("education", { degree: "", institution: "", startYear: "", endYear: "", grade: "" })
                }
                className="flex items-center gap-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-full font-medium hover:bg-gray-200 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  ></path>
                </svg>
                Add Education
              </motion.button>
            </motion.div>

            <motion.div variants={itemVariants}>
              <NavButtons prevStep={prevStep} nextStep={nextStep} />
            </motion.div>
          </motion.div>
        )

      case 4:
        return (
          <motion.div
            key="step4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="space-y-6"
          >
            <motion.h2
              variants={itemVariants}
              className="text-3xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600"
            >
              Certifications
            </motion.h2>

            <motion.div variants={itemVariants} className="space-y-4">
              {formData.certifications.map((cert, i) => (
                <motion.div
                  key={i}
                  className="bg-white p-5 rounded-xl shadow-md relative"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.keys(cert).map((field) => (
                      <div key={field} className="relative">
                        <input
                          placeholder=" "
                          value={cert[field]}
                          onChange={(e) => handleChange(e, i, "certifications", field)}
                          className="peer w-full border-0 border-b-2 border-gray-300 bg-gray-50 px-4 py-3 rounded-lg text-gray-800 placeholder-transparent focus:outline-none focus:border-purple-600 focus:ring-0 transition-all"
                        />
                        <label className="absolute left-4 -top-2.5 text-sm text-gray-500 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3.5 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-purple-600">
                          {field.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}
                        </label>
                      </div>
                    ))}
                  </div>

                  {formData.certifications.length > 1 && (
                    <motion.button
                      onClick={() => removeField("certifications", i)}
                      className="absolute top-2 right-2 text-red-500 hover:text-red-700 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        ></path>
                      </svg>
                    </motion.button>
                  )}
                </motion.div>
              ))}
            </motion.div>

            <motion.div variants={itemVariants} className="flex justify-center">
              <motion.button
                onClick={() =>
                  addField("certifications", {
                    title: "",
                    organization: "",
                    issueDate: "",
                    expiryDate: "",
                    credentialID: "",
                  })
                }
                className="flex items-center gap-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-full font-medium hover:bg-gray-200 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  ></path>
                </svg>
                Add Certification
              </motion.button>
            </motion.div>

            <motion.div variants={itemVariants}>
              <NavButtons prevStep={prevStep} nextStep={nextStep} />
            </motion.div>
          </motion.div>
        )

      case 5:
        return (
          <motion.div
            key="step5"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="space-y-6"
          >
            <motion.h2
              variants={itemVariants}
              className="text-3xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600"
            >
              Skills
            </motion.h2>

            <motion.div variants={itemVariants} className="space-y-4">
              {formData.skills.map((skill, i) => (
                <motion.div
                  key={i}
                  className="flex items-center gap-3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <div className="relative flex-1">
                    <input
                      placeholder=" "
                      value={skill}
                      onChange={(e) => handleArrayChange(e.target.value, i, "skills")}
                      className="peer w-full border-0 border-b-2 border-gray-300 bg-gray-50 px-4 py-3 rounded-lg text-gray-800 placeholder-transparent focus:outline-none focus:border-purple-600 focus:ring-0 transition-all"
                    />
                    <label className="absolute left-4 -top-2.5 text-sm text-gray-500 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3.5 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-purple-600">
                      Skill {i + 1}
                    </label>
                  </div>

                  {formData.skills.length > 1 && (
                    <motion.button
                      onClick={() => removeField("skills", i)}
                      className="text-red-500 hover:text-red-700 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        ></path>
                      </svg>
                    </motion.button>
                  )}
                </motion.div>
              ))}
            </motion.div>

            <motion.div variants={itemVariants} className="flex justify-center">
              <motion.button
                onClick={() => addField("skills", "")}
                className="flex items-center gap-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-full font-medium hover:bg-gray-200 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  ></path>
                </svg>
                Add Skill
              </motion.button>
            </motion.div>

            <motion.div variants={itemVariants}>
              <NavButtons prevStep={prevStep} nextStep={nextStep} />
            </motion.div>
          </motion.div>
        )

      case 6:
        return (
          <motion.div
            key="step6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="space-y-6"
          >
            <motion.h2
              variants={itemVariants}
              className="text-3xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600"
            >
              Projects
            </motion.h2>

            <motion.div variants={itemVariants} className="space-y-4">
              {formData.projects.map((project, i) => (
                <motion.div
                  key={i}
                  className="bg-white p-5 rounded-xl shadow-md relative"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div className="grid grid-cols-1 gap-4">
                    {Object.keys(project).map((field) => (
                      <div key={field} className="relative">
                        {field === "description" ? (
                          <textarea
                            placeholder=" "
                            value={project[field]}
                            onChange={(e) => handleChange(e, i, "projects", field)}
                            rows={3}
                            className="peer w-full border-0 border-b-2 border-gray-300 bg-gray-50 px-4 py-3 rounded-lg text-gray-800 placeholder-transparent focus:outline-none focus:border-purple-600 focus:ring-0 transition-all resize-none"
                          />
                        ) : (
                          <input
                            placeholder=" "
                            value={project[field]}
                            onChange={(e) => handleChange(e, i, "projects", field)}
                            className="peer w-full border-0 border-b-2 border-gray-300 bg-gray-50 px-4 py-3 rounded-lg text-gray-800 placeholder-transparent focus:outline-none focus:border-purple-600 focus:ring-0 transition-all"
                          />
                        )}
                        <label className="absolute left-4 -top-2.5 text-sm text-gray-500 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3.5 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-purple-600">
                          {field.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}
                        </label>
                      </div>
                    ))}
                  </div>

                  {formData.projects.length > 1 && (
                    <motion.button
                      onClick={() => removeField("projects", i)}
                      className="absolute top-2 right-2 text-red-500 hover:text-red-700 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        ></path>
                      </svg>
                    </motion.button>
                  )}
                </motion.div>
              ))}
            </motion.div>

            <motion.div variants={itemVariants} className="flex justify-center">
              <motion.button
                onClick={() => addField("projects", { title: "", description: "", link: "", technologies: "" })}
                className="flex items-center gap-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-full font-medium hover:bg-gray-200 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  ></path>
                </svg>
                Add Project
              </motion.button>
            </motion.div>

            <motion.div variants={itemVariants}>
              <NavButtons prevStep={prevStep} nextStep={nextStep} isLastStep={true} />
            </motion.div>
          </motion.div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto">
        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium text-gray-500">Step {step} of 6</span>
            <span className="text-sm font-medium text-purple-600">{Math.round(progressBarWidth)}%</span>
          </div>
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full"
              initial={{ width: `${((step - 1) / 5) * 100}%` }}
              animate={{ width: `${progressBarWidth}%` }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            />
          </div>
        </div>

        {/* Form container */}
        <motion.div
          className="bg-white rounded-2xl shadow-xl p-8 overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <AnimatePresence mode="wait">{renderStep()}</AnimatePresence>
        </motion.div>
      </div>
    </div>
  )
}