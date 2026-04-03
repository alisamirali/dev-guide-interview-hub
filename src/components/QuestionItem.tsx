import { CheckCircle, Circle } from "lucide-react";
import React from "react";
import { useQuiz } from "../context/QuizContext";
import { Question } from "../data/quizData";

type QuestionItemProps = {
  question: Question;
};

const QuestionItem: React.FC<QuestionItemProps> = ({ question }) => {
  const { userAnswers, answerQuestion } = useQuiz();
  const selectedAnswer = userAnswers[question.id];

  return (
    <div className="question-enter">
      <h3 className="text-xl font-black leading-snug mb-6 text-foreground">
        {question.question}
      </h3>

      <div className="space-y-3">
        {question.options.map((option, index) => (
          <div
            key={index}
            className={`answer-card cursor-pointer flex items-center gap-3 ${
              selectedAnswer === index ? "selected" : ""
            }`}
            onClick={() => answerQuestion(question.id, index)}
          >
            {selectedAnswer === index ? (
              <CheckCircle className="h-5 w-5 flex-shrink-0 text-black dark:text-[#ff90e8]" />
            ) : (
              <Circle className="h-5 w-5 flex-shrink-0 text-muted-foreground" />
            )}
            <span className="text-sm font-medium text-foreground">
              {option}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestionItem;
