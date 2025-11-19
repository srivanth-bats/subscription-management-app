import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Bell, Mail, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface NotificationPreference {
  id: string;
  subscription_id: string;
  push_enabled: boolean;
  email_enabled: boolean;
  hour_before_enabled: boolean;
  user_email: string | null;
}

interface NotificationSettingsProps {
  subscriptionId: string;
  subscriptionName: string;
}

export const NotificationSettings = ({ subscriptionId, subscriptionName }: NotificationSettingsProps) => {
  const { toast } = useToast();
  const [preferences, setPreferences] = useState<NotificationPreference | null>(null);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPreferences();
  }, [subscriptionId]);

  const loadPreferences = async () => {
    try {
      const { data, error } = await supabase
        .from("notification_preferences")
        .select("*")
        .eq("subscription_id", subscriptionId)
        .maybeSingle();

      if (error) throw error;

      if (data) {
        setPreferences(data);
        setEmail(data.user_email || "");
      } else {
        // Create default preferences
        const { data: newData, error: insertError } = await supabase
          .from("notification_preferences")
          .insert({
            subscription_id: subscriptionId,
            push_enabled: true,
            email_enabled: false,
            hour_before_enabled: false,
          })
          .select()
          .single();

        if (insertError) throw insertError;
        setPreferences(newData);
      }
    } catch (error) {
      console.error("Error loading preferences:", error);
      toast({
        title: "Error",
        description: "Failed to load notification preferences",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updatePreference = async (field: keyof NotificationPreference, value: boolean | string) => {
    if (!preferences) return;

    try {
      const { error } = await supabase
        .from("notification_preferences")
        .update({ [field]: value })
        .eq("id", preferences.id);

      if (error) throw error;

      setPreferences({ ...preferences, [field]: value });

      toast({
        title: "Saved",
        description: "Notification preferences updated",
      });
    } catch (error) {
      console.error("Error updating preferences:", error);
      toast({
        title: "Error",
        description: "Failed to update preferences",
        variant: "destructive",
      });
    }
  };

  const saveEmail = async () => {
    if (!email) {
      toast({
        title: "Email required",
        description: "Please enter an email address",
        variant: "destructive",
      });
      return;
    }

    await updatePreference("user_email", email);
  };

  if (loading) {
    return <div className="text-muted-foreground">Loading...</div>;
  }

  if (!preferences) return null;

  return (
    <Card className="border-border">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Bell className="h-5 w-5" />
          Notification Settings for {subscriptionName}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Bell className="h-4 w-4 text-muted-foreground" />
            <Label htmlFor="push-enabled" className="cursor-pointer">
              Push notification 1 day before renewal
            </Label>
          </div>
          <Switch
            id="push-enabled"
            checked={preferences.push_enabled}
            onCheckedChange={(checked) => updatePreference("push_enabled", checked)}
          />
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <Label htmlFor="email-enabled" className="cursor-pointer">
                Email reminder 1 day before renewal
              </Label>
            </div>
            <Switch
              id="email-enabled"
              checked={preferences.email_enabled}
              onCheckedChange={(checked) => updatePreference("email_enabled", checked)}
            />
          </div>

          {preferences.email_enabled && (
            <div className="ml-7 space-y-2">
              <Label htmlFor="email" className="text-sm text-muted-foreground">
                Email Address
              </Label>
              <div className="flex gap-2">
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1"
                />
                <Button onClick={saveEmail} size="sm">
                  Save
                </Button>
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <Label htmlFor="hour-before" className="cursor-pointer">
              Additional reminder 1 hour before renewal
            </Label>
          </div>
          <Switch
            id="hour-before"
            checked={preferences.hour_before_enabled}
            onCheckedChange={(checked) => updatePreference("hour_before_enabled", checked)}
          />
        </div>

        <p className="text-xs text-muted-foreground mt-4">
          Get notified before your subscriptions auto-renew to avoid unwanted charges
        </p>
      </CardContent>
    </Card>
  );
};
