<script setup lang="ts">
definePageMeta({ surHero: true });

const route = useRoute();
const localePath = useLocalePath();
const { zones } = useZones();

const zone = computed(() =>
  zones.value.find((z) => z.slug === route.params.zone),
);

if (!zone.value) {
  throw createError({ statusCode: 404, fatal: true });
}

useSeoMeta({
  title: () => `${zone.value?.nom} · Le Domaine des Suricates`,
  description: () => zone.value?.accroche,
  ogTitle: () => `${zone.value?.nom} · Le Domaine des Suricates`,
  ogDescription: () => zone.value?.accroche,
});
</script>

<template>
  <main v-if="zone">
    <LayoutSemiHero
      :titre="zone.nom"
      :texte="zone.accroche"
      :image="zone.hero?.image ?? zone.image"
      :alt="zone.hero ? zone.altHero : zone.alt"
      :position="zone.hero?.position"
    >
      <UiButton :to="localePath('/parc')" couleur="terracotta" taille="xl">
        {{ $t("parc.zone.retour") }}
      </UiButton>
    </LayoutSemiHero>
    <LazyParcZoneMilieuNaturel v-bind="zone.milieuNaturel" hydrate-on-visible />
    <LazyParcZoneHabitants
      :zone="zone.slug"
      v-bind="zone.habitantsSection"
      hydrate-on-visible
    />
    <LazyConservationEngagements
      v-bind="zone.conservation"
      hydrate-on-visible
    />
    <LazyAccueilAnimations
      :especes="zone.especes.map((e) => e.slug)"
      :titre="$t('parc.zone.animations.titre')"
      :texte="$t('parc.zone.animations.texte')"
      hydrate-on-visible
    />
  </main>
</template>
