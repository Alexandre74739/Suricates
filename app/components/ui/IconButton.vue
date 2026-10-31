<script setup lang="ts">
defineProps<{
  label: string;
  to?: string;
  clair?: boolean;
}>();

const base =
  "inline-flex h-10 min-w-10 items-center justify-center gap-1 px-2.5 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracotta";
const couleurs = {
  sombre:
    "rounded-lg text-galerie hover:bg-terracotta-pale hover:text-terracotta-fonce",
  clair:
    "size-11 rounded-[46%_54%_42%_58%/55%_45%_55%_45%] bg-terracotta-fonce text-white hover:bg-terracotta motion-safe:animate-blob",
};
</script>

<template>
  <NuxtLink
    v-if="to"
    :to="to"
    :class="[base, clair ? couleurs.clair : couleurs.sombre]"
    :aria-label="label"
    :title="label"
  >
    <slot />
  </NuxtLink>
  <button
    v-else
    type="button"
    :class="[base, clair ? couleurs.clair : couleurs.sombre]"
    :aria-label="label"
    :title="label"
  >
    <slot />
  </button>
</template>
