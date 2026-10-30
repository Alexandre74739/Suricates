<script setup lang="ts">
import { motion } from "motion-v";
import { monterEnCascade, sortirDuTerrier } from "~/animations/apparitionBas";
import cover from "~/assets/images/illustrations/suricates-tronc.webp";

const localePath = useLocalePath();
</script>

<template>
  <section>
    <div
      class="masque-pinceau-bas relative flex min-h-svh flex-col justify-center overflow-hidden"
    >
      <img
        :src="cover"
        :alt="$t('accueil.hero.alt')"
        fetchpriority="high"
        class="absolute inset-0 size-full object-cover object-[72%_45%] lg:object-top"
      />
      <div
        class="absolute inset-0 bg-radial-[ellipse_at_50%_50%] from-galerie/75 via-galerie/40 via-45% to-galerie/10 to-80%"
        aria-hidden="true"
      />

      <p
        class="absolute top-1/2 right-5 hidden -translate-y-1/2 rotate-180 text-sm font-semibold tracking-[0.3em] text-sable uppercase [writing-mode:vertical-rl] lg:block"
        aria-hidden="true"
      >
        {{ $t("accueil.hero.nomVertical") }}
      </p>

      <div
        class="relative mx-auto flex w-full max-w-6xl flex-col items-center px-6 pt-26 pb-40 text-center sm:px-12 sm:pt-32 lg:pt-48 lg:pb-48"
      >
        <div class="overflow-hidden pb-1">
          <motion.h1
            v-bind="sortirDuTerrier(0)"
            class="font-titre text-4xl leading-[1.05] text-balance text-white sm:text-5xl md:text-6xl xl:text-7xl"
          >
            {{ $t("accueil.hero.titre") }}
          </motion.h1>
        </div>

        <motion.p
          v-bind="monterEnCascade(4)"
          class="mt-6 max-w-4xl text-base leading-relaxed text-balance text-white sm:text-lg"
        >
          {{ $t("accueil.hero.texte") }}
        </motion.p>

        <motion.div
          v-bind="monterEnCascade(6)"
          class="mt-10 flex flex-wrap justify-center gap-4"
        >
          <UiButton :to="localePath('/billetterie')" taille="xl">
            {{ $t("menu.reserver") }}
          </UiButton>
          <UiButton :to="localePath('/parc')" couleur="acacia" taille="xl">
            {{ $t("accueil.hero.decouvrir") }}
          </UiButton>
        </motion.div>
      </div>
    </div>
  </section>
</template>
