"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { WhatsAppFab } from "@/components/WhatsAppFab";
import { CookieBanner } from "@/components/CookieBanner";

// Het dashboard heeft zijn eigen volledige layout (zijbalk, light-panel) en
// mag niet overlappen met de vaste publieke navbar (fixed top-0, z-50).
const CHROME_EXCLUDED_PREFIXES = ["/dashboard"];

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideChrome = CHROME_EXCLUDED_PREFIXES.some((p) => pathname?.startsWith(p));

  if (hideChrome) return <>{children}</>;

  return (
    <>
      <Navbar transparent />
      <main id="main">{children}</main>
      <Footer />
      <WhatsAppFab />
      <CookieBanner />
    </>
  );
}
