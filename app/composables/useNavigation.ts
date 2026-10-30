// `cle` : clé de traduction dans i18n/locales/.
// `nom` : nom de base de la route (sans la langue), pour savoir quel lien est actif.
const pages = [
  { cle: "nav.accueil", to: "/", nom: "index" },
  { cle: "nav.parc", to: "/parc", nom: "parc" },
  { cle: "nav.animations", to: "/animations", nom: "animations" },
  { cle: "nav.infos", to: "/infos-pratiques", nom: "infos-pratiques" },
];

export function useNavigation() {
  const route = useRoute();
  const { t } = useI18n();
  const localePath = useLocalePath();
  const routeBaseName = useRouteBaseName();

  // `to` devient le chemin dans la langue courante (ex. /parc → /en/park).
  // `actif` compare des noms de base, identiques dans toutes les langues : comparer des chemins
  // obtenus par localePath laissait le lien figé sur l'ancienne langue après un changement.
  // Une sous-page (parc-id) garde le lien de sa section actif.
  const liens = computed(() => {
    const actuelle = routeBaseName(route) ?? "";
    return pages.map((page) => ({
      label: t(page.cle),
      to: localePath(page.to),
      actif: actuelle === page.nom || (page.nom !== "index" && actuelle.startsWith(`${page.nom}-`)),
    }));
  });

  return { liens };
}
