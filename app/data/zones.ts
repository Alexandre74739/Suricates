// Provisoire : les zones et leurs espèces viendront des tables Zone, Espece et Enclos.
// Textes dans i18n/locales/ sous parc.zones.liste.<slug> et especes.<slug>.
export type CouleurZone =
  | "terracotta"
  | "galerie"
  | "acacia"
  | "sauge"
  | "ocre";

export type ZoneVitrine = {
  slug: string;
  couleur: CouleurZone;
  especes: string[];
  image?: string;
  hero?: { image: string; position?: string };
};

export const ZONES: ZoneVitrine[] = [
  {
    slug: "chemin-de-brousse",
    couleur: "terracotta",
    especes: [
      "suricates",
      "elephants",
      "girafes",
      "zebres",
      "rhinoceros",
      "lemuriens",
      "autruches",
      "hippopotames",
      "gnous",
      "phacocheres",
      "babouins",
      "oryx",
      "servals",
      "calaos",
      "marabouts",
      "springboks",
      "tortues-sillonnees",
    ],
    image: "/images/parc/girafes-zebres.webp",
    hero: {
      image: "/images/parc/elephants.webp",
      position: "object-[55%_center]",
    },
  },
  {
    slug: "territoire-des-fauves",
    couleur: "ocre",
    especes: [
      "lions",
      "tigres",
      "guepards",
      "gorilles",
      "hyenes",
      "lycaons",
      "leopards",
      "pantheres-des-neiges",
      "caracals",
      "chimpanzes",
      "mandrills",
      "ours-malais",
      "dholes",
      "fennecs",
      "chacals",
      "pantheres-nebuleuses",
    ],
    image: "/images/parc/lion.webp",
    hero: {
      image: "/images/parc/tigre-rocher.webp",
      position: "object-[58%_center]",
    },
  },
  {
    slug: "temple-de-la-jungle",
    couleur: "acacia",
    especes: [
      "pandas-geants",
      "pandas-roux",
      "loutres",
      "gibbons",
      "binturongs",
      "muntjacs",
      "orangs-outans",
      "dragons-de-komodo",
      "paons",
      "tapirs-malais",
      "entelles",
      "loris",
      "pythons",
      "nasiques",
      "gavials",
      "gaurs",
    ],
    image: "/images/parc/panda-geant.webp",
    hero: {
      image: "/images/parc/panda-tronc.webp",
      position: "object-[65%_center]",
    },
  },
  {
    slug: "sentier-des-incas",
    couleur: "sauge",
    especes: [
      "lamas",
      "alpagas",
      "tapirs",
      "flamants",
      "aras",
      "saimiris",
      "capybaras",
      "jaguars",
      "tamanoirs",
      "paresseux",
      "tatous",
      "toucans",
      "condors",
      "vigognes",
      "nandous",
      "tamarins",
      "loups-a-criniere",
    ],
    image: "/images/parc/calao.webp",
    hero: {
      image: "/images/parc/capybaras.webp",
      position: "object-[70%_center]",
    },
  },
  {
    slug: "cite-marine",
    couleur: "galerie",
    especes: [
      "otaries",
      "dauphins",
      "manchots",
      "phoques",
      "pelicans",
      "tortues-marines",
      "requins",
      "raies",
      "meduses",
      "poissons-clowns",
      "loutres-de-mer",
      "macareux",
      "morses",
      "hippocampes",
      "pieuvres",
    ],
    image: "/images/parc/otaries.webp",
    hero: { image: "/images/parc/manchots.webp" },
  },
];

export const FONDS_ZONE: Record<CouleurZone, string> = {
  terracotta: "bg-terracotta",
  galerie: "bg-galerie",
  acacia: "bg-acacia",
  sauge: "bg-sauge",
  ocre: "bg-ocre",
};
