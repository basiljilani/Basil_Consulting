import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site";

export const alt = siteConfig.seoTitle;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Social card, rendered at build time. Satori supports a flexbox subset only —
 * no grid, no CSS variables, every element needs an explicit display.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#000000",
          padding: 72,
          position: "relative",
        }}
      >
        {/* Wordmark */}
        <div
          style={{
            display: "flex",
            fontSize: 30,
            color: "#f7f8f8",
            letterSpacing: -1,
            fontWeight: 500,
          }}
        >
          Basil Consulting
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 20,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: "#4dfaa2",
              marginBottom: 28,
            }}
          >
            The future of business analytics
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 76,
              lineHeight: 1.04,
              letterSpacing: -3,
              color: "#f7f8f8",
              maxWidth: 940,
            }}
          >
            Where data stops reporting and starts deciding.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid rgba(255,255,255,0.12)",
            paddingTop: 28,
            fontSize: 20,
            color: "#6b7280",
          }}
        >
          <div style={{ display: "flex" }}>
            Decision intelligence · AI analytics · Data platforms
          </div>
          <div style={{ display: "flex", color: "#a1a8b3" }}>basilconsulting.net</div>
        </div>
      </div>
    ),
    size,
  );
}
