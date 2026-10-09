import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.varaaai.app',
  appName: 'VaraaAi',
  webDir: 'www',

  // This is the whole trick: instead of shipping a local copy of the site,
  // the app's WebView always loads the live website. Any change you deploy
  // to varaaai.com shows up in the app immediately (no app update needed),
  // and anything a customer or salon owner does in the app hits the exact
  // same backend/database as the website, so it's never out of sync.
  server: {
    url: 'https://varaaai.com',
    cleartext: false,
    // Lets the WebView follow links to these hosts without kicking the
    // user out to the system browser — needed for Google sign-in, Stripe's
    // hosted payment pages, and the bank-transfer QR flow.
    allowNavigation: [
      'varaaai.com',
      '*.varaaai.com',
      'accounts.google.com',
      '*.google.com',
      'checkout.stripe.com',
      '*.stripe.com',
    ],
  },

  android: {
    allowMixedContent: false,
  },

  plugins: {
    SplashScreen: {
      launchShowDuration: 1200,
      backgroundColor: '#FEEEE3',
      androidSplashResourceName: 'splash',
      showSpinner: false,
    },
  },
};

export default config;
