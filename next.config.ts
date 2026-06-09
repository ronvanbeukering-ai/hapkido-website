import type { NextConfig } from "next";

// Supabase project hostname for CSP – only the anon/public host is needed here
const SUPABASE_HOST = "clvzytfjmoeimalozlck.supabase.co";
const isDev = process.env.NODE_ENV === "development";

const nextConfig: NextConfig = {
  trailingSlash: false,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "i.vimeocdn.com" },
      // YouTube thumbnails used in dashboard & cursus page
      { protocol: "https", hostname: "img.youtube.com" },
    ],
  },
  async redirects() {
    return [
      { source: "/lessen", destination: "/lessen/berkel-enschot", permanent: true },
    ];
  },
  async headers() {
    // Build a strict Content-Security-Policy.
    // 'unsafe-inline' for style is required by Tailwind CSS (inline styles via className).
    // 'unsafe-eval' is NOT included – Next.js 15 no longer needs it in production.
    // Adjust frame-src if you embed Vimeo or YouTube iframes directly.
    const csp = [
      "default-src 'self'",
      // Scripts: self + unsafe-inline (Next.js) + unsafe-eval only in dev (React Refresh needs it)
      `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""} https://www.youtube.com https://s.ytimg.com`,
      // Styles: self + inline (Tailwind)
      "style-src 'self' 'unsafe-inline'",
      // Images: self + YouTube thumbnails + Vimeo CDN + data URIs (favicons)
      "img-src 'self' data: https://img.youtube.com https://i.ytimg.com https://i.vimeocdn.com https://vumbnail.com",
      // Fonts: self only
      "font-src 'self'",
      // Connect: self + Supabase (auth, DB) + Vimeo API
      `connect-src 'self' https://${SUPABASE_HOST} https://api.supabase.com wss://${SUPABASE_HOST}`,
      // Frames: YouTube & Vimeo embeds + Google Maps
      "frame-src https://www.youtube.com https://www.youtube-nocookie.com https://player.vimeo.com https://www.google.com",
      // Media: self + Supabase storage (video uploads)
      `media-src 'self' https://${SUPABASE_HOST}`,
      // Workers, manifests
      "worker-src 'self' blob:",
      "form-action 'self'",
      // Prevent clickjacking via CSP (redundant with X-Frame-Options but defence-in-depth)
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "object-src 'none'",
    ].join("; ");

    return [
      {
        source: "/(.*)",
        headers: [
          // Prevent MIME-type sniffing
          { key: "X-Content-Type-Options", value: "nosniff" },
          // Clickjacking protection
          { key: "X-Frame-Options", value: "DENY" },
          // Referrer policy
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          // Restrict browser features
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=()" },
          // Force HTTPS for 1 year (only active over HTTPS; Vercel handles this)
          { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains; preload" },
          // Disable DNS prefetching for privacy
          { key: "X-DNS-Prefetch-Control", value: "off" },
          // Content Security Policy
          { key: "Content-Security-Policy", value: csp },
        ],
      },
    ];
  },
};

export default nextConfig;
