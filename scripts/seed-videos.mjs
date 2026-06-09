// Stel env vars in voor gebruik: SB_URL en SB_SERVICE_KEY
const SB_URL = process.env.SB_URL ?? "";
const SB_KEY = process.env.SB_SERVICE_KEY ?? "";

const videos = [
  // Uitleg & Basistechnieken
  { url: "1198905929", platform: "vimeo", categorie: "uitleg",     titel: "Balans en disbalans",              beschrijving: "Uitleg over balans en disbalans als basis van hapkido." },
  { url: "1198905559", platform: "vimeo", categorie: "uitleg",     titel: "Standen",                          beschrijving: "Uitleg over de vechthouding en standen." },
  { url: "1198905806", platform: "vimeo", categorie: "uitleg",     titel: "Rolling technieken",               beschrijving: "Rolval- en valdoorstoefeningen (ukemi)." },
  { url: "1198905757", platform: "vimeo", categorie: "uitleg",     titel: "Hapkido Combinatie — uitleg",      beschrijving: "Algemene uitleg over de Hapkido Combinatie methode." },
  { url: "1198905880", platform: "vimeo", categorie: "uitleg",     titel: "Uitleg locks & klemmen",           beschrijving: "Introductie van gewrichtsklemmen in hapkido." },
  { url: "1198905900", platform: "vimeo", categorie: "uitleg",     titel: "Uitleg Drills",                    beschrijving: "Drills en oefenmethoden voor efficiënt trainen." },
  { url: "762278422",  platform: "vimeo", categorie: "uitleg",     titel: "Hapkido Yong — training",          beschrijving: "Trainingsvideo Hapkido Yong." },
  { url: "1199526926", platform: "vimeo", categorie: "uitleg",     titel: "Groepsles — gemixte groep",        beschrijving: "Impressie van een training met een gemixte groep." },
  { url: "809686134",  platform: "vimeo", categorie: "uitleg",     titel: "Hapkido Combinatie — technieken demonstratie", beschrijving: "Demonstratie van Hapkido Combinatie technieken." },
  { url: "1199536635", platform: "vimeo", categorie: "uitleg",     titel: "Hapkido training stand-up technieken — deel 1", beschrijving: "Stand-up technieken uit de Hapkido training." },
  { url: "1199539288", platform: "vimeo", categorie: "uitleg",     titel: "Hapkido training stand-up technieken — deel 2", beschrijving: "Stand-up technieken uit de Hapkido training." },
  // Stoten & Slagen
  { url: "1198905933", platform: "vimeo", categorie: "stoten",     titel: "Jab",                              beschrijving: "Basis jab stoot." },
  { url: "1198905509", platform: "vimeo", categorie: "stoten",     titel: "Cross strike",                     beschrijving: "Cross stoot techniek." },
  { url: "1198905759", platform: "vimeo", categorie: "stoten",     titel: "Forearm strike",                   beschrijving: "Onderarmstoot techniek." },
  { url: "1198905804", platform: "vimeo", categorie: "stoten",     titel: "Outer forearm strike",             beschrijving: "Buitenste onderarmstoot." },
  { url: "1198905784", platform: "vimeo", categorie: "stoten",     titel: "Tijger mouth",                     beschrijving: "Tijgerbek palmslag techniek." },
  { url: "1198905531", platform: "vimeo", categorie: "stoten",     titel: "Uppercut cross hand",              beschrijving: "Uppercut met crosshand beweging." },
  { url: "1198905532", platform: "vimeo", categorie: "stoten",     titel: "Uppercut cross hand zijwaarts",    beschrijving: "Uppercut cross hand, zijwaartse variant." },
  { url: "1198905537", platform: "vimeo", categorie: "stoten",     titel: "Uppercut jab hand",                beschrijving: "Uppercut met jabhand." },
  { url: "1198905535", platform: "vimeo", categorie: "stoten",     titel: "Uppercut jab hand zijwaarts",      beschrijving: "Uppercut jab hand, zijwaartse variant." },
  { url: "1198905484", platform: "vimeo", categorie: "stoten",     titel: "Hook jab hand",                    beschrijving: "Hook met de jabhand." },
  { url: "1198905485", platform: "vimeo", categorie: "stoten",     titel: "Hook jab hand (variant)",          beschrijving: "Alternatieve uitvoering hook jab hand." },
  { url: "1198905486", platform: "vimeo", categorie: "stoten",     titel: "Hook cross hand",                  beschrijving: "Hook met de crosshand." },
  // Elleboogtechnieken
  { url: "1079901576", platform: "vimeo", categorie: "elleboog",   titel: "Elleboog — deel 1",                beschrijving: "Elleboogtechnieken, deel 1." },
  { url: "1079902162", platform: "vimeo", categorie: "elleboog",   titel: "Elleboog — deel 2",                beschrijving: "Elleboogtechnieken, deel 2." },
  { url: "1079901873", platform: "vimeo", categorie: "elleboog",   titel: "Elleboog — deel 3",                beschrijving: "Elleboogtechnieken, deel 3." },
  { url: "1079902471", platform: "vimeo", categorie: "elleboog",   titel: "Elleboog — deel 4",                beschrijving: "Elleboogtechnieken, deel 4." },
  { url: "1198905563", platform: "vimeo", categorie: "elleboog",   titel: "Upward Elbow",                     beschrijving: "Omhoog gerichte elleboogstoot." },
  { url: "1198905583", platform: "vimeo", categorie: "elleboog",   titel: "Downward elbow",                   beschrijving: "Neerwaartse elleboogstoot." },
  { url: "1198905564", platform: "vimeo", categorie: "elleboog",   titel: "Inward elbow",                     beschrijving: "Naar binnen gerichte elleboogstoot." },
  { url: "1198905741", platform: "vimeo", categorie: "elleboog",   titel: "Outward elbow",                    beschrijving: "Naar buiten gerichte elleboogstoot." },
  { url: "1198905760", platform: "vimeo", categorie: "elleboog",   titel: "Spinning Elbow",                   beschrijving: "Draaiende elleboogstoot." },
  { url: "1198905803", platform: "vimeo", categorie: "elleboog",   titel: "Elbow point",                      beschrijving: "Elleboogpunt aanval." },
  { url: "1198905735", platform: "vimeo", categorie: "elleboog",   titel: "Elbow Jab",                        beschrijving: "Elleboog jab techniek." },
  { url: "1198905758", platform: "vimeo", categorie: "elleboog",   titel: "Elbow over",                       beschrijving: "Elleboog over techniek." },
  // Hammerslagtechnieken
  { url: "1080106514", platform: "vimeo", categorie: "hammerslag", titel: "Hammerslag — deel 1",              beschrijving: "Hammerslagtechnieken, deel 1." },
  { url: "1080106757", platform: "vimeo", categorie: "hammerslag", titel: "Hammerslag — deel 2",              beschrijving: "Hammerslagtechnieken, deel 2." },
  { url: "1080098850", platform: "vimeo", categorie: "hammerslag", titel: "Hammerslag — deel 3",              beschrijving: "Hammerslagtechnieken, deel 3." },
  { url: "1080102020", platform: "vimeo", categorie: "hammerslag", titel: "Hammerslag — deel 4",              beschrijving: "Hammerslagtechnieken, deel 4." },
  { url: "1080106215", platform: "vimeo", categorie: "hammerslag", titel: "Hammerslag — deel 5",              beschrijving: "Hammerslagtechnieken, deel 5." },
  { url: "1198905634", platform: "vimeo", categorie: "hammerslag", titel: "Rising Hammer",                    beschrijving: "Opwaartse hammerslag." },
  { url: "1198905585", platform: "vimeo", categorie: "hammerslag", titel: "Inward Hammer",                    beschrijving: "Naar binnen gerichte hammerslag." },
  { url: "1198905590", platform: "vimeo", categorie: "hammerslag", titel: "Inward Hammer (variant)",          beschrijving: "Alternatieve inward hammerslag uitvoering." },
  // Palmtechnieken
  { url: "1080107633",            platform: "vimeo", categorie: "palm", titel: "Palm — deel 1",               beschrijving: "Palmtechnieken, deel 1." },
  { url: "1080108068",            platform: "vimeo", categorie: "palm", titel: "Palm — deel 2",               beschrijving: "Palmtechnieken, deel 2." },
  { url: "1080528104/61efa7bcef", platform: "vimeo", categorie: "palm", titel: "Palm — deel 3",               beschrijving: "Palmtechnieken, deel 3." },
  { url: "1080107090",            platform: "vimeo", categorie: "palm", titel: "Handpalm jab en cross",       beschrijving: "Handpalm jab en crossbewegingen." },
  { url: "1198905662",            platform: "vimeo", categorie: "palm", titel: "Palm Jab",                    beschrijving: "Palmstoot met jab." },
  { url: "1198905695",            platform: "vimeo", categorie: "palm", titel: "Palm Hook",                   beschrijving: "Palmstoot met hook." },
  { url: "1198905657",            platform: "vimeo", categorie: "palm", titel: "Palm Cross",                  beschrijving: "Palmstoot met cross." },
  { url: "1198905661",            platform: "vimeo", categorie: "palm", titel: "Palm Cross (variant)",        beschrijving: "Alternatieve palm cross uitvoering." },
  // Traptechnieken
  { url: "1198905703", platform: "vimeo", categorie: "trappen",    titel: "Front kick",                       beschrijving: "Frontale trap." },
  { url: "1198905825", platform: "vimeo", categorie: "trappen",    titel: "Front leg front kick",             beschrijving: "Frontale trap met voorste been." },
  { url: "1198905718", platform: "vimeo", categorie: "trappen",    titel: "Front kick — opmerkingen",         beschrijving: "Uitleg en aandachtspunten bij de front kick." },
  { url: "1198905843", platform: "vimeo", categorie: "trappen",    titel: "Sliding front kick",               beschrijving: "Glijdende frontale trap." },
  { url: "1198905836", platform: "vimeo", categorie: "trappen",    titel: "Side kick",                        beschrijving: "Zijwaartse trap." },
  { url: "1198905712", platform: "vimeo", categorie: "trappen",    titel: "Turning kick",                     beschrijving: "Draaiende trap." },
  { url: "1198905723", platform: "vimeo", categorie: "trappen",    titel: "Turning kick — opmerkingen",       beschrijving: "Uitleg en aandachtspunten bij de turning kick." },
  { url: "1198905716", platform: "vimeo", categorie: "trappen",    titel: "Turning back kick",                beschrijving: "Draaiende achterkick." },
  { url: "1198905715", platform: "vimeo", categorie: "trappen",    titel: "Back kick",                        beschrijving: "Achterkick techniek." },
  { url: "1198905875", platform: "vimeo", categorie: "trappen",    titel: "Low spinning hook kick",           beschrijving: "Lage draaiende hook trap." },
  { url: "1198905874", platform: "vimeo", categorie: "trappen",    titel: "Jump Turning kick",                beschrijving: "Springende draaiende trap." },
  { url: "1080133480", platform: "vimeo", categorie: "trappen",    titel: "Jump turning kick — Rode band",    beschrijving: "Springende draaiende trap, rode band niveau." },
  { url: "1198905814", platform: "vimeo", categorie: "trappen",    titel: "Shin kick",                        beschrijving: "Scheen trap techniek." },
  { url: "1198905839", platform: "vimeo", categorie: "trappen",    titel: "Knee jam",                         beschrijving: "Kniestoot aanvalstechniek." },
  // Grondverdediging
  { url: "1198905884", platform: "vimeo", categorie: "ground",     titel: "Uitleg grounddefense",             beschrijving: "Introductie verdedigingstechnieken vanuit grondpositie." },
  { url: "1198905851", platform: "vimeo", categorie: "ground",     titel: "Ground Turning kick",              beschrijving: "Draaiende trap vanuit grondpositie." },
  { url: "1198905871", platform: "vimeo", categorie: "ground",     titel: "Ground side kick",                 beschrijving: "Zijwaartse trap vanuit grondpositie." },
  { url: "1082164222", platform: "vimeo", categorie: "ground",     titel: "Groundtechniek",                   beschrijving: "Techniek vanuit grondpositie." },
  // Kwan Nyom Hapkido (YouTube)
  { url: "ePo6WJGbj4c", platform: "youtube", categorie: "kwan-nyom",        titel: "Kwan Nyom Hapkido — Throws",                  beschrijving: "Master Jimmy Trinh demonstreert worptechnieken van Kwan Nyom Hapkido." },
  { url: "J5zWJpCnvBM", platform: "youtube", categorie: "kwan-nyom",        titel: "Kwan Nyom Hapkido — Juniors 2015",            beschrijving: "Afsluiting van het hapkido-seizoen met juniors." },
  { url: "cvnfTxpKU3E", platform: "youtube", categorie: "kwan-nyom",        titel: "Kwan Nyom Hapkido — Junnukisat 2015",         beschrijving: "Juniorenwedstrijd Kwan Nyom Hapkido 2015." },
  { url: "KfCGh_WaMtI", platform: "youtube", categorie: "kwan-nyom",        titel: "Kwan Nyom Hapkido — Espoo Promo",             beschrijving: "Promovideo van Kwan Nyom Hapkido Espoo (Finland)." },
  { url: "L10o2oNsTxE", platform: "youtube", categorie: "kwan-nyom",        titel: "Kwan Nyom Hapkido — Locking 2017 Helsinki",   beschrijving: "Hapkido grendeltechnieken, Kwan Nyom stijl, Helsinki 2017." },
  { url: "XDf-y_Eg6U4", platform: "youtube", categorie: "kwan-nyom",        titel: "Kwan Nyom Hapkido — HKD Juniorit 2019",       beschrijving: "Junioren presentaties Hapkido 04-05-2019." },
  // Hapkido Nederland (YouTube)
  { url: "Cb2zacEqPPE", platform: "youtube", categorie: "hapkido-nederland", titel: "Hapkido NHA — Paul de Graaf & Charlie van Ton", beschrijving: "Demo door Paul de Graaf en Charlie van Ton × Jelte de Graaf, Hapkido NHA Nederland." },
  { url: "GlVG0PeeEMM", platform: "youtube", categorie: "hapkido-nederland", titel: "Sportcentrum De Bever — Hapkido & Taekwon-do",  beschrijving: "Hapkido en Taekwon-do bij sportcentrum De Bever." },
  { url: "Sr4L8we9OAk", platform: "youtube", categorie: "hapkido-nederland", titel: "Hapkido — Sportcentrum De Bever Dronten",       beschrijving: "Hapkido bij sportcentrum De Bever in Dronten." },
];

const records = videos.map((v, i) => ({
  id: crypto.randomUUID(),
  titel: v.titel,
  beschrijving: v.beschrijving,
  categorie: v.categorie,
  platform: v.platform,
  url: v.url,
  volgorde: i + 1,
}));

const res = await fetch(`${SB_URL}/rest/v1/hapkido_videos`, {
  method: "POST",
  headers: {
    "apikey": SB_KEY,
    "Authorization": `Bearer ${SB_KEY}`,
    "Content-Type": "application/json",
    "Prefer": "resolution=merge-duplicates",
  },
  body: JSON.stringify(records),
});

if (!res.ok) {
  const err = await res.text();
  console.error("Fout:", err);
} else {
  console.log(`✅ ${records.length} video's toegevoegd aan hapkido_videos`);
}
