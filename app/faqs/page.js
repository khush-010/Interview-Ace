"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp, HelpCircle, MessageCircle, Mail, Phone, ArrowRight, Zap } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import Navbar from "@/components/Navbar"

export default function FAQsPage() {
  const [openFAQ, setOpenFAQ] = useState(0)

  const faqs = [
    {
      question: "How does the AI generate personalized interview questions?",
      answer:
        "Our AI analyzes your uploaded resume, job role, and experience level to create tailored questions. It identifies key skills, projects, and experiences from your resume and generates relevant questions that interviewers in your target role would typically ask. The AI considers industry standards, role requirements, and your experience level to ensure appropriate difficulty and relevance.",
    },
    {
      question: "What file formats are supported for resume upload?",
      answer:
        "Currently, we support PDF format for resume uploads. This ensures consistent formatting and accurate text extraction. Make sure your PDF is text-based (not scanned images) for optimal AI analysis. We recommend keeping your resume under 5MB for faster processing.",
    },
    {
      question: "How is my interview performance scored?",
      answer:
        "Our AI evaluates your answers based on multiple criteria including content relevance, technical accuracy, communication clarity, and completeness. Each answer receives a score from 1-10, and you get detailed feedback explaining the scoring rationale. The system considers industry best practices and role-specific expectations in its evaluation.",
    },
    {
      question: "Can I retake the interview with the same resume?",
      answer:
        "Yes! You can retake interviews as many times as you want. Each session generates new questions based on your resume and selected parameters, so you'll get fresh practice opportunities. This helps you improve your responses and build confidence over time.",
    },
    {
      question: "How long does each interview session take?",
      answer:
        "A complete interview session typically takes 45-60 minutes. You have 5 minutes to answer each of the 10 questions, plus additional time for reading and preparation. The platform is flexible - you can pause between questions if needed.",
    },
    {
      question: "Is my personal information and resume data secure?",
      answer:
        "Absolutely. We use enterprise-grade encryption to protect your data. Your resume and personal information are stored securely and never shared with third parties. You can delete your data at any time from your account settings. We comply with GDPR and other privacy regulations.",
    },
    {
      question: "What job roles and industries are supported?",
      answer:
        "Our platform supports a wide range of job roles across various industries including Technology, Finance, Healthcare, Marketing, Sales, Engineering, and more. The AI is trained on diverse industry knowledge and can adapt questions for entry-level to senior positions.",
    },
    {
      question: "Do I need any special software or equipment?",
      answer:
        "No special software is required! Our platform works directly in your web browser. You just need a stable internet connection and a device with a microphone if you choose to practice verbal responses (optional feature). The platform is compatible with all modern browsers.",
    },
    {
      question: "Can I get feedback on specific areas for improvement?",
      answer:
        "Yes! After each interview, you receive detailed feedback highlighting your strengths and areas for improvement. The AI provides specific suggestions for enhancing your responses, communication style, and technical knowledge based on your performance.",
    },
    {
      question: "Is there a mobile app available?",
      answer:
        "Currently, our platform is web-based and optimized for desktop and tablet use for the best interview experience. A mobile app is in development and will be available soon. You can access the platform through your mobile browser, though we recommend using a larger screen for optimal experience.",
    },
    {
      question: "How much does the service cost?",
      answer:
        "Currently, our service is free to use during the beta phase. We plan to introduce premium features in the future, but basic interview practice and feedback will always remain free. Stay tuned for updates on our pricing plans!",
    },
    {
      question: "Can I practice for specific companies?",
      answer:
        "While we don't provide company-specific questions due to confidentiality, our AI generates questions based on industry standards and role requirements that are commonly asked across companies in your target field. This gives you comprehensive preparation for any interview.",
    },
  ]

  const contactOptions = [
    {
      icon: <MessageCircle className="h-6 w-6" />,
      title: "Live Chat",
      description: "Get instant help from our support team",
      action: "Start Chat",
      color: "from-purple-500 to-blue-500",
    },
    {
      icon: <Mail className="h-6 w-6" />,
      title: "Email Support",
      description: "Send us your questions anytime",
      action: "Send Email",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: <Phone className="h-6 w-6" />,
      title: "Phone Support",
      description: "Speak directly with our team",
      action: "Call Now",
      color: "from-green-500 to-emerald-500",
    },
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
              <HelpCircle className="h-12 w-12 text-purple-400" />
            </motion.div>
            <motion.h1
              className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tighter leading-tight mb-4"
              variants={itemVariants}
            >
              Frequently Asked Questions
            </motion.h1>
            <motion.p
              className="text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto"
              variants={itemVariants}
            >
              Find answers to common questions about our AI-powered mock interview platform. 
              Can't find what you're looking for? Our support team is here to help.
            </motion.p>
          </motion.div>

          {/* FAQ Section */}
          <motion.div
            className="max-w-4xl mx-auto mb-24"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  className="bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300"
                  variants={itemVariants}
                >
                  <button
                    className="w-full p-6 text-left flex justify-between items-center hover:bg-white/5 rounded-xl transition-all duration-200 group"
                    onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                  >
                    <h3 className="text-lg font-semibold text-white pr-4 group-hover:text-purple-300 transition-colors">
                      {faq.question}
                    </h3>
                    <div className="flex-shrink-0">
                      {openFAQ === index ? (
                        <ChevronUp className="h-6 w-6 text-purple-400" />
                      ) : (
                        <ChevronDown className="h-6 w-6 text-gray-400 group-hover:text-purple-400 transition-colors" />
                      )}
                    </div>
                  </button>

                  <AnimatePresence>
                    {openFAQ === index && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6">
                          <div className="border-t border-white/10 pt-4">
                            <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Contact Support Section */}
          {/* <motion.div
            className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-8 lg:p-12 mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-white mb-4">Still Have Questions?</h2>
              <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                Our support team is here to help you get the most out of your interview preparation experience.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {contactOptions.map((option, index) => (
                <motion.div
                  key={index}
                  className="group text-center p-8 bg-white/5 rounded-xl border border-white/10 hover:border-white/30 hover:bg-white/10 transition-all duration-300 cursor-pointer"
                  whileHover={{ scale: 1.05, boxShadow: "0px 0px 30px rgba(168, 85, 247, 0.3)" }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex justify-center mb-6">
                    <div className="w-20 h-20 rounded-full bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center">
                      <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${option.color}/50 flex items-center justify-center text-white`}>
                        {option.icon}
                      </div>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3">{option.title}</h3>
                  <p className="text-gray-400 mb-6">{option.description}</p>

                  <button className={`px-6 py-3 bg-gradient-to-r ${option.color} text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105`}>
                    {option.action}
                  </button>
                </motion.div>
              ))}
            </div>
          </motion.div> */}

          {/* Quick Tips */}
          <motion.div
            className="bg-gradient-to-r from-purple-600/30 to-blue-600/30 backdrop-blur-lg rounded-2xl p-8 border border-white/10 mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="text-center">
              <h3 className="text-2xl font-bold text-white mb-4">💡 Quick Tip</h3>
              <p className="text-gray-300 max-w-2xl mx-auto">
                For the best interview experience, ensure you have a quiet environment, stable internet connection, and
                your resume ready in PDF format before starting your session.
              </p>
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
            <h2 className="text-4xl font-bold text-white mb-4">Ready to Start Practicing?</h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Don't let questions hold you back. Start your interview preparation journey today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="group relative w-full sm:w-auto px-8 py-4 bg-white text-black text-lg font-bold rounded-xl overflow-hidden transform hover:scale-105 transition-transform duration-300">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <span className="relative flex items-center justify-center space-x-2">
                  <Zap className="w-5 h-5" />
                  <span>Start Free Interview</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </button>
              {/* <button className="w-full sm:w-auto px-8 py-4 bg-white/10 backdrop-blur-sm text-white text-lg font-semibold rounded-xl border border-white/20 hover:bg-white/20 transition-colors duration-300">
                View Pricing Plans
              </button> */}
            </div>
          </motion.div>
        </div>
      </div>
    </>
  )
}