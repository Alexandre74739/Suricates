// Provisoire : les zones et leurs espèces viendront des tables Zone, Espece et Enclos.
// Textes dans i18n/locales/ sous parc.zones.liste.<slug> et especes.<slug>.
export type CouleurZone = "terracotta" | "galerie" | "acacia" | "sauge" | "ocre";

export type ZoneVitrine = {
  slug: string;
  couleur: CouleurZone;
  especes: string[];
  image?: string;
};

export const ZONES: ZoneVitrine[] = [
  {
    slug: "chemin-de-brousse",
    couleur: "terracotta",
    especes: ["suricates", "girafes", "zebres", "rhinoceros", "lemuriens", "autruches"],
    image: "/images/parc/girafes-zebres.webp",
  },
  {
    slug: "territoire-des-fauves",
    couleur: "ocre",
    especes: ["lions", "tigres", "guepards", "gorilles", "hyenes", "lycaons"],
    image: "/images/parc/lion.webp",
  },
  {
    slug: "temple-de-la-jungle",
    couleur: "acacia",
    especes: ["pandas-geants", "pandas-roux", "loutres", "gibbons", "binturongs", "muntjacs"],
    image: "/images/parc/panda-geant.webp",
  },
  {
    slug: "sentier-des-incas",
    couleur: "sauge",
    especes: ["lamas", "alpagas", "tapirs", "flamants", "aras", "saimiris", "capybaras"],
    image: "/images/parc/calao.webp",
  },
  {
    slug: "cite-marine",
    couleur: "galerie",
    especes: ["otaries", "dauphins", "manchots", "phoques", "pelicans"],
    image: "/images/parc/otaries.webp",
  },
];

export const FONDS_ZONE: Record<CouleurZone, string> = {
  terracotta: "bg-terracotta",
  galerie: "bg-galerie",
  acacia: "bg-acacia",
  sauge: "bg-sauge",
  ocre: "bg-ocre",
};
