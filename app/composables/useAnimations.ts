import type { AnimationVitrine } from "#shared/animations";

// Animations à venir mises en forme pour les cartes : toutes les fixes, et les ponctuelles
// pas encore passées. `especes` restreint la liste aux enclos de ces espèces (ex. d'une zone).
export async function useAnimations(especes?: MaybeRefOrGetter<string[] | undefined>) {
  const { t, locale } = useI18n();
  const localePath = useLocalePath();
  const { formatHeure, formatDateHeure } = useFormatage();

  const filtre = computed(() => toValue(especes)?.join(",") ?? "");
  const { data } = await useFetch<AnimationVitrine[]>("/api/animations", {
    key: computed(() => `animations-${locale.value}-${filtre.value}`),
    query: { langue: locale, especes: filtre },
    default: () => [],
  });

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
    data.value.map((a) => ({
      ...a,
      lien: localePath(`/animations/${a.slug}`),
      horaire: horaire(a),
      exceptionnel: a.type === "PONCTUELLE",
    })),
  );

  return { animations };
}
