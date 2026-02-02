import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { 
  TrendingUp, 
  BarChart3, 
  MessageSquare, 
  BookOpen,
  Briefcase,
  Newspaper,
  Shield,
  Zap,
  Check,
  ChevronDown,
  ArrowRight
} from "lucide-react";
import { useState } from "react";

const features = [
  {
    icon: BarChart3,
    title: "Smart Watchlist",
    description: "Track your favorite stocks with real-time prices, charts, and daily changes."
  },
  {
    icon: Newspaper,
    title: "News & Sentiment",
    description: "AI-powered news analysis with bullish/neutral/bearish sentiment scores."
  },
  {
    icon: TrendingUp,
    title: "Fundamentals",
    description: "Key metrics at a glance: P/E, market cap, revenue growth, analyst ratings."
  },
  {
    icon: MessageSquare,
    title: "AI Insights",
    description: "Ask questions about any stock and get structured educational explanations."
  },
  {
    icon: Briefcase,
    title: "Portfolio Tracker",
    description: "Track your holdings, see allocation, and monitor gains and losses."
  },
  {
    icon: BookOpen,
    title: "Learning Hub",
    description: "Master investing basics with interactive lessons and quizzes."
  }
];

const steps = [
  {
    step: "01",
    title: "Add Your Stocks",
    description: "Build a watchlist of stocks you want to learn about and track."
  },
  {
    step: "02", 
    title: "Get AI Insights",
    description: "Ask questions and receive educational analysis with clear explanations."
  },
  {
    step: "03",
    title: "Learn & Grow",
    description: "Understand market concepts and build your investing knowledge."
  }
];

const faqs = [
  {
    q: "Is StockSage AI financial advice?",
    a: "No. StockSage AI is strictly for educational purposes. We provide information and AI-powered analysis to help you learn about markets, but this is not personalized financial advice. Always do your own research and consider consulting a licensed financial advisor."
  },
  {
    q: "Where does the market data come from?",
    a: "We use reputable financial data providers to source real-time and historical market data. Data is cached to ensure fast performance while respecting API limits."
  },
  {
    q: "How does the AI work?",
    a: "Our AI uses advanced language models to analyze market data and news, providing structured educational insights. It always includes uncertainty language and suggests verification steps."
  },
  {
    q: "What's the difference between Free and Pro?",
    a: "Free users can track up to 5 stocks and ask 10 AI questions per day. Pro users get unlimited stocks, 100 AI messages daily, and access to advanced insights."
  },
  {
    q: "Can I lose money using this app?",
    a: "StockSage AI is an educational tool - it doesn't execute trades or manage money. However, if you use insights to inform real investment decisions, all investments carry risk and you could lose money."
  }
];

const pricingPlans = [
  {
    name: "Free",
    price: "$0",
    description: "Perfect for getting started",
    features: [
      "Track up to 5 stocks",
      "10 AI insights per day",
      "Basic fundamentals data",
      "Learning hub access",
      "Portfolio tracking"
    ],
    cta: "Get Started Free",
    popular: false
  },
  {
    name: "Pro",
    price: "$12",
    period: "/month",
    description: "For serious learners",
    features: [
      "Unlimited watchlist stocks",
      "100 AI insights per day",
      "Advanced fundamentals",
      "News sentiment analysis",
      "Priority support",
      "Export capabilities"
    ],
    cta: "Upgrade to Pro",
    popular: true
  }
];

export default function Landing() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-gradient text-primary-foreground relative overflow-hidden">
        <Navbar />
        
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-primary-foreground/20 blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-gain/20 blur-3xl" />
        </div>

        <div className="container mx-auto px-4 py-24 md:py-32 relative">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-foreground/10 border border-primary-foreground/20 text-sm mb-6 animate-fade-in">
              <Zap className="h-4 w-4" />
              <span>Powered by AI • Educational Only</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-6 leading-tight animate-fade-in" style={{ animationDelay: "0.1s" }}>
              Learn Smarter.
              <br />
              <span className="text-primary-foreground/80">Invest Wiser.</span>
            </h1>
            
            <p className="text-lg md:text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: "0.2s" }}>
              AI-powered educational insights to help you understand the stock market. 
              Not financial advice—just knowledge to make better decisions.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: "0.3s" }}>
              <Link to="/auth?signup=true">
                <Button variant="hero" size="xl" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 w-full sm:w-auto">
                  Start Learning Free
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              </Link>
              <Link to="#features">
                <Button variant="heroOutline" size="xl" className="w-full sm:w-auto">
                  See Features
                </Button>
              </Link>
            </div>

            <p className="text-xs text-primary-foreground/60 mt-6 animate-fade-in" style={{ animationDelay: "0.4s" }}>
              <Shield className="h-3 w-3 inline mr-1" />
              Educational content only. Not financial advice. Always do your own research.
            </p>
          </div>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 100" fill="none" className="w-full">
            <path d="M0 50L60 45C120 40 240 30 360 35C480 40 600 60 720 65C840 70 960 60 1080 50C1200 40 1320 30 1380 25L1440 20V100H1380C1320 100 1200 100 1080 100C960 100 840 100 720 100C600 100 480 100 360 100C240 100 120 100 60 100H0V50Z" fill="hsl(var(--background))"/>
          </svg>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              How It Works
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Get started in minutes with our simple three-step process
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {steps.map((step, i) => (
              <div key={i} className="relative group">
                <div className="card-elevated rounded-2xl p-6 h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                  <div className="text-5xl font-display font-bold text-muted-foreground/20 mb-4">
                    {step.step}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                    <ArrowRight className="h-6 w-6 text-muted-foreground/30" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Everything You Need to Learn
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Powerful tools designed to help you understand the market
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {features.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <div 
                  key={i} 
                  className="card-elevated rounded-2xl p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  <div className="p-3 rounded-xl bg-primary/5 w-fit mb-4 group-hover:bg-primary/10 transition-colors">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Start free, upgrade when you're ready
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {pricingPlans.map((plan, i) => (
              <div 
                key={i}
                className={`rounded-2xl p-8 relative transition-all duration-300 hover:shadow-lg ${
                  plan.popular 
                    ? "bg-primary text-primary-foreground shadow-xl" 
                    : "card-elevated"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-gain text-gain-foreground text-xs font-semibold rounded-full">
                    Most Popular
                  </div>
                )}
                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
                  <div className="flex items-baseline gap-1 mb-2">
                    <span className="text-4xl font-display font-bold">{plan.price}</span>
                    {plan.period && <span className={plan.popular ? "text-primary-foreground/70" : "text-muted-foreground"}>{plan.period}</span>}
                  </div>
                  <p className={plan.popular ? "text-primary-foreground/70" : "text-muted-foreground"}>
                    {plan.description}
                  </p>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm">
                      <Check className={`h-4 w-4 ${plan.popular ? "text-gain" : "text-gain"}`} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link to={plan.popular ? "/pricing" : "/auth?signup=true"}>
                  <Button 
                    variant={plan.popular ? "hero" : "outline"}
                    className={`w-full ${plan.popular ? "bg-primary-foreground text-primary hover:bg-primary-foreground/90" : ""}`}
                    size="lg"
                  >
                    {plan.cta}
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Everything you need to know about StockSage AI
            </p>
          </div>

          <div className="max-w-2xl mx-auto space-y-4">
            {faqs.map((faq, i) => (
              <div 
                key={i}
                className="card-elevated rounded-xl overflow-hidden"
              >
                <button
                  className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-accent/50 transition-colors"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span className="font-medium pr-4">{faq.q}</span>
                  <ChevronDown className={`h-5 w-5 text-muted-foreground shrink-0 transition-transform ${openFaq === i ? "rotate-180" : ""}`} />
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-4 text-muted-foreground">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Ready to Learn Smarter?
          </h2>
          <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto mb-8">
            Join thousands of users learning about the stock market with AI-powered insights.
          </p>
          <Link to="/auth?signup=true">
            <Button variant="hero" size="xl" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">
              Get Started Free
              <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          </Link>
          <p className="text-xs text-primary-foreground/60 mt-4">
            No credit card required • Educational content only
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
