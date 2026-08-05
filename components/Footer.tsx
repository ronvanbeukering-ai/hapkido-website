import Link from "next/link";
import { Facebook, Instagram, MapPin, Mail, Phone, MessageCircle, Star } from "lucide-react";
import { Logo } from "./Logo";
import { site, locations } from "@/lib/site";

export function Footer() {
  return (
    <footer className="dark-section border-t border-white/10 mt-20">
      <div className="container-x py-16 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div className="space-y-4">
          <Logo dark />
          <p className="text-sm text-white/65 leading-relaxed">
            Complete selfdefence sinds 2006. Hapkido Combinatie, het Koreaanse MMA voor alle leeftijden.
          </p>
          <div className="flex items-center gap-3">
            <a href={site.socials.facebook} aria-label="Facebook" target="_blank" rel="noopener noreferrer"
              className="w-9 h-9 inline-flex items-center justify-center rounded-md bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/10 transition-colors">
              <Facebook size={16} />
            </a>
            <a href={site.socials.instagram} aria-label="Instagram" target="_blank" rel="noopener noreferrer"
              className="w-9 h-9 inline-flex items-center justify-center rounded-md bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/10 transition-colors">
              <Instagram size={16} />
            </a>
            <a href={site.socials.googleBusiness} aria-label="Google Reviews" target="_blank" rel="noopener noreferrer"
              className="w-9 h-9 inline-flex items-center justify-center rounded-md bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/10 transition-colors">
              <Star size={16} />
            </a>
          </div>
        </div>

        <div>
          <h3 className="text-sm text-white font-display tracking-widest mb-4">Locaties</h3>
          <ul className="space-y-4 text-sm">
            {locations.map((l) => (
              <li key={l.slug}>
                <Link href={`/lessen/${l.slug}`} className="text-white/65 hover:text-white inline-flex items-start gap-2 group">
                  <MapPin size={14} className="mt-1 text-[color:var(--color-accent-400)]" />
                  <span>
                    <span className="block text-white/90 group-hover:text-white">{l.city}</span>
                    <span className="text-xs text-white/50">{l.street}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm text-white font-display tracking-widest mb-4">Snelle Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/proefles" className="text-white/65 hover:text-white">Gratis proefles</Link></li>
            <li><Link href="/aanmelden" className="text-white/65 hover:text-white">Lid worden</Link></li>
            <li><Link href="/online-aanmelden" className="text-white/65 hover:text-white">Online cursus</Link></li>
            <li><Link href="/hapkido-combinatie" className="text-white/65 hover:text-white">Hapkido Combinatie</Link></li>
            <li><Link href="/vrouwen-zelfverdediging" className="text-white/65 hover:text-white">Zelfverdediging voor vrouwen</Link></li>
            <li><Link href="/zelfverdediging-op-locatie" className="text-white/65 hover:text-white">Zelfverdediging op locatie</Link></li>
            <li><Link href="/hapkido-kinderen" className="text-white/65 hover:text-white">Hapkido voor kinderen</Link></li>
            <li><Link href="/trainers" className="text-white/65 hover:text-white">Trainers</Link></li>
            <li><Link href="/contributie" className="text-white/65 hover:text-white">Contributie</Link></li>
            <li><Link href="/academie" className="text-white/65 hover:text-white">Academie</Link></li>
            <li><Link href="/over-ons" className="text-white/65 hover:text-white">Over ons</Link></li>
            <li><Link href="/faq" className="text-white/65 hover:text-white">FAQ</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm text-white font-display tracking-widest mb-4">Contact</h3>
          <ul className="space-y-3 text-sm">
            <li>
              <a href={`tel:${site.phoneRaw}`} className="text-white/65 inline-flex items-center gap-2 hover:text-white">
                <Phone size={14} /> {site.phone}
              </a>
            </li>
            <li>
              <a href={site.whatsapp} target="_blank" rel="noopener noreferrer" className="text-white/65 inline-flex items-center gap-2 hover:text-white">
                <MessageCircle size={14} /> WhatsApp
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="text-white/65 inline-flex items-center gap-2 hover:text-white">
                <Mail size={14} /> {site.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-x py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3 text-xs text-white/55">
            <span className="uppercase tracking-widest text-white/70">Aangesloten bij</span>
            <a href="https://nbjjv.nl" target="_blank" rel="noopener noreferrer" className="px-3 py-1 rounded border border-white/15 text-white/80 hover:border-white/40 hover:text-white transition-colors">NBJJV</a>
          </div>
          <div className="text-xs text-white/55 flex flex-wrap items-center gap-x-4 gap-y-1">
            <span>© {new Date().getFullYear()} Hapkido Yong</span>
            <Link href="/privacy" className="hover:text-white/80">Privacy</Link>
            <Link href="/disclaimer" className="hover:text-white/80">Disclaimer</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
