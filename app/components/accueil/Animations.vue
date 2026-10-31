<script setup lang="ts">
import { motion } from "motion-v";
import { monterEnCascade } from "~/animations/apparitionBas";
import { auDefilement } from "~/animations/auDefilement";
import { ANIMATIONS, type AnimationVitrine } from "~/data/animations";

const { t } = useI18n();
const localePath = useLocalePath();
const { formatHeure, formatDateHeure } = useFormatage();
const titreId = useId();

function horaire({ heure, dateHeure }: AnimationVitrine) {
  if (dateHeure) {
    const { date, dateCourte, heure } = formatDateHeure(dateHeure);
    return {
      complet: t("animations.horaire.ponctuel", { date, heure }),
      court: t("animations.horaire.ponctuel", { date: dateCourte, heure }),
    };
  }
  if (heure) {
    return {
      complet: t("animations.horaire.quotidien", { heure: formatHeure(heure) }),
      court: formatHeure(heure),
    };
  }
  return {
    complet: t("animations.horaire.libre"),
    court: t("animations.horaire.libreCourt"),
  };
}

const animations = computed(() =>
  ANIMATIONS.filter(
    (a) =>
      a.type === "FIXE" || (a.dateHeure && new Date(a.dateHeure) > new Date()),
  ).map((a) => ({
    slug: a.slug,
    image: a.image,
    lien: localePath(`/animations/${a.slug}`),
    titre: t(`animations.liste.${a.slug}.titre`),
    description: t(`animations.liste.${a.slug}.description`),
    alt: t(`animations.liste.${a.slug}.alt`),
    horaire: horaire(a),
    exceptionnel: a.type === "PONCTUELLE",
  })),
);
</script>

<template>
  <section
    id="programme"
    :aria-labelledby="titreId"
    class="relative overflow-x-clip px-6 py-20 sm:px-12 lg:py-28"
  >
    <UiEmpreintes
      :pattes="2"
      class="absolute top-10 -left-20 w-44 rotate-20 sm:w-60 lg:-left-12 lg:w-72"
    />
    <UiEmpreintes
      :pattes="3"
      class="absolute -right-24 bottom-0 w-56 rotate-100 sm:w-72 lg:w-80 xl:-right-28 xl:w-96"
    />

    <div class="relative mx-auto max-w-6xl text-center">
      <motion.h2
        :id="titreId"
        v-bind="auDefilement(monterEnCascade(0))"
        class="font-titre text-4xl leading-tight text-balance text-acacia sm:text-5xl"
      >
        {{ $t("accueil.animations.titre") }}
      </motion.h2>
      <motion.p
        v-bind="auDefilement(monterEnCascade(1))"
        class="mx-auto mt-5 max-w-3xl leading-relaxed text-pretty sm:text-lg"
      >
        {{ $t("accueil.animations.texte") }}
      </motion.p>

      <UiCarrousel
        :elements="animations"
        :cle="(a) => a.slug"
        :libelle-precedent="$t('accueil.animations.precedent')"
        :libelle-suivant="$t('accueil.animations.suivant')"
        class="mt-12 text-left"
      >
        <template #default="{ element, clone, charger }">
          <AnimationsCarte
            :lien="element.lien"
            :image="element.image"
            :alt="element.alt"
            :titre="element.titre"
            :description="element.description"
            :horaire="element.horaire"
            :exceptionnel="element.exceptionnel"
            :chargement="charger ? 'eager' : 'lazy'"
            :tabindex="clone ? -1 : undefined"
          />
        </template>
      </UiCarrousel>

      <div class="mt-8 flex flex-wrap justify-center gap-4 sm:mt-6">
        <UiButton :to="localePath('/animations')" couleur="acacia">
          {{ $t("accueil.animations.toutes") }}
        </UiButton>
        <UiButton :to="localePath('/billetterie')">
          {{ $t("menu.reserver") }}
        </UiButton>
      </div>
    </div>
  </section>
</template>
