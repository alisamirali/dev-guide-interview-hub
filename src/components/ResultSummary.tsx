import { CheckCircle, Home, RefreshCw, XCircle } from "lucide-react";
import React from "react";
import { useQuiz } from "../context/QuizContext";

const ResultSummary: React.FC = () => {
  const { currentQuiz, score, userAnswers, restartQuiz, returnToHome } =
    useQuiz();

  if (!currentQuiz) return null;

  const totalQuestions = currentQuiz.questions.length;
  const percentage = Math.round((score / totalQuestions) * 100);

  const getScoreBg = () => {
    if (percentage >= 80) return "bg-[#bbf7d0]";
    if (percentage >= 60) return "bg-[#ff90e8]";
    return "bg-[#fbcfe8]";
  };

  const getGrade = () => {
    if (percentage >= 90) return "Excellent";
    if (percentage >= 80) return "Very Good";
    if (percentage >= 70) return "Good";
    if (percentage >= 60) return "Satisfactory";
    if (percentage >= 50) return "Pass";
    return "Needs Improvement";
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Score card */}
      <div
        className={`${getScoreBg()} border-2 border-black rounded-lg p-8 mb-8 text-center`}
        style={{ boxShadow: "5px 5px 0 #000" }}
      >
        <p className="text-xs font-black uppercase tracking-widest text-black mb-2">
          Your Score
        </p>
        <div className="text-7xl font-black text-black mb-2">{percentage}%</div>
        <div className="text-lg font-bold text-black mb-1">
          {score} / {totalQuestions} correct
        </div>
        <div className="inline-block px-3 py-1 bg-black text-white text-sm font-black rounded mt-2">
          {getGrade()}
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-4 justify-center flex-wrap mb-10">
        <button onClick={restartQuiz} className="neo-btn">
          <RefreshCw className="h-4 w-4" /> Retake Exam
        </button>
        <button onClick={returnToHome} className="neo-btn-primary">
          <Home className="h-4 w-4" /> Back to Questions
        </button>
      </div>

      {/* Review */}
      <div className="results-container">
        <h3 className="text-lg font-black mb-5 text-foreground uppercase tracking-wide">
          Question Review
        </h3>

        <div className="space-y-5">
          {currentQuiz.questions.map((question) => {
            const userAnswer = userAnswers[question.id];
            const isCorrect = userAnswer === question.correctAnswer;

            return (
              <div
                key={question.id}
                className="border-b-2 border-black dark:border-white/20 pb-5 last:border-0 last:pb-0"
              >
                <div className="flex items-start gap-3">
                  {isCorrect ? (
                    <CheckCircle className="h-5 w-5 text-black dark:text-green-400 mt-0.5 flex-shrink-0" />
                  ) : (
                    <XCircle className="h-5 w-5 text-black dark:text-red-400 mt-0.5 flex-shrink-0" />
                  )}
                  <div>
                    <p className="font-bold text-sm mb-2 text-foreground">
                      {question.question}
                    </p>

                    {!isCorrect && (
                      <div className="space-y-1">
                        <div className="text-xs font-medium px-2 py-1 bg-[#fecaca] dark:bg-[#7f1d1d] border border-black dark:border-red-400 rounded text-black dark:text-red-200 inline-block">
                          ✗ Your answer: {question.options[userAnswer]}
                        </div>
                        <div className="text-xs font-medium px-2 py-1 bg-[#bbf7d0] dark:bg-[#14532d] border border-black dark:border-green-400 rounded text-black dark:text-green-200 inline-block">
                          ✓ Correct: {question.options[question.correctAnswer]}
                        </div>
                      </div>
                    )}

                    {isCorrect && (
                      <div className="text-xs font-medium px-2 py-1 bg-[#bbf7d0] dark:bg-[#14532d] border border-black dark:border-green-400 rounded text-black dark:text-green-200 inline-block">
                        ✓ {question.options[question.correctAnswer]}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ResultSummary;
