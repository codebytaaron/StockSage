import { useState, useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Plus,
  Trash2,
  TrendingUp,
  TrendingDown,
  PieChart,
  AlertTriangle,
  Loader2,
  Edit2
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface Position {
  id: string;
  ticker: string;
  shares: number;
  cost_basis: number;
  notes?: string;
  created_at: string;
}

// Mock current prices
const mockPrices: Record<string, number> = {
  AAPL: 178.52,
  GOOGL: 141.80,
  MSFT: 378.91,
  AMZN: 178.25,
  TSLA: 248.50,
  NVDA: 875.28,
  META: 505.75,
};

export default function Portfolio() {
  const { user } = useAuth();
  const [positions, setPositions] = useState<Position[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    ticker: "",
    shares: "",
    cost_basis: "",
    notes: ""
  });

  useEffect(() => {
    if (user) fetchPositions();
  }, [user]);

  const fetchPositions = async () => {
    if (!user) return;
    
    const { data, error } = await supabase
      .from("portfolio_positions")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (error) {
      toast.error("Failed to load portfolio");
    } else {
      setPositions(data || []);
    }
    setLoading(false);
  };

  const addPosition = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setSaving(true);
    const { data, error } = await supabase
      .from("portfolio_positions")
      .insert({
        user_id: user.id,
        ticker: formData.ticker.toUpperCase(),
        shares: parseFloat(formData.shares),
        cost_basis: parseFloat(formData.cost_basis),
        notes: formData.notes || null
      })
      .select()
      .single();

    if (error) {
      toast.error("Failed to add position");
    } else {
      setPositions([data, ...positions]);
      setFormData({ ticker: "", shares: "", cost_basis: "", notes: "" });
      setIsAddOpen(false);
      toast.success("Position added");
    }
    setSaving(false);
  };

  const deletePosition = async (id: string) => {
    const { error } = await supabase
      .from("portfolio_positions")
      .delete()
      .eq("id", id);

    if (error) {
      toast.error("Failed to delete position");
    } else {
      setPositions(positions.filter(p => p.id !== id));
      toast.success("Position removed");
    }
  };

  // Calculate portfolio metrics
  const portfolioMetrics = positions.reduce((acc, pos) => {
    const currentPrice = mockPrices[pos.ticker] || pos.cost_basis;
    const currentValue = pos.shares * currentPrice;
    const costValue = pos.shares * pos.cost_basis;
    const gain = currentValue - costValue;
    
    return {
      totalValue: acc.totalValue + currentValue,
      totalCost: acc.totalCost + costValue,
      totalGain: acc.totalGain + gain,
    };
  }, { totalValue: 0, totalCost: 0, totalGain: 0 });

  const gainPercent = portfolioMetrics.totalCost > 0 
    ? ((portfolioMetrics.totalGain / portfolioMetrics.totalCost) * 100) 
    : 0;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-display font-bold mb-2">Portfolio Tracker</h1>
            <p className="text-muted-foreground">
              Track your holdings and monitor performance
            </p>
          </div>

          <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Position
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Position</DialogTitle>
                <DialogDescription>
                  Enter the details of your stock holding
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={addPosition} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="ticker">Ticker Symbol</Label>
                  <Input
                    id="ticker"
                    placeholder="e.g., AAPL"
                    value={formData.ticker}
                    onChange={(e) => setFormData({...formData, ticker: e.target.value.toUpperCase()})}
                    className="uppercase"
                    required
                    maxLength={5}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="shares">Shares</Label>
                    <Input
                      id="shares"
                      type="number"
                      step="0.001"
                      placeholder="10"
                      value={formData.shares}
                      onChange={(e) => setFormData({...formData, shares: e.target.value})}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cost">Cost Basis ($)</Label>
                    <Input
                      id="cost"
                      type="number"
                      step="0.01"
                      placeholder="150.00"
                      value={formData.cost_basis}
                      onChange={(e) => setFormData({...formData, cost_basis: e.target.value})}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="notes">Notes (optional)</Label>
                  <Input
                    id="notes"
                    placeholder="Why you bought this stock..."
                    value={formData.notes}
                    onChange={(e) => setFormData({...formData, notes: e.target.value})}
                  />
                </div>
                <Button type="submit" className="w-full" disabled={saving}>
                  {saving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                  Add Position
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Portfolio Summary */}
        <div className="grid sm:grid-cols-3 gap-4 mb-8">
          <div className="card-elevated rounded-xl p-6">
            <p className="text-sm text-muted-foreground mb-1">Total Value</p>
            <p className="text-2xl font-display font-bold">
              ${portfolioMetrics.totalValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
          </div>
          <div className="card-elevated rounded-xl p-6">
            <p className="text-sm text-muted-foreground mb-1">Total Cost</p>
            <p className="text-2xl font-display font-bold">
              ${portfolioMetrics.totalCost.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
          </div>
          <div className="card-elevated rounded-xl p-6">
            <p className="text-sm text-muted-foreground mb-1">Total Gain/Loss</p>
            <div className="flex items-center gap-2">
              <p className={`text-2xl font-display font-bold ${portfolioMetrics.totalGain >= 0 ? "text-gain" : "text-loss"}`}>
                {portfolioMetrics.totalGain >= 0 ? "+" : ""}
                ${portfolioMetrics.totalGain.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
              <span className={`text-sm font-medium px-2 py-0.5 rounded ${
                portfolioMetrics.totalGain >= 0 ? "bg-gain-muted text-gain" : "bg-loss-muted text-loss"
              }`}>
                {gainPercent >= 0 ? "+" : ""}{gainPercent.toFixed(2)}%
              </span>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mb-6 p-4 rounded-xl bg-loss/5 border border-loss/20">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-loss shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="font-medium text-foreground">Manual Tracking Only</p>
              <p className="text-muted-foreground">
                This is a manual portfolio tracker for educational purposes. Prices shown are mock data.
                Always use your brokerage for official positions and tax records.
              </p>
            </div>
          </div>
        </div>

        {/* Positions Table */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : positions.length === 0 ? (
          <div className="card-elevated rounded-2xl p-12 text-center">
            <div className="mx-auto w-12 h-12 rounded-full bg-secondary flex items-center justify-center mb-4">
              <PieChart className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="font-semibold mb-2">No positions yet</h3>
            <p className="text-muted-foreground text-sm mb-4">
              Add your first position to start tracking your portfolio
            </p>
            <Button onClick={() => setIsAddOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Position
            </Button>
          </div>
        ) : (
          <div className="card-elevated rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-secondary/50">
                    <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">Ticker</th>
                    <th className="text-right px-4 py-3 text-sm font-medium text-muted-foreground">Shares</th>
                    <th className="text-right px-4 py-3 text-sm font-medium text-muted-foreground">Cost Basis</th>
                    <th className="text-right px-4 py-3 text-sm font-medium text-muted-foreground">Current</th>
                    <th className="text-right px-4 py-3 text-sm font-medium text-muted-foreground">Value</th>
                    <th className="text-right px-4 py-3 text-sm font-medium text-muted-foreground">Gain/Loss</th>
                    <th className="text-right px-4 py-3 text-sm font-medium text-muted-foreground">%</th>
                    <th className="px-4 py-3"></th>
                  </tr>
                </thead>
                <tbody>
                  {positions.map((pos) => {
                    const currentPrice = mockPrices[pos.ticker] || pos.cost_basis;
                    const currentValue = pos.shares * currentPrice;
                    const costValue = pos.shares * pos.cost_basis;
                    const gain = currentValue - costValue;
                    const gainPct = costValue > 0 ? (gain / costValue) * 100 : 0;
                    const isPositive = gain >= 0;

                    return (
                      <tr key={pos.id} className="border-b border-border last:border-0 hover:bg-secondary/30">
                        <td className="px-4 py-4">
                          <div>
                            <span className="ticker-badge">{pos.ticker}</span>
                            {pos.notes && (
                              <p className="text-xs text-muted-foreground mt-1 max-w-[150px] truncate">
                                {pos.notes}
                              </p>
                            )}
                          </div>
                        </td>
                        <td className="text-right px-4 py-4 font-medium">
                          {pos.shares.toFixed(3)}
                        </td>
                        <td className="text-right px-4 py-4">
                          ${pos.cost_basis.toFixed(2)}
                        </td>
                        <td className="text-right px-4 py-4">
                          ${currentPrice.toFixed(2)}
                        </td>
                        <td className="text-right px-4 py-4 font-medium">
                          ${currentValue.toFixed(2)}
                        </td>
                        <td className={`text-right px-4 py-4 font-medium ${isPositive ? "text-gain" : "text-loss"}`}>
                          {isPositive ? "+" : ""}${gain.toFixed(2)}
                        </td>
                        <td className="text-right px-4 py-4">
                          <span className={`inline-flex items-center gap-1 text-sm font-medium px-2 py-0.5 rounded ${
                            isPositive ? "bg-gain-muted text-gain" : "bg-loss-muted text-loss"
                          }`}>
                            {isPositive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                            {isPositive ? "+" : ""}{gainPct.toFixed(2)}%
                          </span>
                        </td>
                        <td className="px-4 py-4">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-muted-foreground hover:text-loss"
                            onClick={() => deletePosition(pos.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Allocation Chart Placeholder */}
        {positions.length > 0 && (
          <div className="mt-8 card-elevated rounded-xl p-6">
            <h3 className="font-semibold mb-4">Portfolio Allocation</h3>
            <div className="flex flex-wrap gap-3">
              {positions.map((pos) => {
                const currentPrice = mockPrices[pos.ticker] || pos.cost_basis;
                const value = pos.shares * currentPrice;
                const allocation = (value / portfolioMetrics.totalValue) * 100;
                
                return (
                  <div key={pos.id} className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: `hsl(${Math.random() * 360}, 70%, 50%)` }}
                    />
                    <span className="text-sm">
                      {pos.ticker}: <strong>{allocation.toFixed(1)}%</strong>
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
