import { FONDS_ZONE, ZONES } from "~/data/zones";

export function useZones() {
  const { t } = useI18n();
  const localePath = useLocalePath();

  const zones = computed(() =>
    ZONES.map((zone) => {
      const cle = `parc.zones.liste.${zone.slug}`;
      return {
        ...zone,
        fond: FONDS_ZONE[zone.couleur],
        lien: localePath({ name: "parc-zone", params: { zone: zone.slug } }),
        nom: t(`${cle}.nom`),
        bouton: t(`${cle}.bouton`),
        accroche: t(`${cle}.accroche`),
        milieu: t(`${cle}.milieu`),
        habitants: t(`${cle}.habitants`),
        alt: zone.image ? t(`${cle}.alt`) : undefined,
        altHero: zone.hero ? t(`${cle}.altHero`) : undefined,
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
          slug: espece,
          nom: t(`especes.${espece}`),
          lien: localePath({
            name: "parc-zone-enclos",
            params: { zone: zone.slug, enclos: espece },
          }),
        })),
      };
    }),
  );

  return { zones };
}
