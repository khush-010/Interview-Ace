"use client"

import { useState, useEffect } from "react"
import { Menu, X, ChevronDown, Zap, Users, BookOpen, HelpCircle, LogOut, ArrowRight } from "lucide-react"
import { useRouter } from "next/navigation"
import Cookies from "js-cookie"
import { motion, AnimatePresence } from "framer-motion"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    Cookies.remove("role");
    Cookies.remove("salt");

    setIsLoggedIn(false);
    router.push("/");
  }

  const navItemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.nav 
      className="sticky top-0 z-50 bg-black/80 backdrop-blur-lg border-b border-white/10"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <motion.div variants={navItemVariants}>
            <a href="/" className="flex items-center space-x-2 group">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center shadow-lg group-hover:shadow-purple-500/50 transition-all duration-300">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-white tracking-tighter">InterviewAce</span>
            </a>
          </motion.div>

          {/* Desktop Navigation */}
          <motion.div className="hidden md:flex items-center space-x-2 bg-white/5 border border-white/10 rounded-full px-2 py-1"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1,
                  delayChildren: 0.2,
                },
              },
            }}
            initial="hidden"
            animate="visible"
          >
            <motion.a
              href="/features"
              className="px-4 py-2 rounded-full text-gray-300 hover:text-white hover:bg-white/10 transition-colors duration-200 font-medium"
              variants={navItemVariants}
            >
              Features
            </motion.a>
            <motion.a
              href="/howitworks"
              className="px-4 py-2 rounded-full text-gray-300 hover:text-white hover:bg-white/10 transition-colors duration-200 font-medium"
              variants={navItemVariants}
            >
              How it Works
            </motion.a>
            <motion.div className="relative" variants={navItemVariants}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center space-x-2 px-4 py-2 rounded-full text-gray-300 hover:text-white hover:bg-white/10 transition-colors duration-200 font-medium"
              >
                <span>Resources</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`}
                />
              </button>
              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div 
                    className="absolute top-full left-0 mt-2 w-48 bg-black/80 backdrop-blur-xl rounded-xl shadow-2xl border border-white/10 py-2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <a href="/faqs" className="block px-4 py-2 text-gray-300 hover:bg-white/10 hover:text-white transition-colors">FAQ</a>
                    <a href="/interviewguide" className="block px-4 py-2 text-gray-300 hover:bg-white/10 hover:text-white transition-colors">Interview Guides</a>
                    {/* <a href="#tips" className="block px-4 py-2 text-gray-300 hover:bg-white/10 hover:text-white transition-colors">Tips & Tricks</a>
                    <a href="#support" className="block px-4 py-2 text-gray-300 hover:bg-white/10 hover:text-white transition-colors">Support</a> */}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>

          {/* Desktop CTA Buttons */}
          <motion.div className="hidden md:flex items-center space-x-3" variants={navItemVariants}>
            {!isLoggedIn ? (
              <a
                href="/login"
                className="group relative inline-flex items-center justify-center px-6 py-2.5 bg-white text-black text-base font-bold rounded-full overflow-hidden transform hover:scale-105 transition-transform duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500"/>
                <span className="relative flex items-center space-x-2">
                  <span>Get Started</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </a>
            ) : (
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-white/10 text-white font-medium rounded-full shadow-lg hover:bg-white/20 transition-all duration-200 transform hover:scale-105 flex items-center space-x-2"
              >
                <LogOut className="w-5 h-5"/>
                <span>Logout</span>
              </button>
            )}
          </motion.div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="md:hidden border-t border-white/10 bg-black/90 backdrop-blur-lg"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="px-4 py-6 space-y-3">
              <a href="#features" className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-white/10 hover:text-white transition-all"><Users className="w-5 h-5" /> <span className="font-medium">Features</span></a>
              <a href="#howitworks" className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-white/10 hover:text-white transition-all"><BookOpen className="w-5 h-5" /> <span className="font-medium">How it Works</span></a>
              <a href="#faq" className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-white/10 hover:text-white transition-all"><HelpCircle className="w-5 h-5" /> <span className="font-medium">FAQ</span></a>
              {!isLoggedIn ? (
                  <div className="pt-4 border-t border-white/10">
                     <a
                        href="/login"
                        className="group relative flex w-full items-center justify-center px-4 py-3 bg-white text-black font-bold rounded-xl overflow-hidden"
                      >
                         <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500"/>
                        <span className="relative flex items-center space-x-2">
                          <span>Get Started</span>
                          <ArrowRight className="w-5 h-5" />
                        </span>
                      </a>
                  </div>
                ) : (
                  <div className="pt-4 border-t border-white/10">
                     <button
                        onClick={handleLogout}
                        className="w-full px-4 py-3 bg-white/10 text-white font-medium rounded-lg hover:bg-white/20 transition-colors flex items-center justify-center space-x-2"
                      >
                        <LogOut className="w-5 h-5"/>
                        <span>Logout</span>
                      </button>
                  </div>
                )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}