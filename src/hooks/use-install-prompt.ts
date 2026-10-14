"use client";

import { useEffect, useState } from "react";

export interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export function isIos() {
  return /iphone|ipad|ipod/i.test(window.navigator.userAgent);
}

const INSTALLED_KEY = "varaaai_pwa_installed";

function isStandalone() {
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    (window.navigator as Navigator & { standalone?: boolean }).standalone === true
  );
}

function rememberInstalled() {
  try {
    localStorage.setItem(INSTALLED_KEY, "1");
  } catch {
    // Private browsing or storage disabled — falls back to per-tab
    // detection via isStandalone() below.
  }
}

/** Shared install-prompt state for every "install the app" entry point on
 * the site (navbar button, the prominent bottom banner, …) — each instance
 * tracks the same global `beforeinstallprompt`/`appinstalled` events
 * independently, so they all flip to "installed" together without needing
 * to coordinate through shared state.
 *
 * `display-mode: standalone` only tells us the CURRENT tab is running inside
 * the installed app shell — a customer who installs the app and later opens
 * a normal browser tab would otherwise see the prompt again. A localStorage
 * flag, set the moment we observe either signal, makes "already installed"
 * stick across ordinary browser visits on the same device too. */
export function useInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [installed, setInstalled] = useState(true);

  useEffect(() => {
    const standalone = isStandalone();
    let rememberedInstalled = false;
    try {
      rememberedInstalled = localStorage.getItem(INSTALLED_KEY) === "1";
    } catch {
      // Ignore — treat as not remembered.
    }
    if (standalone) rememberInstalled();
    setInstalled(standalone || rememberedInstalled);

    function onBeforeInstallPrompt(e: Event) {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    }
    function onInstalled() {
      rememberInstalled();
      setInstalled(true);
      setDeferredPrompt(null);
    }
    window.addEventListener("beforeinstallprompt", onBeforeInstallPrompt);
    window.addEventListener("appinstalled", onInstalled);
    return () => {
      window.removeEventListener("beforeinstallprompt", onBeforeInstallPrompt);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  /** Triggers the native install dialog where supported. Returns
   * "unsupported" when the browser never fired `beforeinstallprompt` (iOS
   * Safari, or engagement heuristics not met yet) so the caller can fall
   * back to manual instructions. */
  async function promptInstall(): Promise<"accepted" | "dismissed" | "unsupported"> {
    if (!deferredPrompt) return "unsupported";
    await deferredPrompt.prompt();
    const choice = await deferredPrompt.userChoice;
    if (choice.outcome === "accepted") {
      rememberInstalled();
      setInstalled(true);
    }
    setDeferredPrompt(null);
    return choice.outcome;
  }

  return { installed, promptInstall };
}
