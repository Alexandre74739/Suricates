import { lireRecherche, type PageHabitants } from "#shared/habitants";

export function useRechercheEspeces(zone: () => string) {
  const { locale } = useI18n();

  const recherche = ref("");
  const rechercheActive = ref("");
  const enRecherche = ref(false);
  const resultats = ref<PageHabitants | null>(null);
  const cache = useState<Record<string, PageHabitants>>(
    "habitants-recherche",
    () => ({}),
  );
  let minuteur: ReturnType<typeof setTimeout> | undefined;

  watch(recherche, (texte) => {
    clearTimeout(minuteur);
    minuteur = setTimeout(
      () => (rechercheActive.value = lireRecherche(texte)),
      250,
    );
  });

  watch(rechercheActive, async (texte) => {
    if (!texte) return;
    enRecherche.value = true;
    try {
      const cle = [zone(), texte, locale.value].join("|");
      cache.value[cle] ??= await $fetch<PageHabitants>(
        `/api/zones/${zone()}/especes`,
        {
          query: { recherche: texte, langue: locale.value },
        },
      );
      if (texte === rechercheActive.value)
        resultats.value = { ...cache.value[cle] };
    } catch {
      resultats.value = null;
    } finally {
      enRecherche.value = false;
    }
  });

  return { recherche, rechercheActive, enRecherche, resultats };
}
