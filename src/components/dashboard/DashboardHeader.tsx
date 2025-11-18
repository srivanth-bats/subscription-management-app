import { CreditCard } from "lucide-react";

export const DashboardHeader = () => {
  return (
    <header className="mb-12">
      <div className="flex items-center gap-3 mb-2">
        <div className="p-3 rounded-xl bg-gradient-primary shadow-card">
          <CreditCard className="h-6 w-6 text-primary-foreground" />
        </div>
        <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          SubTracker
        </h1>
      </div>
      <p className="text-muted-foreground text-lg ml-[60px]">
        Track and manage your subscriptions effortlessly
      </p>
    </header>
  );
};
