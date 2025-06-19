"use client"

import { useState, useRef, useEffect } from "react"
import { Send, X } from "lucide-react"
import { evaluateAnswerWithGemini } from "@/GeminiAIModal"


export default function QuestionModal({ question, index, total, onNext, onClose }) {
  const [userAnswerText, setUserAnswerText] = useState("")
  const [timeLeft, setTimeLeft] = useState(null) 
  const [isSubmitting, setIsSubmitting] = useState(false)
  const timerRef = useRef(null)
  const maxDuration = 300 // 5 minutes in seconds

  useEffect(() => {
    startTimer()
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [question])

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`
  }

  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current)

    setTimeLeft(maxDuration)
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev && prev <= 1) {
          clearInterval(!timerRef.current)
          return 0
        }
        return prev ? prev - 1 : 0
      })
    }, 1000)
  }

  const handleSubmit = async () => {
    if (!userAnswerText.trim()) {
      alert("Please enter an answer.")
      return
    }

    setIsSubmitting(true)
    try {
      const score = await evaluateAnswerWithGemini({ userAnswer: userAnswerText, question })

      // Pass the complete question object and score to parent
      onNext(question, score)
      setUserAnswerText("")
    } catch (err) {
      console.error("Submission error:", err)
      alert("Something went wrong during submission.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-gray-900 to-purple-900 rounded-xl shadow-2xl w-full max-w-2xl border border-white/20 animate-in slide-in-from-bottom-4 duration-300">
        <div className="border-b border-white/10 p-6 flex justify-between items-center bg-gradient-to-r from-gray-900/50 to-purple-800/50">
          <div>
            <h2 className="text-2xl font-bold text-white">
              Question {index + 1} of {total}
            </h2>
            {timeLeft !== null && (
              <p
                className={`mt-2 text-sm font-medium transition-colors duration-300 ${
                  timeLeft < 60 ? "text-red-400 animate-pulse" : "text-gray-300"
                }`}
              >
                Time remaining: {formatTime(timeLeft)}
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors p-2 rounded-full hover:bg-white/10"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="space-y-3">
            <div className="inline-block bg-purple-500/20 text-purple-200 px-3 py-1 rounded-full text-sm font-medium">
              {question.type}
            </div>
            <p className="text-xl font-medium text-white leading-relaxed">{question.question}</p>
          </div>

          <div className="mt-6 space-y-4">
            <textarea
              className="w-full h-40 p-4 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:ring-2 focus:ring-purple-500 focus:outline-none transition-all duration-200 resize-none"
              placeholder="Type your answer here..."
              value={userAnswerText}
              onChange={(e) => setUserAnswerText(e.target.value)}
              disabled={isSubmitting || timeLeft === 0}
            />

            {timeLeft === 0 && (
              <p className="text-sm text-red-400 animate-in fade-in duration-300">
                Time is up! You can no longer edit your answer.
              </p>
            )}
          </div>
        </div>

        <div className="border-t border-white/10 p-6 flex flex-wrap gap-4 justify-between items-center">
          <div className="flex gap-3">
            <button
              onClick={onClose}
              disabled={isSubmitting}
              className="px-4 py-2 border border-white/30 rounded-lg text-gray-300 hover:bg-white/10 transition-colors disabled:opacity-50"
            >
              End Interview
            </button>

            <button
              onClick={handleSubmit}
              disabled={isSubmitting || timeLeft === 0 || !userAnswerText.trim()}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="h-5 w-5" />
                  Submit Answer
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
