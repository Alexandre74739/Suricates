<script setup lang="ts">
import { motion } from "motion-v";
import { MapPlus } from "lucide-vue-next";
import { monterEnCascade } from "~/animations/apparitionBas";
import { arriverDeCote } from "~/animations/apparitionCote";
import { auDefilement } from "~/animations/auDefilement";
import { PLAN_PDF } from "#shared/parc";
import type { Component } from "vue";

const props = defineProps<{
  prefixe: string;
  points: { cle: string; icone: Component }[];
  lien: string;
}>();

const { t } = useI18n();
const localePath = useLocalePath();
const id = useId();

const pratique = computed(() =>
  props.points.map(({ cle, icone }) => ({
    icone,
    titre: t(`${props.prefixe}.pratique.${cle}.titre`),
    texte: t(`${props.prefixe}.pratique.${cle}.texte`),
  })),
);
</script>

<template>
  <section
    :aria-labelledby="`${id}-titre`"
    class="masque-pinceau-haut-bas relative isolate overflow-hidden bg-acacia px-6 py-16 text-white [--bord-pinceau:2.5rem] sm:px-12 sm:py-20"
  >
    <div
      class="motif-feuilles absolute inset-0 -z-10 bg-galerie/15"
      aria-hidden="true"
    />
    <div class="mx-auto max-w-6xl">
      <div class="max-w-3xl">
        <motion.h2
          :id="`${id}-titre`"
          v-bind="auDefilement(monterEnCascade(0))"
          class="font-titre text-4xl leading-tight text-balance sm:text-5xl"
        >
          {{ $t(`${prefixe}.titre`) }}
        </motion.h2>
        <motion.p
          v-bind="auDefilement(monterEnCascade(1))"
          class="mt-5 max-w-2xl leading-relaxed text-pretty text-white/85 sm:text-lg"
        >
          {{ $t(`${prefixe}.texte`) }}
        </motion.p>
      </div>

      <div
        class="mt-8 grid gap-10 lg:mt-10 lg:grid-cols-12 lg:items-center lg:gap-x-10"
      >
        <motion.div
          v-bind="auDefilement(arriverDeCote('gauche'))"
          class="min-w-0 -rotate-1 lg:col-span-8"
        >
          <UiImageAgrandissable
            src="/images/illustrations/plan-du-domaine.webp"
            :alt="$t('accueil.zones.planAlt')"
            :largeur="1800"
            :hauteur="1166"
            :agrandir="$t('accueil.zones.agrandir')"
            :fermer="$t('accueil.zones.fermer')"
          />
        </motion.div>

        <motion.div
          v-bind="auDefilement(arriverDeCote('droite'))"
          class="relative mx-auto w-full max-w-md lg:col-span-4 lg:max-w-none"
        >
          <InfosCartePratique
            :titre="$t(`${prefixe}.pratique.titre`)"
            :points="pratique"
            :boutons="[
              {
                libelle: $t('accueil.zones.telecharger'),
                lien: PLAN_PDF,
                icone: MapPlus,
                telecharger: true,
              },
              {
                libelle: $t(`${prefixe}.bouton`),
                lien: localePath(lien),
                couleur: 'acacia',
              },
            ]"
          />
        </motion.div>
      </div>
    </div>
  </section>
</template>
