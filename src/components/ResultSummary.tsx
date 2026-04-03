import { Button } from "@/components/ui/button";
import { CheckCircle, Home, RefreshCw, XCircle } from "lucide-react";
import React from "react";
import { useQuiz } from "../context/QuizContext";

const ResultSummary: React.FC = () => {
  const { currentQuiz, score, userAnswers, restartQuiz, returnToHome } =
    useQuiz();

  if (!currentQuiz) return null;

  const totalQuestions = currentQuiz.questions.length;
  const percentage = Math.round((score / totalQuestions) * 100);

  const getScoreColor = () => {
    if (percentage >= 80) return "text-green-500 dark:text-green-400";
    if (percentage >= 60) return "text-yellow-500 dark:text-yellow-400";
    return "text-red-500 dark:text-red-400";
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
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4">Your Results</h2>
        <div className="text-5xl font-bold mb-3">
          <span className={getScoreColor()}>{percentage}%</span>
        </div>
        <div className="text-xl mb-2">
          <span className="font-medium">{score}</span> out of{" "}
          <span className="font-medium">{totalQuestions}</span> correct
        </div>
        <div className="text-lg font-medium mb-6">
          Grade: <span className={getScoreColor()}>{getGrade()}</span>
        </div>

        <div className="flex gap-4 justify-center flex-wrap">
          <Button
            variant="outline"
            onClick={restartQuiz}
            className="flex items-center gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            Retake Exam
          </Button>
          <Button onClick={returnToHome} className="flex items-center gap-2">
            <Home className="h-4 w-4" />
            Back to Questions
          </Button>
        </div>
      </div>

      <div className="results-container">
        <h3 className="text-xl font-bold mb-4">Question Review</h3>

        <div className="space-y-6">
          {currentQuiz.questions.map((question) => {
            const userAnswer = userAnswers[question.id];
            const isCorrect = userAnswer === question.correctAnswer;

            return (
              <div key={question.id} className="border-b pb-4 last:border-0">
                <div className="flex items-start gap-2">
                  {isCorrect ? (
                    <CheckCircle className="h-5 w-5 text-green-500 dark:text-green-400 mt-1 flex-shrink-0" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-500 dark:text-red-400 mt-1 flex-shrink-0" />
                  )}
                  <div>
                    <p className="font-medium mb-2">{question.question}</p>

                    {!isCorrect && (
                      <div className="mb-2">
                        <div className="text-sm text-red-500 dark:text-red-400 mb-1">
                          Your answer: {question.options[userAnswer]}
                        </div>
                        <div className="text-sm text-green-500 dark:text-green-400">
                          Correct answer:{" "}
                          {question.options[question.correctAnswer]}
                        </div>
                      </div>
                    )}

                    {isCorrect && (
                      <div className="text-sm text-green-500 dark:text-green-400 mb-1">
                        Correct: {question.options[question.correctAnswer]}
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
