<script setup lang="ts">
import { ChevronLeft, ChevronRight } from "lucide-vue-next";

defineProps<{
  sens: "precedent" | "suivant";
  label: string;
}>();
</script>

<template>
  <button
    type="button"
    :aria-label="label"
    :title="label"
    class="flex size-12 items-center justify-center rounded-full bg-terracotta-fonce text-white shadow-lg shadow-galerie/20 transition-colors hover:bg-acacia focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracotta"
  >
    <component
      :is="sens === 'precedent' ? ChevronLeft : ChevronRight"
      class="size-6"
      aria-hidden="true"
    />
  </button>
</template>
