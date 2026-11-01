<script setup lang="ts">
definePageMeta({ surHero: true });

const route = useRoute();
const { zones } = useZones();

const zone = computed(() =>
  zones.value.find((z) => z.slug === route.params.zone),
);
const espece = computed(() =>
  zone.value?.especes.find((e) => e.slug === route.params.enclos),
);

if (!espece.value) {
  throw createError({ statusCode: 404, fatal: true });
}

useSeoMeta({
  title: () => `${espece.value?.nom} · Le Domaine des Suricates`,
  ogTitle: () => `${espece.value?.nom} · Le Domaine des Suricates`,
});
</script>

<template>
  <main v-if="zone && espece">
    <LayoutSemiHero
      :titre="espece.nom"
      :texte="$t('parc.enclos.texte')"
      :fond="zone.fond"
    >
      <UiButton :to="zone.lien" couleur="acacia" taille="xl">
        {{ zone.bouton }}
      </UiButton>
    </LayoutSemiHero>
  </main>
</template>
