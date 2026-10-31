import nourrissageGuepards from "~/assets/images/animations/nourrissage-guepards.webp";
import showFaucons from "~/assets/images/animations/show-faucons.webp";
import repasPandasRoux from "~/assets/images/animations/repas-pandas-roux.webp";
import fermePedagogique from "~/assets/images/animations/ferme-pedagogique.webp";

// Provisoire : les animations viendront de la table Animation, publiée par le pôle animations.
// Textes dans i18n/locales/ sous animations.liste.<slug>.
// FIXE : tous les jours à `heure`, ou en accès libre sans `heure`. PONCTUELLE : à `dateHeure` (UTC).
export type AnimationVitrine = {
  slug: string;
  type: "FIXE" | "PONCTUELLE";
  heure?: string;
  dateHeure?: string;
  image: string;
};

export const ANIMATIONS: AnimationVitrine[] = [
  { slug: "nourrissage-guepards", type: "FIXE", heure: "11:30", image: nourrissageGuepards },
  {
    slug: "show-faucons",
    type: "PONCTUELLE",
    dateHeure: "2026-11-14T13:30:00Z",
    image: showFaucons,
  },
  { slug: "repas-pandas-roux", type: "FIXE", heure: "15:00", image: repasPandasRoux },
  { slug: "ferme-pedagogique", type: "FIXE", image: fermePedagogique },
];
