<script setup lang="ts">
const { t } = useI18n();

useSeoMeta({
  title: () => t("accueil.seo.titre"),
  description: () => t("accueil.seo.description"),
  ogTitle: () => t("accueil.seo.titre"),
  ogDescription: () => t("accueil.seo.description"),
});

const questions = computed(() =>
  ["billet", "animations", "duree", "repas", "groupes"].map((cle) => ({
    question: t(`accueil.faq.questions.${cle}.question`),
    reponse: t(`accueil.faq.questions.${cle}.reponse`),
  })),
);
</script>

<template>
  <main>
    <AccueilHero />
    <AccueilBandeauRaccourcis />
    <AccueilAbout />
    <InfosHorairesTarifs id="horaires&tarifs" />
    <AccueilAnimations />
    <AccueilZones id="especes" />
    <UiFaq
      id="faq"
      image="/images/illustrations/girafes-zebre.webp"
      :alt="$t('accueil.faq.alt')"
      :titre="$t('accueil.faq.titre')"
      :texte="$t('accueil.faq.texte')"
      :questions="questions"
    />
  </main>
</template>
