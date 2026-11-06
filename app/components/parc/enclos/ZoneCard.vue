<script setup lang="ts">
defineProps<{
  name: string;
  tagline: string;
  link: string;
  button: string;
}>();
</script>

<template>
  <UiBrushCard shadow="bg-terracotta" class="px-8 py-10 sm:px-10">
    <h3 class="font-titre text-3xl text-acacia">{{ name }}</h3>
    <p class="mt-4 leading-relaxed text-pretty text-galerie/80">
      {{ tagline }}
    </p>
    <UiButton :to="link" couleur="acacia" class="mt-7">
      {{ button }}
    </UiButton>
  </UiBrushCard>
</template>
