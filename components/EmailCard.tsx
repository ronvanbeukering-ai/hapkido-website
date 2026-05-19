import { Mail } from "lucide-react";
import { site } from "@/lib/site";

export function EmailCard() {
  return (
    <a
      href={`mailto:${site.email}`}
      className="card p-6 block hover:border-[color:var(--color-accent-700)] transition-colors h-full"
    >
      <Mail className="text-[color:var(--color-accent-500)]" size={22} />
      <h3 className="font-[family-name:var(--font-display)] text-2xl mt-4">E-mail</h3>
      <p className="text-sm text-[color:var(--color-muted)] mt-1 break-all">{site.email}</p>
    </a>
  );
}
