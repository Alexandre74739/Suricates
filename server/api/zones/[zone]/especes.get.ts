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

export default defineEventHandler(async (event): Promise<PageHabitants> => {
  const zone = await prisma.zone.findUnique({
    where: { slug: getRouterParam(event, "zone") },
    select: {
      enclos: {
        orderBy: { id: "asc" },
        select: {
          effectif: true,
          espece: { select: { slug: true, nom: true, nomEn: true, image: true } },
        },
      },
    },
  });
  if (!zone) {
    throw createError({ statusCode: 404, statusMessage: "Zone introuvable" });
  }

  const query = getQuery(event);
  const anglais = lireLangue(query.langue) === "en";
  const recherche = normaliser(lireRecherche(query.recherche));
  const toutes = zone.enclos.map(({ effectif, espece }) => ({
    slug: espece.slug,
    nom: (anglais && espece.nomEn) || espece.nom,
    image: espece.image,
    effectif,
  }));
  const especes = recherche
    ? toutes.filter((espece) => normaliser(espece.nom).includes(recherche))
    : toutes;

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
    especes: especes.slice(debut, debut + taille),
    page,
    pages,
    total,
  };
});
