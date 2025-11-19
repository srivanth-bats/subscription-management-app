import { CreditCard } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CURRENCIES } from "@/lib/currency";

interface DashboardHeaderProps {
  currency: string;
  onCurrencyChange: (currency: string) => void;
}

export const DashboardHeader = ({ currency, onCurrencyChange }: DashboardHeaderProps) => {
  return (
    <header className="mb-12">
      <div className="flex items-center justify-between gap-4 mb-2">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-gradient-primary shadow-card">
            <CreditCard className="h-6 w-6 text-primary-foreground" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            SubTrack
          </h1>
        </div>
        <Select value={currency} onValueChange={onCurrencyChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select currency" />
          </SelectTrigger>
          <SelectContent>
            {CURRENCIES.map((curr) => (
              <SelectItem key={curr.code} value={curr.code}>
                {curr.symbol} {curr.code} - {curr.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <p className="text-muted-foreground text-lg ml-[60px]">
        Track and manage your subscriptions effortlessly
      </p>
    </header>
  );
};
