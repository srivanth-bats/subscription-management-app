import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { StatsOverview } from "@/components/dashboard/StatsOverview";
import { SubscriptionList } from "@/components/dashboard/SubscriptionList";
import { AddSubscriptionDialog } from "@/components/dashboard/AddSubscriptionDialog";

export interface Subscription {
  id: string;
  name: string;
  cost: number;
  billingCycle: "monthly" | "yearly";
  category: string;
  nextBilling: string;
  status: "active" | "inactive" | "expiring";
  icon?: string;
}

const initialSubscriptions: Subscription[] = [
  {
    id: "1",
    name: "Netflix",
    cost: 15.99,
    billingCycle: "monthly",
    category: "Entertainment",
    nextBilling: "2025-12-15",
    status: "active",
    icon: "🎬",
  },
  {
    id: "2",
    name: "Spotify",
    cost: 9.99,
    billingCycle: "monthly",
    category: "Music",
    nextBilling: "2025-12-08",
    status: "active",
    icon: "🎵",
  },
  {
    id: "3",
    name: "Adobe Creative Cloud",
    cost: 54.99,
    billingCycle: "monthly",
    category: "Software",
    nextBilling: "2025-12-20",
    status: "active",
    icon: "🎨",
  },
];

const Index = () => {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>(initialSubscriptions);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingSubscription, setEditingSubscription] = useState<Subscription | null>(null);

  const handleAddSubscription = (subscription: Omit<Subscription, "id">) => {
    const newSubscription = {
      ...subscription,
      id: Date.now().toString(),
    };
    setSubscriptions([...subscriptions, newSubscription]);
    setDialogOpen(false);
  };

  const handleEditSubscription = (subscription: Subscription) => {
    setEditingSubscription(subscription);
    setDialogOpen(true);
  };

  const handleUpdateSubscription = (updatedSubscription: Omit<Subscription, "id">) => {
    if (editingSubscription) {
      setSubscriptions(
        subscriptions.map((sub) =>
          sub.id === editingSubscription.id
            ? { ...updatedSubscription, id: editingSubscription.id }
            : sub
        )
      );
      setEditingSubscription(null);
      setDialogOpen(false);
    }
  };

  const handleDeleteSubscription = (id: string) => {
    setSubscriptions(subscriptions.filter((sub) => sub.id !== id));
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setEditingSubscription(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <DashboardHeader />
        
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-semibold text-foreground">Your Subscriptions</h2>
            <p className="text-muted-foreground mt-1">Manage all your recurring payments in one place</p>
          </div>
          <Button onClick={() => setDialogOpen(true)} className="gap-2">
            <Plus className="h-4 w-4" />
            Add Subscription
          </Button>
        </div>

        <StatsOverview subscriptions={subscriptions} />
        
        <SubscriptionList
          subscriptions={subscriptions}
          onEdit={handleEditSubscription}
          onDelete={handleDeleteSubscription}
        />

        <AddSubscriptionDialog
          open={dialogOpen}
          onOpenChange={handleDialogClose}
          onSubmit={editingSubscription ? handleUpdateSubscription : handleAddSubscription}
          editingSubscription={editingSubscription}
        />
      </div>
    </div>
  );
};

export default Index;
