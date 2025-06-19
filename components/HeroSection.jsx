"use client";

import { useState, useEffect } from "react";
import { Play, Star, Users, Trophy, Zap, ArrowRight, Sparkles, Bot, Mic, CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

// A simple 3D card component that reacts to mouse movement
const InteractiveCard = ({ mousePosition }) => {
    const [cardRotation, setCardRotation] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e) => {
            const { clientX, clientY, currentTarget } = e;
            if (currentTarget) {
                const { left, top, width, height } = currentTarget.getBoundingClientRect();
                const x = (clientX - left - width / 2) / 25;
                const y = (clientY - top - height / 2) / 25;
                setCardRotation({ x: -y, y: x });
            }
        };

        const cardElement = document.getElementById('interactive-card-wrapper');
        cardElement?.addEventListener('mousemove', handleMouseMove);
        
        return () => cardElement?.removeEventListener('mousemove', handleMouseMove);
    }, []);
    
    return (
        <div id="interactive-card-wrapper" className="w-full h-full perspective-1000">
            <motion.div
                className="w-full h-full bg-white/5 backdrop-blur-lg rounded-3xl border border-white/10 shadow-2xl shadow-black/20 p-6 flex flex-col justify-between transform-style-3d"
                style={{
                    rotateX: cardRotation.x,
                    rotateY: cardRotation.y,
                    transition: 'transform 0.1s ease-out'
                }}
            >
                {/* Mock UI Header */}
                <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>

                {/* Mock Interview Content */}
                <div className="space-y-6">
                    <div className="space-y-2">
                        <motion.p 
                            className="text-gray-400 text-sm"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1, duration: 0.5 }}
                        >
                            AI Interviewer
                        </motion.p>
                        <motion.div 
                            className="bg-gray-700/50 rounded-lg p-4 text-white font-medium"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.2, duration: 0.5 }}
                        >
                            Tell me about a time you faced a challenge at work.
                        </motion.div>
                    </div>
                    <div className="space-y-2">
                         <motion.p 
                            className="text-gray-400 text-sm text-right"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 2, duration: 0.5 }}
                        >
                            Your Answer
                        </motion.p>
                        <motion.div 
                            className="bg-white/10 rounded-lg p-4 flex items-center space-x-3"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 2.2, duration: 0.5 }}
                        >
                            <Mic className="w-5 h-5 text-white flex-shrink-0" />
                            <div className="w-full h-2 bg-gray-600/50 rounded-full overflow-hidden">
                                <motion.div 
                                    className="h-full bg-white"
                                    initial={{ width: '0%' }}
                                    animate={{ width: '75%' }}
                                    transition={{ delay: 2.5, duration: 1.5 }}
                                ></motion.div>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Mock AI Feedback */}
                <motion.div 
                    className="flex items-center space-x-3 bg-green-500/10 border border-green-500/20 rounded-lg px-4 py-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 4, duration: 0.7 }}
                >
                    <CheckCircle className="w-5 h-5 text-green-400"/>
                    <p className="text-green-300 font-semibold text-sm">Great use of the STAR method!</p>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default function HeroSection() {
    const [currentTestimonial, setCurrentTestimonial] = useState(0);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const router = useRouter();

    const testimonials = [
        { name: "Sarah Chen", role: "Software Engineer", company: "Google", rating: 5, quote: "This platform is a game-changer for interview prep." },
        { name: "Alex Rodriguez", role: "Product Manager", company: "Meta", rating: 5, quote: "The AI feedback was incredibly insightful and accurate." },
        { name: "Priya Sharma", role: "Data Scientist", company: "Netflix", rating: 5, quote: "I felt so much more confident after just a few sessions." },
    ];

    const stats = [
        { number: "50K+", label: "Interviews Completed", icon: Users },
        { number: "94%", label: "Success Rate", icon: Trophy },
        { number: "4.9/5", label: "User Rating", icon: Star },
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
        }, 5000); // Increased interval for better readability
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const handleMouseMove = (e) => setMousePosition({ x: e.clientX, y: e.clientY });
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    const handleStartInterview = () => {
        router.push("/interview");
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut",
            },
        },
    };

    return (
        <section className="relative min-h-screen bg-black text-white overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 z-0">
                <div
                    className="absolute w-96 h-96 bg-gradient-radial from-white/5 to-transparent rounded-full blur-3xl pointer-events-none transition-all duration-300 ease-out"
                    style={{
                        left: mousePosition.x - 192,
                        top: mousePosition.y - 192,
                    }}
                />
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
                 <div className="absolute top-20 left-10 w-72 h-72 bg-purple-600/10 rounded-full blur-3xl animate-pulse"></div>
                 <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }}></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-[80vh]">
                    
                    {/* Left Content */}
                    <motion.div
                        className="space-y-8"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <motion.div variants={itemVariants} className="inline-flex items-center space-x-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-2 text-sm">
                            <Sparkles className="w-5 h-5 text-purple-300" />
                            <span className="text-gray-200 font-medium">AI-Powered Interviewer </span>
                        </motion.div>

                        <motion.h1 variants={itemVariants} className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tighter leading-tight">
                            Ace Your Next Interview
                            <span className="block bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">with Confidence</span>
                        </motion.h1>

                        <motion.p variants={itemVariants} className="text-lg lg:text-xl text-gray-300 max-w-xl">
                            Practice with our intelligent AI that asks tailored questions and gives you <span className="text-white font-semibold">instant, actionable feedback</span> to turn your next interview into your next job offer.
                        </motion.p>
                        
                        <motion.div variants={itemVariants} className="grid grid-cols-3 gap-6 pt-4">
                            {stats.map((stat) => (
                                <div key={stat.label} className="text-center">
                                    <div className="text-3xl lg:text-4xl font-bold text-white">{stat.number}</div>
                                    <div className="text-sm text-gray-400">{stat.label}</div>
                                </div>
                            ))}
                        </motion.div>

                        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 pt-6">
                            <button onClick={handleStartInterview} className="group relative px-8 py-4 bg-white text-black text-lg font-bold rounded-xl overflow-hidden transform hover:scale-105 transition-transform duration-300">
                                <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500"/>
                                <span className="relative flex items-center justify-center space-x-2">
                                    <Zap className="w-5 h-5" />
                                    <span>Start Free Interview</span>
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                                </span>
                            </button>
                            {/* <button className="group px-8 py-4 bg-white/10 backdrop-blur-sm text-white text-lg font-semibold rounded-xl border border-white/20 hover:bg-white/20 transition-colors duration-300 flex items-center justify-center space-x-2">
                                <Play className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                                <span>Watch Demo</span>
                            </button> */}
                        </motion.div>

                        <motion.div variants={itemVariants} className="pt-8">
                             <AnimatePresence mode="wait">
                                <motion.div
                                    key={currentTestimonial}
                                    className="bg-white/5 backdrop-blur-md rounded-xl p-5 border border-white/10"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <div className="flex items-start space-x-4">
                                        <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl border border-white/20 flex-shrink-0">
                                            {testimonials[currentTestimonial].name[0]}
                                        </div>
                                        <div>
                                            <p className="text-white font-semibold">"{testimonials[currentTestimonial].quote}"</p>
                                            <p className="text-gray-400 text-sm mt-1">
                                                {testimonials[currentTestimonial].name}, {testimonials[currentTestimonial].role} at {testimonials[currentTestimonial].company}
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </motion.div>

                    </motion.div>

                    {/* Right Visual */}
                    <motion.div 
                        className="hidden lg:block h-[500px]"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                    >
                       <InteractiveCard mousePosition={mousePosition} />
                    </motion.div>
                </div>
            </div>
        </section>
    );
}