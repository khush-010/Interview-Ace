"use client"

import { useState } from "react"
import { Brain, FileText, Target, BarChart3, Clock, Zap, CheckCircle, ArrowRight } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import Navbar from "@/components/Navbar"

export default function FeaturesPage() {
  const features = [
    {
      icon: <Brain className="h-8 w-8 text-purple-300" />,
      title: "AI-Powered Question Generation",
      description: "Our advanced AI analyzes your resume and generates personalized interview questions tailored to your specific skills and experience.",
      benefits: ["Personalized questions", "Industry-specific content", "Skill-based assessment"],
    },
    {
      icon: <FileText className="h-8 w-8 text-blue-300" />,
      title: "Resume-Based Customization",
      description: "Upload your resume and watch as our AI creates questions that directly relate to your background, projects, and achievements.",
      benefits: ["Resume analysis", "Project-specific questions", "Achievement-focused"],
    },
    {
      icon: <Target className="h-8 w-8 text-green-300" />,
      title: "Job Role Targeting",
      description: "Specify your target job role and get questions that match the exact requirements and expectations of that position.",
      benefits: ["Role-specific questions", "Industry standards", "Position requirements"],
    },
    {
      icon: <BarChart3 className="h-8 w-8 text-yellow-300" />,
      title: "Experience Level Adaptation",
      description: "Whether you're entry-level, mid-career, or senior, our AI adjusts question difficulty and focus to match your experience.",
      benefits: ["Level-appropriate difficulty", "Career-stage focus", "Growth-oriented feedback"],
    },
    {
      icon: <Clock className="h-8 w-8 text-red-300" />,
      title: "Real-Time Evaluation",
      description: "Get instant feedback on your answers with AI-powered scoring that evaluates content, relevance, and communication skills.",
      benefits: ["Instant scoring", "Detailed feedback", "Performance metrics"],
    },
    {
      icon: <Zap className="h-8 w-8 text-pink-300" />,
      title: "Interactive Practice Sessions",
      description: "Engage in dynamic interview sessions with timed questions, realistic scenarios, and comprehensive performance tracking.",
      benefits: ["Timed practice", "Realistic scenarios", "Progress tracking"],
    },
  ];

  const stats = [
    { number: "50K+", label: "Interviews Completed" },
    { number: "94%", label: "Success Rate" },
    { number: "4.9/5", label: "User Rating" },
    { number: "10K+", label: "Questions Generated" },
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
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-radial from-purple-600/20 to-transparent rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-radial from-blue-600/20 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: "2s" }}></div>
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
            A Smarter Way to Prepare
          </motion.h1>
          <motion.p
            className="text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto"
            variants={itemVariants}
          >
            Our cutting-edge features are designed to give you the confidence and skills to excel in any interview.
          </motion.p>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-24"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="bg-white/5 backdrop-blur-md rounded-2xl p-6 text-center border border-white/10"
              variants={itemVariants}
            >
              <div className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-1">
                {stat.number}
              </div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Features Grid */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="group relative bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10 overflow-hidden transform-gpu transition-all duration-300 hover:border-white/20 hover:-translate-y-1"
              variants={itemVariants}
            >
              <div className="absolute top-0 left-0 h-full w-full bg-gradient-to-br from-purple-600/20 to-blue-600/20 opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="p-3 rounded-lg bg-white/10 inline-block mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
                <p className="text-gray-400 mb-6 leading-relaxed">{feature.description}</p>
                <div className="space-y-2">
                  {feature.benefits.map((benefit, benefitIndex) => (
                    <div key={benefitIndex} className="flex items-center text-sm text-gray-300">
                      <CheckCircle className="h-4 w-4 text-green-400 mr-2 flex-shrink-0" />
                      {benefit}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="text-center bg-gradient-to-r from-purple-600/30 to-blue-600/30 backdrop-blur-lg rounded-2xl p-12 border border-white/10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-4xl font-bold text-white mb-4">Ready to Ace Your Interview?</h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Transform your interview preparation today. Get started with a free practice session and experience the future of interview coaching.
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
            <Link href="/howitworks">
              <button className="w-full sm:w-auto px-8 py-4 bg-white/10 backdrop-blur-sm text-white text-lg font-semibold rounded-xl border border-white/20 hover:bg-white/20 transition-colors duration-300">
                Learn More
              </button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
    </>
  )
}