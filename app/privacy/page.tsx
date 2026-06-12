import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacyverklaring",
  description: "Hoe Hapkido Yong omgaat met persoonsgegevens van leden, cursisten en bezoekers.",
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[color:var(--color-bg)] pt-24 pb-20 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl text-[color:var(--color-heading)] mb-2">
          Privacyverklaring
        </h1>
        <p className="text-sm text-[color:var(--color-muted)] mb-10">
          Laatste update: juni 2025
        </p>

        <div className="prose prose-stone max-w-none space-y-8 text-[color:var(--color-text)] leading-relaxed">

          <section>
            <h2 className="font-[family-name:var(--font-display)] text-2xl text-[color:var(--color-heading)] mb-3">1. Wie zijn wij?</h2>
            <p>
              Hapkido Yong (ook bekend als Hapkido Nederland) is een sportvereniging gevestigd in Berkel-Enschot, Noord-Brabant. Wij zijn verantwoordelijk voor de verwerking van persoonsgegevens zoals beschreven in deze verklaring.
            </p>
            <ul className="mt-3 space-y-1 text-sm">
              <li><strong>Naam:</strong> Hapkido Yong</li>
              <li><strong>Website:</strong> <a href="https://hapkidonederland.nl" className="text-[color:var(--color-accent-600)] hover:underline">hapkidonederland.nl</a></li>
              <li><strong>E-mail:</strong> <a href="mailto:hapkidonederland@gmail.com" className="text-[color:var(--color-accent-600)] hover:underline">hapkidonederland@gmail.com</a></li>
              <li><strong>Telefoon:</strong> <a href="tel:+31646555555" className="text-[color:var(--color-accent-600)] hover:underline">+31 6 46 55 55 55</a></li>
            </ul>
          </section>

          <section>
            <h2 className="font-[family-name:var(--font-display)] text-2xl text-[color:var(--color-heading)] mb-3">2. Welke gegevens verzamelen wij?</h2>
            <p>Wij verzamelen alleen gegevens die noodzakelijk zijn voor de hieronder genoemde doeleinden:</p>
            <ul className="mt-3 space-y-2 list-disc list-inside text-sm">
              <li><strong>Proeflesaanvraag:</strong> naam, e-mailadres, telefoonnummer, leeftijd, gewenste locatie en dag, en een optionele opmerking.</li>
              <li><strong>Lidmaatschap:</strong> naam, e-mailadres, geboortedatum, IBAN (voor contributie-incasso), noodcontactpersoon.</li>
              <li><strong>Ledenpagina (login):</strong> e-mailadres en de door u gekozen wachtwoord (opgeslagen via Supabase Auth, versleuteld).</li>
              <li><strong>Websitebezoek:</strong> geen tracking-cookies, geen Google Analytics. Wel technische logs via onze hostingprovider (Vercel).</li>
            </ul>
          </section>

          <section>
            <h2 className="font-[family-name:var(--font-display)] text-2xl text-[color:var(--color-heading)] mb-3">3. Waarvoor gebruiken wij uw gegevens?</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-[color:var(--color-border)] rounded-lg overflow-hidden">
                <thead className="bg-[color:var(--color-surface-2)]">
                  <tr>
                    <th className="text-left px-4 py-2 font-semibold text-[color:var(--color-heading)]">Doel</th>
                    <th className="text-left px-4 py-2 font-semibold text-[color:var(--color-heading)]">Grondslag (AVG)</th>
                    <th className="text-left px-4 py-2 font-semibold text-[color:var(--color-heading)]">Bewaartermijn</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[color:var(--color-border)]">
                  <tr>
                    <td className="px-4 py-2">Afhandelen proeflesaanvraag</td>
                    <td className="px-4 py-2">Toestemming</td>
                    <td className="px-4 py-2">6 maanden na aanvraag</td>
                  </tr>
                  <tr className="bg-[color:var(--color-stone-50)]/50">
                    <td className="px-4 py-2">Ledenadministratie &amp; contributie</td>
                    <td className="px-4 py-2">Uitvoering overeenkomst</td>
                    <td className="px-4 py-2">7 jaar (fiscale bewaarplicht)</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2">Toegang tot online lesmateriaal</td>
                    <td className="px-4 py-2">Uitvoering overeenkomst</td>
                    <td className="px-4 py-2">Tot beëindiging lidmaatschap + 1 jaar</td>
                  </tr>
                  <tr className="bg-[color:var(--color-stone-50)]/50">
                    <td className="px-4 py-2">Contact bij vragen of wijzigingen</td>
                    <td className="px-4 py-2">Gerechtvaardigd belang</td>
                    <td className="px-4 py-2">Zo lang als nodig voor afhandeling</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="font-[family-name:var(--font-display)] text-2xl text-[color:var(--color-heading)] mb-3">4. Delen wij uw gegevens?</h2>
            <p>Wij verkopen uw gegevens nooit aan derden. Wij delen gegevens uitsluitend met:</p>
            <ul className="mt-3 space-y-2 list-disc list-inside text-sm">
              <li><strong>Supabase (Supabase Inc., VS):</strong> opslag van leden- en authenticatiegegevens. Supabase is gecertificeerd onder SOC 2 Type II en voldoet aan de AVG via standaard contractbepalingen (SCC).</li>
              <li><strong>Vercel (Vercel Inc., VS):</strong> hosting van de website. Technische logs worden maximaal 30 dagen bewaard.</li>
              <li><strong>NBJJV:</strong> bondsnummer en naam ten behoeve van bandexamens en bondsregistratie.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-[family-name:var(--font-display)] text-2xl text-[color:var(--color-heading)] mb-3">5. Beveiliging</h2>
            <p>
              Wij treffen passende technische en organisatorische maatregelen om uw gegevens te beschermen:
            </p>
            <ul className="mt-3 space-y-1 list-disc list-inside text-sm">
              <li>Alle verbindingen zijn versleuteld via HTTPS (TLS 1.2+).</li>
              <li>Wachtwoorden worden nooit in leesbare vorm opgeslagen (bcrypt via Supabase Auth).</li>
              <li>Toegang tot het beheergedeelte is beperkt tot bevoegde personen via twee-lagen authenticatie (e-mail + rolcontrole).</li>
              <li>Inlogpogingen worden server-side gevalideerd via Supabase Auth.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-[family-name:var(--font-display)] text-2xl text-[color:var(--color-heading)] mb-3">6. Uw rechten</h2>
            <p>Op grond van de AVG heeft u de volgende rechten:</p>
            <ul className="mt-3 space-y-2 list-disc list-inside text-sm">
              <li><strong>Inzage:</strong> u kunt een overzicht opvragen van de gegevens die wij van u verwerken.</li>
              <li><strong>Rectificatie:</strong> onjuiste gegevens laten corrigeren.</li>
              <li><strong>Verwijdering ("recht op vergetelheid"):</strong> u kunt vragen uw gegevens te verwijderen, tenzij wij wettelijk verplicht zijn ze te bewaren.</li>
              <li><strong>Beperking van verwerking:</strong> u kunt verzoeken de verwerking tijdelijk te beperken.</li>
              <li><strong>Bezwaar:</strong> u kunt bezwaar maken tegen verwerking op basis van gerechtvaardigd belang.</li>
              <li><strong>Gegevensoverdraagbaarheid:</strong> u kunt uw gegevens in een gangbaar formaat opvragen.</li>
              <li><strong>Intrekken toestemming:</strong> als verwerking is gebaseerd op toestemming, kunt u die te allen tijde intrekken.</li>
            </ul>
            <p className="mt-3 text-sm">
              U kunt uw verzoek sturen naar{" "}
              <a href="mailto:hapkidonederland@gmail.com" className="text-[color:var(--color-accent-600)] hover:underline">
                hapkidonederland@gmail.com
              </a>
              . Wij reageren binnen 30 dagen.
            </p>
          </section>

          <section>
            <h2 className="font-[family-name:var(--font-display)] text-2xl text-[color:var(--color-heading)] mb-3">7. Cookies</h2>
            <p>
              Deze website gebruikt geen marketing- of trackingcookies. Wij plaatsen uitsluitend functionele sessiecookies (via Supabase Auth) die noodzakelijk zijn voor de login-functionaliteit. Deze cookies worden verwijderd zodra u uitlogt of uw browser sluit.
            </p>
          </section>

          <section>
            <h2 className="font-[family-name:var(--font-display)] text-2xl text-[color:var(--color-heading)] mb-3">8. Klachten</h2>
            <p>
              Heeft u een klacht over de verwerking van uw persoonsgegevens? Neem dan eerst contact met ons op via{" "}
              <a href="mailto:hapkidonederland@gmail.com" className="text-[color:var(--color-accent-600)] hover:underline">
                hapkidonederland@gmail.com
              </a>
              . U heeft ook het recht een klacht in te dienen bij de Autoriteit Persoonsgegevens via{" "}
              <a
                href="https://autoriteitpersoonsgegevens.nl"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[color:var(--color-accent-600)] hover:underline"
              >
                autoriteitpersoonsgegevens.nl
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="font-[family-name:var(--font-display)] text-2xl text-[color:var(--color-heading)] mb-3">9. Wijzigingen</h2>
            <p>
              Wij kunnen deze privacyverklaring aanpassen. De meest actuele versie staat altijd op deze pagina met de datum van de laatste wijziging.
            </p>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-[color:var(--color-border)]">
          <Link href="/" className="text-sm text-[color:var(--color-muted)] hover:text-[color:var(--color-heading)] transition-colors">
            ← Terug naar de website
          </Link>
        </div>
      </div>
    </main>
  );
}
