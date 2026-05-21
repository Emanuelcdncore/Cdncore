"use client";

import { useSyncExternalStore } from "react";

export const CONSENT_STORAGE_KEY = "loritalk-consent";
export const CONSENT_VERSION = "3";

export type ConsentState = {
  version: string;
  necessary: true;
  analytics: boolean;
  marketing: boolean;
  timestamp: string;
};

const EMPTY: ConsentState = {
  version: CONSENT_VERSION,
  necessary: true,
  analytics: false,
  marketing: false,
  timestamp: "",
};

const subscribe = (cb: () => void) => {
  if (typeof window === "undefined") return () => {};
  const handler = (e: StorageEvent | Event) => {
    if (e instanceof StorageEvent && e.key && e.key !== CONSENT_STORAGE_KEY) return;
    cb();
  };
  window.addEventListener("storage", handler);
  window.addEventListener("loritalk:consent-change", handler);
  return () => {
    window.removeEventListener("storage", handler);
    window.removeEventListener("loritalk:consent-change", handler);
  };
};

const readSnapshot = (): string => {
  if (typeof window === "undefined") return "";
  try {
    return window.localStorage.getItem(CONSENT_STORAGE_KEY) ?? "";
  } catch {
    return "";
  }
};

const parse = (raw: string): ConsentState | null => {
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as Partial<ConsentState>;
    if (parsed.version !== CONSENT_VERSION) return null;
    return {
      version: CONSENT_VERSION,
      necessary: true,
      analytics: parsed.analytics === true,
      marketing: parsed.marketing === true,
      timestamp: typeof parsed.timestamp === "string" ? parsed.timestamp : "",
    };
  } catch {
    return null;
  }
};

export function readConsent(): ConsentState | null {
  return parse(readSnapshot());
}

export function writeConsent(prefs: { analytics: boolean; marketing: boolean }): ConsentState {
  const next: ConsentState = {
    version: CONSENT_VERSION,
    necessary: true,
    analytics: prefs.analytics,
    marketing: prefs.marketing,
    timestamp: new Date().toISOString(),
  };
  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(next));
  } catch {}
  try {
    window.dispatchEvent(new Event("loritalk:consent-change"));
  } catch {}
  return next;
}

export function useConsent(): { recorded: boolean; state: ConsentState } {
  const raw = useSyncExternalStore(subscribe, readSnapshot, () => "");
  const parsed = parse(raw);
  return { recorded: parsed !== null, state: parsed ?? EMPTY };
}
