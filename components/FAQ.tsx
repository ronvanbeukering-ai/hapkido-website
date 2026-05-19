"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

type Item = { q: string; a: string };

export function FAQ({ items, limit }: { items: readonly Item[]; limit?: number }) {
  const [open, setOpen] = useState<number | null>(0);
  const shown = limit ? items.slice(0, limit) : items;

  return (
    <ul className="divide-y divide-[color:var(--color-border)] rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-surface-2)] overflow-hidden">
      {shown.map((it, i) => {
        const isOpen = open === i;
        return (
          <li key={i}>
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="w-full flex items-center justify-between gap-4 px-5 md:px-6 py-5 text-left hover:bg-[color:var(--color-surface-3)] transition-colors"
            >
              <span className="font-medium text-base md:text-lg pr-4">{it.q}</span>
              <ChevronDown
                size={20}
                className={cn(
                  "shrink-0 text-[color:var(--color-accent-500)] transition-transform duration-200",
                  isOpen && "rotate-180"
                )}
              />
            </button>
            <div
              className={cn(
                "grid transition-all duration-300",
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              )}
            >
              <div className="overflow-hidden">
                <p className="px-5 md:px-6 pb-5 text-sm md:text-base text-[color:var(--color-muted)] leading-relaxed">
                  {it.a}
                </p>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
