import { Link } from "react-router-dom";
import { TrendingUp, AlertTriangle } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-secondary/50 border-t border-border">
      <div className="container mx-auto px-4 py-12">
        {/* Disclaimer Banner */}
        <div className="mb-8 p-4 rounded-xl bg-loss/5 border border-loss/20">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-loss shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="font-semibold text-foreground mb-1">Important Disclaimer</p>
              <p className="text-muted-foreground">
                StockSage AI provides <strong>educational content only</strong> and is not financial advice. 
                All investments involve risk. Always do your own research before making investment decisions. 
                Past performance does not guarantee future results. Markets can be volatile and you may lose money.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 font-display font-bold text-lg mb-4">
              <div className="p-1.5 rounded-lg bg-primary/10">
                <TrendingUp className="h-4 w-4 text-primary" />
              </div>
              <span>StockSage AI</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Educational stock market insights powered by AI. Learn smarter, invest wiser.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/dashboard" className="hover:text-foreground transition-colors">Dashboard</Link></li>
              <li><Link to="/portfolio" className="hover:text-foreground transition-colors">Portfolio</Link></li>
              <li><Link to="/insights" className="hover:text-foreground transition-colors">AI Insights</Link></li>
              <li><Link to="/learn" className="hover:text-foreground transition-colors">Learning Hub</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/learn" className="hover:text-foreground transition-colors">Investing Basics</Link></li>
              <li><Link to="/learn" className="hover:text-foreground transition-colors">Risk Management</Link></li>
              <li><Link to="/#faq" className="hover:text-foreground transition-colors">FAQ</Link></li>
              <li><Link to="/#pricing" className="hover:text-foreground transition-colors">Pricing</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/terms" className="hover:text-foreground transition-colors">Terms of Service</Link></li>
              <li><Link to="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link></li>
              <li><Link to="/disclaimer" className="hover:text-foreground transition-colors">Full Disclaimer</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} StockSage AI. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Not financial advice • Educational purposes only • Do your own research
          </p>
        </div>
      </div>
    </footer>
  );
}
