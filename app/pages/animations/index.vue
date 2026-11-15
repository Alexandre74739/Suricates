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
      <UiButton :to="localePath('/infos-pratiques')" couleur="acacia" taille="xl">
        {{ $t("animations.hero.infos") }}
      </UiButton>
    </LayoutSemiHero>
    <LazyAnimationsEvents
      lien-secondaire="/parc"
      :texte-secondaire="$t('accueil.hero.decouvrir')"
      hydrate-on-visible
    />
    <LazyConservationEngagements
      :titre="$t('animations.coulisses.titre')"
      :texte="$t('animations.coulisses.texte')"
      hydrate-on-visible
    />
  </main>
</template>
