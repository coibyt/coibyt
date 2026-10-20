package com.varaaai.app;

import android.os.Bundle;
import android.webkit.WebSettings;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
  @Override
  public void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);

    // Google's sign-in screen refuses to load inside an embedded WebView
    // and shows "This browser or app may not be secure" — Android marks
    // its WebView with a "; wv" tag in the user-agent, which Google
    // specifically detects and blocks. This WebView is a full, current
    // Chromium engine (the same one Chrome itself is built on), so
    // presenting it as plain Chrome Mobile lets "Continue with Google"
    // complete normally instead of being refused.
    WebSettings settings = getBridge().getWebView().getSettings();
    String ua = settings.getUserAgentString();
    if (ua != null) {
      settings.setUserAgentString(ua.replace("; wv", ""));
    }

    // The dashboard's new-booking alarm plays a loud chime from the page
    // (src/components/booking-alarm.tsx). A WebView normally blocks sound
    // until the person taps the screen; the owner's phone may be lying on
    // the counter, so let it ring without that first tap.
    settings.setMediaPlaybackRequiresUserGesture(false);
  }
}
