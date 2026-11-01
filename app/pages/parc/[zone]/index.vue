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
      :image="zone.image"
      :alt="zone.alt"
      :fond="zone.fond"
    >
      <UiButton :to="localePath('/parc')" couleur="acacia" taille="xl">
        {{ $t("parc.zone.retour") }}
      </UiButton>
    </LayoutSemiHero>
  </main>
</template>
