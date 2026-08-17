import path from "node:path";
import type { NextConfig } from "next";

const securityHeaders = [
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
    value: "camera=(), microphone=(), geolocation=(), payment=()",
  },
];

const contentSecurityPolicy = {
  key: "Content-Security-Policy",
  value: [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline'",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob:",
    "font-src 'self' data:",
    "connect-src 'self'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
  ].join("; "),
};

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  turbopack: {
    root: path.resolve(process.cwd()),
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers:
          process.env.NODE_ENV === "production"
            ? [...securityHeaders, contentSecurityPolicy]
            : securityHeaders,
      },
    ];
  },
  async redirects() {
    return [
      { source: "/privacy", destination: "/poveritelnost", permanent: true },
      { source: "/terms", destination: "/obshti-usloviya", permanent: true },
      { source: "/cookies", destination: "/biskvitki", permanent: true },
    ];
  },
};

export default nextConfig;
