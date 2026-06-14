"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Menu, Phone, X, LogIn, LogOut, LayoutDashboard, User } from "lucide-react";
import { Logo } from "./Logo";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import { isSuperAdmin } from "@/lib/auth";

const navLinks = [
  { href: "/hapkido-combinatie", label: "Hapkido Combinatie" },
  { href: "/lessen/berkel-enschot", label: "Berkel-Enschot" },
  { href: "/lessen/waalwijk", label: "Waalwijk" },
  { href: "/trainers", label: "Trainers" },
  { href: "/cursussen", label: "Cursussen" },
  { href: "/contributie", label: "Contributie" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

type NavUser = { email: string; isAdmin: boolean } | null;

export function Navbar({ transparent = false }: { transparent?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [navUser, setNavUser] = useState<NavUser>(undefined as unknown as NavUser);
  const supabase = useMemo(() => createClient(), []);

  useEffect(() => {
    async function loadUser() {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) { setNavUser(null); return; }
      try {
        const res = await fetch("/api/auth/me");
        const json = await res.json();
        setNavUser(json.email ? { email: json.email, isAdmin: json.isAdmin } : null);
      } catch {
        const email = session.user.email ?? "";
        setNavUser({ email, isAdmin: isSuperAdmin(email) });
      }
    }
    loadUser();
    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => loadUser());
    return () => subscription.unsubscribe();
  }, [supabase]);

  async function handleLogout() {
    await supabase.auth.signOut();
    setNavUser(null);
    window.location.href = "/";
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const solid = !transparent || scrolled;

  return (
    <>
      <header
        className={cn(
          "fixed top-0 inset-x-0 z-50 transition-all duration-300",
          solid
            ? "bg-[color:var(--color-bg)]/95 backdrop-blur-md border-b border-[color:var(--color-border)] shadow-sm"
            : "bg-transparent"
        )}
      >
        <div className="container-x flex h-16 md:h-20 items-center justify-between">
          <Logo dark={!solid} />

          <nav className="hidden lg:flex items-center gap-1" aria-label="Hoofdnavigatie">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={cn(
                  "text-sm px-3 py-2 transition-colors font-medium",
                  solid
                    ? "text-[color:var(--color-text-strong)] hover:text-[color:var(--color-accent-400)]"
                    : "text-white/85 hover:text-white"
                )}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={`tel:${site.phoneRaw}`}
              className={cn(
                "lg:hidden inline-flex items-center justify-center w-11 h-11 rounded-md",
                solid ? "text-[color:var(--color-text-strong)] hover:bg-white/10" : "text-white hover:bg-white/10"
              )}
              aria-label={`Bel ${site.phone}`}
            >
              <Phone size={20} />
            </a>

            {/* Auth buttons desktop */}
            {navUser === null ? (
              <Link
                href="/login"
                className={cn(
                  "hidden lg:inline-flex items-center gap-1.5 text-sm font-semibold px-3 py-2 rounded-md transition-colors",
                  solid
                    ? "text-[color:var(--color-text-strong)] hover:bg-white/10"
                    : "text-white/85 hover:text-white hover:bg-white/10"
                )}
              >
                <LogIn size={15} /> Inloggen
              </Link>
            ) : navUser != null ? (
              <div className="hidden lg:flex items-center gap-1">
                {navUser.isAdmin && (
                  <Link
                    href="/dashboard"
                    className={cn(
                      "inline-flex items-center gap-1.5 text-sm font-semibold px-3 py-2 rounded-md transition-colors",
                      solid
                        ? "text-[color:var(--color-text-strong)] hover:bg-white/10"
                        : "text-white/85 hover:text-white hover:bg-white/10"
                    )}
                  >
                    <LayoutDashboard size={15} /> Dashboard
                  </Link>
                )}
                <button
                  type="button"
                  onClick={handleLogout}
                  title={`Uitloggen (${navUser.email})`}
                  className={cn(
                    "inline-flex items-center gap-1.5 text-sm font-semibold px-3 py-2 rounded-md transition-colors",
                    solid
                      ? "text-[color:var(--color-text-strong)] hover:bg-white/10"
                      : "text-white/85 hover:text-white hover:bg-white/10"
                  )}
                >
                  <User size={15} />
                  <span className="max-w-[100px] truncate">{navUser.email.split("@")[0]}</span>
                  <LogOut size={13} className="opacity-60" />
                </button>
              </div>
            ) : null}

            <Link href="/proefles" className="hidden sm:inline-flex btn-primary !py-2 !px-4 text-sm">
              Gratis proefles
            </Link>
            <button
              type="button"
              onClick={() => setOpen(true)}
              className={cn(
                "lg:hidden inline-flex items-center justify-center w-11 h-11 rounded-md",
                solid ? "text-[color:var(--color-text-strong)] hover:bg-white/10" : "text-white hover:bg-white/10"
              )}
              aria-label="Open menu"
              aria-expanded={open}
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </header>

      {open && (
        <div className="fixed inset-0 z-[60] lg:hidden" role="dialog" aria-modal="true">
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Sluit menu"
            className="absolute inset-0 bg-stone-950/60 backdrop-blur-sm"
          />
          <div className="absolute inset-y-0 right-0 w-[88%] max-w-sm bg-[color:var(--color-stone-900)] border-l border-[color:var(--color-border)] flex flex-col shadow-2xl">
            <div className="flex items-center justify-between h-16 px-5 border-b border-[color:var(--color-border)]">
              <Logo />
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="w-11 h-11 inline-flex items-center justify-center rounded-md text-[color:var(--color-text-strong)] hover:bg-white/10"
                aria-label="Sluit menu"
              >
                <X size={22} />
              </button>
            </div>
            <nav className="flex-1 overflow-y-auto py-2" aria-label="Mobiele navigatie">
              {navLinks.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block px-5 py-4 text-base text-[color:var(--color-text-strong)] hover:bg-white/10 border-b border-[color:var(--color-border)] font-medium"
                >
                  {l.label}
                </Link>
              ))}
            </nav>
            <div className="p-5 border-t border-[color:var(--color-border)] space-y-3 bg-[color:var(--color-stone-950)]">
              <Link href="/proefles" onClick={() => setOpen(false)} className="btn-primary w-full">
                Plan gratis proefles
              </Link>
              {navUser === null ? (
                <Link href="/login" onClick={() => setOpen(false)} className="btn-secondary w-full">
                  <LogIn size={16} /> Inloggen
                </Link>
              ) : navUser != null ? (
                <>
                  {navUser.isAdmin && (
                    <Link href="/dashboard" onClick={() => setOpen(false)} className="btn-secondary w-full">
                      <LayoutDashboard size={16} /> Dashboard
                    </Link>
                  )}
                  <button type="button" onClick={() => { setOpen(false); handleLogout(); }} className="btn-secondary w-full">
                    <LogOut size={16} /> Uitloggen
                  </button>
                </>
              ) : null}
              <a href={`tel:${site.phoneRaw}`} className="btn-secondary w-full">
                <Phone size={16} /> {site.phone}
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
