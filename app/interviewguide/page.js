"use client"

import { useState } from "react"
import {
  Monitor,
  Camera,
  Wifi,
  Clock,
  User,
  MessageSquare,
  CheckCircle,
  AlertTriangle,
  Lightbulb,
  Target,
  Star,
  ArrowRight,
  Zap,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import Navbar from "@/components/Navbar"

export default function InterviewGuidePage() {
  const [activeTab, setActiveTab] = useState(0)

  const tabs = [
    { id: 0, label: "Technical Setup", icon: <Monitor className="h-5 w-5" /> },
    { id: 1, label: "Environment", icon: <User className="h-5 w-5" /> },
    { id: 2, label: "Communication", icon: <MessageSquare className="h-5 w-5" /> },
    { id: 3, label: "Best Practices", icon: <Star className="h-5 w-5" /> },
  ]

  const technicalSetup = [
    {
      icon: <Monitor className="h-8 w-8" />,
      title: "Device & Browser",
      tips: [
        "Use a desktop or laptop for the best experience",
        "Ensure your browser is up to date (Chrome, Firefox, Safari, Edge)",
        "Close unnecessary applications to free up system resources",
        "Have a backup device ready in case of technical issues",
      ],
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: <Wifi className="h-8 w-8" />,
      title: "Internet Connection",
      tips: [
        "Test your internet speed (minimum 10 Mbps recommended)",
        "Use a wired connection if possible for stability",
        "Close bandwidth-heavy applications (streaming, downloads)",
        "Have a mobile hotspot as backup",
      ],
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: <Camera className="h-8 w-8" />,
      title: "Camera & Audio",
      tips: [
        "Test your camera and microphone before the interview",
        "Position camera at eye level for professional appearance",
        "Use headphones to avoid echo and improve audio quality",
        "Ensure good lighting on your face",
      ],
      color: "from-purple-500 to-pink-500",
    },
  ]

  const environmentTips = [
    {
      icon: <User className="h-8 w-8" />,
      title: "Professional Appearance",
      tips: [
        "Dress professionally as you would for an in-person interview",
        "Choose solid colors that look good on camera",
        "Avoid busy patterns or distracting jewelry",
        "Maintain good posture throughout the interview",
      ],
      color: "from-indigo-500 to-purple-500",
    },
    {
      icon: <Target className="h-8 w-8" />,
      title: "Background & Lighting",
      tips: [
        "Choose a clean, uncluttered background",
        "Sit facing a window or use a ring light for good lighting",
        "Avoid backlighting that makes you appear dark",
        "Consider using a virtual background if your space isn't ideal",
      ],
      color: "from-orange-500 to-red-500",
    },
    {
      icon: <AlertTriangle className="h-8 w-8" />,
      title: "Minimize Distractions",
      tips: [
        "Choose a quiet room away from household noise",
        "Turn off phone notifications and close social media",
        "Inform family members about your interview time",
        "Have a glass of water nearby but avoid eating during the interview",
      ],
      color: "from-yellow-500 to-orange-500",
    },
  ]

  const communicationTips = [
    {
      icon: <MessageSquare className="h-8 w-8" />,
      title: "Verbal Communication",
      tips: [
        "Speak clearly and at a moderate pace",
        "Use the STAR method (Situation, Task, Action, Result) for behavioral questions",
        "Pause briefly before answering to collect your thoughts",
        "Ask for clarification if you don't understand a question",
      ],
      color: "from-blue-500 to-indigo-500",
    },
    {
      icon: <User className="h-8 w-8" />,
      title: "Body Language",
      tips: [
        "Maintain eye contact by looking at the camera, not the screen",
        "Use natural hand gestures to emphasize points",
        "Smile genuinely and show enthusiasm",
        "Sit up straight and lean slightly forward to show engagement",
      ],
      color: "from-green-500 to-teal-500",
    },
    {
      icon: <Clock className="h-8 w-8" />,
      title: "Time Management",
      tips: [
        "Keep answers concise but comprehensive (2-3 minutes max)",
        "Practice your elevator pitch and key stories beforehand",
        "Leave time for questions at the end",
        "Be punctual - join the interview 5-10 minutes early",
      ],
      color: "from-purple-500 to-violet-500",
    },
  ]

  const bestPractices = [
    {
      icon: <Lightbulb className="h-8 w-8" />,
      title: "Preparation",
      tips: [
        "Research the company and role thoroughly",
        "Prepare specific examples that demonstrate your skills",
        "Practice common interview questions out loud",
        "Have your resume and notes easily accessible",
      ],
      color: "from-yellow-500 to-amber-500",
    },
    {
      icon: <CheckCircle className="h-8 w-8" />,
      title: "During the Interview",
      tips: [
        "Be authentic and let your personality shine through",
        "Show enthusiasm for the role and company",
        "Ask thoughtful questions about the position and team",
        "Take notes during the conversation",
      ],
      color: "from-emerald-500 to-green-500",
    },
    {
      icon: <Star className="h-8 w-8" />,
      title: "Follow-up",
      tips: [
        "Send a thank-you email within 24 hours",
        "Reiterate your interest in the position",
        "Address any concerns that came up during the interview",
        "Connect with your interviewer on LinkedIn if appropriate",
      ],
      color: "from-pink-500 to-rose-500",
    },
  ]

  const getTabContent = () => {
    switch (activeTab) {
      case 0:
        return technicalSetup
      case 1:
        return environmentTips
      case 2:
        return communicationTips
      case 3:
        return bestPractices
      default:
        return technicalSetup
    }
  }

  const checklist = [
    "Test your internet connection and backup options",
    "Check camera, microphone, and lighting",
    "Choose appropriate attire and background",
    "Prepare your resume and relevant documents",
    "Research the company and role",
    "Practice common interview questions",
    "Prepare thoughtful questions to ask",
    "Set up a quiet, distraction-free environment",
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <>
      <Navbar />
      <div className="relative min-h-screen bg-black text-white overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 z-0">
          <div className="absolute -top-20 -left-20 w-96 h-96 bg-gradient-radial from-purple-600/20 to-transparent rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-gradient-radial from-blue-600/20 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: "2s" }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-radial from-green-600/10 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: "4s" }}></div>
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
          {/* Header */}
          <motion.div
            className="text-center mb-20"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.div
              className="inline-flex p-4 bg-white/5 backdrop-blur-md rounded-full mb-6 border border-white/10"
              variants={itemVariants}
            >
              <Monitor className="h-12 w-12 text-blue-400" />
            </motion.div>
            <motion.h1
              className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tighter leading-tight mb-4"
              variants={itemVariants}
            >
              Online Interview Guide
            </motion.h1>
            <motion.p
              className="text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto"
              variants={itemVariants}
            >
              Master the art of online interviews with our comprehensive guide. Learn technical setup, communication
              tips, and best practices for guaranteed success.
            </motion.p>
          </motion.div>

          {/* Tab Navigation */}
          <motion.div
            className="max-w-4xl mx-auto mb-12"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.div 
              className="flex flex-wrap justify-center gap-2 mb-8"
              variants={itemVariants}
            >
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                    activeTab === tab.id
                      ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg scale-105"
                      : "bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white border border-white/10 hover:border-white/20"
                  }`}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
            </motion.div>

            {/* Tab Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                className="grid md:grid-cols-1 lg:grid-cols-3 gap-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {getTabContent().map((section, index) => (
                  <motion.div
                    key={index}
                    className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-all duration-300 group"
                    whileHover={{ scale: 1.02, boxShadow: "0px 0px 30px rgba(168, 85, 247, 0.2)" }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="flex justify-center mb-6">
                      <div className="w-20 h-20 rounded-full bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center group-hover:border-white/30 transition-colors">
                        <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${section.color}/50 flex items-center justify-center text-white`}>
                          {section.icon}
                        </div>
                      </div>
                    </div>

                    <h3 className="text-2xl font-bold text-white mb-6 text-center">{section.title}</h3>

                    <div className="space-y-3">
                      {section.tips.map((tip, tipIndex) => (
                        <div
                          key={tipIndex}
                          className="flex items-start gap-3 text-gray-300 hover:text-gray-100 transition-colors duration-200"
                        >
                          <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                          <span className="leading-relaxed">{tip}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Pre-Interview Checklist */}
          <motion.div
            className="max-w-4xl mx-auto mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-gradient-to-r from-green-600/30 to-emerald-600/30 backdrop-blur-lg rounded-2xl p-12 border border-white/10">
              <div className="text-center mb-8">
                <div className="inline-flex p-4 bg-white/5 backdrop-blur-md rounded-full mb-4 border border-white/10">
                  <CheckCircle className="h-12 w-12 text-green-400" />
                </div>
                <h2 className="text-4xl font-bold text-white mb-4">Pre-Interview Checklist</h2>
                <p className="text-gray-300 text-lg">
                  Complete this checklist 30 minutes before your interview to ensure you're fully prepared.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {checklist.map((item, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center gap-3 p-4 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-all duration-200 cursor-pointer group"
                    whileHover={{ scale: 1.02 }}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <div className="w-6 h-6 border-2 border-green-400 rounded flex items-center justify-center group-hover:bg-green-400/20 transition-colors">
                      <CheckCircle className="h-4 w-4 text-green-400" />
                    </div>
                    <span className="text-gray-200 group-hover:text-white transition-colors">{item}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Emergency Tips */}
          <motion.div
            className="max-w-4xl mx-auto mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="bg-gradient-to-r from-orange-600/30 to-red-600/30 backdrop-blur-lg rounded-2xl p-12 border border-white/10">
              <div className="text-center mb-8">
                <div className="inline-flex p-4 bg-white/5 backdrop-blur-md rounded-full mb-4 border border-white/10">
                  <AlertTriangle className="h-12 w-12 text-orange-400" />
                </div>
                <h2 className="text-4xl font-bold text-white mb-4">Technical Difficulties?</h2>
                <p className="text-gray-300 text-lg">
                  Don't panic! Here's what to do if you encounter technical issues during your interview.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-white mb-4">Common Issues & Solutions</h3>
                  <div className="space-y-3">
                    {[
                      { title: "Audio Problems", solution: "Check microphone settings, restart browser, or use phone as backup" },
                      { title: "Video Issues", solution: "Refresh page, check camera permissions, or continue with audio only" },
                      { title: "Connection Problems", solution: "Switch to mobile hotspot, move closer to router, or reschedule if needed" }
                    ].map((issue, index) => (
                      <motion.div
                        key={index}
                        className="p-4 bg-white/5 rounded-lg border border-white/10 hover:border-orange-400/50 transition-all duration-200"
                        whileHover={{ scale: 1.02 }}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <h4 className="font-semibold text-orange-400 mb-2">{issue.title}</h4>
                        <p className="text-gray-300 text-sm">{issue.solution}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-white mb-4">Emergency Protocol</h3>
                  <div className="space-y-3">
                    {[
                      "Stay calm and communicate the issue",
                      "Try basic troubleshooting steps",
                      "Have interviewer's contact information ready",
                      "Be prepared to continue via phone if needed",
                      "Follow up with a professional email if interview is interrupted",
                    ].map((step, index) => (
                      <motion.div
                        key={index}
                        className="flex items-center gap-3 group"
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold group-hover:scale-110 transition-transform">
                          {index + 1}
                        </div>
                        <span className="text-gray-300 group-hover:text-white transition-colors">{step}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            className="text-center bg-gradient-to-r from-purple-600/30 to-blue-600/30 backdrop-blur-lg rounded-2xl p-12 border border-white/10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h2 className="text-4xl font-bold text-white mb-4">Ready to Practice?</h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto text-lg">
              Now that you know how to excel in online interviews, practice with our AI-powered mock interview
              platform and build unshakeable confidence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="group relative w-full sm:w-auto px-8 py-4 bg-white text-black text-lg font-bold rounded-xl overflow-hidden transform hover:scale-105 transition-transform duration-300">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <span className="relative flex items-center justify-center space-x-2">
                  <Zap className="w-5 h-5" />
                  <span>Start Practice Interview</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </button>
              {/* <button className="w-full sm:w-auto px-8 py-4 bg-white/10 backdrop-blur-sm text-white text-lg font-semibold rounded-xl border border-white/20 hover:bg-white/20 transition-colors duration-300">
                View More Resources
              </button> */}
            </div>
          </motion.div>
        </div>
      </div>
    </>
  )
}