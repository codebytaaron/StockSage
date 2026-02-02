import { useState, useRef, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Send,
  Loader2,
  MessageSquare,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Target,
  BarChart3,
  Search,
  Sparkles
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface InsightResponse {
  thesis?: string;
  risks?: string[];
  catalysts?: string[];
  keyMetrics?: string[];
  verification?: string[];
}

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/stock-insight`;

export default function Insights() {
  const [searchParams] = useSearchParams();
  const initialTicker = searchParams.get("ticker") || "";
  
  const [ticker, setTicker] = useState(initialTicker);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState(initialTicker ? `Tell me about ${initialTicker}` : "");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    let assistantContent = "";

    try {
      const resp = await fetch(CHAT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({
          messages: [...messages, userMessage],
          ticker: ticker || undefined,
        }),
      });

      if (resp.status === 429) {
        toast.error("Rate limit exceeded. Please try again later.");
        setLoading(false);
        return;
      }

      if (resp.status === 402) {
        toast.error("AI credits exhausted. Please upgrade your plan.");
        setLoading(false);
        return;
      }

      if (!resp.ok || !resp.body) {
        throw new Error("Failed to get response");
      }

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let textBuffer = "";

      // Add initial assistant message
      setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        textBuffer += decoder.decode(value, { stream: true });

        let newlineIndex: number;
        while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
          let line = textBuffer.slice(0, newlineIndex);
          textBuffer = textBuffer.slice(newlineIndex + 1);

          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (line.startsWith(":") || line.trim() === "") continue;
          if (!line.startsWith("data: ")) continue;

          const jsonStr = line.slice(6).trim();
          if (jsonStr === "[DONE]") break;

          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content;
            if (content) {
              assistantContent += content;
              setMessages((prev) => {
                const updated = [...prev];
                updated[updated.length - 1] = {
                  role: "assistant",
                  content: assistantContent,
                };
                return updated;
              });
            }
          } catch {
            textBuffer = line + "\n" + textBuffer;
            break;
          }
        }
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to get AI response");
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "I apologize, but I encountered an error. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const exampleQuestions = [
    "Explain why AAPL moved today",
    "What are the pros and cons of buying MSFT now?",
    "How do I evaluate a stock's P/E ratio?",
    "What is dollar cost averaging?",
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-xl bg-primary/10">
                <Sparkles className="h-5 w-5 text-primary" />
              </div>
              <h1 className="text-2xl font-display font-bold">AI Insights</h1>
            </div>
            <p className="text-muted-foreground">
              Ask educational questions about stocks, investing concepts, and market trends
            </p>
          </div>

          {/* Ticker Input */}
          <div className="card-elevated rounded-xl p-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Enter ticker (e.g., AAPL)"
                  value={ticker}
                  onChange={(e) => setTicker(e.target.value.toUpperCase())}
                  className="pl-9 uppercase"
                  maxLength={5}
                />
              </div>
              <p className="text-sm text-muted-foreground hidden sm:block">
                Optional: Focus questions on a specific stock
              </p>
            </div>
          </div>

          {/* Chat Area */}
          <div className="card-elevated rounded-xl overflow-hidden">
            {/* Messages */}
            <div className="h-[400px] overflow-y-auto p-6 space-y-6">
              {messages.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <div className="p-4 rounded-full bg-secondary mb-4">
                    <MessageSquare className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="font-semibold mb-2">Start a conversation</h3>
                  <p className="text-muted-foreground text-sm mb-6 max-w-sm">
                    Ask about stocks, investing concepts, or market analysis. Remember, this is educational content only.
                  </p>
                  <div className="flex flex-wrap gap-2 justify-center max-w-md">
                    {exampleQuestions.map((q, i) => (
                      <button
                        key={i}
                        onClick={() => setInput(q)}
                        className="text-xs px-3 py-1.5 rounded-full bg-secondary hover:bg-secondary/80 transition-colors"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                messages.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                        msg.role === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary"
                      }`}
                    >
                      <div className="prose prose-sm max-w-none dark:prose-invert">
                        {msg.content.split("\n").map((line, j) => (
                          <p key={j} className="mb-2 last:mb-0">
                            {line}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                ))
              )}
              {loading && messages[messages.length - 1]?.role === "user" && (
                <div className="flex justify-start">
                  <div className="bg-secondary rounded-2xl px-4 py-3">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span className="text-sm">Thinking...</span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Disclaimer */}
            <div className="px-6 py-3 bg-loss/5 border-t border-loss/20">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <AlertTriangle className="h-3.5 w-3.5 text-loss" />
                <span>
                  Educational only. Not financial advice. Always verify information independently.
                </span>
              </div>
            </div>

            {/* Input */}
            <form onSubmit={sendMessage} className="p-4 border-t border-border">
              <div className="flex gap-2">
                <Input
                  placeholder="Ask a question about investing..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  disabled={loading}
                  className="flex-1"
                />
                <Button type="submit" disabled={loading || !input.trim()}>
                  {loading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
