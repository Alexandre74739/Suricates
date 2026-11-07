<script setup lang="ts">
definePageMeta({ surHero: true });

const route = useRoute();
const localePath = useLocalePath();
const { t } = useI18n();
const { allerA } = useDefilement();
const { zones } = await useZones();
const { fiche } = useFichesEspeces();
const origin = useRequestURL().origin;

const zone = computed(() =>
  zones.value.find((z) => z.slug === route.params.zone),
);
const species = computed(() => {
  const espece = zone.value?.especes.find(
    (e) => e.slug === route.params.enclos,
  );
  return espece && fiche(zone.value!.slug, espece);
});

if (!species.value) {
  throw createError({ statusCode: 404, fatal: true });
}

const breadcrumb = computed(() => [
  { label: t("nav.parc"), link: localePath("/parc") },
  { label: zone.value!.nom, link: zone.value!.lien },
  { label: species.value!.nom, link: route.path },
]);

const speciesName = computed(() => species.value!.nom.toLocaleLowerCase());
const seoTitle = computed(() =>
  t("parc.enclos.seo.titre", { nom: species.value!.nom }),
);
const seoDescription = computed(() =>
  t("parc.enclos.seo.description", {
    nom: speciesName.value,
    effectif: species.value!.effectif,
    zone:
      zone.value!.nom.charAt(0).toLocaleLowerCase() + zone.value!.nom.slice(1),
  }),
);

useSeoMeta({
  title: seoTitle,
  description: seoDescription,
  ogTitle: seoTitle,
  ogDescription: seoDescription,
  ogImage: () =>
    species.value?.image
      ? new URL(species.value.image, origin).href
      : undefined,
});
</script>

<template>
  <main v-if="zone && species">
    <article>
      <ParcEnclosHero
        :name="species.nom"
        :text="$t('parc.enclos.heroTexte')"
        :breadcrumb="breadcrumb"
        :image="species.image"
      >
        <UiButton :to="localePath('/billetterie')" taille="xl">
          {{ $t("menu.reserver") }}
        </UiButton>
        <!-- Bouton et non lien : le routeur sauterait à l'ancre avant le défilement doux. -->
        <UiButton
          couleur="acacia"
          taille="xl"
          @click="allerA($event, '#identite')"
        >
          {{ $t("parc.enclos.ouEtQuand") }}
        </UiButton>
      </ParcEnclosHero>

      <ParcEnclosOverview :zone="zone" :species="species" />

      <ParcEnclosIdentity
        :title="$t('parc.enclos.identite.titre', { nom: speciesName })"
        :text="$t('parc.enclos.identite.texte')"
        :origin="species.origine"
        :diet="species.regime"
        :headcount="species.effectif"
        :anecdote="species.anecdote"
        :zone="{ name: zone.nom, link: zone.lien }"
      />
    </article>
  </main>
</template>
