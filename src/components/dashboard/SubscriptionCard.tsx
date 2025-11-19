import { Subscription } from "@/pages/Index";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/currency";

interface SubscriptionCardProps {
  subscription: Subscription;
  onEdit: () => void;
  onDelete: () => void;
  currency: string;
}

export const SubscriptionCard = ({ subscription, onEdit, onDelete, currency }: SubscriptionCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-success/10 text-success border-success/20";
      case "inactive":
        return "bg-muted text-muted-foreground border-border";
      case "expiring":
        return "bg-warning/10 text-warning border-warning/20";
      default:
        return "bg-muted text-muted-foreground border-border";
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  };

  return (
    <Card className="bg-gradient-card shadow-card hover:shadow-hover transition-all duration-300 border-border group">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="text-3xl">{subscription.icon || "📦"}</div>
            <div>
              <h3 className="font-semibold text-lg text-foreground">{subscription.name}</h3>
              <p className="text-sm text-muted-foreground">{subscription.category}</p>
            </div>
          </div>
          <Badge className={getStatusColor(subscription.status)}>
            {subscription.status}
          </Badge>
        </div>

        <div className="space-y-3 mb-4">
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-bold text-foreground">{formatCurrency(subscription.cost, currency)}</span>
            <span className="text-muted-foreground">/{subscription.billingCycle === "monthly" ? "mo" : "yr"}</span>
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>Next billing: {formatDate(subscription.nextBilling)}</span>
          </div>
        </div>

        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <Button
            variant="outline"
            size="sm"
            onClick={onEdit}
            className="flex-1"
          >
            <Pencil className="h-3 w-3 mr-1" />
            Edit
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={onDelete}
            className="text-destructive hover:text-destructive hover:bg-destructive/10"
          >
            <Trash2 className="h-3 w-3" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
