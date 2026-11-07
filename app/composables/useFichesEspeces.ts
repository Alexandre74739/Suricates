import type { EspeceHabitant } from "#shared/habitants";

export function useFichesEspeces() {
  const { t } = useI18n();
  const localePath = useLocalePath();

  const lienEnclos = (zone: string, slug: string) =>
    localePath({ name: "parc-zone-enclos", params: { zone, enclos: slug } });

  const fiche = (zone: string, espece: EspeceHabitant) => {
    const cle = `especesFiches.${espece.slug}`;
    return {
      ...espece,
      texte: t(`${cle}.texte`),
      presentation: t(`${cle}.vedette`),
      origine: t(`${cle}.origine`),
      regime: t(`${cle}.regime`),
      anecdote: t(`${cle}.anecdote`),
      lien: lienEnclos(zone, espece.slug),
    };
  };

  return { fiche, lienEnclos };
}
