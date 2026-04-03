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

  const handleSelectAnswer = (index: number) => {
    answerQuestion(question.id, index);
  };

  return (
    <div className="question-enter">
      <h3 className="text-xl font-medium mb-6">{question.question}</h3>

      <div className="space-y-3 mb-6">
        {question.options.map((option, index) => (
          <div
            key={index}
            className={`answer-card cursor-pointer flex items-center ${
              selectedAnswer === index ? "selected" : ""
            }`}
            onClick={() => handleSelectAnswer(index)}
          >
            <div className="mr-3">
              {selectedAnswer === index ? (
                <CheckCircle className="h-5 w-5 text-primary" />
              ) : (
                <Circle className="h-5 w-5 text-muted-foreground" />
              )}
            </div>
            <div className="flex-1">{option}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestionItem;
