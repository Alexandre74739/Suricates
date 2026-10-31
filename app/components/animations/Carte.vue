<script setup lang="ts">
import { ArrowRight, CalendarDays, Clock } from "lucide-vue-next";

withDefaults(
  defineProps<{
    lien: string;
    image: string;
    alt: string;
    titre: string;
    description: string;
    horaire: { complet: string; court: string };
    exceptionnel?: boolean;
    chargement?: "lazy" | "eager";
  }>(),
  { exceptionnel: false, chargement: "lazy" },
);
</script>

<template>
  <NuxtLink
    :to="lien"
    draggable="false"
    class="group flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl bg-white shadow-lg shadow-galerie/10 transition duration-300 hover:-translate-y-1 hover:shadow-xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-terracotta"
  >
    <div class="relative aspect-4/3 overflow-hidden bg-sauge/40">
      <img
        :src="image"
        :alt="alt"
        :loading="chargement"
        decoding="async"
        draggable="false"
        class="size-full object-cover transition duration-500 group-hover:scale-105"
      />
      <p
        class="absolute top-2 left-2 flex max-w-[calc(100%-1rem)] items-center gap-1 rounded-full px-2.5 py-1 text-xs leading-tight font-semibold whitespace-nowrap shadow-md shadow-galerie/15 sm:top-3 sm:left-3 sm:gap-1.5 sm:px-3 sm:py-1.5 sm:text-sm"
        :class="
          exceptionnel
            ? 'bg-terracotta-fonce text-white'
            : 'bg-white text-galerie'
        "
      >
        <component
          :is="exceptionnel ? CalendarDays : Clock"
          class="size-3.5 shrink-0 sm:size-4"
          :class="exceptionnel ? '' : 'text-acacia'"
          aria-hidden="true"
        />
        <span class="sm:hidden">{{ horaire.court }}</span>
        <span class="max-sm:hidden">{{ horaire.complet }}</span>
      </p>
    </div>
    <div class="flex flex-1 flex-col p-4 sm:p-6 lg:p-7">
      <h3
        class="mb-4 line-clamp-2 text-base sm:mb-0 font-semibold tracking-tight text-acacia transition-colors duration-200 group-hover:text-acacia-clair sm:text-xl lg:text-2xl"
      >
        {{ titre }}
      </h3>
      <p
        class="mt-2 mb-6 line-clamp-2 leading-relaxed text-galerie/80 max-sm:hidden lg:line-clamp-3"
      >
        {{ description }}
      </p>
      <span
        class="mt-auto inline-flex items-center gap-1.5 self-start rounded-lg bg-terracotta-fonce px-3.5 py-1.5 text-sm font-semibold tracking-tight text-white transition-colors duration-200 group-hover:bg-terracotta sm:gap-2 sm:px-5 sm:py-2.5 sm:text-base"
      >
        {{ $t("animations.carte.decouvrir") }}
        <ArrowRight
          class="size-4 transition-transform group-hover:translate-x-0.5 sm:size-5"
          aria-hidden="true"
        />
      </span>
    </div>
  </NuxtLink>
</template>
