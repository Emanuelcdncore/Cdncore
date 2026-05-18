"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { useConsent } from "@/lib/consent";

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

  return (
    <Script id="meta-pixel" strategy="afterInteractive">
      {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
fbq('init','${PIXEL_ID}');
fbq('track','PageView');`}
    </Script>
  );
}
