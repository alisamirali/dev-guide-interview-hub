import React from "react";
import { useQuiz } from "../context/QuizContext";

const QuizProgress: React.FC = () => {
  const { currentQuiz, currentQuestion, userAnswers } = useQuiz();

  if (!currentQuiz) return null;

  const totalQuestions = currentQuiz.questions.length;
  const answeredQuestions = Object.keys(userAnswers).length;
  const progressPercentage = Math.round(
    (currentQuestion / (totalQuestions - 1)) * 100,
  );

  return (
    <div className="mb-8">
      <div className="flex justify-between mb-2 text-sm font-bold text-foreground">
        <span>
          Question {currentQuestion + 1} / {totalQuestions}
        </span>
        <span>{answeredQuestions} answered</span>
      </div>
      {/* Neobrutalist progress bar */}
      <div className="h-3 w-full border-2 border-black dark:border-white/60 rounded-none bg-white dark:bg-[#1a1a1a] overflow-hidden">
        <div
          className="h-full bg-black dark:bg-[#ff90e8] transition-all duration-300"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
    </div>
  );
};

export default QuizProgress;
