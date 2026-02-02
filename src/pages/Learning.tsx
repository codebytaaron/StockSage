import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import {
  BookOpen,
  TrendingUp,
  DollarSign,
  PieChart,
  Shield,
  Calculator,
  ChevronRight,
  CheckCircle,
  XCircle,
  RotateCcw
} from "lucide-react";

interface Lesson {
  id: string;
  icon: React.ElementType;
  title: string;
  description: string;
  content: string[];
  quiz?: {
    question: string;
    options: string[];
    correct: number;
    explanation: string;
  };
}

const lessons: Lesson[] = [
  {
    id: "stocks-vs-etfs",
    icon: PieChart,
    title: "Stocks vs ETFs",
    description: "Understand the difference between individual stocks and exchange-traded funds",
    content: [
      "A stock represents ownership in a single company. When you buy Apple (AAPL) stock, you own a tiny piece of Apple Inc.",
      "An ETF (Exchange-Traded Fund) is a basket of many stocks bundled together. For example, SPY tracks the S&P 500 - owning it means you effectively own a tiny piece of 500 different companies.",
      "Key differences: ETFs offer instant diversification and lower risk, but potentially lower returns. Individual stocks have higher risk but potentially higher rewards if you pick winners.",
      "Many investors use a mix: ETFs for the core of their portfolio (broad market exposure) and individual stocks for companies they believe strongly in."
    ],
    quiz: {
      question: "Which is generally considered less risky for a beginner investor?",
      options: ["Buying a single stock", "Buying an ETF that tracks the S&P 500", "They have the same risk"],
      correct: 1,
      explanation: "An S&P 500 ETF is diversified across 500 companies, so if one company does poorly, it doesn't significantly impact your overall investment. With a single stock, all your eggs are in one basket."
    }
  },
  {
    id: "pe-ratio",
    icon: Calculator,
    title: "Understanding P/E Ratio",
    description: "Learn what Price-to-Earnings ratio tells you about a stock's valuation",
    content: [
      "P/E (Price-to-Earnings) ratio is one of the most common ways to evaluate if a stock is cheap or expensive.",
      "Formula: P/E = Stock Price ÷ Earnings Per Share (EPS). If a stock costs $100 and earns $5 per share, its P/E is 20.",
      "A P/E of 20 means you're paying $20 for every $1 of annual earnings. Higher P/E can mean a stock is expensive—or that investors expect high growth.",
      "Compare P/E to industry peers, not across all stocks. Tech stocks often have higher P/Es than utilities because they're expected to grow faster.",
      "Limitations: P/E doesn't work for unprofitable companies. It also uses past earnings, which may not reflect future performance."
    ],
    quiz: {
      question: "Company A has a P/E of 30, Company B has a P/E of 15. Which is necessarily the better investment?",
      options: ["Company A (higher P/E)", "Company B (lower P/E)", "Neither - P/E alone doesn't tell the full story"],
      correct: 2,
      explanation: "P/E is just one metric. Company A might be growing rapidly (justifying its higher P/E), while Company B might be declining. Always look at multiple factors."
    }
  },
  {
    id: "dca",
    icon: TrendingUp,
    title: "Dollar Cost Averaging (DCA)",
    description: "A strategy to reduce the impact of volatility on your investments",
    content: [
      "Dollar Cost Averaging means investing a fixed amount regularly, regardless of market conditions.",
      "Example: Instead of investing $12,000 at once, you invest $1,000 every month for a year.",
      "When prices are high, your $1,000 buys fewer shares. When prices are low, it buys more. Over time, this averages out your cost.",
      "Benefits: Removes emotion from investing, no need to time the market, reduces impact of volatility.",
      "Drawback: If the market consistently goes up, investing all at once would have been better. But DCA reduces regret and stress."
    ],
    quiz: {
      question: "What is the main benefit of Dollar Cost Averaging?",
      options: [
        "It guarantees higher returns than lump-sum investing",
        "It removes the need to time the market perfectly",
        "It eliminates all investment risk"
      ],
      correct: 1,
      explanation: "DCA helps you avoid the stress of trying to find the 'perfect' time to invest. By investing regularly, you don't need to predict market movements."
    }
  },
  {
    id: "diversification",
    icon: PieChart,
    title: "Diversification",
    description: "Why you shouldn't put all your eggs in one basket",
    content: [
      "Diversification means spreading your investments across different assets to reduce risk.",
      "Types of diversification: across stocks, sectors (tech, healthcare, finance), asset classes (stocks, bonds, real estate), and geographies.",
      "The goal: When one investment drops, others may hold steady or rise, cushioning your overall portfolio.",
      "Over-diversification is possible too. Owning 100 stocks might not add much protection over owning 20-30 well-chosen ones.",
      "A simple diversified portfolio might include: a total stock market ETF, an international ETF, and a bond ETF."
    ],
    quiz: {
      question: "Why is it risky to invest all your money in one tech stock?",
      options: [
        "Tech stocks never go up",
        "If that company fails, you could lose everything",
        "Diversification is only for professional investors"
      ],
      correct: 1,
      explanation: "Even great companies can face unexpected challenges. By diversifying, a single company's poor performance won't devastate your entire portfolio."
    }
  },
  {
    id: "risk",
    icon: Shield,
    title: "Understanding Risk",
    description: "Learn about different types of investment risk and how to manage them",
    content: [
      "All investments carry risk. The key is understanding and managing it, not avoiding it entirely.",
      "Market risk: The whole market can drop (like in 2008 or 2020). Diversification helps but doesn't eliminate this.",
      "Company risk: A specific company might fail or underperform. This is why you don't put everything in one stock.",
      "Inflation risk: Even 'safe' cash loses purchasing power over time if inflation exceeds your returns.",
      "Risk tolerance varies by person. Young investors can typically take more risk because they have time to recover from losses."
    ],
    quiz: {
      question: "Which of these is an example of 'market risk'?",
      options: [
        "A company goes bankrupt due to fraud",
        "The entire stock market drops 30% during a recession",
        "You forgot to diversify your portfolio"
      ],
      correct: 1,
      explanation: "Market risk affects the entire market, not just individual companies. It's the risk that economic conditions cause broad market declines."
    }
  },
  {
    id: "fees",
    icon: DollarSign,
    title: "Investment Fees & Costs",
    description: "Understand how fees impact your returns over time",
    content: [
      "Investment fees may seem small but compound over time, significantly impacting returns.",
      "Expense ratio: Annual fee charged by ETFs and mutual funds. Even 1% vs 0.1% can mean tens of thousands in differences over 30 years.",
      "Trading commissions: Most brokers now offer $0 trades, but check for hidden fees.",
      "Advisory fees: Financial advisors often charge 1% of assets annually. Consider if the advice is worth it.",
      "Rule of thumb: Keep total annual fees under 0.5% if possible. Index funds often have expense ratios as low as 0.03%."
    ],
    quiz: {
      question: "Why do fees matter so much for long-term investors?",
      options: [
        "Fees are only charged once when you first invest",
        "Fees compound over time, significantly reducing your final returns",
        "High fees always mean better performance"
      ],
      correct: 1,
      explanation: "Fees are charged annually and compound over decades. A 1% fee might seem small, but over 30 years it can reduce your portfolio by over 25% compared to a 0.1% fee."
    }
  }
];

export default function Learning() {
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [quizAnswer, setQuizAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const resetQuiz = () => {
    setQuizAnswer(null);
    setShowExplanation(false);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <main className="flex-1 container mx-auto px-4 py-8">
        {selectedLesson ? (
          /* Lesson Detail View */
          <div className="max-w-2xl mx-auto">
            <button
              onClick={() => { setSelectedLesson(null); resetQuiz(); }}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
            >
              <ChevronRight className="h-4 w-4 rotate-180" />
              Back to all lessons
            </button>

            <div className="card-elevated rounded-2xl p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-xl bg-primary/10">
                  <selectedLesson.icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h1 className="text-2xl font-display font-bold">{selectedLesson.title}</h1>
                  <p className="text-muted-foreground">{selectedLesson.description}</p>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                {selectedLesson.content.map((paragraph, i) => (
                  <p key={i} className="text-foreground leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>

              {selectedLesson.quiz && (
                <div className="border-t border-border pt-6">
                  <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-primary" />
                    Quick Quiz
                  </h3>
                  
                  <p className="mb-4 font-medium">{selectedLesson.quiz.question}</p>
                  
                  <div className="space-y-2 mb-4">
                    {selectedLesson.quiz.options.map((option, i) => {
                      const isSelected = quizAnswer === i;
                      const isCorrect = i === selectedLesson.quiz?.correct;
                      const showResult = quizAnswer !== null;

                      return (
                        <button
                          key={i}
                          onClick={() => {
                            if (quizAnswer === null) {
                              setQuizAnswer(i);
                              setShowExplanation(true);
                            }
                          }}
                          disabled={quizAnswer !== null}
                          className={`w-full text-left p-4 rounded-lg border transition-all ${
                            showResult
                              ? isCorrect
                                ? "border-gain bg-gain-muted"
                                : isSelected
                                  ? "border-loss bg-loss-muted"
                                  : "border-border opacity-50"
                              : "border-border hover:border-primary hover:bg-primary/5"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span>{option}</span>
                            {showResult && isCorrect && <CheckCircle className="h-5 w-5 text-gain" />}
                            {showResult && isSelected && !isCorrect && <XCircle className="h-5 w-5 text-loss" />}
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {showExplanation && (
                    <div className={`p-4 rounded-lg ${quizAnswer === selectedLesson.quiz.correct ? "bg-gain-muted" : "bg-loss-muted"}`}>
                      <p className={`font-medium mb-1 ${quizAnswer === selectedLesson.quiz.correct ? "text-gain" : "text-loss"}`}>
                        {quizAnswer === selectedLesson.quiz.correct ? "Correct!" : "Not quite right"}
                      </p>
                      <p className="text-sm text-foreground">{selectedLesson.quiz.explanation}</p>
                    </div>
                  )}

                  {quizAnswer !== null && (
                    <Button variant="outline" onClick={resetQuiz} className="mt-4">
                      <RotateCcw className="h-4 w-4 mr-2" />
                      Try Again
                    </Button>
                  )}
                </div>
              )}
            </div>
          </div>
        ) : (
          /* Lesson List View */
          <>
            <div className="mb-8">
              <h1 className="text-3xl font-display font-bold mb-2">Learning Hub</h1>
              <p className="text-muted-foreground">
                Master investing basics with interactive lessons and quizzes
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {lessons.map((lesson) => {
                const Icon = lesson.icon;
                return (
                  <button
                    key={lesson.id}
                    onClick={() => setSelectedLesson(lesson)}
                    className="card-elevated rounded-xl p-6 text-left hover:shadow-lg transition-all group"
                  >
                    <div className="p-3 rounded-xl bg-primary/5 w-fit mb-4 group-hover:bg-primary/10 transition-colors">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold mb-2">{lesson.title}</h3>
                    <p className="text-muted-foreground text-sm mb-4">{lesson.description}</p>
                    <div className="flex items-center gap-2 text-primary text-sm font-medium group-hover:gap-3 transition-all">
                      Start lesson
                      <ChevronRight className="h-4 w-4" />
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Additional Resources */}
            <div className="mt-12 card-elevated rounded-xl p-6">
              <h2 className="font-semibold mb-4">📚 More Resources Coming Soon</h2>
              <p className="text-muted-foreground text-sm">
                We're working on more lessons covering topics like: Options basics, Reading financial statements, 
                Technical analysis fundamentals, Tax-efficient investing, and Retirement account strategies.
              </p>
            </div>
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}
