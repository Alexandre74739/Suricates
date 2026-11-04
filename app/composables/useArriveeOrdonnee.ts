import type { Ref } from "vue";

export function useArriveeOrdonnee(liste: Readonly<Ref<HTMLElement | null>>) {
  const vues = ref(-1);
  const delais = ref<Record<number, number>>({});
  let observateur: IntersectionObserver | undefined;

  function observer() {
    liste.value
      ?.querySelectorAll<HTMLElement>("[data-rang]")
      .forEach((element) => observateur?.observe(element));
  }

  function reinitialiser() {
    observateur?.disconnect();
    vues.value = -1;
    delais.value = {};
    nextTick(observer);
  }

  onMounted(() => {
    observateur = new IntersectionObserver(
      (entrees) => {
        const max = Math.max(
          vues.value,
          ...entrees
            .filter((e) => e.isIntersecting)
            .map((e) => Number((e.target as HTMLElement).dataset.rang)),
        );
        for (let rang = vues.value + 1; rang <= max; rang++) {
          delais.value[rang] = (rang - vues.value - 1) * 0.1;
        }
        vues.value = max;
      },
      { threshold: 0.1 },
    );
    observer();
  });
  onBeforeUnmount(() => observateur?.disconnect());

  const estVisible = (rang: number) => rang <= vues.value;
  const delai = (rang: number) => delais.value[rang] ?? 0;

  return { estVisible, delai, reinitialiser };
}
