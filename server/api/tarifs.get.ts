export default defineEventHandler(async () => {
  const tarifs = await prisma.tarif.findMany();
  return Object.fromEntries(tarifs.map((t) => [t.code, t.prixCentimes])) as Record<
    "PLEIN" | "REDUIT",
    number
  >;
});
