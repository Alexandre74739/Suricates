<script setup lang="ts">
type Couleur = "terracotta" | "acacia" | "clair";
type Taille = "xs" | "sm" | "xl";

const props = withDefaults(
  defineProps<{
    couleur?: Couleur;
    taille?: Taille;
    to?: string;
    type?: "button" | "submit" | "reset";
    disabled?: boolean;
  }>(),
  {
    couleur: "terracotta",
    taille: "sm",
    type: "button",
    disabled: false,
  },
);

const styles: Record<Couleur, string> = {
  terracotta: "bg-terracotta-fonce hover:bg-terracotta",
  acacia: "bg-acacia hover:bg-acacia-clair",
  clair: "ring-2 ring-white ring-inset hover:bg-white hover:text-galerie",
};

const tailles: Record<Taille, string> = {
  xs: "gap-1.5 px-3.5 py-1.5 text-sm [&_svg]:size-4",
  sm: "gap-2 px-5 py-2.5 text-base [&_svg]:size-5",
  xl: "gap-2.5 px-7 py-3.5 text-lg [&_svg]:size-6",
};

const classes = computed(() => [
  "inline-flex items-center justify-center rounded-lg font-semibold tracking-tight text-white transition-colors duration-200",
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracotta",
  "disabled:pointer-events-none disabled:opacity-50",
  tailles[props.taille],
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
