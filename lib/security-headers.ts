export type SecurityHeader = {
  key: string;
  value: string;
};

/**
 * Static CSP for a prerendered marketing site.
 *
 * Nonce-based CSP is not used: Next.js can only attach nonces during
 * request-time rendering, which would force every page view through a
 * serverless function. That is a worse trade-off for a site with no
 * backend.
 *
 * Next.js embeds the RSC payload in inline `<script>` tags, so
 * `script-src` must allow `'unsafe-inline'`. `script-src-attr 'none'`
 * still blocks inline event handlers such as `onclick=`.
 *
 * `'unsafe-inline'` is also required for styles because Next.js and
 * Tailwind emit inline style attributes.
 *
 * Development does not send CSP. Next.js HMR injects CSS and workers
 * through blob URLs and websockets; putting a production CSP on
 * `next dev` made the preview drop styles or stop hydrating.
 * Production (`next start` and Vercel) still sends the full policy.
 */
export function getContentSecurityPolicy(options: {
  isDev: boolean;
  enableHttpsUpgrade: boolean;
}): string {
  const { isDev, enableHttpsUpgrade } = options;
  const scriptSrc = isDev
    ? "'self' 'unsafe-eval' 'unsafe-inline' blob:"
    : "'self' 'unsafe-inline'";
  const connectSrc = isDev ? "'self' ws: wss:" : "'self'";
  const workerSrc = isDev ? "'self' blob:" : "'self'";

  return [
    "default-src 'self'",
    `script-src ${scriptSrc}`,
    "script-src-attr 'none'",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob:",
    "font-src 'self'",
    `connect-src ${connectSrc}`,
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'none'",
    "frame-ancestors 'none'",
    "frame-src 'none'",
    `worker-src ${workerSrc}`,
    "manifest-src 'self'",
    enableHttpsUpgrade ? "upgrade-insecure-requests" : "",
  ]
    .filter(Boolean)
    .join("; ");
}

export function getSecurityHeaders(options: {
  isDev: boolean;
  enableHttpsUpgrade: boolean;
}): SecurityHeader[] {
  const { isDev } = options;

  const headers: SecurityHeader[] = [
    {
      key: "X-Content-Type-Options",
      value: "nosniff",
    },
    {
      key: "Referrer-Policy",
      value: "strict-origin-when-cross-origin",
    },
    {
      key: "X-Frame-Options",
      value: "DENY",
    },
    {
      key: "Permissions-Policy",
      value:
        "accelerometer=(), autoplay=(), bluetooth=(), camera=(), display-capture=(), geolocation=(), gyroscope=(), hid=(), interest-cohort=(), magnetometer=(), microphone=(), midi=(), payment=(), usb=()",
    },
    {
      key: "Cross-Origin-Opener-Policy",
      value: "same-origin",
    },
    {
      key: "Cross-Origin-Resource-Policy",
      value: "same-origin",
    },
    {
      key: "X-DNS-Prefetch-Control",
      value: "off",
    },
    {
      key: "X-Permitted-Cross-Domain-Policies",
      value: "none",
    },
  ];

  if (!isDev) {
    headers.unshift({
      key: "Content-Security-Policy",
      value: getContentSecurityPolicy(options),
    });
    headers.push({
      key: "Strict-Transport-Security",
      value: "max-age=63072000; includeSubDomains; preload",
    });
  }

  return headers;
}
