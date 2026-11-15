<script setup lang="ts">
import { Sandwich, SquareParking, Toilet, Utensils } from "lucide-vue-next";

definePageMeta({ surHero: true });

const { t } = useI18n();

useSeoMeta({
  title: () => t("accueil.seo.titre"),
  description: () => t("accueil.seo.description"),
  ogTitle: () => t("accueil.seo.titre"),
  ogDescription: () => t("accueil.seo.description"),
});

const SERVICES = [
  { cle: "restauration", icone: Utensils },
  { cle: "piqueNique", icone: Sandwich },
  { cle: "services", icone: Toilet },
  { cle: "parkings", icone: SquareParking },
];
</script>

<template>
  <main>
    <AccueilHero />
    <AccueilBandeauRaccourcis />
    <LazyAccueilAbout hydrate-on-visible />
    <LazyInfosHorairesTarifs id="horaires&tarifs" hydrate-on-visible />
    <LazyAnimationsEvents hydrate-on-visible />
    <LazyAccueilZones
      id="especes"
      prefixe="accueil.zones"
      :points="SERVICES"
      lien="/parc"
      hydrate-on-visible
    />
    <LazyUiFaq
      hydrate-on-visible
      id="faq"
      image="/images/illustrations/girafes-zebre.webp"
      :alt="$t('accueil.faq.alt')"
      prefixe="accueil.faq"
      :questions="['billet', 'animations', 'duree', 'repas', 'groupes']"
    />
  </main>
</template>
