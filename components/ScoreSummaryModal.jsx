"use client"
import { X, Trophy, Star, Target, TrendingUp, Sparkles, CheckCircle, Zap } from "lucide-react"

export default function ScoreSummaryModal({
  isOpen = true,
  scores = [],
  onClose = () => console.log("Close clicked"),
}) {
  if (!isOpen) return null

  const totalScore = scores.reduce((sum, item) => sum + item.score, 0)
  const averageScore = scores.length > 0 ? (totalScore / scores.length).toFixed(1) : "0"
  const maxScore = Math.max(...scores.map((item) => item.score), 0)

  const getScoreColor = (score) => {
    if (score >= 8) return "text-green-400 bg-green-400/20 border-green-400/30"
    if (score >= 6) return "text-yellow-400 bg-yellow-400/20 border-yellow-400/30"
    if (score >= 4) return "text-orange-400 bg-orange-400/20 border-orange-400/30"
    return "text-red-400 bg-red-400/20 border-red-400/30"
  }

  const getScoreIcon = (score) => {
    if (score >= 8) return <Trophy className="h-4 w-4 sm:h-5 sm:w-5" />
    if (score >= 6) return <Star className="h-4 w-4 sm:h-5 sm:w-5" />
    if (score >= 4) return <Target className="h-4 w-4 sm:h-5 sm:w-5" />
    return <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5" />
  }

  const getPerformanceMessage = (avg) => {
    if (avg >= 8) return { message: "Outstanding Performance! 🎉", color: "text-green-400" }
    if (avg >= 6) return { message: "Great Job! Keep it up! 👏", color: "text-purple-400" }
    if (avg >= 4) return { message: "Good effort! Room for improvement 💪", color: "text-blue-400" }
    return { message: "Keep practicing! You'll get better 📚", color: "text-gray-400" }
  }

  const performance = getPerformanceMessage(Number.parseFloat(averageScore))

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-3 sm:p-4 lg:p-6">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-48 h-48 sm:w-72 sm:h-72 bg-purple-600/10 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-1/4 right-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      <div className="relative z-10 bg-black/40 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-2xl w-full max-w-sm sm:max-w-3xl lg:max-w-5xl border border-white/20 max-h-[95vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="relative p-4 sm:p-6 lg:p-8 bg-gradient-to-r from-purple-600/20 to-blue-600/20 backdrop-blur-md border-b border-white/10 flex-shrink-0">
          {/* Header Background Pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:20px_20px]"></div>

          <div className="relative flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="space-y-2 sm:space-y-3">
              <div className="inline-flex items-center space-x-2 sm:space-x-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm">
                <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-purple-300" />
                <span className="text-gray-200 font-medium">Interview Complete</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight">
                Your Performance
                <span className="block text-lg sm:text-xl lg:text-2xl bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  Summary
                </span>
              </h2>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-all duration-300 p-2 sm:p-3 rounded-full hover:bg-white/10 backdrop-blur-sm border border-white/20 group self-end sm:self-auto"
            >
              <X className="h-5 w-5 sm:h-6 sm:w-6 group-hover:rotate-90 transition-transform duration-300" />
            </button>
          </div>
        </div>

        {/* Scores List - Scrollable */}
        <div className="p-3 sm:p-4 lg:p-6 overflow-y-auto flex-1 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
          {/* Stats Overview - Now scrollable */}
          <div className="mb-6 sm:mb-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 lg:gap-4">
              <div className="bg-white/5 backdrop-blur-lg rounded-xl sm:rounded-2xl p-2 sm:p-3 lg:p-4 text-center border border-white/10 hover:bg-white/10 transition-all duration-300">
                <div className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-1">{scores.length}</div>
                <div className="text-xs text-gray-400">Questions</div>
              </div>
              <div className="bg-white/5 backdrop-blur-lg rounded-xl sm:rounded-2xl p-2 sm:p-3 lg:p-4 text-center border border-white/10 hover:bg-white/10 transition-all duration-300">
                <div className="text-lg sm:text-xl lg:text-2xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent mb-1">
                  {averageScore}
                </div>
                <div className="text-xs text-gray-400">Average Score</div>
              </div>
              <div className="bg-white/5 backdrop-blur-lg rounded-xl sm:rounded-2xl p-2 sm:p-3 lg:p-4 text-center border border-white/10 hover:bg-white/10 transition-all duration-300">
                <div className="text-lg sm:text-xl lg:text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-1">
                  {maxScore}
                </div>
                <div className="text-xs text-gray-400">Best Score</div>
              </div>
              <div className="bg-white/5 backdrop-blur-lg rounded-xl sm:rounded-2xl p-2 sm:p-3 lg:p-4 text-center border border-white/10 hover:bg-white/10 transition-all duration-300 col-span-2 lg:col-span-1">
                <div className="text-lg sm:text-xl lg:text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-1">
                  {totalScore}
                </div>
                <div className="text-xs text-gray-400">Total Points</div>
              </div>
            </div>

            <div className="mt-3 sm:mt-4 text-center">
              <div className="inline-flex items-center space-x-2 sm:space-x-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-3 py-1.5 sm:px-4 sm:py-2">
                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" />
                <p className={`text-xs sm:text-sm lg:text-base font-semibold ${performance.color}`}>
                  {performance.message}
                </p>
              </div>
            </div>
          </div>

          <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-3 sm:mb-4 flex items-center gap-2 sm:gap-3">
            <div className="p-1.5 sm:p-2 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-lg sm:rounded-xl border border-white/20">
              <Target className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-white" />
            </div>
            Detailed Results
          </h3>

          {scores.length === 0 ? (
            <div className="text-center py-8 sm:py-12">
              <div className="text-gray-400 text-base sm:text-lg">No scores recorded yet.</div>
            </div>
          ) : (
            <div className="space-y-3 sm:space-y-4">
              {scores.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-6 hover:bg-white/10 transition-all duration-300 group"
                >
                  <div className="flex flex-col sm:flex-row justify-between items-start gap-4 sm:gap-6">
                    <div className="flex-1 space-y-2 sm:space-y-3 min-w-0">
                      <div className="flex flex-col xs:flex-row xs:items-center gap-2 xs:gap-3">
                        <span className="bg-gradient-to-r from-purple-600/30 to-blue-600/30 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium border border-white/20 backdrop-blur-sm w-fit">
                          {item.question.type}
                        </span>
                        <span className="text-gray-400 text-xs sm:text-sm font-medium">Question {idx + 1}</span>
                      </div>
                      <p className="text-sm sm:text-base lg:text-lg font-medium text-white leading-relaxed break-words">
                        {item.question.question}
                      </p>
                    </div>

                    <div
                      className={`flex items-center gap-2 sm:gap-3 px-4 py-2 sm:px-6 sm:py-3 rounded-lg sm:rounded-xl ${getScoreColor(item.score)} font-bold text-base sm:text-lg lg:text-xl min-w-[100px] sm:min-w-[120px] justify-center backdrop-blur-sm border group-hover:scale-105 transition-transform duration-300 flex-shrink-0`}
                    >
                      {getScoreIcon(item.score)}
                      <span className="text-sm sm:text-base lg:text-xl">{item.score}/10</span>
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className="mt-4 sm:mt-6">
                    <div className="w-full bg-white/10 rounded-full h-2 sm:h-3 border border-white/20 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-1000 ${
                          item.score >= 8
                            ? "bg-gradient-to-r from-green-400 to-emerald-400"
                            : item.score >= 6
                              ? "bg-gradient-to-r from-yellow-400 to-orange-400"
                              : item.score >= 4
                                ? "bg-gradient-to-r from-orange-400 to-red-400"
                                : "bg-gradient-to-r from-red-400 to-pink-400"
                        }`}
                        style={{ width: `${(item.score / 10) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-white/10 p-4 sm:p-6 lg:p-8 bg-white/5 backdrop-blur-md flex-shrink-0">
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-between items-stretch sm:items-center">
            <div className="text-gray-300 text-xs sm:text-sm flex items-center gap-2 order-2 sm:order-1">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse flex-shrink-0"></div>
              <span>Interview completed on {new Date().toLocaleDateString()}</span>
            </div>
            <div className="flex gap-3 sm:gap-4 order-1 sm:order-2">
              <button
                onClick={onClose}
                className="group relative px-6 py-3 sm:px-8 sm:py-4 bg-white text-black text-sm sm:text-base lg:text-lg font-bold rounded-xl overflow-hidden transform hover:scale-105 transition-all duration-300 min-w-[120px] sm:min-w-[140px] flex-1 sm:flex-none"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <span className="relative flex items-center justify-center space-x-2">
                  <Zap className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>Continue</span>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
