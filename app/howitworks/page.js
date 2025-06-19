"use client"

import { useState } from "react"
import { User, Upload, MessageSquare, BarChart3, ArrowRight, CheckCircle, Play, Zap } from "lucide-react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import Navbar from "@/components/Navbar"

export default function HowItWorksPage() {
  const steps = [
    {
      icon: <User className="h-8 w-8 text-purple-300" />,
      title: "Create Your Profile",
      description: "Quickly sign up and customize your profile to get started on the platform.",
    },
    {
      icon: <Upload className="h-8 w-8 text-blue-300" />,
      title: "Upload Your Resume",
      description: "Provide your resume and key details like target job role and experience level.",
    },
    {
      icon: <MessageSquare className="h-8 w-8 text-green-300" />,
      title: "Start the Interview",
      description: "Our AI generates tailored questions and you answer them in a simulated environment.",
    },
    {
      icon: <BarChart3 className="h-8 w-8 text-yellow-300" />,
      title: "Get Instant Feedback",
      description: "Receive a detailed scorecard with actionable insights to improve your skills.",
    },
  ];

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
            <motion.h1
              className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tighter leading-tight mb-4"
              variants={itemVariants}
            >
              Your Path to Interview Success
            </motion.h1>
            <motion.p
              className="text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto"
              variants={itemVariants}
            >
              Follow our simple, streamlined process to turn interview anxiety into job-winning confidence.
            </motion.p>
          </motion.div>

          {/* Process Steps with connecting line */}
          <div className="relative mb-24">
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-white/10 -translate-y-1/2"></div>
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 -translate-y-1/2" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }}></div>

            <motion.div
              className="relative grid md:grid-cols-4 gap-8"
              initial="hidden"
              animate="visible"
              variants={containerVariants}
            >
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  className="relative text-center"
                  variants={itemVariants}
                >
                  <div className="flex justify-center mb-6">
                    <div className="w-24 h-24 rounded-full bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center">
                      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-600/50 to-blue-600/50 flex items-center justify-center">
                        {step.icon}
                      </div>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                  <p className="text-gray-400 max-w-xs mx-auto">{step.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Video Demo Section */}
          <motion.div
            className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-8 lg:p-12 mb-24"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="space-y-6">
                <h2 className="text-4xl font-bold text-white">See It in Action</h2>
                <p className="text-gray-300 text-lg">
                  Watch a short demo to see how our platform transforms your resume into a personalized interview experience, providing you with the tools to shine.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3"><CheckCircle className="w-5 h-5 text-green-400" /> AI-Powered Question Generation</li>
                  <li className="flex items-center gap-3"><CheckCircle className="w-5 h-5 text-green-400" /> Real-time, Actionable Feedback</li>
                  <li className="flex items-center gap-3"><CheckCircle className="w-5 h-5 text-green-400" /> Confidence-Boosting Practice</li>
                </ul>
              </div>
              <motion.div
                className="relative aspect-video bg-black rounded-xl border-2 border-purple-500/50 overflow-hidden group cursor-pointer"
                whileHover={{ scale: 1.05, boxShadow: "0px 0px 30px rgba(168, 85, 247, 0.5)" }}
                transition={{ duration: 0.3 }}
              >
                <img src="https://images.unsplash.com/photo-1556740738-b6a63e27c4df?q=80&w=2070&auto=format&fit=crop" alt="Demo Video Thumbnail" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center group-hover:bg-white/30 transition-colors">
                    <Play className="w-10 h-10 text-white" />
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            className="text-center bg-gradient-to-r from-purple-600/30 to-blue-600/30 backdrop-blur-lg rounded-2xl p-12 border border-white/10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-4xl font-bold text-white mb-4">Ready to Start Your Journey?</h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Take the first step towards your dream job. Our platform is ready to guide you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/interview">
                <button className="group relative w-full sm:w-auto px-8 py-4 bg-white text-black text-lg font-bold rounded-xl overflow-hidden transform hover:scale-105 transition-transform duration-300">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <span className="relative flex items-center justify-center space-x-2">
                    <Zap className="w-5 h-5" />
                    <span>Start Free Interview</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                </button>
              </Link>
              <Link href="/features">
                <button className="w-full sm:w-auto px-8 py-4 bg-white/10 backdrop-blur-sm text-white text-lg font-semibold rounded-xl border border-white/20 hover:bg-white/20 transition-colors duration-300">
                  Explore Features
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  )
}