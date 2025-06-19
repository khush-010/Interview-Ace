import React from 'react';
import { X, Trophy, Star, Target, TrendingUp } from "lucide-react";

export default function ScoreSummaryModal({ isOpen = true, scores = [], onClose = () => console.log('Close clicked') }) {
  if (!isOpen) return null;

  const totalScore = scores.reduce((sum, item) => sum + item.score, 0);
  const averageScore = scores.length > 0 ? (totalScore / scores.length).toFixed(1) : "0";
  const maxScore = Math.max(...scores.map((item) => item.score), 0);

  const getScoreColor = (score) => {
    if (score >= 8) return "text-green-400 bg-green-400/20";
    if (score >= 6) return "text-yellow-400 bg-yellow-400/20";
    if (score >= 4) return "text-orange-400 bg-orange-400/20";
    return "text-red-400 bg-red-400/20";
  };

  const getScoreIcon = (score) => {
    if (score >= 8) return <Trophy className="h-5 w-5" />;
    if (score >= 6) return <Star className="h-5 w-5" />;
    if (score >= 4) return <Target className="h-5 w-5" />;
    return <TrendingUp className="h-5 w-5" />;
  };

  const getPerformanceMessage = (avg) => {
    if (avg >= 8) return { message: "Outstanding Performance! 🎉", color: "text-green-400" };
    if (avg >= 6) return { message: "Great Job! Keep it up! 👏", color: "text-yellow-400" };
    if (avg >= 4) return { message: "Good effort! Room for improvement 💪", color: "text-orange-400" };
    return { message: "Keep practicing! You'll get better 📚", color: "text-red-400" };
  };

  const performance = getPerformanceMessage(Number.parseFloat(averageScore));

  // Sample data for demonstration if no scores provided
  const sampleScores = [
    { question: { question: "Tell me about yourself", type: "Behavioral" }, score: 8 },
    { question: { question: "What are your strengths?", type: "General" }, score: 7 },
    { question: { question: "Describe a challenging project", type: "Technical" }, score: 6 },
    { question: { question: "Where do you see yourself in 5 years?", type: "Career" }, score: 9 }
  ];

  const displayScores = scores.length > 0 ? scores : sampleScores;
  const displayTotalScore = displayScores.reduce((sum, item) => sum + item.score, 0);
  const displayAverageScore = displayScores.length > 0 ? (displayTotalScore / displayScores.length).toFixed(1) : "0";
  const displayMaxScore = Math.max(...displayScores.map((item) => item.score), 0);
  const displayPerformance = getPerformanceMessage(Number.parseFloat(displayAverageScore));

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
      <div className="bg-slate-900 rounded-2xl shadow-2xl w-full max-w-4xl border border-slate-700 max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="border-b border-slate-700 p-6 bg-gradient-to-r from-purple-900 to-blue-900">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-3xl font-bold text-white flex items-center gap-3">
                <Trophy className="h-8 w-8 text-yellow-400" />
                Interview Results
              </h2>
              <p className="text-gray-300 mt-2">Your performance summary</p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors p-2 rounded-full hover:bg-white hover:bg-opacity-10 group bg-slate-800 border border-slate-600"
            >
              <X className="h-6 w-6 group-hover:rotate-90 transition-transform duration-200" />
            </button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="p-6 border-b border-slate-700 bg-slate-800">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-slate-700 rounded-lg p-4 text-center border border-slate-600">
              <div className="text-2xl font-bold text-blue-400">{displayScores.length}</div>
              <div className="text-sm text-gray-300">Questions</div>
            </div>
            <div className="bg-slate-700 rounded-lg p-4 text-center border border-slate-600">
              <div className="text-2xl font-bold text-green-400">{displayAverageScore}</div>
              <div className="text-sm text-gray-300">Average Score</div>
            </div>
            <div className="bg-slate-700 rounded-lg p-4 text-center border border-slate-600">
              <div className="text-2xl font-bold text-yellow-400">{displayMaxScore}</div>
              <div className="text-sm text-gray-300">Best Score</div>
            </div>
            <div className="bg-slate-700 rounded-lg p-4 text-center border border-slate-600">
              <div className="text-2xl font-bold text-purple-400">{displayTotalScore}</div>
              <div className="text-sm text-gray-300">Total Points</div>
            </div>
          </div>

          <div className="mt-6 text-center">
            <p className={`text-lg font-semibold ${displayPerformance.color}`}>{displayPerformance.message}</p>
          </div>
        </div>

        {/* Scores List */}
        <div className="p-6 overflow-y-auto max-h-[50vh]">
          <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <Target className="h-5 w-5" />
            Detailed Results
          </h3>

          {displayScores.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-gray-400 text-lg">No scores recorded yet.</div>
            </div>
          ) : (
            <div className="space-y-4">
              {displayScores.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-slate-800 border border-slate-600 rounded-xl p-5 hover:bg-slate-700 transition-all duration-300"
                >
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="bg-purple-600 bg-opacity-30 text-purple-200 px-3 py-1 rounded-full text-xs font-medium border border-purple-500">
                          {item.question.type}
                        </span>
                        <span className="text-gray-400 text-sm">Question {idx + 1}</span>
                      </div>
                      <p className="text-white font-medium mb-2 leading-relaxed">{item.question.question}</p>
                    </div>

                    <div
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg ${getScoreColor(item.score)} font-bold text-lg min-w-[90px] justify-center border border-current border-opacity-30`}
                    >
                      {getScoreIcon(item.score)}
                      {item.score}/10
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className="mt-4">
                    <div className="w-full bg-gray-700 rounded-full h-2 border border-gray-600">
                      <div
                        className={`h-2 rounded-full transition-all duration-1000 ${
                          item.score >= 8
                            ? "bg-green-400"
                            : item.score >= 6
                              ? "bg-yellow-400"
                              : item.score >= 4
                                ? "bg-orange-400"
                                : "bg-red-400"
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
        <div className="border-t border-slate-700 p-6 bg-slate-800">
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
            <div className="text-gray-300 text-sm">
              Interview completed on {new Date().toLocaleDateString()}
            </div>
            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold rounded-lg shadow-lg transition-all duration-200 transform hover:scale-105 active:scale-95 border border-purple-500 min-w-[120px]"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}