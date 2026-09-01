"use client";

import Link from "next/link";

export default function GlobalError({
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  return (
    <html lang="en-SG">
      <body
        style={{
          margin: 0,
          fontFamily: "system-ui, sans-serif",
          background: "#F4F1EA",
          color: "#1C1917",
        }}
      >
        <main style={{ maxWidth: 640, margin: "0 auto", padding: "4rem 1.25rem" }}>
          <h1 style={{ fontSize: "1.75rem", fontWeight: 500 }}>
            Something went wrong
          </h1>
          <p style={{ lineHeight: 1.6, color: "#5C5850" }}>
            The page could not be displayed. Refresh, or return to the homepage.
          </p>
          <p style={{ display: "flex", gap: "0.75rem", marginTop: "1.5rem" }}>
            <button
              type="button"
              onClick={() => retry()}
              style={{
                background: "#1F4E46",
                color: "#F4F1EA",
                border: 0,
                borderRadius: 8,
                padding: "0.7rem 1.1rem",
              }}
            >
              Try again
            </button>
            <Link
              href="/"
              style={{
                border: "1px solid #D9D3C7",
                borderRadius: 8,
                padding: "0.7rem 1.1rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              Back to home
            </Link>
          </p>
        </main>
      </body>
    </html>
  );
}
