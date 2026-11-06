<script setup lang="ts">
withDefaults(
  defineProps<{ tag?: string; background?: string; shadow?: string }>(),
  { tag: "div", background: "bg-white", shadow: "bg-sauge" },
);
</script>

<template>
  <component :is="tag" class="relative isolate">
    <div
      class="masque-pinceau-haut-bas absolute inset-0 -z-10 translate-x-2 translate-y-2.5 -scale-x-100"
      aria-hidden="true"
    >
      <div class="masque-pinceau-cotes size-full" :class="shadow" />
    </div>
    <div
      class="masque-pinceau-haut-bas absolute inset-0 -z-10"
      aria-hidden="true"
    >
      <div class="masque-pinceau-cotes size-full" :class="background" />
    </div>
    <slot />
  </component>
</template>
