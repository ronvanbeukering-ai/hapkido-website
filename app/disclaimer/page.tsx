import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Disclaimer",
  description: "Aansprakelijkheid, gebruiksvoorwaarden en intellectueel eigendom van hapkidonederland.nl.",
  robots: { index: true, follow: true },
};

export default function DisclaimerPage() {
  return (
    <main className="min-h-screen bg-[color:var(--color-bg)] pt-24 pb-20 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl text-[color:var(--color-heading)] mb-2">
          Disclaimer
        </h1>
        <p className="text-sm text-[color:var(--color-muted)] mb-10">
          Laatste update: juni 2026
        </p>

        <div className="prose prose-stone max-w-none space-y-8 text-[color:var(--color-text)] leading-relaxed">

          <section>
            <h2 className="font-[family-name:var(--font-display)] text-2xl text-[color:var(--color-heading)] mb-3">1. Algemeen</h2>
            <p>
              Deze disclaimer is van toepassing op de website hapkidonederland.nl (ook bereikbaar via completeselfdefence.nl), uitgegeven door Hapkido Yong, gevestigd in Berkel-Enschot, Noord-Brabant ("wij", "ons"). Door deze website te gebruiken, gaat u akkoord met deze disclaimer. Wij besteden zorg aan de juistheid en actualiteit van de informatie op deze website, maar kunnen niet garanderen dat alle informatie (zoals lestijden, prijzen en programma-onderdelen) altijd volledig, juist of actueel is. Aan de inhoud van deze website kunnen geen rechten worden ontleend.
            </p>
          </section>

          <section>
            <h2 className="font-[family-name:var(--font-display)] text-2xl text-[color:var(--color-heading)] mb-3">2. Risico&apos;s van trainen</h2>
            <p>
              Hapkido Combinatie en de overige op deze website beschreven trainingsvormen zijn vechtsporten/zelfverdedigingssystemen waarbij fysiek contact, worpen, vallen, stoten, trappen en gewrichtstechnieken worden toegepast. Deelname brengt een inherent risico op blessures of letsel met zich mee, ook bij correcte uitvoering en onder begeleiding.
            </p>
            <ul className="mt-3 space-y-2 list-disc list-inside text-sm">
              <li>Deelname aan proeflessen, reguliere trainingen en de Hapkido Combinatie Academie is op eigen risico.</li>
              <li>Bent u niet zeker of u medisch gezien kunt deelnemen, raadpleeg dan vooraf een arts.</li>
              <li>Volg altijd de aanwijzingen van de aanwezige trainer of instructeur op en meld een blessure of medische aandoening vooraf.</li>
              <li>Ouders/verzorgers van minderjarige deelnemers zijn verantwoordelijk voor het geven van toestemming voor deelname.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-[family-name:var(--font-display)] text-2xl text-[color:var(--color-heading)] mb-3">3. Online lesmateriaal en video&apos;s</h2>
            <p>
              De videobibliotheek op deze website (waaronder de reguliere lessen, de zwarte band bibliotheek en de Academie-video&apos;s) is bedoeld als aanvulling op begeleide training, niet als vervanging ervan. Sommige getoonde technieken — zoals worpen, gewrichtstechnieken en trappen — kunnen bij verkeerde of ongecontroleerde toepassing tot letsel leiden.
            </p>
            <ul className="mt-3 space-y-2 list-disc list-inside text-sm">
              <li>Oefen technieken uit de video&apos;s alleen onder begeleiding van een gekwalificeerde trainer en met een daarvoor geschikte, instemmende trainingspartner.</li>
              <li>Bouw rustig op: pas geen technieken met volle kracht of snelheid toe zonder eerst de basis onder begeleiding te hebben geleerd.</li>
              <li>Wij geven geen garantie dat het zelfstandig naoefenen van getoonde technieken zonder begeleiding veilig is.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-[family-name:var(--font-display)] text-2xl text-[color:var(--color-heading)] mb-3">4. Aansprakelijkheid</h2>
            <p>
              Hapkido Yong, haar trainers en instructeurs zijn niet aansprakelijk voor schade, blessures of letsel die ontstaan tijdens of als gevolg van deelname aan trainingen, proeflessen, examens of de Academie, of door het toepassen van technieken uit het online lesmateriaal, behalve in geval van opzet of bewuste roekeloosheid van Hapkido Yong of haar trainers. Wij raden iedere deelnemer aan zelf te beoordelen of een passende aansprakelijkheids- en/of ongevallenverzekering aanwezig is.
            </p>
            <p className="mt-3">
              Wij zijn evenmin aansprakelijk voor schade die voortvloeit uit het gebruik van deze website, waaronder onjuistheden of onvolledigheden in de aangeboden informatie, tijdelijke onbeschikbaarheid van de website, of technische storingen.
            </p>
          </section>

          <section>
            <h2 className="font-[family-name:var(--font-display)] text-2xl text-[color:var(--color-heading)] mb-3">5. Intellectueel eigendom</h2>
            <p>
              Alle teksten, foto&apos;s, video&apos;s, logo&apos;s en overige content op deze website zijn eigendom van Hapkido Yong of zijn met toestemming van de rechthebbende geplaatst, en worden beschermd door het auteursrecht. Niets van deze website mag zonder voorafgaande schriftelijke toestemming worden verveelvoudigd, gedownload of openbaar gemaakt, met uitzondering van het gebruik van het online lesmateriaal door leden en abonnees voor persoonlijk, niet-commercieel gebruik.
            </p>
          </section>

          <section>
            <h2 className="font-[family-name:var(--font-display)] text-2xl text-[color:var(--color-heading)] mb-3">6. Links naar derden</h2>
            <p>
              Deze website bevat links naar en embedded content van externe diensten, waaronder Vimeo, YouTube, WhatsApp en social media. Wij hebben geen invloed op en zijn niet verantwoordelijk voor de inhoud, beschikbaarheid of het privacybeleid van deze externe diensten. Het gebruik daarvan is onderworpen aan de voorwaarden van de betreffende aanbieder.
            </p>
          </section>

          <section>
            <h2 className="font-[family-name:var(--font-display)] text-2xl text-[color:var(--color-heading)] mb-3">7. Wijzigingen</h2>
            <p>
              Prijzen, lestijden, locaties en programma-onderdelen kunnen wijzigen. Wij kunnen deze disclaimer aanpassen; de meest actuele versie staat altijd op deze pagina met de datum van de laatste wijziging.
            </p>
          </section>

          <section>
            <h2 className="font-[family-name:var(--font-display)] text-2xl text-[color:var(--color-heading)] mb-3">8. Toepasselijk recht</h2>
            <p>
              Op deze disclaimer en het gebruik van deze website is Nederlands recht van toepassing. Geschillen worden voorgelegd aan de bevoegde rechter in Nederland.
            </p>
          </section>

          <section>
            <h2 className="font-[family-name:var(--font-display)] text-2xl text-[color:var(--color-heading)] mb-3">9. Contact</h2>
            <p>
              Vragen over deze disclaimer kunt u richten aan{" "}
              <a href="mailto:hapkidonederland@gmail.com" className="text-[color:var(--color-accent-600)] hover:underline">
                hapkidonederland@gmail.com
              </a>
              . Zie ook onze{" "}
              <Link href="/privacy" className="text-[color:var(--color-accent-600)] hover:underline">
                privacyverklaring
              </Link>
              .
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
