import { lireLangue } from "#shared/habitants";
import type { AnimationVitrine } from "#shared/animations";

// Toutes les fixes et les ponctuelles à venir, éventuellement limitées aux enclos de certaines espèces.
export default defineEventHandler(async (event): Promise<AnimationVitrine[]> => {
  const query = getQuery(event);
  const anglais = lireLangue(query.langue) === "en";
  const especes =
    typeof query.especes === "string" && query.especes
      ? query.especes.split(",").slice(0, 50)
      : undefined;

  const animations = await prisma.animation.findMany({
    where: {
      active: true,
      OR: [{ type: "FIXE" }, { dateHeure: { gt: new Date() } }],
      ...(especes && { enclos: { espece: { slug: { in: especes } } } }),
    },
    orderBy: [{ dateHeure: "asc" }, { heure: "asc" }],
    include: { enclos: { select: { espece: { select: { slug: true } } } } },
  });

  return animations.map((a) => ({
    slug: a.slug,
    type: a.type,
    heure: a.heure,
    dateHeure: a.dateHeure?.toISOString() ?? null,
    espece: a.enclos?.espece.slug ?? null,
    image: a.image,
    titre: (anglais && a.titreEn) || a.titre,
    description: (anglais && a.descriptionEn) || a.description,
    alt: (anglais && a.altEn) || a.alt || "",
  }));
});
