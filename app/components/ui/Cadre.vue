<script setup lang="ts">
import { ArrowUpRight, Earth } from "lucide-vue-next";

withDefaults(
  defineProps<{
    titre: string;
    texte: string;
    libelle: string;
    lien: string;
    grand?: boolean;
  }>(),
  { grand: false },
);
</script>

<template>
  <aside
    class="relative isolate text-white"
    :class="grand ? 'px-8 py-10 sm:px-12 sm:py-12' : 'px-8 py-9 sm:px-10'"
  >
    <div
      class="masque-pinceau-haut-bas absolute inset-0 -z-10 translate-x-2 translate-y-2.5 -scale-x-100 rotate-1"
    >
      <div class="masque-pinceau-cotes size-full bg-sauge" />
    </div>
    <div class="masque-pinceau-haut-bas absolute inset-0 -z-10">
      <div class="masque-pinceau-cotes size-full bg-acacia" />
    </div>
    <div class="flex" :class="grand ? 'gap-5 sm:gap-7' : 'gap-4 sm:gap-5'">
      <span
        class="relative flex shrink-0 items-center justify-center text-acacia"
        :class="grand ? 'size-14 sm:size-16' : 'size-12 sm:size-14'"
      >
        <UiBlob class="absolute inset-0 size-full fill-sable" />
        <Earth
          class="relative"
          :class="grand ? 'size-7 sm:size-8' : 'size-6 sm:size-7'"
          aria-hidden="true"
        />
      </span>
      <div
        class="min-w-0 flex-1"
        :class="{
          'lg:flex lg:items-center lg:justify-between lg:gap-14': grand,
        }"
      >
        <div>
          <p
            class="font-semibold tracking-tight"
            :class="grand ? 'text-xl sm:text-2xl' : 'text-lg'"
          >
            {{ titre }}
          </p>
          <p
            class="leading-relaxed text-pretty text-white/85"
            :class="grand ? 'mt-3 max-w-3xl sm:text-lg' : 'mt-1.5 text-sm'"
          >
            {{ texte }}
          </p>
        </div>
        <UiButton
          :to="lien"
          target="_blank"
          couleur="clair"
          :taille="grand ? 'sm' : 'xs'"
          :class="grand ? 'mt-7 shrink-0 lg:mt-0' : 'mt-4'"
        >
          {{ libelle }}
          <span class="sr-only">{{ $t("commun.nouvelOnglet") }}</span>
          <ArrowUpRight aria-hidden="true" />
        </UiButton>
      </div>
    </div>
  </aside>
</template>
