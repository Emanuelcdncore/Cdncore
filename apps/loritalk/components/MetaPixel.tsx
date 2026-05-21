"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { useConsent } from "@/lib/consent";
import { captureFbclidIfPresent } from "@/lib/fbAttribution";

const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID ?? "2426542774480370";

declare global {
  interface Window {
    fbq?: ((...args: unknown[]) => void) & { callMethod?: unknown };
    _fbq?: unknown;
  }
}

export default function MetaPixel() {
  const { recorded, state } = useConsent();
  const pathname = usePathname();
  const initialized = useRef(false);
  const enabled = recorded && state.marketing && !!PIXEL_ID;

  // Capture `?fbclid=` into the `_fbc` cookie regardless of consent so
  // the value is ready the moment the visitor opts in (Meta CAPI
  // requires `fbc` to match the click). This is a single cookie write
  // with no network call — non-tracking on its own.
  useEffect(() => {
    captureFbclidIfPresent();
  }, [pathname]);

  useEffect(() => {
    if (!enabled) {
      if (initialized.current && typeof window !== "undefined" && typeof window.fbq === "function") {
        window.fbq("consent", "revoke");
      }
      return;
    }
    if (typeof window === "undefined") return;
    if (typeof window.fbq === "function") {
      window.fbq("consent", "grant");
      window.fbq("track", "PageView");
      initialized.current = true;
    }
  }, [enabled, pathname]);

  if (!enabled) return null;

  // `autoConfig: true` enables Meta's Automatic Advanced Matching —
  // the SDK reads form fields visible on the page (email, phone,
  // name) and hashes + forwards them with every Pixel event. Boosts
  // Match Quality without extra code, complementing the server-side
  // CAPI Purchase that fires from the Stripe webhook handler.
  return (
    <Script id="meta-pixel" strategy="afterInteractive">
      {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
fbq('init','${PIXEL_ID}',{},{autoConfig:true});
fbq('track','PageView');`}
    </Script>
  );
}
