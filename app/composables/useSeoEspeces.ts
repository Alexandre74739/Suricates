import type { Ref } from "vue";
import { bornesPage, type PageHabitants } from "#shared/habitants";

export function useSeoEspeces(options: {
  zone: () => string;
  titre: () => string;
  page: Ref<PageHabitants | null | undefined>;
  urlPage: (page: number) => string;
}) {
  const { t } = useI18n();
  const { lienEnclos } = useFichesEspeces();
  const origine = useRequestURL().origin;

  useHead({
    link: () => {
      if (!options.page.value) return [];
      const { page, pages } = options.page.value;
      return [
        ...(page > 1
          ? [{ rel: "prev" as const, href: options.urlPage(page - 1) }]
          : []),
        ...(page < pages
          ? [{ rel: "next" as const, href: options.urlPage(page + 1) }]
          : []),
      ];
    },
    script: () => [
      {
        type: "application/ld+json",
        key: "habitants",
        innerHTML: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: options.titre(),
          numberOfItems: options.page.value?.total ?? 0,
          itemListElement: (options.page.value?.especes ?? []).map(
            (espece, rang) => ({
              "@type": "ListItem",
              position:
                bornesPage(options.page.value?.page ?? 1).debut + rang + 1,
              name: t(`especes.${espece.slug}`),
              description: t(`especesFiches.${espece.slug}.texte`),
              url: `${origine}${lienEnclos(options.zone(), espece.slug)}`,
              ...(espece.image ? { image: `${origine}${espece.image}` } : {}),
            }),
          ),
        }),
      },
    ],
  });
}
