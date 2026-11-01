<script setup lang="ts">
defineProps<{
  texte: string;
  lien: string;
  precision?: string;
}>();
</script>

<template>
  <NuxtLink
    :to="lien"
    class="text-sm font-semibold text-terracotta-fonce underline decoration-terracotta-fonce/40 underline-offset-4 transition-colors duration-200 hover:decoration-terracotta-fonce focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracotta"
  >
    {{ texte }}
    <span v-if="precision" class="sr-only">{{ precision }}</span>
  </NuxtLink>
</template>
