import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Plus, 
  Search, 
  TrendingUp, 
  TrendingDown,
  X,
  BarChart3,
  AlertCircle,
  Loader2,
  ExternalLink
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { StockCard } from "@/components/dashboard/StockCard";
import { MarketOverview } from "@/components/dashboard/MarketOverview";

interface WatchlistItem {
  id: string;
  ticker: string;
  added_at: string;
}

// Mock data for demonstration
const mockStockData: Record<string, { price: number; change: number; changePercent: number; name: string }> = {
  AAPL: { price: 178.52, change: 2.34, changePercent: 1.33, name: "Apple Inc." },
  GOOGL: { price: 141.80, change: -1.20, changePercent: -0.84, name: "Alphabet Inc." },
  MSFT: { price: 378.91, change: 5.67, changePercent: 1.52, name: "Microsoft Corp." },
  AMZN: { price: 178.25, change: 3.45, changePercent: 1.97, name: "Amazon.com Inc." },
  TSLA: { price: 248.50, change: -8.20, changePercent: -3.19, name: "Tesla Inc." },
  NVDA: { price: 875.28, change: 25.40, changePercent: 2.99, name: "NVIDIA Corp." },
  META: { price: 505.75, change: 12.30, changePercent: 2.49, name: "Meta Platforms" },
};

export default function Dashboard() {
  const { user } = useAuth();
  const [watchlist, setWatchlist] = useState<WatchlistItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [addingTicker, setAddingTicker] = useState(false);
  const [newTicker, setNewTicker] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (user) {
      fetchWatchlist();
    }
  }, [user]);

  const fetchWatchlist = async () => {
    if (!user) return;
    
    const { data, error } = await supabase
      .from("watchlist_items")
      .select("*")
      .eq("user_id", user.id)
      .order("added_at", { ascending: false });

    if (error) {
      toast.error("Failed to load watchlist");
    } else {
      setWatchlist(data || []);
    }
    setLoading(false);
  };

  const addToWatchlist = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !newTicker.trim()) return;

    const ticker = newTicker.toUpperCase().trim();
    
    if (watchlist.some(w => w.ticker === ticker)) {
      toast.error("Stock already in watchlist");
      return;
    }

    // Check tier limits (free = 5 stocks)
    if (watchlist.length >= 5) {
      toast.error("Free tier limited to 5 stocks. Upgrade to Pro for unlimited.");
      return;
    }

    setAddingTicker(true);

    const { data, error } = await supabase
      .from("watchlist_items")
      .insert({ user_id: user.id, ticker })
      .select()
      .single();

    if (error) {
      toast.error("Failed to add stock");
    } else {
      setWatchlist([data, ...watchlist]);
      setNewTicker("");
      toast.success(`${ticker} added to watchlist`);
    }
    setAddingTicker(false);
  };

  const removeFromWatchlist = async (id: string, ticker: string) => {
    const { error } = await supabase
      .from("watchlist_items")
      .delete()
      .eq("id", id);

    if (error) {
      toast.error("Failed to remove stock");
    } else {
      setWatchlist(watchlist.filter(w => w.id !== id));
      toast.success(`${ticker} removed from watchlist`);
    }
  };

  const filteredWatchlist = watchlist.filter(item => 
    item.ticker.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-display font-bold mb-2">Dashboard</h1>
          <p className="text-muted-foreground">
            Track your watchlist and get AI-powered educational insights
          </p>
        </div>

        {/* Market Overview */}
        <MarketOverview />

        {/* Watchlist Section */}
        <section className="mt-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-xl font-semibold">Your Watchlist</h2>
              <p className="text-sm text-muted-foreground">
                {watchlist.length} / 5 stocks (Free tier)
              </p>
            </div>

            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search watchlist..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 w-48"
                />
              </div>
              
              <form onSubmit={addToWatchlist} className="flex gap-2">
                <Input
                  placeholder="Add ticker..."
                  value={newTicker}
                  onChange={(e) => setNewTicker(e.target.value.toUpperCase())}
                  className="w-28 uppercase"
                  maxLength={5}
                />
                <Button type="submit" size="icon" disabled={addingTicker || !newTicker.trim()}>
                  {addingTicker ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
                </Button>
              </form>
            </div>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : filteredWatchlist.length === 0 ? (
            <div className="card-elevated rounded-2xl p-12 text-center">
              <div className="mx-auto w-12 h-12 rounded-full bg-secondary flex items-center justify-center mb-4">
                <BarChart3 className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="font-semibold mb-2">
                {searchQuery ? "No matching stocks" : "Your watchlist is empty"}
              </h3>
              <p className="text-muted-foreground text-sm mb-4">
                {searchQuery 
                  ? "Try a different search term"
                  : "Add stocks to start tracking and getting AI insights"
                }
              </p>
              {!searchQuery && (
                <div className="flex flex-wrap gap-2 justify-center">
                  {["AAPL", "GOOGL", "MSFT", "AMZN"].map(ticker => (
                    <Button 
                      key={ticker}
                      variant="outline"
                      size="sm"
                      onClick={async () => {
                        setNewTicker(ticker);
                        await addToWatchlist({ preventDefault: () => {} } as React.FormEvent);
                      }}
                    >
                      <Plus className="h-3 w-3 mr-1" />
                      {ticker}
                    </Button>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredWatchlist.map((item) => (
                <StockCard
                  key={item.id}
                  ticker={item.ticker}
                  data={mockStockData[item.ticker]}
                  onRemove={() => removeFromWatchlist(item.id, item.ticker)}
                />
              ))}
            </div>
          )}
        </section>

        {/* Quick Actions */}
        <section className="mt-12 grid md:grid-cols-2 gap-6">
          <Link to="/insights" className="card-elevated rounded-2xl p-6 hover:shadow-lg transition-all group">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-lg mb-2">AI Insights</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Ask questions about any stock and get educational explanations
                </p>
                <span className="text-primary text-sm font-medium group-hover:underline">
                  Start a conversation →
                </span>
              </div>
              <div className="p-3 rounded-xl bg-primary/5">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
            </div>
          </Link>

          <Link to="/learn" className="card-elevated rounded-2xl p-6 hover:shadow-lg transition-all group">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-lg mb-2">Learning Hub</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Master investing basics with interactive lessons
                </p>
                <span className="text-primary text-sm font-medium group-hover:underline">
                  Start learning →
                </span>
              </div>
              <div className="p-3 rounded-xl bg-primary/5">
                <BarChart3 className="h-6 w-6 text-primary" />
              </div>
            </div>
          </Link>
        </section>
      </main>

      <Footer />
    </div>
  );
}
