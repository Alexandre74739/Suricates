// `cle` : clé de traduction dans i18n/locales/.
const pages = [
  { cle: "nav.accueil", to: "/" },
  { cle: "nav.parc", to: "/parc" },
  { cle: "nav.animations", to: "/animations" },
  { cle: "nav.infos", to: "/infos-pratiques" },
];

export function useNavigation() {
  const route = useRoute();
  const { t } = useI18n();
  const localePath = useLocalePath();

  // `to` devient le chemin dans la langue courante (ex. /parc → /en/park).
  const liens = computed(() =>
    pages.map((page) => ({ label: t(page.cle), to: localePath(page.to) })),
  );

  const accueil = computed(() => localePath("/"));
  const estActif = (to: string) =>
    to === accueil.value ? route.path === to : route.path.startsWith(to);

  return { liens, estActif };
}
