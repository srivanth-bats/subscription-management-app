import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.9388ac6ee786407496237779a391c14c',
  appName: 'SubTrack',
  webDir: 'dist',
  server: {
    url: 'https://9388ac6e-e786-4074-9623-7779a391c14c.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: "#0ea5e9",
      showSpinner: false,
    },
  },
};

export default config;
