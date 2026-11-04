<script setup lang="ts">
import { motion } from "motion-v";
import { MapPin } from "lucide-vue-next";
import type { AllurePhoto } from "./PhotoEspece.vue";

const ALLURES: AllurePhoto[] = [
  {
    format: "aspect-4/3 sm:aspect-4/5",
    inclinaison: "-rotate-1",
    ombre:
      "bg-acacia translate-x-3 translate-y-3 rotate-2 group-hover/photo:rotate-3",
    vide: "bg-sauge",
  },
  {
    format: "aspect-4/3 sm:aspect-square",
    inclinaison: "rotate-1",
    ombre:
      "bg-terracotta -translate-x-3 translate-y-3 -rotate-2 group-hover/photo:-rotate-3",
    vide: "bg-acacia",
  },
  {
    format: "aspect-4/3",
    inclinaison: "rotate-0",
    ombre:
      "bg-sauge translate-x-2 -translate-y-2.5 -rotate-1 group-hover/photo:-rotate-2",
    vide: "bg-acacia",
  },
  {
    format: "aspect-4/3 sm:aspect-4/5",
    inclinaison: "rotate-1",
    ombre:
      "bg-terracotta translate-x-3 translate-y-3 -rotate-2 group-hover/photo:-rotate-3",
    vide: "bg-acacia",
  },
  {
    format: "aspect-4/3 sm:aspect-square",
    inclinaison: "-rotate-1",
    ombre:
      "bg-sauge -translate-x-2 translate-y-3 rotate-1 group-hover/photo:rotate-2",
    vide: "bg-acacia",
  },
  {
    format: "aspect-4/3",
    inclinaison: "rotate-0",
    ombre:
      "bg-acacia translate-x-2 -translate-y-2.5 rotate-1 group-hover/photo:rotate-2",
    vide: "bg-sauge",
  },
];
const CACHEE = { opacity: 0, y: 24 };

const props = defineProps<{
  nom: string;
  texte: string;
  origine: string;
  lien: string;
  image: string | null;
  rang: number;
  visible: boolean;
  delai: number;
}>();

const arrivee = computed(() => ({
  initial: CACHEE,
  animate: props.visible
    ? {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.6,
          ease: [0.22, 1, 0.36, 1],
          delay: props.delai,
        },
      }
    : CACHEE,
}));
</script>

<template>
  <motion.article v-bind="arrivee" class="grid gap-7">
    <ParcZonePhotoEspece
      :lien="lien"
      :image="image"
      :allure="ALLURES[rang % ALLURES.length]!"
      sizes="(min-width: 1024px) 360px, (min-width: 640px) 45vw, calc(100vw - 3rem)"
      class="mx-auto w-full max-w-sm sm:max-w-none"
    />

    <div>
      <h3 class="text-2xl font-semibold tracking-tight text-acacia">
        {{ nom }}
      </h3>
      <p class="mt-3 leading-relaxed text-pretty text-galerie/80">
        {{ texte }}
      </p>
      <p class="mt-5 flex items-center gap-3 text-sm">
        <UiPastille
          :decalage="rang * 1.5"
          class="size-9 bg-sauge/60 text-acacia"
        >
          <MapPin class="size-4" />
        </UiPastille>
        <span>
          <span class="sr-only">{{ $t("parc.zone.habitants.origine") }} :</span>
          {{ origine }}
        </span>
      </p>
      <UiLienTexte
        :texte="$t('parc.zone.habitants.voir')"
        :precision="nom"
        :lien="lien"
        class="mt-4 inline-block"
      />
    </div>
  </motion.article>
</template>
