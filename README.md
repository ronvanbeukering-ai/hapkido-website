# Hapkido Yong — Moderne website

Moderne, snelle en SEO-vriendelijke website voor Hapkido Yong / Complete Self Defence. Twee locaties (Berkel-Enschot, Waalwijk).

## Stack

- **Next.js 15** (App Router, React 19)
- **Tailwind CSS v4** (CSS-first config via `@theme`)
- **TypeScript** (strict)
- **lucide-react** voor iconen
- **Bebas Neue + Inter** via `next/font`

## Snel starten

```bash
cd hapkido-website
npm install
npm run dev
```

Open http://localhost:3000

Productie build:

```bash
npm run build
npm run start
```

## Project structuur

```
app/
  layout.tsx              # Root layout met fonts, Navbar, Footer, JSON-LD Organization
  page.tsx                # Home
  hapkido-combinatie/     # Wat is Hapkido Combinatie
  lessen/
    berkel-enschot/       # Locatiepagina + ScheduleTable + ProeflesForm
    waalwijk/
  trainers/               # Overzicht + individuele profielen
    ron-van-beukering/
    marco-van-gulik/
  contributie/            # Tarieven (jeugd, 13+, strippenkaart)
  academie/               # Zwarte-bandtraining info
  proefles/               # Gratis proefles flow + formulier
  over-ons/               # Missie, waarden, federaties
  contact/                # Telefoon, WhatsApp, e-mail, locaties
  faq/                    # 8 FAQ-items met JSON-LD
  not-found.tsx           # 404
  sitemap.ts              # Dynamische sitemap
  robots.ts               # robots.txt
  api/proefles/route.ts   # POST endpoint voor proefles-aanvragen

components/
  Navbar.tsx              # Sticky transparant → solid, mobile drawer
  Footer.tsx              # 4-koloms + federatie-strip
  Hero.tsx                # HomeHero (fullscreen) + PageHero
  Logo.tsx                # SVG logo
  WhatsAppFab.tsx         # Sticky WhatsApp FAB (mobiel)
  LocationCard.tsx
  TrainerCard.tsx
  ScheduleTable.tsx
  ProeflesForm.tsx        # Met success/error states
  Testimonials.tsx
  StatsRow.tsx
  CTABanner.tsx
  FAQ.tsx                 # Custom accordion
  Reveal.tsx              # IntersectionObserver fade-in-up
  JsonLd.tsx              # Renders structured data

lib/
  site.ts                 # Site config, locaties, trainers, FAQ, testimonials
  jsonld.ts               # JSON-LD schema builders (Organization, MartialArtsSchool, Person, FAQPage, VideoObject, Breadcrumb)
  utils.ts                # cn() helper
```

## Design system

Tokens staan in `app/globals.css` onder `@theme`:

- **Kleuren:** neutral (zwart/antraciet) + accent rood. Goud als secundaire badge-kleur.
- **Typografie:** Bebas Neue display, Inter body. Schaal `text-xs` t/m `text-9xl`.
- **Radius:** scherp (sm/md/lg) — past bij vechtsport.
- **Shadows:** dark-friendly, plus `--shadow-glow-red` voor primary CTA.

Componentklassen (`.btn-primary`, `.btn-secondary`, `.btn-ghost`, `.card`, `.input`, `.label`, `.badge-red`, `.badge-gold`) zijn herbruikbaar.

## SEO

- Per-pagina `metadata` met title/description/canonical/OG/keywords (`alternates.canonical`, `openGraph`, `twitter`).
- JSON-LD structured data per pagina:
  - `Organization` — root layout
  - `MartialArtsSchool` + `LocalBusiness` — per locatie (incl. `openingHoursSpecification`)
  - `Person` — Master Ron, Marco van Gulik
  - `FAQPage` — FAQ pagina
  - `VideoObject` — homepage Vimeo
  - `BreadcrumbList` — per subpagina
- `app/sitemap.ts` + `app/robots.ts` (Next.js conventie).
- Skip-link voor toetsenbordnavigatie, semantische HTML, `lang="nl"`.

## Aanpassen

**Domein / contact** — wijzig `lib/site.ts`. Alle metadata, JSON-LD en footer-links volgen automatisch.

**Lestijden / trainers** — pas `locations[]` of `trainers[]` aan in `lib/site.ts`. JSON-LD `openingHoursSpecification` wordt automatisch hergegenereerd uit de schedule.

**FAQ** — `faq[]` in `lib/site.ts`. FAQPage JSON-LD update vanzelf.

**Proefles e-mail** — `app/api/proefles/route.ts` logt nu alleen naar console. Koppel een provider zoals Resend, Postmark of een SMTP-relay:

```ts
// in route.ts, na de validatie
import { Resend } from "resend";
const resend = new Resend(process.env.RESEND_API_KEY);
await resend.emails.send({
  from: "noreply@hapkidonederland.nl",
  to: site.email,
  reply_to: body.email,
  subject: `Proefles-aanvraag: ${body.naam} (${body.locatie})`,
  text: JSON.stringify(body, null, 2),
});
```

En een autoresponder naar de aanvrager met de mail uit het content-plan.

## Performance & a11y checklist

- [x] Fonts via `next/font` met `display: swap`
- [x] Lazy Maps embed (`loading="lazy"`)
- [x] Skip-link + `lang="nl"` + semantische landmarks
- [x] `prefers-reduced-motion` respect in CSS
- [x] Click-to-call op mobiele navbar (`tel:` link)
- [x] WhatsApp FAB met `aria-label`
- [ ] Echte foto's vervangen (nu Unsplash placeholders met dark overlay)
- [ ] OG-images per pagina (`/public/og/*.jpg`, 1200×630)
- [ ] Cookiebanner als analytics wordt toegevoegd

## TODO voor live-gang

1. Echte foto's van trainingen toevoegen onder `/public/images/` en de Unsplash URLs in `components/Hero.tsx` / `LocationCard.tsx` vervangen.
2. Logo SVG vervangen door definitieve Yong-logo in `components/Logo.tsx` + `public/favicon.svg`.
3. KvK / BTW nummer toevoegen in `components/Footer.tsx`.
4. E-mail provider koppelen in `app/api/proefles/route.ts`.
5. Cookiebanner (alleen functionele cookies, analytische opt-in).
6. Google Business Profile claimen voor beide locaties.
7. 301 redirects vanaf `completeselfdefence.nl` instellen via DNS-provider.
8. OG-images genereren per pagina (1200×630).
9. Lighthouse run — target 90+ op alle vier de scores.

## Deploy

Push naar GitHub en koppel aan Vercel. Geen extra config nodig — `next.config.ts` heeft al security headers, image optimization en trailing-slash false. Voeg env var `RESEND_API_KEY` (of vergelijkbaar) toe als de proefles-mail live moet.
