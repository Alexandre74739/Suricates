import { existsSync, readFileSync } from "node:fs";
import { BlobNotFoundError, head, put } from "@vercel/blob";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient, type Pole, type Role } from "../server/generated/prisma/client";
import { ZONES } from "./donnees/zones";
import { ANIMATIONS } from "./donnees/animations";

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }),
});

// Une photo déjà dans Blob est réutilisée : le fichier source peut avoir quitté le dépôt.
async function photo(source: string | undefined, chemin: string) {
  if (!source) return null;
  if (source.startsWith("https://")) return source;
  try {
    return (await head(chemin)).url;
  } catch (erreur) {
    if (!(erreur instanceof BlobNotFoundError)) throw erreur;
  }
  if (!existsSync(source)) {
    console.warn(`Photo introuvable, ignorée : ${source}`);
    return null;
  }
  const { url } = await put(chemin, readFileSync(source), {
    access: "public",
    contentType: "image/webp",
  });
  return url;
}

const TARIFS_CENTIMES = { PLEIN: 2000, REDUIT: 1200 } as const;
const JAUGE_JOURNALIERE = 2500;

const EQUIPE: { prenom: string; nom: string; role: Role; pole?: Pole }[] = [
  { prenom: "Claire", nom: "Morel", role: "ADMIN" },
  { prenom: "Hugo", nom: "Bernard", role: "ADJOINT", pole: "ACCUEIL" },
  { prenom: "Léa", nom: "Garnier", role: "AGENT", pole: "ACCUEIL" },
  { prenom: "Inès", nom: "Fabre", role: "ADJOINT", pole: "SOINS" },
  { prenom: "Tom", nom: "Rousseau", role: "AGENT", pole: "SOINS" },
  { prenom: "Manon", nom: "Lefèvre", role: "ADJOINT", pole: "ANIMATIONS" },
  { prenom: "Noé", nom: "Girard", role: "AGENT", pole: "ANIMATIONS" },
  { prenom: "Julie", nom: "Martin", role: "CLIENT" },
];

function dureeMinutes(slug: string, type: "FIXE" | "PONCTUELLE", heure?: string) {
  if (type === "PONCTUELLE") return 45;
  if (!heure) return null;
  return slug.startsWith("spectacle") ? 30 : 20;
}

async function main() {
  for (const [code, prixCentimes] of Object.entries(TARIFS_CENTIMES)) {
    await prisma.tarif.upsert({
      where: { code: code as keyof typeof TARIFS_CENTIMES },
      update: {},
      create: { code: code as keyof typeof TARIFS_CENTIMES, prixCentimes },
    });
  }

  await prisma.parametre.upsert({
    where: { id: 1 },
    update: {},
    create: { id: 1, jaugeJournaliere: JAUGE_JOURNALIERE },
  });

  const equipe = new Map<string, number>();
  for (const membre of EQUIPE) {
    const identifiant = [membre.role, membre.pole].filter(Boolean).join("-").toLowerCase();
    const email = `${membre.prenom.normalize("NFD").replace(/\p{M}/gu, "").toLowerCase()}@domaine-des-suricates.test`;
    const utilisateur = await prisma.utilisateur.upsert({
      where: { email },
      update: { role: membre.role, pole: membre.pole ?? null },
      create: {
        authId: `seed-${identifiant}`,
        email,
        prenom: membre.prenom,
        nom: membre.nom,
        role: membre.role,
        pole: membre.pole,
      },
    });
    equipe.set(identifiant, utilisateur.id);
  }

  const enclosParEspece = new Map<string, number>();
  for (const [ordre, zone] of ZONES.entries()) {
    const donnees = {
      nom: zone.nom,
      nomEn: zone.nomEn,
      couleur: zone.couleur,
      ordre,
    };
    const { id: zoneId } = await prisma.zone.upsert({
      where: { slug: zone.slug },
      update: donnees,
      create: { slug: zone.slug, ...donnees },
    });

    for (const [rang, { slug, nom, nomEn, effectif, photo: source }] of zone.especes.entries()) {
      const espece = { nom, nomEn, image: await photo(source, `enclos/${slug}.webp`) };
      const { id: especeId } = await prisma.espece.upsert({
        where: { slug },
        update: espece,
        create: { slug, ...espece },
      });
      const enclos = { zoneId, especeId, effectif, ordre: rang };
      const { id } = await prisma.enclos.upsert({
        where: { slug },
        update: enclos,
        create: { slug, ...enclos },
      });
      enclosParEspece.set(slug, id);
    }
  }

  const creeParId = equipe.get("adjoint-animations");
  for (const animation of ANIMATIONS) {
    const donnees = {
      titre: animation.titre,
      titreEn: animation.titreEn,
      description: animation.description,
      descriptionEn: animation.descriptionEn,
      image: await photo(animation.photo, `animations/${animation.slug}.webp`),
      alt: animation.alt ?? null,
      altEn: animation.altEn ?? null,
      type: animation.type,
      heure: animation.heure ?? null,
      dateHeure: animation.dateHeure ? new Date(animation.dateHeure) : null,
      dureeMinutes: dureeMinutes(animation.slug, animation.type, animation.heure),
      enclosId: animation.enclos ? enclosParEspece.get(animation.enclos) : null,
    };
    await prisma.animation.upsert({
      where: { slug: animation.slug },
      update: donnees,
      create: { slug: animation.slug, creeParId, ...donnees },
    });
  }

  console.log(
    `Seed terminé : ${ZONES.length} zones, ${enclosParEspece.size} enclos, ${ANIMATIONS.length} animations, ${EQUIPE.length} utilisateurs.`,
  );
}

main()
  .catch((erreur) => {
    console.error(erreur);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
