import { getButtonVariant, getIcon } from "@/lib/quizCardUtils";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useQuiz } from "../context/QuizContext";
import { Quiz } from "../data/quizData";
import { difficultyLevels, quizCategories } from "../data/quizTypes";

const DIFFICULTY_STYLES: Record<string, string> = {
  beginner: "bg-[#bbf7d0] text-black border-black",
  intermediate: "bg-[#ff90e8] text-black border-black",
  advanced: "bg-[#fbcfe8] text-black border-black",
};

const DIFFICULTY_ICON_BG: Record<string, string> = {
  beginner: "bg-[#bbf7d0]",
  intermediate: "bg-[#ff90e8]",
  advanced: "bg-[#fbcfe8]",
};

type QuizCardProps = {
  quiz: Quiz;
  accentColor?: string;
};

const QuizCard: React.FC<QuizCardProps> = ({
  quiz,
  accentColor = "bg-[#fef08a]",
}) => {
  const navigate = useNavigate();
  const { setCurrentQuiz, startQuiz } = useQuiz();

  const handleStartQuiz = () => {
    setCurrentQuiz(quiz);
    startQuiz();
    navigate(`/quiz/${quiz.id}`);
  };

  return (
    <div className="quiz-card flex flex-col" onClick={handleStartQuiz}>
      {/* Top row: icon + difficulty badge */}
      <div className="flex items-start justify-between mb-4">
        <div
          className={`${DIFFICULTY_ICON_BG[quiz.difficulty] ?? "bg-[#fef08a]"} border-2 border-black rounded-md p-2 text-black`}
        >
          {getIcon(quiz.technology)}
        </div>
        <span
          className={`text-xs font-black uppercase tracking-wider px-2.5 py-1 border-2 rounded ${
            DIFFICULTY_STYLES[quiz.difficulty] ??
            "bg-white border-black text-black"
          }`}
        >
          {difficultyLevels[quiz.difficulty].title}
        </span>
      </div>

      {/* Title + description */}
      <div className="mb-4 flex-1">
        <h3 className="text-lg font-black leading-tight mb-1 text-foreground">
          {quizCategories[quiz.technology].title}
        </h3>
        <p className="text-sm text-muted-foreground leading-snug">
          {quizCategories[quiz.technology].description}
        </p>
      </div>

      {/* Metadata row */}
      <div className="flex items-center gap-4 text-xs font-bold text-muted-foreground border-t-2 border-black dark:border-white/40 pt-3 mb-4">
        <span>{quiz.questions.length} questions</span>
      </div>

      {/* CTA */}
      <button
        className={`w-full justify-center inline-flex items-center font-bold text-sm rounded-md px-5 py-2.5 transition-all duration-100 ${getButtonVariant(quiz.technology)}`}
        style={{ boxShadow: "3px 3px 0 #000" }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.transform =
            "translate(-1px,-1px)";
          (e.currentTarget as HTMLElement).style.boxShadow = "5px 5px 0 #000";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.transform = "";
          (e.currentTarget as HTMLElement).style.boxShadow = "3px 3px 0 #000";
        }}
      >
        Start Exam →
      </button>
    </div>
  );
};

export default QuizCard;
