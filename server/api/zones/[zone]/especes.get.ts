import { ZONES } from "~~/app/data/zones";
import { ESPECES } from "~~/app/data/especes";
import fr from "~~/i18n/locales/fr.json";
import en from "~~/i18n/locales/en.json";
import {
  CARTES_PAR_PAGE,
  bornesPage,
  lireLangue,
  lirePage,
  lireRecherche,
  nombrePages,
  normaliser,
  type PageHabitants,
} from "#shared/habitants";

const NOMS = { fr: fr.especes, en: en.especes } as Record<
  string,
  Record<string, string>
>;

export default defineCachedEventHandler(
  (event): PageHabitants => {
    const slug = getRouterParam(event, "zone");
    const zone = ZONES.find((z) => z.slug === slug);
    if (!zone) {
      throw createError({ statusCode: 404, statusMessage: "Zone introuvable" });
    }

    const query = getQuery(event);
    const recherche = normaliser(lireRecherche(query.recherche));
    const noms = NOMS[lireLangue(query.langue)]!;
    const especes = recherche
      ? zone.especes.filter((espece) =>
          normaliser(noms[espece] ?? espece).includes(recherche),
        )
      : zone.especes;

    const total = especes.length;
    const pages = recherche ? 1 : nombrePages(total);
    const page = lirePage(query.page);
    if (page > pages) {
      throw createError({ statusCode: 404, statusMessage: "Page introuvable" });
    }
    const { debut, taille } = recherche
      ? { debut: 0, taille: total }
      : bornesPage(page);

    return {
      especes: especes.slice(debut, debut + taille).map((espece) => ({
        slug: espece,
        image: ESPECES[espece]?.image ?? null,
        effectif: ESPECES[espece]?.effectif ?? 0,
      })),
      page,
      pages,
      total,
    };
  },
  {
    name: "habitants",
    maxAge: 60 * 60,
    swr: true,
    shouldBypassCache: (event) =>
      import.meta.dev || !!lireRecherche(getQuery(event).recherche),
    getKey: (event) =>
      `${getRouterParam(event, "zone")}-${CARTES_PAR_PAGE}-${lirePage(getQuery(event).page)}`,
  },
);
