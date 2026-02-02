import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight, Sparkles } from "lucide-react";

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Perfect for getting started with stock education",
    features: [
      "Track up to 5 stocks",
      "10 AI insights per day",
      "Basic fundamentals data",
      "Learning hub access",
      "Portfolio tracking",
      "Email support"
    ],
    cta: "Current Plan",
    current: true,
    popular: false
  },
  {
    name: "Pro",
    price: "$12",
    period: "per month",
    description: "For serious learners who want more insights",
    features: [
      "Unlimited watchlist stocks",
      "100 AI insights per day",
      "Advanced fundamentals & metrics",
      "News sentiment analysis",
      "Export capabilities",
      "Priority support",
      "Custom alerts (coming soon)",
      "API access (coming soon)"
    ],
    cta: "Coming Soon",
    current: false,
    popular: true
  },
  {
    name: "Team",
    price: "$29",
    period: "per user/month",
    description: "For investment clubs and educational groups",
    features: [
      "Everything in Pro",
      "Team collaboration",
      "Shared watchlists",
      "Group learning",
      "Admin dashboard",
      "Dedicated support"
    ],
    cta: "Coming Soon",
    current: false,
    popular: false
  }
];

export default function Pricing() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <main className="flex-1 container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-display font-bold mb-4">Simple, Transparent Pricing</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Choose the plan that fits your learning journey. Start free, upgrade when you need more.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, i) => (
            <div 
              key={i}
              className={`relative rounded-2xl p-8 transition-all ${
                plan.popular 
                  ? "bg-primary text-primary-foreground shadow-xl scale-105" 
                  : "card-elevated"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-gain text-gain-foreground text-xs font-semibold rounded-full flex items-center gap-1">
                  <Sparkles className="h-3 w-3" />
                  Most Popular
                </div>
              )}
              
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-4xl font-display font-bold">{plan.price}</span>
                  <span className={plan.popular ? "text-primary-foreground/70" : "text-muted-foreground"}>
                    /{plan.period}
                  </span>
                </div>
                <p className={plan.popular ? "text-primary-foreground/80" : "text-muted-foreground"}>
                  {plan.description}
                </p>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, j) => (
                  <li key={j} className="flex items-start gap-2 text-sm">
                    <Check className={`h-4 w-4 shrink-0 mt-0.5 ${plan.popular ? "text-gain" : "text-gain"}`} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Button 
                variant={plan.current ? "outline" : plan.popular ? "hero" : "default"}
                className={`w-full ${
                  plan.popular ? "bg-primary-foreground text-primary hover:bg-primary-foreground/90" : ""
                }`}
                size="lg"
                disabled={!plan.current}
              >
                {plan.cta}
                {plan.current && <Check className="h-4 w-4 ml-2" />}
              </Button>
            </div>
          ))}
        </div>

        <div className="mt-16 max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-display font-bold mb-4">Frequently Asked Questions</h2>
          
          <div className="space-y-4 text-left">
            <div className="card-elevated rounded-xl p-6">
              <h3 className="font-semibold mb-2">When will Pro be available?</h3>
              <p className="text-muted-foreground text-sm">
                We're currently in beta. Pro plans will be available soon. Sign up for free to be notified!
              </p>
            </div>
            
            <div className="card-elevated rounded-xl p-6">
              <h3 className="font-semibold mb-2">Can I change plans later?</h3>
              <p className="text-muted-foreground text-sm">
                Yes! You can upgrade or downgrade at any time. Changes take effect immediately.
              </p>
            </div>
            
            <div className="card-elevated rounded-xl p-6">
              <h3 className="font-semibold mb-2">Is there a refund policy?</h3>
              <p className="text-muted-foreground text-sm">
                Yes, we offer a 30-day money-back guarantee on all paid plans. No questions asked.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <Link to="/auth?signup=true">
            <Button size="xl">
              Get Started Free
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </Link>
          <p className="text-sm text-muted-foreground mt-4">
            No credit card required
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
