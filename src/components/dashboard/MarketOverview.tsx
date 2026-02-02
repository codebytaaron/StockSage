import { TrendingUp, TrendingDown } from "lucide-react";

const marketIndices = [
  { name: "S&P 500", value: "4,783.35", change: "+0.58%", positive: true },
  { name: "Dow Jones", value: "37,545.33", change: "+0.42%", positive: true },
  { name: "Nasdaq", value: "15,074.57", change: "+0.85%", positive: true },
  { name: "Russell 2000", value: "2,012.65", change: "-0.23%", positive: false },
];

export function MarketOverview() {
  return (
    <section className="card-elevated rounded-2xl p-6">
      <h2 className="text-lg font-semibold mb-4">Market Overview</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {marketIndices.map((index) => (
          <div key={index.name} className="p-4 rounded-xl bg-secondary/50">
            <p className="text-sm text-muted-foreground mb-1">{index.name}</p>
            <p className="text-lg font-display font-semibold">{index.value}</p>
            <div className={`flex items-center gap-1 text-sm font-medium ${
              index.positive ? "text-gain" : "text-loss"
            }`}>
              {index.positive ? (
                <TrendingUp className="h-3.5 w-3.5" />
              ) : (
                <TrendingDown className="h-3.5 w-3.5" />
              )}
              {index.change}
            </div>
          </div>
        ))}
      </div>

      <p className="text-xs text-muted-foreground mt-4 text-center">
        Market data is delayed 15 minutes. For educational purposes only.
      </p>
    </section>
  );
}
