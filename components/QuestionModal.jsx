"use client"

import { useState, useRef, useEffect } from "react"
import { Send, X, Clock, Sparkles, MessageSquare } from "lucide-react"
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
          clearInterval(timerRef.current)
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
      onNext(question, score)
      setUserAnswerText("")
    } catch (err) {
      console.error("Submission error:", err)
      alert("Something went wrong during submission.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const getTimerColor = () => {
    if (timeLeft === null) return "text-gray-400"
    if (timeLeft < 60) return "text-red-400"
    if (timeLeft < 120) return "text-yellow-400"
    return "text-green-400"
  }

  const getProgressPercentage = () => {
    if (timeLeft === null) return 0
    return ((maxDuration - timeLeft) / maxDuration) * 100
  }

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-3 sm:p-4 lg:p-6">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-48 h-48 sm:w-72 sm:h-72 bg-purple-600/10 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-1/4 right-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
      </div>

      <div className="relative z-10 bg-black/40 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-2xl w-full max-w-sm sm:max-w-2xl lg:max-w-4xl border border-white/20 overflow-hidden max-h-[95vh] flex flex-col">
        {/* Header */}
        <div className="relative p-4 sm:p-6 lg:p-8 bg-gradient-to-r from-purple-600/20 to-blue-600/20 backdrop-blur-md border-b border-white/10 flex-shrink-0">
          <div className="flex flex-col gap-3 sm:gap-4">
            {/* Top row with badge and close button */}
            <div className="flex justify-between items-start">
              <div className="inline-flex items-center space-x-2 sm:space-x-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm">
                <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-purple-300" />
                <span className="text-gray-200 font-medium">Interview Question</span>
              </div>

              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-all duration-300 p-2 sm:p-3 rounded-full hover:bg-white/10 backdrop-blur-sm border border-white/20 group flex-shrink-0"
              >
                <X className="h-4 w-4 sm:h-6 sm:w-6 group-hover:rotate-90 transition-transform duration-300" />
              </button>
            </div>

            {/* Title */}
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white tracking-tight">
              Question {index + 1}
              <span className="text-base sm:text-lg lg:text-xl text-gray-400 font-normal"> of {total}</span>
            </h2>

            {/* Timer */}
            {timeLeft !== null && (
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-3 py-1.5 sm:px-4 sm:py-2">
                  <Clock className="w-3 h-3 sm:w-4 sm:h-4 text-gray-300" />
                  <span
                    className={`text-xs sm:text-sm font-medium transition-colors duration-300 ${getTimerColor()} ${timeLeft < 60 ? "animate-pulse" : ""}`}
                  >
                    {formatTime(timeLeft)}
                  </span>
                </div>

                {/* Progress Ring - Hidden on very small screens */}
                <div className="relative w-8 h-8 sm:w-12 sm:h-12 hidden xs:block">
                  <svg className="w-8 h-8 sm:w-12 sm:h-12 transform -rotate-90" viewBox="0 0 36 36">
                    <path
                      className="text-white/10"
                      stroke="currentColor"
                      strokeWidth="3"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path
                      className={getTimerColor()}
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeDasharray={`${getProgressPercentage()}, 100`}
                      strokeLinecap="round"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      style={{
                        transition: "stroke-dasharray 0.3s ease-in-out",
                      }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xs font-bold text-white">{Math.ceil((timeLeft || 0) / 60)}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Question Content - Scrollable */}
        <div className="p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6 flex-1 overflow-y-auto">
          <div className="space-y-3 sm:space-y-4">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600/30 to-blue-600/30 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium border border-white/20 backdrop-blur-sm">
              <MessageSquare className="w-3 h-3 sm:w-4 sm:h-4" />
              {question.type}
            </div>

            <div className="bg-white/5 backdrop-blur-lg rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/10">
              <p className="text-base sm:text-lg lg:text-xl font-medium text-white leading-relaxed">
                {question.question}
              </p>
            </div>
          </div>

          {/* Answer Input */}
          <div className="space-y-3 sm:space-y-4">
            <label className="block text-base sm:text-lg font-semibold text-white">Your Answer</label>
            <div className="relative">
              <textarea
                className="w-full h-32 sm:h-40 lg:h-48 p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 focus:outline-none transition-all duration-300 resize-none text-sm sm:text-base lg:text-lg leading-relaxed hover:bg-white/10"
                placeholder="Share your thoughts and experiences here..."
                value={userAnswerText}
                onChange={(e) => setUserAnswerText(e.target.value)}
                disabled={isSubmitting || timeLeft === 0}
              />

              {/* Character count */}
              <div className="absolute bottom-2 right-2 sm:bottom-4 sm:right-4 text-xs sm:text-sm text-gray-400 bg-black/20 backdrop-blur-sm px-2 py-1 sm:px-3 sm:py-1 rounded-full border border-white/10">
                {userAnswerText.length} characters
              </div>
            </div>

            {timeLeft === 0 && (
              <div className="flex items-center gap-2 sm:gap-3 bg-red-500/10 border border-red-500/30 rounded-xl px-3 py-2 sm:px-4 sm:py-3 backdrop-blur-sm">
                <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-red-400 flex-shrink-0" />
                <p className="text-red-400 font-medium text-sm sm:text-base">
                  Time is up! You can no longer edit your answer.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-white/10 p-4 sm:p-6 lg:p-8 bg-white/5 backdrop-blur-md flex-shrink-0">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-between items-stretch sm:items-center">
            <button
              onClick={onClose}
              disabled={isSubmitting}
              className="px-4 py-2.5 sm:px-6 sm:py-3 border border-white/30 rounded-xl text-gray-300 hover:bg-white/10 hover:text-white transition-all duration-300 disabled:opacity-50 font-medium backdrop-blur-sm order-2 sm:order-1 text-sm sm:text-base"
            >
              End Interview
            </button>

            <button
              onClick={handleSubmit}
              disabled={isSubmitting || timeLeft === 0 || !userAnswerText.trim()}
              className="group relative px-6 py-3 sm:px-8 sm:py-4 bg-white text-black text-sm sm:text-base lg:text-lg font-bold rounded-xl overflow-hidden transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 min-w-[140px] sm:min-w-[180px] order-1 sm:order-2"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-400 opacity-0 group-hover:opacity-100 group-disabled:opacity-0 transition-opacity duration-500" />
              <span className="relative flex items-center justify-center space-x-2">
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-gray-600 border-t-transparent rounded-full animate-spin" />
                    <span>Submitting...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span>Submit Answer</span>
                  </>
                )}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
