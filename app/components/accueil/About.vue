<script setup lang="ts">
const localePath = useLocalePath();
</script>

<template>
  <section
    aria-labelledby="about-titre"
    class="space-y-20 overflow-x-clip pt-20 pb-24 lg:space-y-28 lg:pt-28 lg:pb-32"
  >
    <h2 id="about-titre" class="sr-only">
      {{ $t("accueil.apropos.titre") }}
    </h2>

    <AccueilAboutPart
      image="/images/illustrations/panda-roux.webp"
      :alt="$t('accueil.apropos.habitants.alt')"
      format="carre"
      :titre="$t('accueil.apropos.habitants.titre')"
      :texte="$t('accueil.apropos.habitants.texte')"
      :points="[
        $t('accueil.apropos.habitants.points.milieux'),
        $t('accueil.apropos.habitants.points.regions'),
        $t('accueil.apropos.habitants.points.famille'),
      ]"
      :bouton="{
        libelle: $t('accueil.apropos.habitants.bouton'),
        lien: localePath('/parc'),
      }"
      :empreintes="3"
    />

    <AccueilAboutPart
      image="/images/illustrations/tigres.webp"
      :alt="$t('accueil.apropos.bienEtre.alt')"
      format="paysage"
      :titre="$t('accueil.apropos.bienEtre.titre')"
      :texte="$t('accueil.apropos.bienEtre.texte')"
      :points="[
        $t('accueil.apropos.bienEtre.points.repli'),
        $t('accueil.apropos.bienEtre.points.enrichissement'),
        $t('accueil.apropos.bienEtre.points.veterinaire'),
      ]"
      :empreintes="2"
      inverse
    />

    <AccueilAboutPart
      image="/images/illustrations/girafes-soigneuse.webp"
      :alt="$t('accueil.apropos.sensibilisation.alt')"
      format="portrait"
      :titre="$t('accueil.apropos.sensibilisation.titre')"
      :texte="$t('accueil.apropos.sensibilisation.texte')"
      :points="[
        $t('accueil.apropos.sensibilisation.points.nourrissages'),
        $t('accueil.apropos.sensibilisation.points.rendezVous'),
        $t('accueil.apropos.sensibilisation.points.gestes'),
      ]"
      :cadre="{
        titre: $t('accueil.apropos.sensibilisation.cadre.titre'),
        texte: $t('accueil.apropos.sensibilisation.cadre.texte'),
        libelle: $t('accueil.apropos.sensibilisation.cadre.bouton'),
        lien: $t('accueil.apropos.sensibilisation.cadre.lien'),
      }"
      :empreintes="3"
    />
  </section>
</template>
