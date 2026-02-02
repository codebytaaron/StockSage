import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { AlertTriangle, Shield, TrendingDown, BookOpen } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

export function DisclaimerModal() {
  const { disclaimerAccepted, acceptDisclaimer, user } = useAuth();
  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(false);

  // Only show for logged in users who haven't accepted
  if (!user || disclaimerAccepted) return null;

  const handleAccept = async () => {
    setLoading(true);
    await acceptDisclaimer();
    setLoading(false);
  };

  return (
    <Dialog open={true}>
      <DialogContent className="sm:max-w-lg" hideCloseButton>
        <DialogHeader className="text-center">
          <div className="mx-auto mb-4 p-3 rounded-full bg-loss/10">
            <AlertTriangle className="h-8 w-8 text-loss" />
          </div>
          <DialogTitle className="text-2xl font-display">
            Important: Educational Content Only
          </DialogTitle>
          <DialogDescription className="text-base">
            Please read and accept before continuing
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-3">
            <div className="flex gap-3 p-3 rounded-lg bg-secondary">
              <BookOpen className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-sm">Educational Purpose Only</p>
                <p className="text-sm text-muted-foreground">
                  StockSage AI provides educational market insights and is NOT financial advice.
                </p>
              </div>
            </div>

            <div className="flex gap-3 p-3 rounded-lg bg-secondary">
              <TrendingDown className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-sm">Investment Risk</p>
                <p className="text-sm text-muted-foreground">
                  All investments involve risk. Markets are volatile and you may lose money.
                </p>
              </div>
            </div>

            <div className="flex gap-3 p-3 rounded-lg bg-secondary">
              <Shield className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-sm">Do Your Own Research</p>
                <p className="text-sm text-muted-foreground">
                  Always verify information independently and consult licensed professionals.
                </p>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-lg border border-loss/30 bg-loss/5">
            <div className="flex items-start gap-3">
              <Checkbox 
                id="accept" 
                checked={checked}
                onCheckedChange={(c) => setChecked(c === true)}
                className="mt-1"
              />
              <label htmlFor="accept" className="text-sm cursor-pointer leading-relaxed">
                I understand that StockSage AI provides <strong>educational content only</strong> and 
                is not personalized financial advice. I will do my own research before making any 
                investment decisions and accept full responsibility for my choices.
              </label>
            </div>
          </div>
        </div>

        <Button 
          onClick={handleAccept}
          disabled={!checked || loading}
          className="w-full"
          size="lg"
        >
          {loading ? "Processing..." : "I Understand & Accept"}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
