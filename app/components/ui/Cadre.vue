<script setup lang="ts">
import { ArrowUpRight, Earth } from "lucide-vue-next";

defineProps<{
  titre: string;
  texte: string;
  libelle: string;
  lien: string;
}>();
</script>

<template>
  <aside class="relative isolate px-8 py-9 text-white sm:px-10">
    <div
      class="masque-pinceau-haut-bas absolute inset-0 -z-10 translate-x-2 translate-y-2.5 -scale-x-100 rotate-1"
    >
      <div class="masque-pinceau-cotes size-full bg-sauge" />
    </div>
    <div class="masque-pinceau-haut-bas absolute inset-0 -z-10">
      <div class="masque-pinceau-cotes size-full bg-acacia" />
    </div>
    <div class="flex gap-4 sm:gap-5">
      <span
        class="flex size-12 shrink-0 items-center justify-center rounded-[46%_54%_42%_58%/55%_45%_55%_45%] bg-sable text-acacia sm:size-14"
      >
        <Earth class="size-6 sm:size-7" aria-hidden="true" />
      </span>
      <div>
        <p class="text-lg font-semibold tracking-tight">{{ titre }}</p>
        <p class="mt-1.5 text-sm leading-relaxed text-pretty text-white/85">
          {{ texte }}
        </p>
        <UiButton
          :to="lien"
          target="_blank"
          couleur="clair"
          taille="xs"
          class="mt-4"
        >
          {{ libelle }}
          <span class="sr-only">{{ $t("commun.nouvelOnglet") }}</span>
          <ArrowUpRight aria-hidden="true" />
        </UiButton>
      </div>
    </div>
  </aside>
</template>
