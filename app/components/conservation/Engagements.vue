<script setup lang="ts">
import { motion } from "motion-v";
import {
  ArrowUpRight,
  Earth,
  HeartHandshake,
  Lightbulb,
} from "lucide-vue-next";
import { monterEnCascade } from "~/animations/apparitionBas";
import { auDefilement } from "~/animations/auDefilement";

// Section réutilisable : titre et intro propres à la page, engagements du parc communs
// à tout le site, puis l'encadré WWF.
defineProps<{
  titre: string;
  texte: string;
}>();

const titreId = useId();

// Les engagements suivent l'ordre des textes conservation.engagements : élevage, terrain, sensibilisation.
const ENGAGEMENTS = [
  { icone: HeartHandshake, ombre: "bg-sauge" },
  { icone: Earth, ombre: "bg-terracotta" },
  { icone: Lightbulb, ombre: "bg-acacia" },
];
</script>

<template>
  <section :aria-labelledby="titreId" class="px-6 py-20 sm:px-12 lg:py-28">
    <div class="mx-auto max-w-6xl">
      <div class="max-w-3xl">
        <motion.h2
          :id="titreId"
          v-bind="auDefilement(monterEnCascade(0))"
          class="font-titre text-4xl leading-tight text-balance text-acacia sm:text-5xl"
        >
          {{ titre }}
        </motion.h2>
        <motion.p
          v-bind="auDefilement(monterEnCascade(1))"
          class="mt-5 max-w-2xl leading-relaxed text-pretty sm:text-lg"
        >
          {{ texte }}
        </motion.p>
      </div>

      <ul
        role="list"
        class="mt-14 grid max-w-xl gap-y-16 lg:mt-16 lg:max-w-none lg:grid-cols-3 lg:items-start lg:gap-x-14"
      >
        <motion.li
          v-for="(engagement, rang) in ENGAGEMENTS"
          :key="rang"
          v-bind="auDefilement(monterEnCascade(2 + rang))"
          class="relative"
          :class="{ 'lg:mt-16': rang === 1 }"
        >
          <div
            class="masque-pinceau absolute inset-0 translate-x-2 translate-y-2.5 -scale-x-100"
            :class="engagement.ombre"
            aria-hidden="true"
          />
          <UiPastille
            :decalage="rang * 2"
            class="absolute -top-7 left-8 z-10 size-14 bg-terracotta text-white"
          >
            <component :is="engagement.icone" class="size-6" />
          </UiPastille>
          <article
            class="masque-pinceau relative bg-white px-8 pt-14 pb-11 sm:px-10"
          >
            <h3 class="text-xl leading-snug font-semibold text-balance">
              {{ $t(`conservation.engagements.${rang}.titre`) }}
            </h3>
            <i18n-t
              :keypath="`conservation.engagements.${rang}.texte`"
              tag="p"
              scope="global"
              class="mt-4 leading-relaxed text-pretty text-galerie/80"
            >
              <template #lien>
                <a
                  :href="$t('conservation.eep.lien')"
                  target="_blank"
                  rel="noopener"
                  class="font-semibold text-terracotta-fonce underline decoration-terracotta-fonce/40 underline-offset-4 transition-colors duration-200 hover:decoration-terracotta-fonce focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracotta"
                >
                  {{ $t("conservation.eep.libelle")
                  }}<span class="sr-only"> {{ $t("commun.nouvelOnglet") }}</span
                  ><ArrowUpRight
                    class="ml-0.5 inline size-4 align-[-0.15em]"
                    aria-hidden="true"
                  />
                </a>
              </template>
            </i18n-t>
          </article>
        </motion.li>
      </ul>

      <motion.div
        v-bind="auDefilement(monterEnCascade(5))"
        class="mt-16 max-w-xl lg:mt-14 lg:max-w-none"
      >
        <UiCadre
          :titre="$t('commun.wwf.titre')"
          :texte="$t('commun.wwf.texte')"
          :libelle="$t('commun.wwf.bouton')"
          :lien="$t('commun.wwf.lien')"
          grand
        />
      </motion.div>
    </div>
  </section>
</template>
