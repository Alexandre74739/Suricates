import type { CouleurZone, ZoneVitrine } from "#shared/zones";

export const FONDS_ZONE: Record<CouleurZone, string> = {
  terracotta: "bg-terracotta",
  galerie: "bg-galerie",
  acacia: "bg-acacia",
  sauge: "bg-sauge",
  ocre: "bg-ocre",
};

const PHOTOS_ZONES: Record<
  string,
  { image: string; hero?: { image: string; position?: string } }
> = {
  "chemin-de-brousse": {
    image: "/images/parc/girafes-zebres.webp",
    hero: {
      image: "/images/parc/elephants.webp",
      position: "object-[55%_center]",
    },
  },
  "territoire-des-fauves": {
    image: "/images/parc/lion.webp",
    hero: {
      image: "/images/parc/tigre-rocher.webp",
      position: "object-[58%_center]",
    },
  },
  "temple-de-la-jungle": {
    image: "/images/parc/panda-geant.webp",
    hero: {
      image: "/images/parc/panda-tronc.webp",
      position: "object-[65%_center]",
    },
  },
  "sentier-des-incas": {
    image: "/images/parc/aras.webp",
    hero: {
      image: "/images/parc/capybaras.webp",
      position: "object-[70%_center]",
    },
  },
  "cite-marine": {
    image: "/images/parc/otaries.webp",
    hero: { image: "/images/parc/manchots.webp" },
  },
};

export async function useZones() {
  const { t, locale } = useI18n();
  const localePath = useLocalePath();

  const { data } = await useFetch<ZoneVitrine[]>("/api/zones", {
    key: computed(() => `zones-${locale.value}`),
    query: { langue: locale },
    default: () => [],
  });

  const zones = computed(() =>
    data.value.map((zone) => {
      const cle = `parc.zones.liste.${zone.slug}`;
      const photos = PHOTOS_ZONES[zone.slug];
      return {
        ...zone,
        image: photos?.image,
        hero: photos?.hero,
        alt: photos ? t(`${cle}.alt`) : undefined,
        altHero: photos?.hero ? t(`${cle}.altHero`) : undefined,
        fond: FONDS_ZONE[zone.couleur],
        lien: localePath({ name: "parc-zone", params: { zone: zone.slug } }),
        bouton: t(`${cle}.bouton`),
        accroche: t(`${cle}.accroche`),
        milieu: t(`${cle}.milieu`),
        habitants: t(`${cle}.habitants`),
        habitantsSection: {
          titre: t(`${cle}.habitantsSection.titre`),
          texte: t(`${cle}.habitantsSection.texte`),
        },
        milieuNaturel: {
          titre: t(`${cle}.milieuNaturel.titre`),
          texte: t(`${cle}.milieuNaturel.texte`),
          region: t(`${cle}.milieuNaturel.region`),
          climat: t(`${cle}.milieuNaturel.climat`),
          paysage: t(`${cle}.milieuNaturel.paysage`),
        },
        conservation: {
          titre: t(`${cle}.conservation.titre`),
          texte: t(`${cle}.conservation.texte`),
        },
        especes: zone.especes.map((espece) => ({
          ...espece,
          lien: localePath({
            name: "parc-zone-enclos",
            params: { zone: zone.slug, enclos: espece.slug },
          }),
        })),
      };
    }),
  );

  return { zones };
}
