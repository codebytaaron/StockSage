import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { User, Key, Bell, Shield, CreditCard, Loader2 } from "lucide-react";

export default function Settings() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [notifications, setNotifications] = useState(true);

  const handlePasswordReset = async () => {
    if (!user?.email) return;
    
    setLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(user.email, {
      redirectTo: `${window.location.origin}/auth`,
    });
    
    if (error) {
      toast.error("Failed to send reset email");
    } else {
      toast.success("Password reset email sent!");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-display font-bold mb-2">Settings</h1>
          <p className="text-muted-foreground mb-8">
            Manage your account settings and preferences
          </p>

          {/* Account Section */}
          <section className="card-elevated rounded-xl p-6 mb-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-primary/10">
                <User className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h2 className="font-semibold">Account</h2>
                <p className="text-sm text-muted-foreground">Manage your account details</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label className="text-muted-foreground text-sm">Email</Label>
                <p className="font-medium">{user?.email}</p>
              </div>
              
              <div>
                <Label className="text-muted-foreground text-sm">Account ID</Label>
                <p className="font-mono text-sm text-muted-foreground">{user?.id}</p>
              </div>
            </div>
          </section>

          {/* Security Section */}
          <section className="card-elevated rounded-xl p-6 mb-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-primary/10">
                <Shield className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h2 className="font-semibold">Security</h2>
                <p className="text-sm text-muted-foreground">Manage your password and security</p>
              </div>
            </div>

            <Button variant="outline" onClick={handlePasswordReset} disabled={loading}>
              {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Key className="h-4 w-4 mr-2" />}
              Reset Password
            </Button>
            <p className="text-xs text-muted-foreground mt-2">
              We'll send a password reset link to your email
            </p>
          </section>

          {/* Notifications Section */}
          <section className="card-elevated rounded-xl p-6 mb-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-primary/10">
                <Bell className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h2 className="font-semibold">Notifications</h2>
                <p className="text-sm text-muted-foreground">Manage notification preferences</p>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Email Notifications</p>
                <p className="text-sm text-muted-foreground">Receive updates about your watchlist</p>
              </div>
              <Switch checked={notifications} onCheckedChange={setNotifications} />
            </div>
          </section>

          {/* Subscription Section */}
          <section className="card-elevated rounded-xl p-6 mb-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-primary/10">
                <CreditCard className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h2 className="font-semibold">Subscription</h2>
                <p className="text-sm text-muted-foreground">Manage your plan</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-secondary mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold">Free Plan</span>
                <span className="text-xs px-2 py-1 bg-primary/10 rounded-full text-primary font-medium">Current</span>
              </div>
              <p className="text-sm text-muted-foreground">
                5 stocks, 10 AI messages/day
              </p>
            </div>

            <Button className="w-full" disabled>
              Upgrade to Pro - Coming Soon
            </Button>
            <p className="text-xs text-muted-foreground mt-2 text-center">
              Pro plan: Unlimited stocks, 100 AI messages/day, advanced insights
            </p>
          </section>

          {/* API Keys Section */}
          <section className="card-elevated rounded-xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-primary/10">
                <Key className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h2 className="font-semibold">API Configuration</h2>
                <p className="text-sm text-muted-foreground">Configure external data providers</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-secondary/50 border border-dashed border-border">
              <p className="text-sm text-muted-foreground">
                <strong>Coming Soon:</strong> Configure your own API keys for market data providers 
                (Alpha Vantage, Finnhub, Twelve Data) for unlimited API calls.
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                Currently using demo data for educational purposes.
              </p>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
