<script setup lang="ts">
import { motion } from "motion-v";
import { monterEnCascade } from "~/animations/apparitionBas";
import { auDefilement } from "~/animations/auDefilement";
import { lirePage, RECHERCHE_MAX, type PageHabitants } from "#shared/habitants";

const props = defineProps<{
  zone: string;
  titre: string;
  texte: string;
}>();

const route = useRoute();
const router = useRouter();
const titreId = useId();
const liste = useTemplateRef<HTMLUListElement>("liste");

const { fiche } = useFichesEspeces();
const { estVisible, delai, reinitialiser } = useArriveeOrdonnee(liste);
const { recherche, rechercheActive, enRecherche, resultats } =
  useRechercheEspeces(() => props.zone);

// La page affichée est dans l'URL (?page=2) : recharger ou partager le lien redonne la même page.
const pageUrl = computed(() => lirePage(route.query.page));
const urlPage = (page: number) =>
  router.resolve({ path: route.path, query: page > 1 ? { page } : {} }).href;

const { data, error } = await useFetch<PageHabitants>(
  () => `/api/zones/${props.zone}/especes`,
  {
    key: computed(() => `habitants-${props.zone}-${pageUrl.value}`),
    query: { page: pageUrl },
    getCachedData: (cle, nuxtApp, contexte) =>
      contexte.cause === "refresh:manual"
        ? undefined
        : (nuxtApp.payload.data[cle] ?? nuxtApp.static.data[cle]),
  },
);

if (error.value?.statusCode === 404) {
  throw createError({ statusCode: 404, fatal: true });
}

useSeoEspeces({
  zone: () => props.zone,
  titre: () => props.titre,
  page: data,
  urlPage,
});

// Liste affichée : la page de l'URL, ou les résultats d'une recherche. Pendant un changement
// de page, l'ancienne liste reste à l'écran jusqu'à l'arrivée de la nouvelle.
const affichage = ref<PageHabitants | null>(
  data.value ? { ...data.value } : null,
);

function afficher(liste: PageHabitants | null | undefined) {
  affichage.value = liste ? { ...liste } : null;
  reinitialiser();
}

watch(data, async (page) => {
  if (!page || rechercheActive.value) return;
  afficher(page);
  await nextTick();
  document.getElementById("habitants")?.scrollIntoView({ behavior: "smooth" });
});
watch(resultats, (liste) => {
  if (rechercheActive.value) afficher(liste);
});
watch(rechercheActive, (texte) => {
  if (!texte) afficher(data.value);
});

const especes = computed(
  () =>
    affichage.value?.especes.map((espece) => fiche(props.zone, espece)) ?? [],
);

// La vedette occupe toute la largeur. Les cartes suivantes sont décalées en quinconce
// (une colonne sur deux, ou celle du milieu, descend) pour casser l'effet de grille.
const placement = (rang: number) => {
  if (rang === 0) return "sm:col-span-2 lg:col-span-3 mb-6 lg:mb-10";
  return [
    rang % 2 === 0 ? "sm:mt-16" : "sm:mt-0",
    rang % 3 === 2 ? "lg:mt-20" : "lg:mt-0",
  ];
};
</script>

<template>
  <section
    id="habitants"
    :aria-labelledby="titreId"
    class="relative scroll-mt-8 overflow-x-clip px-6 py-20 sm:px-12 lg:py-28"
  >
    <div class="relative mx-auto max-w-6xl">
      <div class="mx-auto max-w-4xl text-center">
        <motion.h2
          :id="titreId"
          v-bind="auDefilement(monterEnCascade(0))"
          class="font-titre text-4xl leading-[1.1] text-balance text-acacia sm:text-5xl lg:text-6xl"
        >
          {{ titre }}
        </motion.h2>
        <motion.p
          v-bind="auDefilement(monterEnCascade(1))"
          class="mx-auto mt-6 max-w-3xl leading-relaxed text-pretty sm:text-lg"
        >
          {{ texte }}
        </motion.p>

        <motion.div
          v-bind="auDefilement(monterEnCascade(2))"
          class="mx-auto mt-10 max-w-lg"
        >
          <UiRechercheBar
            v-model="recherche"
            :libelle="$t('parc.zone.habitants.recherche')"
            :exemple="$t('parc.zone.habitants.rechercheExemple')"
            :libelle-effacer="$t('parc.zone.habitants.effacer')"
            :longueur-max="RECHERCHE_MAX"
          />
        </motion.div>

        <p aria-live="polite" class="sr-only">
          <template v-if="rechercheActive && !enRecherche && affichage">
            {{
              affichage.total
                ? $t("parc.zone.habitants.resultats", affichage.total)
                : $t("parc.zone.habitants.aucun", {
                    recherche: rechercheActive,
                  })
            }}
          </template>
        </p>
      </div>

      <ul
        v-if="especes.length"
        ref="liste"
        role="list"
        :aria-busy="enRecherche"
        class="mt-14 grid items-start gap-x-10 gap-y-16 transition-opacity duration-200 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-12"
        :class="{ 'opacity-60': enRecherche }"
      >
        <li
          v-for="(espece, rang) in especes"
          :key="espece.slug"
          :data-rang="rang"
          :class="placement(rang)"
        >
          <ParcZoneCarteVedette
            v-if="rang === 0"
            :nom="espece.nom"
            :texte="espece.texte"
            :presentation="espece.presentation"
            :origine="espece.origine"
            :regime="espece.regime"
            :effectif="espece.effectif"
            :anecdote="espece.anecdote"
            :lien="espece.lien"
            :image="espece.image"
          />
          <ParcZoneCarteEspece
            v-else
            :nom="espece.nom"
            :texte="espece.texte"
            :origine="espece.origine"
            :lien="espece.lien"
            :image="espece.image"
            :rang="rang - 1"
            :visible="estVisible(rang)"
            :delai="delai(rang)"
          />
        </li>
      </ul>
      <p
        v-else-if="rechercheActive && !enRecherche && affichage"
        class="mt-14 text-center text-galerie/80"
        aria-hidden="true"
      >
        {{ $t("parc.zone.habitants.aucun", { recherche: rechercheActive }) }}
      </p>
      <p
        v-else-if="!affichage && !enRecherche"
        class="mt-10 text-center text-galerie/80"
      >
        {{ $t("parc.zone.habitants.erreur") }}
      </p>

      <UiPagination
        v-if="affichage && !rechercheActive"
        :page="affichage.page"
        :pages="affichage.pages"
        :lien="urlPage"
        :libelle="$t('parc.zone.habitants.pagination')"
        class="mt-20"
      />
    </div>
  </section>
</template>
