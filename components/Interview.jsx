"use client"

import { useState } from "react"
import { Loader2 } from "lucide-react"
import InterviewModal from "./InterviewModal"
import QuestionModal from "./QuestionModal"
import ScoreSummaryModal from "./ScoreSummaryModal"
import sampleParsedResume from "@/public/parsedResume.json"
import { uploadDatatoAi } from "@/GeminiAIModal"


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
    <div className="min-h-screen w-full relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black animate-gradient-slow z-0" />

      <div className="absolute inset-0 z-10 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 bg-blue-500 rounded-full filter blur-3xl animate-blob" />
          <div className="absolute top-40 right-10 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl animate-blob animation-delay-2000" />
          <div className="absolute bottom-10 left-1/3 w-80 h-80 bg-indigo-500 rounded-full filter blur-3xl animate-blob animation-delay-4000" />
        </div>
      </div>

      <div className="relative z-20 flex flex-col items-center justify-center min-h-screen px-4 py-12">
        <div className="w-full max-w-4xl mx-auto text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">AI-Powered Interview</h1>
          <p className="text-lg md:text-xl text-white/80">
            Experience a personalized interview tailored to your skills and experience
          </p>
        </div>

        <div className="w-full max-w-4xl mx-auto bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20">
          <div className="flex flex-col items-center justify-center space-y-6 py-8">
            <div className="w-24 h-24 rounded-full bg-white/20 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-12 h-12 text-white"
              >
                <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path>
                <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                <line x1="12" x2="12" y1="19" y2="22"></line>
              </svg>
            </div>
            <h2 className="text-2xl font-semibold text-white">Ready for your interview?</h2>
            <p className="text-white/80 text-center max-w-md">
              Our AI will analyze your resume and create personalized questions to help you prepare for your next job
              interview.
            </p>
            {!questionModal && !showModal && !showScoreSummary && (
              <button
                onClick={() => setShowModal(true)}
                className="px-8 py-3 bg-white text-purple-900 font-medium rounded-xl hover:bg-opacity-90 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white/50"
              >
                Start Interview
              </button>
            )}
          </div>
        </div>
      </div>

      <InterviewModal isOpen={showModal} onClose={() => setShowModal(false)} onSubmit={handleInterviewData} />

      {isResumeParsing && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-md">
          <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl shadow-2xl flex flex-col items-center space-y-4 border border-white/20">
            <Loader2 className="w-10 h-10 text-white animate-spin" />
            <p className="text-white text-lg font-medium">Parsing your resume...</p>
            <p className="text-gray-400 text-sm">This may take a moment.</p>
          </div>
        </div>
      )}

      {questionsFetched && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-md">
          <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl shadow-2xl flex flex-col items-center space-y-4 border border-white/20">
            <Loader2 className="w-10 h-10 text-white animate-spin" />
            <p className="text-white text-lg font-medium">Creating Questions...</p>
            <p className="text-gray-400 text-sm">This may take a moment.</p>
          </div>
        </div>
      )}

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
