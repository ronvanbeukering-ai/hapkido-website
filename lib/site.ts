export const siteKeywords = [
  // Primair
  "hapkido",
  "hapkido nederland",
  "hapkido combinatie",
  "kwan nyom hapkido",
  "sin moo hapkido",
  // Stijl & systeem
  "koreaans mma",
  "complete zelfverdediging",
  "street defence",
  "complete defence",
  // Secundair — gevechtssporten
  "dim mak",
  "pressure point fighting",
  "systema",
  "taekwondo",
  "bjj",
  "braziliaans jiu-jitsu",
  "jiu-jitsu",
  "krav maga",
  "pencak silat",
  "judo",
  "boksen",
  // Doelgroep
  "vrouwen zelfverdediging",
  "zelfverdediging kinderen",
  "zelfverdediging volwassenen",
  "martial arts nederland",
  "vechtsporten nederland",
  // Persoonsnamen
  "ron van beukering",
  "master ron",
  "ron van beukering-bin ghoni",
  // Doelgroep specifiek
  "hapkido voor kinderen",
  "hapkido voor beginners",
  "hapkido voor vrouwen",
  "hapkido voor 50 plus",
  "gratis proefles hapkido",
  "hapkido proefles",
  "zelfverdediging beginners",
  "zelfverdediging voor vrouwen",
  // Lokaal
  "hapkido berkel-enschot",
  "hapkido waalwijk",
  "hapkido tilburg",
  "hapkido noord-brabant",
  "zelfverdediging berkel-enschot",
  "zelfverdediging waalwijk",
  "zelfverdediging tilburg",
  "martial arts tilburg",
  "martial arts noord-brabant",
] as const;

export const site = {
  name: "Hapkido Yong",
  altName: "Complete Self Defence",
  tagline: "Zelfverdediging voor alle leeftijden",
  description:
    "Hapkido Combinatie, Koreaans MMA voor alle leeftijden. Twee locaties in Noord-Brabant: Berkel-Enschot en Waalwijk. Plan een gratis proefles.",
  url: "https://hapkidonederland.nl",
  domainAlias: "completeselfdefence.nl",
  phone: "+31 6 46 55 55 55",
  phoneRaw: "+31646555555",
  email: "hapkidonederland@gmail.com",
  whatsapp: "https://wa.me/message/GBCYDJPCHVCCA1",
  iban: "NL87 INGB 0007859334",
  socials: {
    facebook: "https://www.facebook.com/Kwannyomhapkido",
    instagram: "https://www.instagram.com/hapkidonederland",
    youtube: "https://www.youtube.com/@hapkidonederland",
    googleBusiness: "https://share.google/7KEaTDlZrNuy6aMNk",
  },
  stats: [
    { value: "18+", label: "Jaar in Nederland" },
    { value: "150+", label: "Actieve leden" },
    { value: "2", label: "Locaties" },
    { value: "9", label: "Vechtsporten gecombineerd" },
  ],
} as const;

export type Location = {
  slug: "berkel-enschot" | "waalwijk";
  city: string;
  street: string;
  postalCode: string;
  region: string;
  geo: { lat: number; lng: number };
  trainerName: string;
  trainerSlug: string;
  schedule: { day: string; time: string; group: string }[];
  note?: string;
  mapsUrl: string;
  mapsEmbed: string;
  photo: string;
};

export const locations: Location[] = [
  {
    slug: "berkel-enschot",
    city: "Berkel-Enschot",
    street: "Kerkstraat 9B",
    postalCode: "5056 AE",
    region: "Noord-Brabant",
    geo: { lat: 51.5741, lng: 5.1564 },
    trainerName: "Master Ron van Beukering",
    trainerSlug: "ron-van-beukering",
    schedule: [
      { day: "Maandag", time: "18:30 – 19:15", group: "Jeugd t/m 12 jaar" },
      { day: "Maandag", time: "19:15 – 20:15", group: "Gemixte groep dames, heren en jongeren" },
      { day: "Woensdag", time: "18:30 – 19:15", group: "Jeugd t/m 13 jaar" },
      { day: "Woensdag", time: "19:15 – 20:15", group: "Gemixte groep" },
      { day: "Woensdag", time: "19:15 – 21:00", group: "Hogere-bandtraining" },
      { day: "Zaterdag", time: "10:30 – 11:30", group: "Gemixte groep" },
      { day: "Zaterdag", time: "11:30 – 12:15", group: "Jeugd t/m 13 jaar" },
    ],
    note: "De eerste maandag van de maand vervalt de reguliere avondles i.v.m. zwarte-bandtraining van de Hapkido Combinatie Academie. Jeugdtraining gaat door.",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Kerkstraat+9B+Berkel-Enschot",
    mapsEmbed: "https://www.google.com/maps?q=Kerkstraat+9B+Berkel-Enschot&z=16&output=embed",
    photo: "/images/training/training-4.jpg",
  },
  {
    slug: "waalwijk",
    city: "Waalwijk",
    street: "Dominee Louwe Kooymanslaan 9",
    postalCode: "5141 AP",
    region: "Noord-Brabant",
    geo: { lat: 51.6899, lng: 5.0614 },
    trainerName: "CGN Marco van Gulik",
    trainerSlug: "marco-van-gulik",
    schedule: [
      { day: "Maandag", time: "19:00 – 20:00", group: "Gemixte groep" },
      { day: "Zaterdag", time: "11:00 – 12:00", group: "Gemixte groep" },
    ],
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Dominee+Louwe+Kooymanslaan+9+Waalwijk",
    mapsEmbed: "https://www.google.com/maps?q=Dominee+Louwe+Kooymanslaan+9+Waalwijk&z=16&output=embed",
    photo: "/images/training/training-2.jpg",
  },
];

export type Trainer = {
  slug: string;
  name: string;
  rank: string;
  shortRank: string;
  role: string;
  location?: "Berkel-Enschot" | "Waalwijk";
  bio: string;
  knowsAbout: string[];
  featured?: boolean;
  photo?: string;
};

export const trainers: Trainer[] = [
  {
    slug: "ron-van-beukering",
    name: "Master Ron van Beukering",
    rank: "6e Dan Hapkido Combinatie · 5e Dan Kwan Nyom Hapkido · 3e Dan Sin Moo Hapkido · 1e Dan Dim Mak",
    shortRank: "6e Dan",
    role: "Hoofdtrainer & Oprichter · 6e Dan",
    location: "Berkel-Enschot",
    bio: "Ron van Beukering heeft 1e Dan Hapkido volgens Mung Jae Nam, 3e Dan Sin Moo Hapkido, 5e Dan Kwan Nyom Hapkido, 6e Dan Hapkido Combinatie, 1e Dan Dim Mak en is basis instructeur Knife Fighting. Verder heeft hij zich verdiept in Systema, Taekwondo (o.b.v. GM Harry Bottse), Dim Mak, diverse meditatie- en ontspanningstechnieken en agressiebeheersing. Hapkido Combinatie ontwikkelt zich door gesprekken, trainingen en bestudering van diverse methodieken. Een belangrijk klankbord hierbij is GM. Harry Bottse.",
    knowsAbout: ["Hapkido Combinatie", "Kwan Nyom Hapkido", "Sin Moo Hapkido", "Taekwondo", "Systema", "Dim Mak", "Knife Fighting", "Agressiebeheersing", "Meditatie"],
    featured: true,
    photo: "/images/trainers/ron-van-beukering.jpg",
  },
  {
    slug: "marco-van-gulik",
    name: "CGN Marco van Gulik",
    rank: "2e Dan Hapkido Combinatie · Senior Instructor · 1e Dan Kwan Nyom Hapkido",
    shortRank: "2e Dan",
    role: "Senior Instructor",
    location: "Waalwijk",
    bio: "Senior Instructor met een sterke Pencak Silat-achtergrond. Al jaren actief als trainer Marietje Kessels-project en Senior Instructor van de Waalwijkse locatie.",
    knowsAbout: ["Hapkido Combinatie", "Pencak Silat", "Weerbaarheidstraining"],
    featured: true,
    photo: "/images/trainers/marco-van-gulik.jpg",
  },
  {
    slug: "jamy-van-den-heuvel-toorop",
    name: "CGN Jamy van den Heuvel-Toorop",
    rank: "2e Dan Senior Instructor · 2e Dan Taekwondo · 1e Dan Kwan Nyom Hapkido",
    shortRank: "2e Dan",
    role: "Senior Instructor",
    bio: "Senior Instructor met jarenlange ervaring in technische lessen en mentorschap.",
    knowsAbout: ["Hapkido Combinatie", "Mentorschap"],
    photo: "/images/trainers/jamy.jpg",
  },
  {
    slug: "jesse-van-mierlo",
    name: "Jesse van Mierlo",
    rank: "2e Dan · 1e Dan Kwan Nyom Hapkido",
    shortRank: "2e Dan",
    role: "2e Dan",
    bio: "Instructor met focus op techniek en jeugdtraining.",
    knowsAbout: ["Hapkido Combinatie", "Jeugdtraining"],
    photo: "/images/trainers/jesse-van-mierlo.jpg",
  },
  {
    slug: "cgn-frits-groenen",
    name: "CGN Frits Groenen",
    rank: "1e Dan",
    shortRank: "1e Dan",
    role: "1e Dan",
    bio: "Instructor met passie voor grondtechnieken en klemmen.",
    knowsAbout: ["Hapkido Combinatie", "Grondwerk"],
    photo: "/images/trainers/frits.jpg",
  },
  {
    slug: "cgn-leonie-klerkx",
    name: "CGN Leonie Klerkx",
    rank: "1e Dan",
    shortRank: "1e Dan",
    role: "1e Dan",
    bio: "Instructor met affiniteit voor jeugd- en vrouwenlessen.",
    knowsAbout: ["Hapkido Combinatie", "Jeugd & Vrouwen"],
    photo: "/images/trainers/leonie.jpg",
  },
  {
    slug: "cgn-zhour",
    name: "CGN Zhour",
    rank: "1e Dan",
    shortRank: "1e Dan",
    role: "Instructor · 1e Dan",
    bio: "Instructor met focus op vrouw-specifieke weerbaarheid.",
    knowsAbout: ["Hapkido Combinatie", "Vrouwen-weerbaarheid"],
    photo: "/images/trainers/zhour.jpg",
  },
  {
    slug: "cho-gyo-chang",
    name: "Cho Gyo Chang",
    rank: "1e Dan",
    shortRank: "1e Dan",
    role: "1e Dan",
    bio: "Instructor met focus op traditionele Hapkido technieken.",
    knowsAbout: ["Hapkido Combinatie"],
    photo: "/images/trainers/cho-gyo-chang.jpg",
  },
  {
    slug: "cgn-sill",
    name: "CGN Sill",
    rank: "1e Dan Hapkido Combinatie",
    shortRank: "1e Dan",
    role: "1e Dan",
    bio: "Toegewijd Instructor binnen het Berkel-Enschotse team.",
    knowsAbout: ["Hapkido Combinatie"],
    photo: "/images/trainers/sill.jpg",
  },
  {
    slug: "cgn-michiel",
    name: "CGN Michiel",
    rank: "1e Dan",
    shortRank: "1e Dan",
    role: "1e Dan",
    bio: "Instructor met focus op trappen, stoten en sparring.",
    knowsAbout: ["Hapkido Combinatie", "Sparring"],
    photo: "/images/trainers/michiel.jpg",
  },
];

export const faq = [
  {
    q: "Vanaf welke leeftijd kan mijn kind meedoen?",
    a: "Kinderen kunnen meedoen vanaf 7 jaar. Voor de leeftijdsgroep tot 12 jaar zijn er aparte jeugdlessen in Berkel-Enschot en Waalwijk.",
  },
  {
    q: "Hoeveel kost de contributie?",
    a: "Jeugd van 7 t/m 12 jaar betaalt €75,00 per kwartaal of €265,00 per jaar. Vanaf 13 jaar is dat €90,00 per kwartaal of €300,00 per jaar. Er is ook een strippenkaart van 10 strippen voor €75,00 voor wie niet regelmatig kan trainen.",
  },
  {
    q: "Hoe vaak per week mag ik trainen?",
    a: "Met een reguliere contributie mag je tot twee keer per week trainen. Extra trainingen zijn in overleg ook mogelijk.",
  },
  {
    q: "Wat moet ik meenemen naar een proefles?",
    a: "Sportkleding, een drinkfles en een handdoek zijn voldoende. Een hapkido-pak heb je voor de proefles niet nodig, dat krijg je pas wanneer je lid wordt.",
  },
  {
    q: "Is Hapkido geschikt voor 50-plussers of beginners?",
    a: "Ja, absoluut. Hapkido Combinatie wordt aangepast aan jouw fysieke mogelijkheden. Er trainen mensen van alle leeftijden en niveaus naast elkaar.",
  },
  {
    q: "Wat is de Hapkido Combinatie Academie?",
    a: "De Hapkido Combinatie Academie organiseert maandelijkse zwarte-bandtrainingen, toegankelijk voor leden vanaf bruine band. Op de eerste maandag van de maand vervalt hiervoor de reguliere avondles in Berkel-Enschot (de jeugdtraining gaat wel door).",
  },
  {
    q: "Bij welke federatie is Hapkido Yong aangesloten?",
    a: "Hapkido Yong is aangesloten bij de NBJJV (Nederlandse Bond voor Judo, Jiu-Jitsu en Vormgeving). De bondsbijdrage bedraagt €25,00 per jaar.",
  },
  {
    q: "Leg ik examen af voor een band?",
    a: "Ja. Bandexamens worden afgenomen door de examencommissie van Hapkido Combinatie. Dan-examens worden afgenomen bij de NBJJV. Je trainer bepaalt wanneer je klaar bent om examen te doen.",
  },
] as const;

export const testimonials = [
  {
    quote:
      "Ik kwam binnen met nul ervaring en ben in twee jaar enorm gegroeid, niet alleen technisch maar ook mentaal. De sfeer is open, je wordt nooit afgebrand, en de trainers nemen écht de tijd.",
    name: "Sandra V.",
    meta: "Lid Berkel-Enschot · 2 jaar",
  },
  {
    quote:
      "Mijn zoon was eerst onzeker en wat klein voor zijn leeftijd. Na een jaar Hapkido staat hij sterker in zijn schoenen, letterlijk en figuurlijk. De jeugdtraining is streng waar nodig en speels waar het kan.",
    name: "Joris H.",
    meta: "Vader van Liam (9) · Berkel-Enschot",
  },
  {
    quote:
      "Ik zocht iets praktisch, geen sport-vechten maar echte zelfverdediging. Marco geeft les met humor en serieuze inhoud, je leert technieken die op straat kloppen, niet alleen in een ring.",
    name: "Karim B.",
    meta: "Lid Waalwijk · 6 maanden",
  },
];

export const benefits = [
  { title: "Zelfvertrouwen", body: "Sterker in je schoenen staan, in elke situatie." },
  { title: "Weerbaarheid", body: "Praktische technieken die op straat kloppen, niet alleen in de ring." },
  { title: "Conditie", body: "Lenigheid, kracht, snelheid en uithoudingsvermogen." },
  { title: "De-escalatie", body: "Je leert niet vechten, maar voorkomen, controle eerst." },
  { title: "Focus", body: "Ademhaling en meditatie geven controle over stress en emoties." },
  { title: "Community", body: "Een gezellige groep van alle leeftijden, sociale contacten en respect." },
] as const;

export const disciplines = [
  "Hapkido",
  "Jiu-Jitsu",
  "Judo",
  "Taekwondo",
  "Systema",
  "Boksen",
  "Pencak Silat",
  "Krav Maga",
  "Braziliaans Jiu-Jitsu",
] as const;
