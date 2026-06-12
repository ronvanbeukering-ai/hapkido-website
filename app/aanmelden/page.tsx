import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import { AanmeldenForm } from "./AanmeldenForm";

export const metadata: Metadata = {
  title: "Aanmelden als lid — Hapkido Yong",
  description:
    "Maak een account aan als lid van Hapkido Yong. Na activering door je trainer krijg je toegang tot de videobibliotheek.",
  alternates: { canonical: `${site.url}/aanmelden` },
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <div className="min-h-screen px-4 pt-20 pb-16">
      <div className="max-w-lg mx-auto">
        <div className="text-center mb-10">
          <Link href="/" className="inline-block mb-6">
            <span className="font-[family-name:var(--font-display)] text-3xl text-[color:var(--color-heading)]">
              Hapkido Yong
            </span>
          </Link>
          <h1 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl text-[color:var(--color-heading)] tracking-tight leading-tight">
            Aanmelden als lid
          </h1>
          <p className="mt-4 text-[color:var(--color-muted)] text-sm leading-relaxed max-w-sm mx-auto">
            Maak een account aan. Je trainer activeert je toegang tot de videobibliotheek — je ontvangt bericht zodra dat gedaan is.
          </p>
        </div>

        <AanmeldenForm />
      </div>
    </div>
  );
}
