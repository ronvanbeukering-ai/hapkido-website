export type Les = {
  nr: number;
  titel: string;
  duur: string;
  categorie: string;
  gratis: boolean;
};

export type HapkidoVideo = {
  id: string;
  titel: string;
  beschrijving: string;
  categorie: "kwan-nyom" | "hapkido-nederland" | "eigen";
};

export const hapkidoLessen: Les[] = [
  { nr: 1,  titel: "Introductie & doelstellingen",        duur: "12m", categorie: "Basis",     gratis: true  },
  { nr: 2,  titel: "Houding en voetenwerk",               duur: "18m", categorie: "Basis",     gratis: true  },
  { nr: 3,  titel: "Valbreektechnieken (ukemi)",          duur: "22m", categorie: "Basis",     gratis: false },
  { nr: 4,  titel: "Basisgrepen — pols en arm",           duur: "25m", categorie: "Grepen",    gratis: false },
  { nr: 5,  titel: "Ontgrendelen bij manchetgreep",       duur: "20m", categorie: "Grepen",    gratis: false },
  { nr: 6,  titel: "Stoten en trappen — basisreeks",      duur: "30m", categorie: "Slagen",    gratis: false },
  { nr: 7,  titel: "Werpingen — ogoshi en o-soto-gari",   duur: "28m", categorie: "Werpingen", gratis: false },
  { nr: 8,  titel: "Joint locks — elleboog en schouder",  duur: "35m", categorie: "Locks",     gratis: false },
  { nr: 9,  titel: "Verweer bij zijdelingse aanval",      duur: "22m", categorie: "Verweer",   gratis: false },
  { nr: 10, titel: "Verweer bij achteraanval",            duur: "24m", categorie: "Verweer",   gratis: false },
  { nr: 11, titel: "Wapen: bokken (houten stok)",          duur: "32m", categorie: "Wapens",    gratis: false },
  { nr: 12, titel: "Wapen: korte stok (dan bong)",         duur: "28m", categorie: "Wapens",    gratis: false },
];

export const hapkidoVideos: HapkidoVideo[] = [
  {
    id: "ePo6WJGbj4c",
    titel: "Kwan Nyom Hapkido — Throws",
    beschrijving: "Master Jimmy Trinh demonstreert worptechnieken van Kwan Nyom Hapkido",
    categorie: "kwan-nyom",
  },
  {
    id: "J5zWJpCnvBM",
    titel: "Kwan Nyom Hapkido — Juniors 2015",
    beschrijving: "Afsluiting van het hapkido-seizoen met juniors",
    categorie: "kwan-nyom",
  },
  {
    id: "cvnfTxpKU3E",
    titel: "Kwan Nyom Hapkido — Junnukisat 2015",
    beschrijving: "Juniorenwedstrijd Kwan Nyom Hapkido 2015",
    categorie: "kwan-nyom",
  },
  {
    id: "KfCGh_WaMtI",
    titel: "Kwan Nyom Hapkido — Espoo Promo",
    beschrijving: "Promovideo van Kwan Nyom Hapkido Espoo (Finland)",
    categorie: "kwan-nyom",
  },
  {
    id: "L10o2oNsTxE",
    titel: "Kwan Nyom Hapkido — Locking 2017 Helsinki",
    beschrijving: "Hapkido grendeltechnieken, Kwan Nyom stijl, Helsinki 2017",
    categorie: "kwan-nyom",
  },
  {
    id: "xwj4YJd2Jlg",
    titel: "Helsingin Hapkido — Treenivideo",
    beschrijving: "Trainingsvideo van Helsingin Hapkido (Kwan Nyom)",
    categorie: "kwan-nyom",
  },
  {
    id: "XDf-y_Eg6U4",
    titel: "Kwan Nyom Hapkido — HKD Juniorit 2019",
    beschrijving: "Junioren presentaties Hapkido 04-05-2019",
    categorie: "kwan-nyom",
  },
  {
    id: "Cb2zacEqPPE",
    titel: "Hapkido NHA — Paul de Graaf & Charlie van Ton",
    beschrijving: "Demo door Paul de Graaf en Charlie van Ton × Jelte de Graaf, Hapkido NHA Nederland",
    categorie: "hapkido-nederland",
  },
  {
    id: "GlVG0PeeEMM",
    titel: "Sportcentrum De Bever — Hapkido & Taekwon-do",
    beschrijving: "Hapkido en Taekwon-do bij sportcentrum De Bever",
    categorie: "hapkido-nederland",
  },
  {
    id: "Sr4L8we9OAk",
    titel: "Hapkido — Sportcentrum De Bever Dronten",
    beschrijving: "Hapkido bij sportcentrum De Bever in Dronten",
    categorie: "hapkido-nederland",
  },
];

export const categorieLabelMap: Record<string, string> = {
  "kwan-nyom": "Kwan Nyom Hapkido",
  "hapkido-nederland": "Hapkido Nederland",
  "eigen": "Eigen video's",
};

export const totalDuur = hapkidoLessen.reduce(
  (sum, l) => sum + parseInt(l.duur),
  0
);
