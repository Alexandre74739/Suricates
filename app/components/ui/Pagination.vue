<script setup lang="ts">
import { ArrowLeft, ArrowRight } from "lucide-vue-next";

// Pagination du site. Vrais liens (?page=n) : chaque page est explorable par les moteurs et fonctionne même avant l'hydratation.
const props = defineProps<{
  page: number;
  pages: number;
  lien: (page: number) => string;
  libelle: string;
}>();

// RouterLink ignore la query pour aria-current : chaque lien le fixe lui-même.
const numeros = computed<(number | "…")[]>(() => {
  const { pages } = props;
  if (pages <= 7) return Array.from({ length: pages }, (_, i) => i + 1);
  const debut = Math.max(2, props.page - 1);
  const finVoisine = Math.min(pages - 1, props.page + 1);
  return [
    1,
    ...(debut > 2 ? ["…" as const] : []),
    ...Array.from({ length: finVoisine - debut + 1 }, (_, i) => debut + i),
    ...(finVoisine < pages - 1 ? ["…" as const] : []),
    pages,
  ];
});

const FORME = "rounded-[46%_54%_42%_58%/55%_45%_55%_45%]";
const FOCUS =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracotta";
</script>

<template>
  <nav v-if="pages > 1" :aria-label="libelle">
    <ul role="list" class="flex flex-wrap items-center justify-center gap-2">
      <li v-if="page > 1" class="mr-2">
        <NuxtLink
          :to="lien(page - 1)"
          rel="prev"
          :aria-current="undefined"
          class="group inline-flex items-center gap-2 rounded-lg px-3 py-2.5 font-semibold text-acacia"
          :class="FOCUS"
        >
          <ArrowLeft
            class="size-5 transition-transform duration-200 group-hover:-translate-x-1 motion-reduce:transition-none"
            aria-hidden="true"
          />
          <span
            class="decoration-2 underline-offset-4 group-hover:underline max-sm:sr-only"
            >{{ $t("pagination.precedente") }}</span
          >
        </NuxtLink>
      </li>

      <li v-for="(numero, rang) in numeros" :key="`${numero}-${rang}`">
        <span
          v-if="numero === '…'"
          class="inline-flex size-11 items-center justify-center text-galerie/50"
          aria-hidden="true"
          >…</span
        >
        <NuxtLink
          v-else
          :to="lien(numero)"
          :aria-current="numero === page ? 'page' : undefined"
          class="inline-flex size-11 items-center justify-center font-semibold transition-colors duration-200"
          :class="[
            FORME,
            FOCUS,
            numero === page
              ? 'bg-acacia text-white'
              : 'text-galerie hover:bg-sauge/40',
          ]"
        >
          <span class="sr-only">{{ $t("pagination.page") }}</span>
          {{ numero }}
        </NuxtLink>
      </li>

      <li v-if="page < pages" class="ml-2">
        <NuxtLink
          :to="lien(page + 1)"
          rel="next"
          :aria-current="undefined"
          class="group inline-flex items-center gap-2 rounded-lg px-3 py-2.5 font-semibold text-acacia"
          :class="FOCUS"
        >
          <span
            class="decoration-2 underline-offset-4 group-hover:underline max-sm:sr-only"
            >{{ $t("pagination.suivante") }}</span
          >
          <ArrowRight
            class="size-5 transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transition-none"
            aria-hidden="true"
          />
        </NuxtLink>
      </li>
    </ul>
  </nav>
</template>
