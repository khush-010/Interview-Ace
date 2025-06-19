"use client"

import { useState } from "react"
import { X, Upload, User, Briefcase, Clock, FileText } from "lucide-react"

export default function InterviewModal({ isOpen, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    name: "",
    position: "",
    experience: "",
    resume: null,
  })
  const [isLoading, setIsLoading] = useState(false)
  const [dragActive, setDragActive] = useState(false)

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleFileUpload = (file) => {
    if (file.type === "application/pdf" || file.type.includes("document")) {
      setFormData({
        ...formData,
        resume: file,
      })
    } else {
      alert("Please upload a PDF or document file")
    }
  }

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0])
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Submit form data
      await onSubmit(formData)
    } catch (error) {
      console.error("Error submitting form:", error)
    } finally {
      setIsLoading(false)

      // Reset form
      setFormData({
        name: "",
        position: "",
        experience: "",
        resume: null,
      })
    }
  }

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Fixed backdrop with black theme */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-all duration-300 ease-out"
        onClick={handleBackdropClick}
        aria-hidden="true"
      />

      {/* Centered modal container with proper overflow handling */}
      <div className="flex min-h-screen items-center justify-center p-2 sm:p-4">
        <div className="relative w-full max-w-sm sm:max-w-md lg:max-w-lg xl:max-w-xl my-4">
          {/* Modal with black gradient theme */}
          <div className="relative bg-gradient-to-br from-gray-900 via-black to-gray-800 rounded-xl sm:rounded-2xl shadow-2xl border border-gray-700/50 overflow-hidden transform transition-all duration-300 ease-out">
            {/* Subtle glow effect */}
            <div className="absolute inset-0 rounded-xl sm:rounded-2xl shadow-[0_0_30px_rgba(0,0,0,0.5)] pointer-events-none" />

            {/* Header with black gradient */}
            <div className="relative flex items-center justify-between p-4 sm:p-6 border-b border-gray-700/50 bg-gradient-to-r from-black/80 to-gray-900/80">
              <div className="flex-1 min-w-0 pr-4">
                <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-white">Start Your Interview</h2>
                <p className="text-xs sm:text-sm text-gray-300 mt-1 sm:mt-2">
                  Provide your details to begin your AI-powered interview
                </p>
              </div>
              <button
                onClick={onClose}
                className="flex-shrink-0 p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-700/50 transition-all duration-200 group"
              >
                <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-200" />
              </button>
            </div>

            {/* Form content */}
            <div className="p-4 sm:p-6 space-y-4 sm:space-y-5 max-h-[70vh] overflow-y-auto">
              {/* Name Field */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-white">
                  Full Name <span className="text-red-400">*</span>
                </label>
                <div className="relative group">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 group-focus-within:text-gray-300 transition-colors duration-200" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    className="w-full pl-10 pr-3 py-3 bg-gray-800/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-all duration-300 hover:bg-gray-700/50"
                    required
                  />
                </div>
              </div>

              {/* Position Field */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-white">
                  Position Applying For <span className="text-red-400">*</span>
                </label>
                <div className="relative group">
                  <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 group-focus-within:text-gray-300 transition-colors duration-200 z-10" />
                  <select
                    name="position"
                    value={formData.position}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-8 py-3 bg-gray-800/50 border border-gray-600/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-all duration-300 hover:bg-gray-700/50 appearance-none cursor-pointer"
                    required
                  >
                    <option value="" className="bg-gray-800 text-gray-400">
                      Select a position
                    </option>
                    <option value="software-engineer" className="bg-gray-800 text-white">
                      Software Engineer
                    </option>
                    <option value="frontend-developer" className="bg-gray-800 text-white">
                      Frontend Developer
                    </option>
                    <option value="backend-developer" className="bg-gray-800 text-white">
                      Backend Developer
                    </option>
                    <option value="fullstack-developer" className="bg-gray-800 text-white">
                      Fullstack Developer
                    </option>
                    <option value="data-scientist" className="bg-gray-800 text-white">
                      Data Scientist
                    </option>
                    <option value="product-manager" className="bg-gray-800 text-white">
                      Product Manager
                    </option>
                    <option value="ui-ux-designer" className="bg-gray-800 text-white">
                      UI/UX Designer
                    </option>
                    <option value="devops-engineer" className="bg-gray-800 text-white">
                      DevOps Engineer
                    </option>
                    <option value="other" className="bg-gray-800 text-white">
                      Other
                    </option>
                  </select>
                  {/* Custom dropdown arrow */}
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Experience Field */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-white">
                  Years of Experience <span className="text-red-400">*</span>
                </label>
                <div className="relative group">
                  <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 group-focus-within:text-gray-300 transition-colors duration-200 z-10" />
                  <select
                    name="experience"
                    value={formData.experience}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-8 py-3 bg-gray-800/50 border border-gray-600/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-all duration-300 hover:bg-gray-700/50 appearance-none cursor-pointer"
                    required
                  >
                    <option value="" className="bg-gray-800 text-gray-400">
                      Select experience level
                    </option>
                    <option value="0-1" className="bg-gray-800 text-white">
                      0-1 years (Entry Level)
                    </option>
                    <option value="1-3" className="bg-gray-800 text-white">
                      1-3 years (Junior)
                    </option>
                    <option value="3-5" className="bg-gray-800 text-white">
                      3-5 years (Mid Level)
                    </option>
                    <option value="5-8" className="bg-gray-800 text-white">
                      5-8 years (Senior)
                    </option>
                    <option value="8+" className="bg-gray-800 text-white">
                      8+ years (Lead/Principal)
                    </option>
                  </select>
                  {/* Custom dropdown arrow */}
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Resume Upload with black theme */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-white">
                  Resume <span className="text-gray-400">(Optional)</span>
                </label>
                <div
                  className={`relative border-2 border-dashed rounded-lg p-4 sm:p-5 transition-all duration-300 ${
                    dragActive
                      ? "border-gray-400 bg-gray-700/30 scale-[1.01]"
                      : "border-gray-600/50 hover:border-gray-500 hover:bg-gray-800/30"
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <div className="text-center">
                    <Upload
                      className={`w-6 h-6 mx-auto mb-2 transition-all duration-300 ${
                        dragActive ? "text-gray-300 scale-110" : "text-gray-400"
                      }`}
                    />
                    {formData.resume ? (
                      <div className="space-y-1">
                        <p className="text-white font-medium text-sm">{formData.resume.name}</p>
                        <p className="text-gray-400 text-xs">{(formData.resume.size / 1024 / 1024).toFixed(2)} MB</p>
                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, resume: null })}
                          className="text-red-400 hover:text-red-300 text-xs underline hover:no-underline transition-all duration-200"
                        >
                          Remove file
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-1">
                        <p className="text-white font-medium text-sm">Click to upload or drag and drop</p>
                        <p className="text-gray-400 text-xs">PDF, DOC, DOCX up to 10MB</p>
                      </div>
                    )}
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0])}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons with proper spacing and black theme */}
            <div className="px-4 sm:px-6 pb-4 sm:pb-6 pt-2">
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full sm:flex-1 px-4 py-3 border border-gray-600 text-white font-semibold rounded-lg hover:bg-gray-700/50 hover:border-gray-500 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isLoading || !formData.name || !formData.position || !formData.experience}
                  className="w-full sm:flex-1 px-4 py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.01] focus:outline-none focus:ring-2 focus:ring-gray-300 flex items-center justify-center space-x-2"
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin"></div>
                      <span>Starting...</span>
                    </>
                  ) : (
                    <>
                      <FileText className="w-4 h-4" />
                      <span>Start Interview</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 