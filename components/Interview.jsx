"use client"

import { useState } from "react"
import { Loader2 } from "lucide-react"
import InterviewModal from "./InterviewModal"
import QuestionModal from "./QuestionModal"
import ScoreSummaryModal from "./ScoreSummaryModal"
import sampleParsedResume from "@/public/parsedResume.json"
import { uploadDatatoAi } from "@/GeminiAIModal"
import {motion, AnimatePresence } from "framer-motion"
import { Bot, Zap } from "lucide-react"

export default function Interview() {
  const [showModal, setShowModal] = useState(false)
  const [isResumeParsing, setIsResumeParsing] = useState(false)
  const [questionsFetched, setQuestionsFetched] = useState(false)
  const [questionModal, setQuestionModal] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [questions, setQuestions] = useState([])
  const [interviewScores, setInterviewScores] = useState([])

  const [showScoreSummary, setShowScoreSummary] = useState(false)

  const uploadResume = async (pdfFile) => {
    if (!pdfFile) {
      console.warn("No PDF file provided for upload.")
      return null
    }

    const url = "https://resume-parsing-api2.p.rapidapi.com/processDocument"
    const RAPIDAPI_KEY = process.env.NEXT_PUBLIC_RESUME_PARSER_API_KEY

    return new Promise((resolve, reject) => {
      const reader = new FileReader()

      reader.onload = async (event) => {
        const base64Pdf = event.target?.result?.toString().split(",")[1]

        const requestBody = {
          extractionDetails: {
            name: "Resume - Extraction",
            language: "English",
            fields: [
              {
                key: "personal_info",
                description: "personal information of the person",
                type: "object",
                properties: [
                  {
                    key: "name",
                    description: "name of the person",
                    type: "string",
                  },
                  {
                    key: "email",
                    description: "email of the person",
                    type: "string",
                  },
                ],
              },
              {
                key: "skills",
                description: "skills of the person",
                type: "array",
                items: {
                  type: "string",
                },
              },
            ],
          },
          file: base64Pdf,
        }

        try {
          const response = await fetch(url, {
            method: "POST",
            headers: {
              "x-rapidapi-key": RAPIDAPI_KEY || "",
              "x-rapidapi-host": "resume-parsing-api2.p.rapidapi.com",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody),
          })

          if (!response.ok) {
            let errorData
            try {
              errorData = await response.json()
            } catch (e) {
              errorData = { message: `Could not parse error response body: ${response.statusText}` }
            }
            throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorData.message || "Unknown error"}`)
          }

          const result = await response.json()
          resolve(result)
        } catch (error) {
          console.error("Error uploading resume:", error)
          reject(error)
        }
      }

      reader.onerror = (error) => {
        console.error("FileReader error:", error)
        reject(error)
      }

      reader.readAsDataURL(pdfFile)
    })
  }

  const handleInterviewData = async (data) => {
    const resumeFile = data.resume
    let parsedResume = null

    if (resumeFile) {
      setIsResumeParsing(true)
      try {
        // In production, use the actual API call
        parsedResume = await uploadResume(resumeFile)
        // parsedResume = sampleParsedResume
        // await new Promise((resolve) => setTimeout(resolve, 1000))

      } catch (error) {
        console.error("Error parsing resume:", error)
      } finally {
        setIsResumeParsing(false)
      }

      setQuestionsFetched(true)
      const experienceLevel = data.experience
      const jobRole = data.position
      let result = null

      try {
        result = await uploadDatatoAi(parsedResume, experienceLevel, jobRole)
        console.log("AI Generated Questions:", result)
      } catch (err) {
        console.error("AI Generation Error:", err)
      } finally {
        setQuestionsFetched(false)
        setShowModal(false)
      }

      if (result && result.questions) {
        setQuestions(result.questions)
        setCurrentIndex(0)
        setQuestionModal(true)
        // Reset scores for new interview
        setInterviewScores([])
        setShowScoreSummary(false)
      }
    }
  }

  // New clean score handling logic
  const handleNextQuestion = (questionData, score) => {

    // Store the complete question object with its score
    const newScoreItem = {
      question: questionData,
      score: score,
    }

    // Update scores array
    setInterviewScores((prevScores) => [...prevScores, newScoreItem])

    // Move to next question or show summary
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1)
    } else {
      // All questions completed - show summary
      setQuestionModal(false)
      setShowScoreSummary(true)
    }
  }

  const handleCloseInterview = () => {
    setQuestionModal(false)
    setShowModal(true)
    // Reset state
    setInterviewScores([])
    setShowScoreSummary(false)
    setCurrentIndex(0)
    setQuestions([])
  }

  const handleCloseScoreSummary = () => {
    setShowScoreSummary(false)
    // Reset everything for a fresh start
    setCurrentIndex(0)
    setQuestions([])
    setInterviewScores([])
    setShowModal(false)
  }

  return (
    <div className="min-h-screen w-full bg-black text-white relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-600/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }}></div>
      </div>

      <div className="relative z-20 flex flex-col items-center justify-center min-h-screen px-4 py-12 text-center">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tighter">
            AI Interview Coach
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
            Let's get you ready for your next big opportunity. Upload your resume to begin a personalized interview session.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          className="w-full max-w-2xl mt-12 bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-2xl"
        >
          <div className="flex flex-col items-center justify-center space-y-6">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center shadow-lg">
              <Bot className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-white">Your Personalized Interview Awaits</h2>
            <p className="text-gray-300 text-center max-w-md">
              Our AI will analyze your resume and craft questions tailored specifically to your skills and experience.
            </p>
            {!questionModal && !showModal && !showScoreSummary && (
              <button
                onClick={() => setShowModal(true)}
                className="group relative mt-4 px-6 py-3 bg-white text-black text-lg font-bold rounded-xl shadow-lg hover:shadow-purple-400/30 transform hover:scale-105 transition-all duration-300 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <span className="relative flex items-center justify-center space-x-2">
                  <Zap className="w-5 h-5" />
                  <span>Start Interview</span>
                </span>
              </button>
            )}
          </div>
        </motion.div>
      </div>

      <InterviewModal isOpen={showModal} onClose={() => setShowModal(false)} onSubmit={handleInterviewData} />

      <AnimatePresence>
        {isResumeParsing && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gray-900/50 backdrop-blur-2xl p-8 rounded-2xl shadow-2xl flex flex-col items-center space-y-4 border border-white/10"
            >
              <Loader2 className="w-10 h-10 text-white animate-spin" />
              <p className="text-white text-lg font-medium">Parsing your resume...</p>
              <p className="text-gray-400 text-sm">This may take a moment.</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {questionsFetched && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gray-900/50 backdrop-blur-2xl p-8 rounded-2xl shadow-2xl flex flex-col items-center space-y-4 border border-white/10"
            >
              <Loader2 className="w-10 h-10 text-white animate-spin" />
              <p className="text-white text-lg font-medium">Creating Questions...</p>
              <p className="text-gray-400 text-sm">Our AI is personalizing your experience.</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {questionModal && questions.length > 0 && (
        <QuestionModal
          question={questions[currentIndex]}
          index={currentIndex}
          total={questions.length}
          onNext={handleNextQuestion}
          onClose={handleCloseInterview}
        />
      )}

      <ScoreSummaryModal isOpen={showScoreSummary} scores={interviewScores} onClose={handleCloseScoreSummary} />
    </div>

  )
}
