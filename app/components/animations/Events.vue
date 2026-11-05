<script setup lang="ts">
import { motion } from "motion-v";
import { monterEnCascade } from "~/animations/apparitionBas";
import { auDefilement } from "~/animations/auDefilement";

const props = defineProps<{
  especes?: string[];
  titre?: string;
  texte?: string;
}>();

const localePath = useLocalePath();
const titreId = useId();
const { animations } = useAnimations(
  (a) => !props.especes || (!!a.enclos && props.especes.includes(a.enclos)),
);
</script>

<template>
  <section
    :id="especes ? undefined : 'programme'"
    :aria-labelledby="titreId"
    class="relative overflow-x-clip px-6 pb-20 sm:px-12 lg:pb-28"
    :class="especes ? 'pt-4 lg:pt-6' : 'pt-20 lg:pt-28'"
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
        {{ titre ?? $t("accueil.animations.titre") }}
      </motion.h2>
      <motion.p
        v-bind="auDefilement(monterEnCascade(1))"
        class="mx-auto mt-5 max-w-3xl leading-relaxed text-pretty sm:text-lg"
      >
        {{ texte ?? $t("accueil.animations.texte") }}
      </motion.p>

      <UiCarrousel
        v-if="animations.length"
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
      <p v-else class="mx-auto mt-10 max-w-2xl text-pretty text-galerie/80">
        {{ $t("accueil.animations.aucune") }}
      </p>

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
