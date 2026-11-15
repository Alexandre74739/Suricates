<script setup lang="ts">
import { CameraOff, CloudSun, Ticket } from "lucide-vue-next";

definePageMeta({ surHero: true });

const { t } = useI18n();
const localePath = useLocalePath();

const CONSEILS = [
  { cle: "gratuit", icone: Ticket },
  { cle: "meteo", icone: CloudSun },
  { cle: "respect", icone: CameraOff },
];

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
      <UiButton
        :to="localePath('/infos-pratiques')"
        couleur="acacia"
        taille="xl"
      >
        {{ $t("animations.hero.infos") }}
      </UiButton>
    </LayoutSemiHero>
    <LazyAnimationsEvents
      lien-secondaire="/parc"
      :texte-secondaire="$t('accueil.hero.decouvrir')"
      hydrate-on-visible
    />
    <LazyAccueilZones
      prefixe="animations.bonASavoir"
      :points="CONSEILS"
      lien="/infos-pratiques"
      hydrate-on-visible
    />
    <LazyConservationEngagements
      :titre="$t('animations.coulisses.titre')"
      :texte="$t('animations.coulisses.texte')"
      hydrate-on-visible
    />
    <LazyUiFaq
      id="faq"
      image="/images/animations/lemuriens-soigneuse.webp"
      :alt="$t('animations.faq.alt')"
      prefixe="animations.faq"
      :questions="['programme', 'soigneurs', 'enfants', 'accessibilite', 'rate']"
      hydrate-on-visible
    />
  </main>
</template>
