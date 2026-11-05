// Provisoire : les animations viendront de la table Animation, publiée par le pôle animations.
// Textes dans i18n/locales/ sous animations.liste.<slug>.
// FIXE : tous les jours à `heure`, ou en accès libre sans `heure`. PONCTUELLE : à `dateHeure` (UTC).
// `enclos` : slug de l'espèce de l'enclos concerné (futur enclosId), absent si l'animation n'a pas d'enclos.
export type AnimationVitrine = {
  slug: string;
  enclos?: string;
  type: "FIXE" | "PONCTUELLE";
  heure?: string;
  dateHeure?: string;
  image: string;
};

export const ANIMATIONS: AnimationVitrine[] = [
  {
    slug: "nourrissage-guepards",
    enclos: "guepards",
    type: "FIXE",
    heure: "11:30",
    image: "/images/animations/nourrissage-guepards.webp",
  },
  {
    slug: "show-faucons",
    type: "PONCTUELLE",
    dateHeure: "2026-11-14T13:30:00Z",
    image: "/images/animations/show-faucons.webp",
  },
  {
    slug: "repas-pandas-roux",
    enclos: "pandas-roux",
    type: "FIXE",
    heure: "15:00",
    image: "/images/animations/repas-pandas-roux.webp",
  },
  {
    slug: "ferme-pedagogique",
    type: "FIXE",
    image: "/images/animations/ferme-pedagogique.webp",
  },
  // Démo : animations supplémentaires par zone (images reprises du site en attendant les vraies photos).
  {
    slug: "reveil-suricates",
    enclos: "suricates",
    type: "FIXE",
    heure: "10:30",
    image: "/images/illustrations/suricates-tronc.webp",
  },
  {
    slug: "gouter-girafes",
    enclos: "girafes",
    type: "FIXE",
    heure: "14:00",
    image: "/images/illustrations/girafes-soigneuse.webp",
  },
  {
    slug: "bain-elephants",
    enclos: "elephants",
    type: "FIXE",
    heure: "15:30",
    image: "/images/parc/elephants.webp",
  },
  {
    slug: "soins-rhinoceros",
    enclos: "rhinoceros",
    type: "FIXE",
    heure: "11:00",
    image: "/images/parc/rhinoceros-soigneuse.webp",
  },
  {
    slug: "sentinelles-kalahari",
    enclos: "suricates",
    type: "PONCTUELLE",
    dateHeure: "2026-11-21T14:00:00Z",
    image: "/images/illustrations/suricate-sentinelle.webp",
  },
  {
    slug: "repas-lions",
    enclos: "lions",
    type: "FIXE",
    heure: "16:00",
    image: "/images/parc/lion.webp",
  },
  {
    slug: "rencontre-tigres",
    enclos: "tigres",
    type: "FIXE",
    heure: "14:30",
    image: "/images/illustrations/tigres.webp",
  },
  {
    slug: "enrichissement-tigres",
    enclos: "tigres",
    type: "PONCTUELLE",
    dateHeure: "2026-11-28T13:00:00Z",
    image: "/images/parc/tigre-rocher.webp",
  },
  {
    slug: "coulisses-fauves",
    enclos: "lions",
    type: "PONCTUELLE",
    dateHeure: "2026-12-05T13:30:00Z",
    image: "/images/parc/lion.webp",
  },
  {
    slug: "bambou-pandas-geants",
    enclos: "pandas-geants",
    type: "FIXE",
    heure: "10:30",
    image: "/images/parc/panda-geant.webp",
  },
  {
    slug: "sieste-pandas",
    enclos: "pandas-geants",
    type: "FIXE",
    heure: "16:00",
    image: "/images/parc/panda-tronc.webp",
  },
  {
    slug: "enrichissement-pandas-roux",
    enclos: "pandas-roux",
    type: "FIXE",
    heure: "11:30",
    image: "/images/illustrations/panda-roux.webp",
  },
  {
    slug: "fete-pandas",
    enclos: "pandas-geants",
    type: "PONCTUELLE",
    dateHeure: "2026-11-15T13:00:00Z",
    image: "/images/parc/panda-tronc.webp",
  },
  {
    slug: "repas-capybaras",
    enclos: "capybaras",
    type: "FIXE",
    heure: "11:00",
    image: "/images/parc/capybaras.webp",
  },
  {
    slug: "bain-capybaras",
    enclos: "capybaras",
    type: "PONCTUELLE",
    dateHeure: "2026-11-22T14:00:00Z",
    image: "/images/parc/capybaras.webp",
  },
  {
    slug: "envol-aras",
    enclos: "aras",
    type: "FIXE",
    heure: "15:00",
    image: "/images/parc/calao.webp",
  },
  {
    slug: "balade-lamas",
    enclos: "lamas",
    type: "FIXE",
    heure: "14:00",
    image: "/images/parc/capybaras.webp",
  },
  {
    slug: "nourrissage-jaguars",
    enclos: "jaguars",
    type: "FIXE",
    heure: "16:15",
    image: "/images/parc/calao.webp",
  },
  {
    slug: "spectacle-otaries",
    enclos: "otaries",
    type: "FIXE",
    heure: "15:00",
    image: "/images/parc/otaries.webp",
  },
  {
    slug: "repas-manchots",
    enclos: "manchots",
    type: "FIXE",
    heure: "11:00",
    image: "/images/parc/manchots.webp",
  },
  {
    slug: "parade-manchots",
    enclos: "manchots",
    type: "PONCTUELLE",
    dateHeure: "2026-12-12T14:00:00Z",
    image: "/images/parc/manchots.webp",
  },
  {
    slug: "bassin-phoques",
    enclos: "phoques",
    type: "FIXE",
    heure: "16:00",
    image: "/images/parc/otaries.webp",
  },
  {
    slug: "secrets-requins",
    enclos: "requins",
    type: "FIXE",
    heure: "13:30",
    image: "/images/parc/manchots.webp",
  },
];
