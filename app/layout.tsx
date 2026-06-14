import type { Metadata, Viewport } from "next";
import { Bebas_Neue, Inter } from "next/font/google";
import Script from "next/script";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { WhatsAppFab } from "@/components/WhatsAppFab";
import { JsonLd } from "@/components/JsonLd";
import { organizationSchema } from "@/lib/jsonld";
import { site, siteKeywords } from "@/lib/site";
import "./globals.css";

const GA_ID = "G-WJK9Q2Y9RW";

const displayFont = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const bodyFont = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} Hapkido Combinatie in Berkel-Enschot & Waalwijk`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  keywords: [...siteKeywords],
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: site.name,
  formatDetection: { telephone: false, email: false, address: false },
  alternates: {
    canonical: site.url,
    languages: { "nl-NL": site.url },
  },
  openGraph: {
    type: "website",
    locale: "nl_NL",
    url: site.url,
    siteName: site.name,
    title: `${site.name} Hapkido Combinatie in Noord-Brabant`,
    description: site.description,
    images: [
      {
        url: "/images/training/training-1.jpg",
        width: 1200,
        height: 630,
        alt: "Hapkido Yong Hapkido Combinatie training in Berkel-Enschot en Waalwijk",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} Hapkido Combinatie in Noord-Brabant`,
    description: site.description,
    images: ["/images/training/training-1.jpg"],
  },
  robots: { index: true, follow: true },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#0d0d0f",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="nl" className={`${displayFont.variable} ${bodyFont.variable}`}>
      <head>
        <JsonLd data={organizationSchema} />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:bg-white focus:text-black focus:px-4 focus:py-2 focus:rounded-md"
        >
          Skip naar content
        </a>
        <Navbar transparent />
        <main id="main">{children}</main>
        <Footer />
        <WhatsAppFab />
        <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
        <Script id="gtag-init" strategy="afterInteractive">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}');
        `}</Script>
      </body>
    </html>
  );
}
