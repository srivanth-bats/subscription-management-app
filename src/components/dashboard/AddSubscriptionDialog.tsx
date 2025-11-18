import { useState, useEffect } from "react";
import { Subscription } from "@/pages/Index";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

interface AddSubscriptionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (subscription: Omit<Subscription, "id">) => void;
  editingSubscription: Subscription | null;
}

export const AddSubscriptionDialog = ({
  open,
  onOpenChange,
  onSubmit,
  editingSubscription,
}: AddSubscriptionDialogProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    cost: "",
    billingCycle: "monthly" as "monthly" | "yearly",
    category: "",
    nextBilling: "",
    status: "active" as "active" | "inactive" | "expiring",
    icon: "",
  });

  useEffect(() => {
    if (editingSubscription) {
      setFormData({
        name: editingSubscription.name,
        cost: editingSubscription.cost.toString(),
        billingCycle: editingSubscription.billingCycle,
        category: editingSubscription.category,
        nextBilling: editingSubscription.nextBilling,
        status: editingSubscription.status,
        icon: editingSubscription.icon || "",
      });
    } else {
      setFormData({
        name: "",
        cost: "",
        billingCycle: "monthly",
        category: "",
        nextBilling: "",
        status: "active",
        icon: "",
      });
    }
  }, [editingSubscription, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.cost || !formData.category || !formData.nextBilling) {
      toast({
        title: "Missing fields",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    onSubmit({
      name: formData.name,
      cost: parseFloat(formData.cost),
      billingCycle: formData.billingCycle,
      category: formData.category,
      nextBilling: formData.nextBilling,
      status: formData.status,
      icon: formData.icon,
    });

    toast({
      title: editingSubscription ? "Subscription updated" : "Subscription added",
      description: `${formData.name} has been ${editingSubscription ? "updated" : "added"} successfully`,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {editingSubscription ? "Edit Subscription" : "Add New Subscription"}
          </DialogTitle>
          <DialogDescription>
            {editingSubscription
              ? "Update your subscription details"
              : "Add a new subscription to track"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Netflix, Spotify, etc."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="icon">Icon (emoji)</Label>
            <Input
              id="icon"
              value={formData.icon}
              onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
              placeholder="🎬"
              maxLength={2}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="cost">Cost *</Label>
              <Input
                id="cost"
                type="number"
                step="0.01"
                value={formData.cost}
                onChange={(e) => setFormData({ ...formData, cost: e.target.value })}
                placeholder="9.99"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="billingCycle">Billing Cycle *</Label>
              <Select
                value={formData.billingCycle}
                onValueChange={(value: "monthly" | "yearly") =>
                  setFormData({ ...formData, billingCycle: value })
                }
              >
                <SelectTrigger id="billingCycle">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="yearly">Yearly</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category *</Label>
            <Input
              id="category"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              placeholder="Entertainment, Software, etc."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="nextBilling">Next Billing Date *</Label>
            <Input
              id="nextBilling"
              type="date"
              value={formData.nextBilling}
              onChange={(e) => setFormData({ ...formData, nextBilling: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select
              value={formData.status}
              onValueChange={(value: "active" | "inactive" | "expiring") =>
                setFormData({ ...formData, status: value })
              }
            >
              <SelectTrigger id="status">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="expiring">Expiring</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" className="flex-1">
              {editingSubscription ? "Update" : "Add"} Subscription
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
