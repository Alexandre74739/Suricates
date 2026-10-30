const liens = [
  { label: "Bienvenue", to: "/" },
  { label: "Le parc", to: "/parc" },
  { label: "Nos animations", to: "/animations" },
  { label: "Infos pratiques", to: "/infos-pratiques" },
];

export function useNavigation() {
  const route = useRoute();

  const estActif = (to: string) =>
    to === "/" ? route.path === "/" : route.path.startsWith(to);

  return { liens, estActif };
}
