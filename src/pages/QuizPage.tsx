import { Button } from "@/components/ui/button";
import { useTheme } from "@/context/ThemeContext";
import {
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Moon,
  Sun,
} from "lucide-react";
import React from "react";
import { Navigate, useParams } from "react-router-dom";
import QuestionItem from "../components/QuestionItem";
import QuizProgress from "../components/QuizProgress";
import ResultSummary from "../components/ResultSummary";
import { useQuiz } from "../context/QuizContext";
import { quizzes } from "../data/quizData";

const QuizPage: React.FC = () => {
  const { quizId } = useParams<{ quizId: string }>();
  const { theme, toggleTheme } = useTheme();
  const {
    currentQuiz,
    currentQuestion,
    userAnswers,
    quizStarted,
    quizFinished,
    nextQuestion,
    previousQuestion,
    finishQuiz,
  } = useQuiz();

  // If no quiz has been selected or started, redirect to homepage
  if (!quizId || !quizStarted) {
    return <Navigate to="/" />;
  }

  // Find the quiz if not already set in context
  if (!currentQuiz) {
    const selectedQuiz = quizzes.find((q) => q.id === quizId);
    if (!selectedQuiz) {
      return <Navigate to="/" />;
    }
  }

  if (!currentQuiz) {
    return <Navigate to="/" />;
  }

  if (quizFinished) {
    return (
      <div className="min-h-screen bg-background">
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-sm">
          <div className="container mx-auto px-4 h-14 flex items-center justify-between">
            <span className="font-bold text-foreground">DevGuide</span>
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="p-2 rounded-full hover:bg-muted transition-colors text-foreground"
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </button>
          </div>
        </header>
        <main className="container mx-auto px-4 py-8">
          <ResultSummary />
        </main>
      </div>
    );
  }

  const currentQuestionData = currentQuiz.questions[currentQuestion];
  const isFirstQuestion = currentQuestion === 0;
  const isLastQuestion = currentQuestion === currentQuiz.questions.length - 1;
  const isQuestionAnswered = userAnswers[currentQuestionData.id] !== undefined;

  const handleFinishQuiz = () => {
    // Check if all questions have been answered
    const answeredQuestionsCount = Object.keys(userAnswers).length;
    if (answeredQuestionsCount < currentQuiz.questions.length) {
      const confirm = window.confirm(
        `You've only answered ${answeredQuestionsCount} out of ${currentQuiz.questions.length} questions. Are you sure you want to finish the exam?`,
      );
      if (!confirm) return;
    }

    finishQuiz();
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 h-14 flex items-center justify-between">
          <span className="font-bold text-foreground">DevGuide</span>
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="p-2 rounded-full hover:bg-muted transition-colors text-foreground"
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </button>
        </div>
      </header>
      <main className="flex-1 flex items-center justify-center">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-3xl mx-auto">
            <QuizProgress />

            <div className="bg-card text-card-foreground rounded-xl shadow-md p-6 mb-6">
              <QuestionItem question={currentQuestionData} />

              <div className="flex justify-between mt-8">
                <Button
                  variant="outline"
                  onClick={previousQuestion}
                  disabled={isFirstQuestion}
                  className="flex items-center"
                >
                  <ChevronLeft className="mr-1 h-4 w-4" />
                  Previous
                </Button>

                {isLastQuestion ? (
                  <Button
                    onClick={handleFinishQuiz}
                    className="flex items-center"
                  >
                    <CheckCircle className="mr-1 h-4 w-4" />
                    Finish Exam
                  </Button>
                ) : (
                  <Button
                    onClick={nextQuestion}
                    className="flex items-center"
                    disabled={!isQuestionAnswered}
                  >
                    Next
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>

            {!isLastQuestion && (
              <div className="text-center">
                <Button
                  variant="link"
                  onClick={handleFinishQuiz}
                  className="text-muted-foreground hover:text-foreground"
                >
                  Finish and view results
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default QuizPage;
