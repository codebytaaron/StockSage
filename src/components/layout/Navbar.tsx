import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  TrendingUp, 
  Menu, 
  X,
  BarChart3,
  BookOpen,
  Briefcase,
  MessageSquare,
  LogOut,
  User
} from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const navLinks = [
  { href: "/dashboard", label: "Dashboard", icon: BarChart3 },
  { href: "/portfolio", label: "Portfolio", icon: Briefcase },
  { href: "/insights", label: "AI Insights", icon: MessageSquare },
  { href: "/learn", label: "Learn", icon: BookOpen },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut, loading } = useAuth();

  const isLanding = location.pathname === "/";
  const isAuth = location.pathname === "/auth";

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <nav className={`sticky top-0 z-50 w-full transition-colors duration-300 ${
      isLanding 
        ? "bg-transparent" 
        : "bg-background/80 backdrop-blur-xl border-b border-border"
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 font-display font-bold text-xl">
            <div className={`p-1.5 rounded-lg ${isLanding ? "bg-primary-foreground/10" : "bg-primary/10"}`}>
              <TrendingUp className={`h-5 w-5 ${isLanding ? "text-primary-foreground" : "text-primary"}`} />
            </div>
            <span className={isLanding ? "text-primary-foreground" : "text-foreground"}>
              StockSage
            </span>
            <span className={`text-xs font-medium px-1.5 py-0.5 rounded ${
              isLanding ? "bg-primary-foreground/20 text-primary-foreground" : "bg-gain/10 text-gain"
            }`}>
              AI
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {user && navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = location.pathname === link.href;
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Auth Buttons / User Menu */}
          <div className="hidden md:flex items-center gap-3">
            {loading ? (
              <div className="h-9 w-20 bg-secondary animate-pulse rounded-lg" />
            ) : user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="gap-2">
                    <User className="h-4 w-4" />
                    <span className="max-w-[100px] truncate">{user.email}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem asChild>
                    <Link to="/settings" className="cursor-pointer">
                      Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer text-loss">
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                {!isAuth && (
                  <>
                    <Link to="/auth">
                      <Button 
                        variant={isLanding ? "heroOutline" : "ghost"} 
                        size="sm"
                      >
                        Sign in
                      </Button>
                    </Link>
                    <Link to="/auth?signup=true">
                      <Button 
                        variant={isLanding ? "hero" : "default"} 
                        size="sm"
                        className={isLanding ? "bg-primary-foreground text-primary hover:bg-primary-foreground/90" : ""}
                      >
                        Get Started
                      </Button>
                    </Link>
                  </>
                )}
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`md:hidden p-2 rounded-lg ${
              isLanding ? "text-primary-foreground hover:bg-primary-foreground/10" : "hover:bg-accent"
            }`}
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-border/50">
            <div className="flex flex-col gap-2">
              {user && navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = location.pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    to={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:text-foreground hover:bg-accent"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {link.label}
                  </Link>
                );
              })}
              {!user && !isAuth && (
                <div className="flex flex-col gap-2 pt-2 border-t border-border/50">
                  <Link to="/auth" onClick={() => setIsOpen(false)}>
                    <Button variant="outline" className="w-full">Sign in</Button>
                  </Link>
                  <Link to="/auth?signup=true" onClick={() => setIsOpen(false)}>
                    <Button className="w-full">Get Started</Button>
                  </Link>
                </div>
              )}
              {user && (
                <div className="pt-2 border-t border-border/50">
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start text-loss"
                    onClick={() => { handleSignOut(); setIsOpen(false); }}
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign out
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
