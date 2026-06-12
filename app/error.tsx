"use client";

import Link from "next/link";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="font-[family-name:var(--font-display)] text-8xl text-[color:var(--color-accent-500)] mb-4">
          !
        </div>
        <h1 className="font-[family-name:var(--font-display)] text-4xl text-[color:var(--color-heading)] mb-4">
          Er ging iets mis
        </h1>
        <p className="text-[color:var(--color-muted)] mb-8">
          Er is een onverwachte fout opgetreden. Probeer het opnieuw of ga terug naar de homepage.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button onClick={reset} className="btn-primary">
            Probeer opnieuw
          </button>
          <Link href="/" className="btn-secondary">
            Terug naar home
          </Link>
        </div>
      </div>
    </div>
  );
}
