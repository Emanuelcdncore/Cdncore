import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const alt = "Loritalk \u2014 AI Content for Every Social Network";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #f0f7e6 0%, #e8f0fd 60%, #fff5ee 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "60px",
        }}
      >
        <div style={{ fontSize: 72, fontWeight: 700, color: "#000", marginBottom: 16, display: "flex" }}>
          Loritalk
        </div>
        <div style={{ fontSize: 32, color: "#94BF5C", fontWeight: 600, marginBottom: 24, display: "flex" }}>
          One idea. Every platform.
        </div>
        <div style={{ fontSize: 22, color: "rgba(0,0,0,0.55)", textAlign: "center", maxWidth: 800, display: "flex" }}>
          AI content for Instagram, LinkedIn, X, TikTok &amp; Facebook — powered by multiple AI models
        </div>
        <div
          style={{
            marginTop: 40,
            padding: "14px 40px",
            borderRadius: 999,
            backgroundColor: "#94BF5C",
            color: "white",
            fontSize: 22,
            fontWeight: 600,
            display: "flex",
          }}
        >
          Start creating for free
        </div>
      </div>
    ),
    { ...size },
  );
}
