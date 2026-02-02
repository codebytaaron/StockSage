import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { TrendingUp, TrendingDown, X, MessageSquare, ExternalLink } from "lucide-react";

interface StockCardProps {
  ticker: string;
  data?: {
    price: number;
    change: number;
    changePercent: number;
    name: string;
  };
  onRemove: () => void;
}

export function StockCard({ ticker, data, onRemove }: StockCardProps) {
  const isPositive = data ? data.change >= 0 : true;
  
  return (
    <div className="card-elevated rounded-xl p-4 group relative">
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-2 right-2 h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={(e) => {
          e.preventDefault();
          onRemove();
        }}
      >
        <X className="h-3.5 w-3.5" />
      </Button>

      <div className="flex items-start justify-between mb-3">
        <div>
          <span className="ticker-badge">{ticker}</span>
          <p className="text-sm text-muted-foreground mt-1 line-clamp-1">
            {data?.name || "Loading..."}
          </p>
        </div>
        <div className={`p-1.5 rounded-lg ${isPositive ? "bg-gain-muted" : "bg-loss-muted"}`}>
          {isPositive ? (
            <TrendingUp className="h-4 w-4 text-gain" />
          ) : (
            <TrendingDown className="h-4 w-4 text-loss" />
          )}
        </div>
      </div>

      {data ? (
        <>
          <div className="mb-4">
            <p className="text-2xl font-display font-bold">
              ${data.price.toFixed(2)}
            </p>
            <p className={`text-sm font-medium ${isPositive ? "text-gain" : "text-loss"}`}>
              {isPositive ? "+" : ""}{data.change.toFixed(2)} ({isPositive ? "+" : ""}{data.changePercent.toFixed(2)}%)
            </p>
          </div>

          {/* Mini chart placeholder */}
          <div className="h-12 bg-secondary/50 rounded-lg mb-4 overflow-hidden">
            <svg viewBox="0 0 100 40" className="w-full h-full">
              <path
                d={isPositive 
                  ? "M0,35 Q10,30 20,25 T40,20 T60,15 T80,10 T100,5"
                  : "M0,5 Q10,10 20,15 T40,20 T60,25 T80,30 T100,35"
                }
                fill="none"
                stroke={isPositive ? "hsl(var(--gain))" : "hsl(var(--loss))"}
                strokeWidth="2"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
          </div>
        </>
      ) : (
        <div className="animate-pulse">
          <div className="h-8 bg-secondary rounded w-24 mb-2" />
          <div className="h-4 bg-secondary rounded w-16 mb-4" />
          <div className="h-12 bg-secondary rounded mb-4" />
        </div>
      )}

      <div className="flex gap-2">
        <Link to={`/insights?ticker=${ticker}`} className="flex-1">
          <Button variant="outline" size="sm" className="w-full">
            <MessageSquare className="h-3.5 w-3.5 mr-1.5" />
            AI Insight
          </Button>
        </Link>
        <Link to={`/stock/${ticker}`}>
          <Button variant="ghost" size="sm">
            <ExternalLink className="h-3.5 w-3.5" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
