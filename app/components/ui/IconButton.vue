<script setup lang="ts">
defineProps<{
  label: string;
  to?: string;
}>();

const classes =
  "inline-flex h-10 min-w-10 items-center justify-center gap-1 rounded-lg px-2.5 text-sm font-semibold text-galerie transition-colors hover:bg-terracotta/10 hover:text-terracotta focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracotta";
</script>

<template>
  <NuxtLink
    v-if="to"
    :to="to"
    :class="classes"
    :aria-label="label"
    :title="label"
  >
    <slot />
  </NuxtLink>
  <button
    v-else
    type="button"
    :class="classes"
    :aria-label="label"
    :title="label"
  >
    <slot />
  </button>
</template>
