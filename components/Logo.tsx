import Link from "next/link";
import Image from "next/image";

export function Logo({ className = "", dark = false }: { className?: string; dark?: boolean }) {
  return (
    <Link
      href="/"
      aria-label="Hapkido Yong, naar homepage"
      className={`group inline-flex items-center gap-3 ${className}`}
    >
      <Image
        src="/logo.png"
        alt="Hapkido Yong logo"
        width={48}
        height={48}
        priority
        className={`h-10 w-auto object-contain ${dark ? "" : ""}`}
      />
      <div className="flex flex-col leading-none">
        <span
          className={`font-[family-name:var(--font-display)] text-xl tracking-wide ${
            dark ? "text-white" : "text-[color:var(--color-heading)]"
          }`}
        >
          Hapkido Yong
        </span>
        <span
          className={`text-[10px] tracking-widest uppercase mt-0.5 ${
            dark ? "text-white/60" : "text-[color:var(--color-muted)]"
          }`}
        >
          Complete Self Defence
        </span>
      </div>
    </Link>
  );
}
