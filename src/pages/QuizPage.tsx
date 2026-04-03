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

  if (!quizId || !quizStarted) return <Navigate to="/" />;

  if (!currentQuiz) {
    const selectedQuiz = quizzes.find((q) => q.id === quizId);
    if (!selectedQuiz) return <Navigate to="/" />;
  }

  if (!currentQuiz) return <Navigate to="/" />;

  const Header = () => (
    <header className="sticky top-0 z-50 w-full bg-background border-b-2 border-black dark:border-white/60">
      <div className="container mx-auto px-6 h-14 flex items-center justify-between">
        <span className="font-black text-lg tracking-tight text-foreground">
          DevGuide
        </span>
        <button
          onClick={toggleTheme}
          aria-label="Toggle theme"
          className="neo-btn px-3 py-1.5 text-xs"
        >
          {theme === "dark" ? (
            <Sun className="h-4 w-4" />
          ) : (
            <Moon className="h-4 w-4" />
          )}
          {theme === "dark" ? "Light" : "Dark"}
        </button>
      </div>
    </header>
  );

  if (quizFinished) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <main className="flex-1 container mx-auto px-6 py-12">
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
    const answeredCount = Object.keys(userAnswers).length;
    if (answeredCount < currentQuiz.questions.length) {
      const ok = window.confirm(
        `You've only answered ${answeredCount} out of ${currentQuiz.questions.length} questions. Finish anyway?`,
      );
      if (!ok) return;
    }
    finishQuiz();
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-6 py-10">
        <div className="max-w-2xl mx-auto">
          <QuizProgress />

          {/* Question card */}
          <div
            className="bg-white dark:bg-[#1a1a1a] border-2 border-black dark:border-white/60 rounded-lg p-6 mb-5"
            style={{ boxShadow: "5px 5px 0 #000" }}
          >
            <QuestionItem question={currentQuestionData} />

            <div className="flex justify-between mt-8 pt-5 border-t-2 border-black dark:border-white/40">
              <button
                onClick={previousQuestion}
                disabled={isFirstQuestion}
                className="neo-btn disabled:opacity-30 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
              >
                <ChevronLeft className="h-4 w-4" /> Previous
              </button>

              {isLastQuestion ? (
                <button onClick={handleFinishQuiz} className="neo-btn-primary">
                  <CheckCircle className="h-4 w-4" /> Finish Exam
                </button>
              ) : (
                <button
                  onClick={nextQuestion}
                  disabled={!isQuestionAnswered}
                  className="neo-btn-primary disabled:opacity-30 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
                >
                  Next <ChevronRight className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>

          {!isLastQuestion && (
            <div className="text-center">
              <button
                onClick={handleFinishQuiz}
                className="text-sm font-medium text-muted-foreground hover:text-foreground underline underline-offset-4 transition-colors"
              >
                Finish and view results
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default QuizPage;
