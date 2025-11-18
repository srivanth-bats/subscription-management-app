import { Subscription } from "@/pages/Index";
import { SubscriptionCard } from "./SubscriptionCard";

interface SubscriptionListProps {
  subscriptions: Subscription[];
  onEdit: (subscription: Subscription) => void;
  onDelete: (id: string) => void;
}

export const SubscriptionList = ({ subscriptions, onEdit, onDelete }: SubscriptionListProps) => {
  if (subscriptions.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-muted-foreground text-lg">No subscriptions yet. Add your first one to get started!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {subscriptions.map((subscription) => (
        <SubscriptionCard
          key={subscription.id}
          subscription={subscription}
          onEdit={() => onEdit(subscription)}
          onDelete={() => onDelete(subscription.id)}
        />
      ))}
    </div>
  );
};
