import { Button } from "@/components/ui/button";
import {
  getBadgeVariant,
  getButtonVariant,
  getIcon,
} from "@/lib/quizCardUtils";
import { cn } from "@/lib/utils";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useQuiz } from "../context/QuizContext";
import { Quiz } from "../data/quizData";
import { difficultyLevels, quizCategories } from "../data/quizTypes";

type QuizCardProps = {
  quiz: Quiz;
};

const QuizCard: React.FC<QuizCardProps> = ({ quiz }) => {
  const navigate = useNavigate();
  const { setCurrentQuiz, startQuiz } = useQuiz();

  const renderIcon = () => getIcon(quiz.technology);

  const handleStartQuiz = () => {
    setCurrentQuiz(quiz);
    startQuiz();
    navigate(`/quiz/${quiz.id}`);
  };

  return (
    <div className={`quiz-card ${quiz.id}-card`}>
      <div className="flex items-center justify-between mb-4">
        <div className="bg-primary/10 p-2 rounded-full">{renderIcon()}</div>
      </div>

      <div className="mb-5">
        <h3 className="text-xl font-bold mb-1">
          {quizCategories[quiz.technology].title}
        </h3>
        <p className="text-sm text-muted-foreground">
          {quizCategories[quiz.technology].description}
        </p>
      </div>

      <div className="flex items-center justify-between text-sm font-medium mb-6">
        <div className="flex items-center gap-1">
          <span className="text-muted-foreground">Questions:</span>
          <span>{quiz.questions.length}</span>
        </div>
        <div
          className={cn(
            getBadgeVariant(quiz.technology),
            "rounded-lg px-3 py-1 text-sm font-medium inline-block",
          )}
        >
          {difficultyLevels[quiz.difficulty].title}
        </div>
      </div>

      <Button
        className={cn(getButtonVariant(quiz.technology), "w-full")}
        onClick={handleStartQuiz}
      >
        Start Quiz
      </Button>
    </div>
  );
};

export default QuizCard;
