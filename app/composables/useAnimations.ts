import { ANIMATIONS, type AnimationVitrine } from "~/data/animations";

// Animations à venir mises en forme pour les cartes : toutes les fixes, et les ponctuelles
// pas encore passées. `filtre` restreint la liste (ex. aux enclos d'une zone).
export function useAnimations(
  filtre: (animation: AnimationVitrine) => boolean = () => true,
) {
  const { t } = useI18n();
  const localePath = useLocalePath();
  const { formatHeure, formatDateHeure } = useFormatage();

  function horaire({ heure, dateHeure }: AnimationVitrine) {
    if (dateHeure) {
      const { date, dateCourte, heure } = formatDateHeure(dateHeure);
      return {
        complet: t("animations.horaire.ponctuel", { date, heure }),
        court: t("animations.horaire.ponctuel", { date: dateCourte, heure }),
      };
    }
    if (heure) {
      return {
        complet: t("animations.horaire.quotidien", {
          heure: formatHeure(heure),
        }),
        court: formatHeure(heure),
      };
    }
    return {
      complet: t("animations.horaire.libre"),
      court: t("animations.horaire.libreCourt"),
    };
  }

  const animations = computed(() =>
    ANIMATIONS.filter(
      (a) =>
        (a.type === "FIXE" ||
          (a.dateHeure && new Date(a.dateHeure) > new Date())) &&
        filtre(a),
    ).map((a) => ({
      slug: a.slug,
      image: a.image,
      lien: localePath(`/animations/${a.slug}`),
      titre: t(`animations.liste.${a.slug}.titre`),
      description: t(`animations.liste.${a.slug}.description`),
      alt: t(`animations.liste.${a.slug}.alt`),
      horaire: horaire(a),
      exceptionnel: a.type === "PONCTUELLE",
    })),
  );

  return { animations };
}
