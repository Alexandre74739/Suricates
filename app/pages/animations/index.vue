<script setup lang="ts">
definePageMeta({ surHero: true });

const { t } = useI18n();
const localePath = useLocalePath();

useSeoMeta({
  title: () => t("animations.seo.titre"),
  description: () => t("animations.seo.description"),
  ogTitle: () => t("animations.seo.titre"),
  ogDescription: () => t("animations.seo.description"),
});
</script>

<template>
  <main>
    <LayoutSemiHero
      :titre="$t('animations.hero.titre')"
      :texte="$t('animations.hero.texte')"
      image="/images/animations/lamantins-serre.webp"
      :alt="$t('animations.hero.alt')"
      position="object-[70%_center]"
    >
      <UiButton :to="localePath('/billetterie')" taille="xl">
        {{ $t("menu.reserver") }}
      </UiButton>
      <UiButton to="#programme" couleur="acacia" taille="xl">
        {{ $t("animations.hero.programme") }}
      </UiButton>
    </LayoutSemiHero>
  </main>
</template>
