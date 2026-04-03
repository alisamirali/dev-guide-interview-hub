import Footer from "@/components/Footer";
import { useTheme } from "@/context/ThemeContext";
import { ArrowUp, Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import QuizCard from "../components/QuizCard";
import { quizzes } from "../data/quizData";
import { Technology, quizCategories } from "../data/quizTypes";

const ACCENT_COLORS = [
  "bg-[#fef08a]", // pastel yellow
  "bg-[#fbcfe8]", // pastel pink
  "bg-[#e9d5ff]", // lavender
  "bg-[#bbf7d0]", // mint
];

const TECH_LABEL_BG: Record<string, string> = {
  html: "bg-orange-200",
  css: "bg-blue-200",
  javascript: "bg-yellow-200",
  typescript: "bg-blue-200",
  tailwindcss: "bg-sky-200",
  sass: "bg-pink-200",
  bootstrap: "bg-violet-200",
  react: "bg-cyan-200",
  angular: "bg-red-200",
  vue: "bg-emerald-200",
  nodejs: "bg-green-200",
  express: "bg-gray-200",
  nestjs: "bg-rose-200",
  git: "bg-orange-300",
};

export default function Index() {
  const { theme, toggleTheme } = useTheme();
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 800);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    const start = window.scrollY;
    const duration = 600;
    const startTime = performance.now();

    const ease = (t: number) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t);

    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      window.scrollTo(0, start * (1 - ease(progress)));
      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  };

  const scrollTo = (id: string) => {
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* ── Header ── */}
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

      <main className="flex-1">
        {/* ── Hero ── */}
        <section className="border-b-2 border-black dark:border-white/60 bg-[#fef9ee] dark:bg-[#111]">
          <div className="container mx-auto px-6 py-20 lg:py-28">
            <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
              {/* Left: text */}
              <div className="flex-1 min-w-0">
                {/* Sticker badge */}
                <div className="inline-flex items-center gap-2 mb-8 px-4 py-1.5 bg-[#fef08a] border-2 border-black rounded-full text-sm font-bold text-black">
                  ✦ Free to use · No signup required
                </div>

                <h1 className="text-5xl md:text-7xl font-black leading-[0.95] tracking-tighter text-foreground mb-8">
                  Ace your
                  <br />
                  <span className="inline-block bg-[#fef08a] dark:bg-yellow-400 text-black px-3 border-2 border-black dark:border-yellow-400 rotate-[-1deg]">
                    dev interview.
                  </span>
                </h1>

                <p className="text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed mb-10 font-medium">
                  Interactive exams across 14 technologies. Test your skills,
                  track your progress, and level up your career — one question
                  at a time.
                </p>

                <div className="flex flex-wrap gap-4">
                  <button
                    onClick={() => scrollTo("topics-nav")}
                    className="neo-btn text-base px-7 py-3"
                  >
                    Browse Topics
                  </button>
                </div>

                {/* Stats row */}
                <div className="flex flex-wrap gap-6 mt-8 pt-4 border-t-2 border-black dark:border-white/40 md:w-fit w-full">
                  {[
                    {
                      value: `${quizzes.length}+`,
                      label: "Practice Questions",
                    },
                    {
                      value: `${Object.keys(quizCategories).length}`,
                      label: "Technologies",
                    },
                    { value: "3", label: "Difficulty Levels" },
                  ].map((stat) => (
                    <div key={stat.label} className="flex items-baseline gap-2">
                      <span className="text-3xl font-black text-foreground">
                        {stat.value}
                      </span>
                      <span className="text-sm font-medium text-muted-foreground">
                        {stat.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: mock quiz card illustration */}
              <div className="flex-1 w-full">
                <div
                  className="bg-white dark:bg-[#1a1a1a] border-2 border-black dark:border-white/70 rounded-lg overflow-hidden"
                  style={{ boxShadow: "8px 8px 0 #000" }}
                >
                  {/* Window bar */}
                  <div className="flex items-center gap-2 px-4 py-3 border-b-2 border-black dark:border-white/40 bg-[#fef08a]">
                    <span className="w-3 h-3 rounded-full bg-black opacity-30" />
                    <span className="w-3 h-3 rounded-full bg-black opacity-30" />
                    <span className="w-3 h-3 rounded-full bg-black opacity-30" />
                    <span className="ml-3 text-xs font-black text-black uppercase tracking-widest">
                      JavaScript · Intermediate
                    </span>
                  </div>

                  {/* Progress bar + counter — top, matching actual quiz */}
                  <div className="px-5 pt-4 pb-2">
                    <div className="flex justify-between text-xs font-bold text-foreground mb-2">
                      <span>Question 4 / 30</span>
                      <span>4 answered</span>
                    </div>
                    <div className="h-2 border-2 border-black dark:border-white/40 bg-white dark:bg-[#111] overflow-hidden">
                      <div className="h-full bg-black dark:bg-yellow-400 w-[40%]" />
                    </div>
                  </div>

                  {/* Question + options */}
                  <div className="px-5 pt-3 pb-5">
                    <p className="font-black text-base text-foreground mb-4 leading-snug">
                      What does the{" "}
                      <code className="bg-[#fef08a] dark:bg-yellow-900/40 px-1 rounded text-sm">
                        typeof
                      </code>{" "}
                      operator return for{" "}
                      <code className="bg-[#fef08a] dark:bg-yellow-900/40 px-1 rounded text-sm">
                        null
                      </code>
                      ?
                    </p>

                    <div className="space-y-2.5">
                      {[
                        { label: "A", text: '"null"', selected: false },
                        { label: "B", text: '"object"', selected: true },
                        { label: "C", text: '"undefined"', selected: false },
                        { label: "D", text: '"boolean"', selected: false },
                      ].map((opt) => (
                        <div
                          key={opt.label}
                          className={`flex items-center gap-3 px-4 py-2.5 border-2 rounded-md text-sm font-bold ${
                            opt.selected
                              ? "bg-[#fef08a] border-black text-black"
                              : "bg-white dark:bg-[#111] border-black dark:border-white/40 text-foreground"
                          }`}
                        >
                          <span
                            className={`w-5 h-5 flex-shrink-0 rounded-full border-2 border-black dark:border-white/60 flex items-center justify-center text-xs font-black ${opt.selected ? "bg-black text-white" : ""}`}
                          >
                            {opt.selected ? "✓" : opt.label}
                          </span>
                          <code>{opt.text}</code>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Tech nav pills ── */}
        <section
          className="border-b-2 border-black dark:border-white/60 bg-background overflow-x-auto scroll-mt-14"
          id="topics-nav"
        >
          <div className="container mx-auto px-6 py-4 flex gap-2 flex-nowrap">
            {(Object.keys(quizCategories) as Technology[]).map((tech, i) => (
              <button
                key={tech}
                onClick={() => scrollTo(`${tech}-exams`)}
                className={`flex-shrink-0 px-4 py-1.5 text-sm font-bold border-2 border-black dark:border-white/60 rounded-full transition-all duration-100 hover:-translate-y-0.5 text-black dark:text-white ${
                  TECH_LABEL_BG[tech] ?? "bg-[#fef08a]"
                } dark:bg-opacity-20`}
              >
                {quizCategories[tech].title}
              </button>
            ))}
          </div>
        </section>

        {/* ── Quiz sections ── */}
        <section className="container mx-auto px-6 py-16">
          <div className="space-y-16">
            {(Object.keys(quizCategories) as Technology[]).map(
              (technology, sectionIdx) => (
                <div
                  key={technology}
                  id={`${technology}-exams`}
                  className="scroll-mt-24"
                >
                  {/* Section header */}
                  <div className="flex items-center gap-4 mb-8">
                    <span
                      className={`px-3 py-1 text-xs font-black uppercase tracking-widest border-2 border-black dark:border-white/60 rounded ${
                        TECH_LABEL_BG[technology] ?? "bg-[#fef08a]"
                      } text-black`}
                    >
                      {quizCategories[technology].title}
                    </span>
                    <div className="flex-1 h-0.5 bg-black dark:bg-white/30" />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {quizzes
                      .filter((quiz) => quiz.technology === technology)
                      .map((quiz, cardIdx) => (
                        <QuizCard
                          key={quiz.id}
                          quiz={quiz}
                          accentColor={
                            ACCENT_COLORS[
                              (sectionIdx + cardIdx) % ACCENT_COLORS.length
                            ]
                          }
                        />
                      ))}
                  </div>
                </div>
              ),
            )}
          </div>
        </section>
      </main>

      <Footer />

      {/* Floating back-to-top */}
      <button
        onClick={scrollToTop}
        aria-label="Back to top"
        className={`fixed bottom-6 right-6 z-50 neo-btn !p-3 transition-all duration-200 ${
          showTop
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        <ArrowUp className="size-4" />
      </button>
    </div>
  );
}
