import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const alt = "Loritalk for Creators — One Idea, Every Platform";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #fff5ee 0%, #fdeee9 60%, #fbded0 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "60px",
        }}
      >
        <div style={{ fontSize: 26, fontWeight: 700, color: "#E54013", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 16, display: "flex" }}>
          Loritalk · For Creators
        </div>
        <div style={{ fontSize: 64, fontWeight: 800, color: "#000", marginBottom: 24, textAlign: "center", lineHeight: 1.05, display: "flex", maxWidth: 980 }}>
          One idea. Every platform.
        </div>
        <div style={{ fontSize: 26, color: "rgba(0,0,0,0.6)", textAlign: "center", maxWidth: 900, display: "flex" }}>
          Your voice on Instagram, TikTok, YouTube Shorts, X &amp; Threads — without the copy-paste
        </div>
        <div
          style={{
            marginTop: 48,
            padding: "14px 40px",
            borderRadius: 999,
            backgroundColor: "#FF6903",
            color: "white",
            fontSize: 22,
            fontWeight: 600,
            display: "flex",
          }}
        >
          Start free with Starter
        </div>
      </div>
    ),
    { ...size },
  );
}
