import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Download, CheckCircle, Smartphone } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Install = () => {
  const navigate = useNavigate();
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Check if app is already installed
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setIsInstalled(true);
    }

    // Listen for the beforeinstallprompt event
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true);
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      return;
    }

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === "accepted") {
      setIsInstalled(true);
    }

    setDeferredPrompt(null);
    setIsInstallable(false);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="container max-w-2xl">
        <Card className="bg-gradient-card shadow-hover border-border">
          <CardContent className="p-8 md:p-12">
            <div className="text-center space-y-6">
              <div className="flex justify-center">
                <div className="p-4 rounded-2xl bg-gradient-primary">
                  <Smartphone className="h-12 w-12 text-primary-foreground" />
                </div>
              </div>

              <div>
                <h1 className="text-3xl md:text-4xl font-bold mb-3 text-foreground">
                  Install SubTrack
                </h1>
                <p className="text-lg text-muted-foreground">
                  Get quick access to your subscriptions from your home screen
                </p>
              </div>

              {isInstalled ? (
                <div className="space-y-4">
                  <div className="flex justify-center">
                    <CheckCircle className="h-16 w-16 text-success" />
                  </div>
                  <p className="text-lg font-medium text-success">
                    App is already installed!
                  </p>
                  <Button onClick={() => navigate("/")} size="lg" className="w-full md:w-auto">
                    Go to Dashboard
                  </Button>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="bg-muted rounded-lg p-6 space-y-3 text-left">
                    <h3 className="font-semibold text-foreground">Features:</h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                        <span>Works offline - access your subscriptions anytime</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                        <span>Fast loading and smooth performance</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                        <span>No app store required - install directly</span>
                      </li>
                    </ul>
                  </div>

                  {isInstallable ? (
                    <Button
                      onClick={handleInstallClick}
                      size="lg"
                      className="w-full gap-2"
                    >
                      <Download className="h-5 w-5" />
                      Install App
                    </Button>
                  ) : (
                    <div className="space-y-4">
                      <div className="bg-secondary/50 rounded-lg p-6 text-left">
                        <h3 className="font-semibold text-foreground mb-3">
                          How to install:
                        </h3>
                        <div className="space-y-3 text-sm text-muted-foreground">
                          <div>
                            <p className="font-medium text-foreground mb-1">On iPhone:</p>
                            <p>Tap the Share button, then "Add to Home Screen"</p>
                          </div>
                          <div>
                            <p className="font-medium text-foreground mb-1">On Android:</p>
                            <p>Tap the menu (⋮) and select "Install app" or "Add to Home screen"</p>
                          </div>
                        </div>
                      </div>
                      <Button
                        onClick={() => navigate("/")}
                        variant="outline"
                        size="lg"
                        className="w-full"
                      >
                        Continue in Browser
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Install;
