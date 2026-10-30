<script setup lang="ts">
type Couleur = "terracotta" | "acacia";

const props = withDefaults(
  defineProps<{
    couleur?: Couleur;
    to?: string;
    type?: "button" | "submit" | "reset";
    disabled?: boolean;
  }>(),
  {
    couleur: "terracotta",
    type: "button",
    disabled: false,
  },
);

const styles: Record<Couleur, string> = {
  terracotta: "bg-terracotta hover:bg-terracotta/80",
  acacia: "bg-acacia hover:bg-acacia/80",
};

const classes = computed(() => [
  "inline-flex items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-base font-semibold tracking-tight text-white transition-colors duration-200",
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracotta",
  "disabled:pointer-events-none disabled:opacity-50",
  styles[props.couleur],
]);
</script>

<template>
  <NuxtLink v-if="to" :to="to" :class="classes">
    <slot />
  </NuxtLink>
  <button v-else :type="type" :disabled="disabled" :class="classes">
    <slot />
  </button>
</template>
