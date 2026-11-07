import { lireLangue } from "#shared/habitants";
import type { CouleurZone, ZoneVitrine } from "#shared/zones";

export default defineEventHandler(async (event): Promise<ZoneVitrine[]> => {
  const anglais = lireLangue(getQuery(event).langue) === "en";

  const zones = await prisma.zone.findMany({
    orderBy: { ordre: "asc" },
    include: {
      enclos: {
        orderBy: [{ ordre: "asc" }, { id: "asc" }],
        select: {
          effectif: true,
          espece: { select: { slug: true, nom: true, nomEn: true, image: true } },
        },
      },
    },
  });

  return zones.map((z) => ({
    slug: z.slug,
    nom: (anglais && z.nomEn) || z.nom,
    couleur: z.couleur as CouleurZone,
    especes: z.enclos.map(({ effectif, espece }) => ({
      slug: espece.slug,
      nom: (anglais && espece.nomEn) || espece.nom,
      image: espece.image,
      effectif,
    })),
  }));
});
