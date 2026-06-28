export type Les = {
  nr: number;
  titel: string;
  duur: string;
  categorie: string;
  gratis: boolean;
  belt?: "white-green" | "green-red";
  video_url?: string;
};

export type HapkidoVideo = {
  id: string;
  titel: string;
  beschrijving: string;
  categorie:
    | "uitleg"
    | "stoten"
    | "elleboog"
    | "hammerslag"
    | "palm"
    | "trappen"
    | "ground"
    | "kwan-nyom"
    | "hapkido-nederland"
    | "eigen"
    | "zwarte-band"
    | "academie";
  subcategorie?: string | null;
  platform?: "youtube" | "vimeo" | "local";
};

export const onlineLessen: Les[] = [
  { nr: 1, titel: "Basishoudingen & voetenwerk",       duur: "18m", categorie: "Houding", gratis: true,  belt: "white-green", video_url: "vimeo-1198905757" },
  { nr: 2, titel: "Inward Elbow",                       duur: "12m", categorie: "Stoten",  gratis: true,  belt: "white-green", video_url: "vimeo-1198905564" },
  { nr: 3, titel: "Stoten — basisreeks tot rode band", duur: "30m", categorie: "Stoten",  gratis: false, belt: "white-green" },
  { nr: 4, titel: "Trappen — basisreeks tot rode band",duur: "30m", categorie: "Trappen", gratis: false, belt: "green-red"   },
  { nr: 5, titel: "Locks — uitleg en demonstratie",    duur: "35m", categorie: "Locks",   gratis: false, belt: "green-red"   },
];

export const ledenLessen: Les[] = [
  { nr: 1,  titel: "Introductie & doelstellingen",        duur: "12m", categorie: "Basis",     gratis: true,  belt: "white-green" },
  { nr: 2,  titel: "Houding en voetenwerk",               duur: "18m", categorie: "Basis",     gratis: true,  belt: "white-green" },
  { nr: 3,  titel: "Valbreektechnieken (ukemi)",          duur: "22m", categorie: "Basis",     gratis: false, belt: "white-green" },
  { nr: 4,  titel: "Basisgrepen — pols en arm",           duur: "25m", categorie: "Grepen",    gratis: false, belt: "white-green" },
  { nr: 5,  titel: "Ontgrendelen bij manchetgreep",       duur: "20m", categorie: "Grepen",    gratis: false, belt: "white-green" },
  { nr: 6,  titel: "Stoten en trappen — basisreeks",      duur: "30m", categorie: "Slagen",    gratis: false, belt: "green-red"   },
  { nr: 7,  titel: "Werpingen — ogoshi en o-soto-gari",   duur: "28m", categorie: "Werpingen", gratis: false, belt: "green-red"   },
  { nr: 8,  titel: "Joint locks — elleboog en schouder",  duur: "35m", categorie: "Locks",     gratis: false, belt: "green-red"   },
  { nr: 9,  titel: "Verweer bij zijdelingse aanval",      duur: "22m", categorie: "Verweer",   gratis: false, belt: "green-red"   },
  { nr: 10, titel: "Verweer bij achteraanval",            duur: "24m", categorie: "Verweer",   gratis: false, belt: "green-red"   },
  { nr: 11, titel: "Wapen: bokken (houten stok)",         duur: "32m", categorie: "Wapens",    gratis: false, belt: "green-red"   },
  { nr: 12, titel: "Wapen: korte stok (dan bong)",        duur: "28m", categorie: "Wapens",    gratis: false, belt: "green-red"   },
];

export const hapkidoLessen = onlineLessen;

export const hapkidoVideos: HapkidoVideo[] = [

  // ── Uitleg & Basistechnieken ────────────────────────────────
  { id: "1198905929", platform: "vimeo", categorie: "uitleg",     titel: "Balans en disbalans",              beschrijving: "Uitleg over balans en disbalans als basis van hapkido." },
  { id: "1198905559", platform: "vimeo", categorie: "uitleg",     titel: "Standen",                          beschrijving: "Uitleg over de vechthouding en standen." },
  { id: "1198905806", platform: "vimeo", categorie: "uitleg",     titel: "Rolling technieken",               beschrijving: "Rolval- en valdoorstoefeningen (ukemi)." },
  { id: "1198905757", platform: "vimeo", categorie: "uitleg",     titel: "Hapkido Combinatie — uitleg",      beschrijving: "Algemene uitleg over de Hapkido Combinatie methode." },
  { id: "1198905880", platform: "vimeo", categorie: "uitleg",     titel: "Uitleg locks & klemmen",           beschrijving: "Introductie van gewrichtsklemmen in hapkido." },
  { id: "1198905900", platform: "vimeo", categorie: "uitleg",     titel: "Uitleg Drills",                    beschrijving: "Drills en oefenmethoden voor efficiënt trainen." },
  { id: "762278422",   platform: "vimeo", categorie: "uitleg",     titel: "Hapkido Yong — training",          beschrijving: "Trainingsvideo Hapkido Yong." },
  { id: "1199526926", platform: "vimeo", categorie: "uitleg",     titel: "Groepsles — gemixte groep",        beschrijving: "Impressie van een training met een gemixte groep." },
  { id: "809686134",  platform: "vimeo", categorie: "uitleg",     titel: "Hapkido Combinatie — technieken demonstratie", beschrijving: "Demonstratie van Hapkido Combinatie technieken." },
  { id: "1199536635", platform: "vimeo", categorie: "uitleg",     titel: "Hapkido training trappen en stoten — deel 1", beschrijving: "Stand-up technieken uit de Hapkido training." },
  { id: "1199539288", platform: "vimeo", categorie: "uitleg",     titel: "Hapkido training trappen en stoten — deel 2", beschrijving: "Stand-up technieken uit de Hapkido training." },

  // ── Stoten & Slagen ─────────────────────────────────────────
  { id: "1198905933", platform: "vimeo", categorie: "stoten",     titel: "Jab",                              beschrijving: "Basis jab stoot." },
  { id: "1198905509", platform: "vimeo", categorie: "stoten",     titel: "Cross strike",                     beschrijving: "Cross stoot techniek." },
  { id: "1198905759", platform: "vimeo", categorie: "stoten",     titel: "Forearm strike",                   beschrijving: "Onderarmstoot techniek." },
  { id: "1198905804", platform: "vimeo", categorie: "stoten",     titel: "Outer forearm strike",             beschrijving: "Buitenste onderarmstoot." },
  { id: "1198905784", platform: "vimeo", categorie: "stoten",     titel: "Tijger mouth",                     beschrijving: "Tijgerbek palmslag techniek." },
  { id: "1198905531", platform: "vimeo", categorie: "stoten",     titel: "Uppercut cross hand",              beschrijving: "Uppercut met crosshand beweging." },
  { id: "1198905532", platform: "vimeo", categorie: "stoten",     titel: "Uppercut cross hand zijwaarts",    beschrijving: "Uppercut cross hand, zijwaartse variant." },
  { id: "1198905537", platform: "vimeo", categorie: "stoten",     titel: "Uppercut jab hand",                beschrijving: "Uppercut met jabhand." },
  { id: "1198905535", platform: "vimeo", categorie: "stoten",     titel: "Uppercut jab hand zijwaarts",      beschrijving: "Uppercut jab hand, zijwaartse variant." },
  { id: "1198905484", platform: "vimeo", categorie: "stoten",     titel: "Hook jab hand",                    beschrijving: "Hook met de jabhand." },
  { id: "1198905485", platform: "vimeo", categorie: "stoten",     titel: "Hook jab hand (variant)",          beschrijving: "Alternatieve uitvoering hook jab hand." },
  { id: "1198905486", platform: "vimeo", categorie: "stoten",     titel: "Hook cross hand",                  beschrijving: "Hook met de crosshand." },

  // ── Elleboogtechnieken ───────────────────────────────────────
  { id: "1079901576", platform: "vimeo", categorie: "elleboog",   titel: "Elleboog — deel 1",                beschrijving: "Elleboogtechnieken, deel 1." },
  { id: "1079902162", platform: "vimeo", categorie: "elleboog",   titel: "Elleboog — deel 2",                beschrijving: "Elleboogtechnieken, deel 2." },
  { id: "1079901873", platform: "vimeo", categorie: "elleboog",   titel: "Elleboog — deel 3",                beschrijving: "Elleboogtechnieken, deel 3." },
  { id: "1079902471", platform: "vimeo", categorie: "elleboog",   titel: "Elleboog — deel 4",                beschrijving: "Elleboogtechnieken, deel 4." },
  { id: "1198905563", platform: "vimeo", categorie: "elleboog",   titel: "Upward Elbow",                     beschrijving: "Omhoog gerichte elleboogstoot." },
  { id: "1198905583", platform: "vimeo", categorie: "elleboog",   titel: "Downward elbow",                   beschrijving: "Neerwaartse elleboogstoot." },
  { id: "1198905564", platform: "vimeo", categorie: "elleboog",   titel: "Inward elbow",                     beschrijving: "Naar binnen gerichte elleboogstoot." },
  { id: "1198905741", platform: "vimeo", categorie: "elleboog",   titel: "Outward elbow",                    beschrijving: "Naar buiten gerichte elleboogstoot." },
  { id: "1198905760", platform: "vimeo", categorie: "elleboog",   titel: "Spinning Elbow",                   beschrijving: "Draaiende elleboogstoot." },
  { id: "1198905803", platform: "vimeo", categorie: "elleboog",   titel: "Elbow point",                      beschrijving: "Elleboogpunt aanval." },
  { id: "1198905735", platform: "vimeo", categorie: "elleboog",   titel: "Elbow Jab",                        beschrijving: "Elleboog jab techniek." },
  { id: "1198905758", platform: "vimeo", categorie: "elleboog",   titel: "Elbow over",                       beschrijving: "Elleboog over techniek." },

  // ── Hammerslagtechnieken ─────────────────────────────────────
  { id: "1080106514", platform: "vimeo", categorie: "hammerslag", titel: "Hammerslag — deel 1",              beschrijving: "Hammerslagtechnieken, deel 1." },
  { id: "1080106757", platform: "vimeo", categorie: "hammerslag", titel: "Hammerslag — deel 2",              beschrijving: "Hammerslagtechnieken, deel 2." },
  { id: "1080098850", platform: "vimeo", categorie: "hammerslag", titel: "Hammerslag — deel 3",              beschrijving: "Hammerslagtechnieken, deel 3." },
  { id: "1080102020", platform: "vimeo", categorie: "hammerslag", titel: "Hammerslag — deel 4",              beschrijving: "Hammerslagtechnieken, deel 4." },
  { id: "1080106215", platform: "vimeo", categorie: "hammerslag", titel: "Hammerslag — deel 5",              beschrijving: "Hammerslagtechnieken, deel 5." },
  { id: "1198905634", platform: "vimeo", categorie: "hammerslag", titel: "Rising Hammer",                    beschrijving: "Opwaartse hammerslag." },
  { id: "1198905585", platform: "vimeo", categorie: "hammerslag", titel: "Inward Hammer",                    beschrijving: "Naar binnen gerichte hammerslag." },
  { id: "1198905590", platform: "vimeo", categorie: "hammerslag", titel: "Inward Hammer (variant)",          beschrijving: "Alternatieve inward hammerslag uitvoering." },

  // ── Palmtechnieken ───────────────────────────────────────────
  { id: "1080107633",            platform: "vimeo", categorie: "palm", titel: "Palm — deel 1",               beschrijving: "Palmtechnieken, deel 1." },
  { id: "1080108068",            platform: "vimeo", categorie: "palm", titel: "Palm — deel 2",               beschrijving: "Palmtechnieken, deel 2." },
  { id: "1080528104/61efa7bcef", platform: "vimeo", categorie: "palm", titel: "Palm — deel 3",               beschrijving: "Palmtechnieken, deel 3." },
  { id: "1080107090",            platform: "vimeo", categorie: "palm", titel: "Handpalm jab en cross",       beschrijving: "Handpalm jab en crossbewegingen." },
  { id: "1198905662",            platform: "vimeo", categorie: "palm", titel: "Palm Jab",                    beschrijving: "Palmstoot met jab." },
  { id: "1198905695",            platform: "vimeo", categorie: "palm", titel: "Palm Hook",                   beschrijving: "Palmstoot met hook." },
  { id: "1198905657",            platform: "vimeo", categorie: "palm", titel: "Palm Cross",                  beschrijving: "Palmstoot met cross." },
  { id: "1198905661",            platform: "vimeo", categorie: "palm", titel: "Palm Cross (variant)",        beschrijving: "Alternatieve palm cross uitvoering." },

  // ── Traptechnieken ───────────────────────────────────────────
  { id: "1198905703", platform: "vimeo", categorie: "trappen",    titel: "Front kick",                       beschrijving: "Frontale trap." },
  { id: "1198905825", platform: "vimeo", categorie: "trappen",    titel: "Front leg front kick",             beschrijving: "Frontale trap met voorste been." },
  { id: "1198905718", platform: "vimeo", categorie: "trappen",    titel: "Front kick — opmerkingen",         beschrijving: "Uitleg en aandachtspunten bij de front kick." },
  { id: "1198905843", platform: "vimeo", categorie: "trappen",    titel: "Sliding front kick",               beschrijving: "Glijdende frontale trap." },
  { id: "1198905836", platform: "vimeo", categorie: "trappen",    titel: "Side kick",                        beschrijving: "Zijwaartse trap." },
  { id: "1198905712", platform: "vimeo", categorie: "trappen",    titel: "Turning kick",                     beschrijving: "Draaiende trap." },
  { id: "1198905723", platform: "vimeo", categorie: "trappen",    titel: "Turning kick — opmerkingen",       beschrijving: "Uitleg en aandachtspunten bij de turning kick." },
  { id: "1198905716", platform: "vimeo", categorie: "trappen",    titel: "Turning back kick",                beschrijving: "Draaiende achterkick." },
  { id: "1198905715", platform: "vimeo", categorie: "trappen",    titel: "Back kick",                        beschrijving: "Achterkick techniek." },
  { id: "1198905875", platform: "vimeo", categorie: "trappen",    titel: "Low spinning hook kick",           beschrijving: "Lage draaiende hook trap." },
  { id: "1198905874", platform: "vimeo", categorie: "trappen",    titel: "Jump Turning kick",                beschrijving: "Springende draaiende trap." },
  { id: "1080133480", platform: "vimeo", categorie: "trappen",    titel: "Jump turning kick — Rode band",    beschrijving: "Springende draaiende trap, rode band niveau." },
  { id: "1198905814", platform: "vimeo", categorie: "trappen",    titel: "Shin kick",                        beschrijving: "Scheen trap techniek." },
  { id: "1198905839", platform: "vimeo", categorie: "trappen",    titel: "Knee jam",                         beschrijving: "Kniestoot aanvalstechniek." },

  // ── Grondverdediging ─────────────────────────────────────────
  { id: "1198905884", platform: "vimeo", categorie: "ground",     titel: "Uitleg grounddefense",             beschrijving: "Introductie verdedigingstechnieken vanuit grondpositie." },
  { id: "1198905851", platform: "vimeo", categorie: "ground",     titel: "Ground Turning kick",              beschrijving: "Draaiende trap vanuit grondpositie." },
  { id: "1198905871", platform: "vimeo", categorie: "ground",     titel: "Ground side kick",                 beschrijving: "Zijwaartse trap vanuit grondpositie." },
  { id: "1082164222", platform: "vimeo", categorie: "ground",     titel: "Groundtechniek",                   beschrijving: "Techniek vanuit grondpositie." },

  // ── Kwan Nyom Hapkido (YouTube) ──────────────────────────────
  { id: "ePo6WJGbj4c", categorie: "kwan-nyom",        titel: "Kwan Nyom Hapkido — Throws",                  beschrijving: "Master Jimmy Trinh demonstreert worptechnieken van Kwan Nyom Hapkido." },
  { id: "J5zWJpCnvBM", categorie: "kwan-nyom",        titel: "Kwan Nyom Hapkido — Juniors 2015",            beschrijving: "Afsluiting van het hapkido-seizoen met juniors." },
  { id: "cvnfTxpKU3E", categorie: "kwan-nyom",        titel: "Kwan Nyom Hapkido — Junnukisat 2015",         beschrijving: "Juniorenwedstrijd Kwan Nyom Hapkido 2015." },
  { id: "KfCGh_WaMtI", categorie: "kwan-nyom",        titel: "Kwan Nyom Hapkido — Espoo Promo",             beschrijving: "Promovideo van Kwan Nyom Hapkido Espoo (Finland)." },
  { id: "L10o2oNsTxE", categorie: "kwan-nyom",        titel: "Kwan Nyom Hapkido — Locking 2017 Helsinki",   beschrijving: "Hapkido grendeltechnieken, Kwan Nyom stijl, Helsinki 2017." },
  { id: "XDf-y_Eg6U4", categorie: "kwan-nyom",        titel: "Kwan Nyom Hapkido — HKD Juniorit 2019",       beschrijving: "Junioren presentaties Hapkido 04-05-2019." },

  // ── Hapkido Nederland (YouTube) ──────────────────────────────
  { id: "Cb2zacEqPPE", categorie: "hapkido-nederland", titel: "Hapkido NHA — Paul de Graaf & Charlie van Ton", beschrijving: "Demo door Paul de Graaf en Charlie van Ton × Jelte de Graaf, Hapkido NHA Nederland." },
  { id: "GlVG0PeeEMM", categorie: "hapkido-nederland", titel: "Sportcentrum De Bever — Hapkido & Taekwon-do",  beschrijving: "Hapkido en Taekwon-do bij sportcentrum De Bever." },
  { id: "Sr4L8we9OAk", categorie: "hapkido-nederland", titel: "Hapkido — Sportcentrum De Bever Dronten",       beschrijving: "Hapkido bij sportcentrum De Bever in Dronten." },
];

export const categorieLabelMap: Record<string, string> = {
  "uitleg":           "Uitleg & Basistechnieken",
  "stoten":           "Stoten & Slagen",
  "elleboog":         "Elleboogtechnieken",
  "hammerslag":       "Hammerslagtechnieken",
  "palm":             "Palmtechnieken",
  "trappen":          "Traptechnieken",
  "ground":           "Grondverdediging",
  "kwan-nyom":        "Kwan Nyom Hapkido",
  "hapkido-nederland":"Hapkido Nederland",
  "eigen":            "Overige video's",
  "zwarte-band":      "Zwarte band technieken",
  "academie":         "Academie",
};

export const totalDuur = hapkidoLessen.reduce(
  (sum, l) => sum + parseInt(l.duur),
  0
);
