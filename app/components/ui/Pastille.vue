<script setup lang="ts">
withDefaults(defineProps<{ decalage?: number }>(), { decalage: 0 });
</script>

<template>
  <span
    class="flex shrink-0 items-center justify-center rounded-[46%_54%_42%_58%/55%_45%_55%_45%] motion-safe:animate-blob"
    :style="{ animationDelay: `${-decalage}s` }"
    aria-hidden="true"
  >
    <slot />
  </span>
</template>
