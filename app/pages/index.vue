<script setup lang="ts">
const { t } = useI18n();

useSeoMeta({
  title: () => t("accueil.seo.titre"),
  description: () => t("accueil.seo.description"),
  ogTitle: () => t("accueil.seo.titre"),
  ogDescription: () => t("accueil.seo.description"),
});
</script>

<template>
  <main>
    <AccueilHero />
    <AccueilBandeauRaccourcis />
  </main>
</template>
