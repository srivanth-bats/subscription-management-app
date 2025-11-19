import { Subscription } from "@/pages/Index";
import { DollarSign, TrendingUp, Calendar } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency } from "@/lib/currency";

interface StatsOverviewProps {
  subscriptions: Subscription[];
  currency: string;
}

export const StatsOverview = ({ subscriptions, currency }: StatsOverviewProps) => {
  const monthlyTotal = subscriptions.reduce((total, sub) => {
    const cost = sub.billingCycle === "monthly" ? sub.cost : sub.cost / 12;
    return sub.status === "active" ? total + cost : total;
  }, 0);

  const yearlyTotal = monthlyTotal * 12;
  const activeCount = subscriptions.filter((sub) => sub.status === "active").length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <Card className="bg-gradient-card shadow-card hover:shadow-hover transition-all duration-300 border-border">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">Monthly Total</p>
              <p className="text-3xl font-bold text-foreground">{formatCurrency(monthlyTotal, currency)}</p>
            </div>
            <div className="p-3 rounded-lg bg-primary/10">
              <DollarSign className="h-6 w-6 text-primary" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-card shadow-card hover:shadow-hover transition-all duration-300 border-border">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">Yearly Total</p>
              <p className="text-3xl font-bold text-foreground">{formatCurrency(yearlyTotal, currency)}</p>
            </div>
            <div className="p-3 rounded-lg bg-accent/10">
              <TrendingUp className="h-6 w-6 text-accent" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-card shadow-card hover:shadow-hover transition-all duration-300 border-border">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">Active Subscriptions</p>
              <p className="text-3xl font-bold text-foreground">{activeCount}</p>
            </div>
            <div className="p-3 rounded-lg bg-success/10">
              <Calendar className="h-6 w-6 text-success" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
