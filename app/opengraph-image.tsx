import { ImageResponse } from "next/og";

import { siteConfig } from "@/lib/site-config";

export const alt = "Worksplice — small AI automations for repetitive B2B workflows";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#F4F1EA",
          color: "#1C1917",
          padding: "72px",
          fontFamily: "Georgia, serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontFamily: "ui-sans-serif, system-ui",
            fontSize: 22,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "#5C5850",
          }}
        >
          {siteConfig.name} · {siteConfig.location}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ fontSize: 64, lineHeight: 1.1, maxWidth: 920 }}>
            {siteConfig.tagline}
          </div>
          <div
            style={{
              fontFamily: "ui-sans-serif, system-ui",
              fontSize: 28,
              color: "#5C5850",
              maxWidth: 880,
            }}
          >
            {siteConfig.description}
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
