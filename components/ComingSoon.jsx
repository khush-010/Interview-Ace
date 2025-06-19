"use client";

import { Mic, Lightbulb, Bot } from "lucide-react";
import { motion } from "framer-motion";

export default function ComingSoonSection() {
  const features = [
    {
      icon: Mic,
      title: "Voice-Based Interaction",
      description: "Engage in a natural, conversational interview. The AI will ask questions and understand your spoken answers in real-time, just like a human interviewer.",
      status: "In Development"
    },
    {
      icon: Lightbulb,
      title: "Personalized Improvement Plan",
      description: "Receive a detailed report after your interview identifying your strengths and, more importantly, a tailored plan for areas of improvement with specific, actionable suggestions.",
      status: "In Development"
    }
  ];

  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
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
    <section className="relative bg-black py-20 sm:py-24 lg:py-32">
       {/* Background Glow */}
       <div className="absolute inset-x-0 top-0 flex justify-center">
        <div className="h-[30rem] w-[30rem] bg-gradient-radial from-purple-600/15 to-transparent blur-3xl" />
       </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
            className="text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.7 } }
            }}
        >
          <h2 className="text-sm font-semibold uppercase tracking-wider text-purple-400">
            On the Horizon
          </h2>
          <p className="mt-2 text-4xl sm:text-5xl font-bold tracking-tight text-white">
            Exciting New Features Coming Soon
          </p>
          <p className="mt-6 max-w-2xl mx-auto text-lg text-gray-300">
            We're constantly innovating to provide the best interview preparation experience. Here's a sneak peek at what we're building next.
          </p>
        </motion.div>

        <motion.div 
            className="mt-16 grid gap-8 md:grid-cols-2 lg:gap-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={sectionVariants}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="group relative p-8 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden"
              variants={cardVariants}
            >
              {/* Hover Glow Effect */}
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div className="relative z-10">
                <div className="flex items-center justify-between">
                  <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="px-3 py-1 text-xs font-medium text-purple-200 bg-purple-500/20 rounded-full border border-purple-500/30">
                    {feature.status}
                  </div>
                </div>

                <h3 className="mt-6 text-2xl font-bold text-white">
                  {feature.title}
                </h3>
                <p className="mt-4 text-gray-300">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
