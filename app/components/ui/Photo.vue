<script setup lang="ts">
defineOptions({ inheritAttrs: false });

// Largeurs à choisir parmi image.screens (nuxt.config) : Vercel n'accepte que celles-là.
const props = withDefaults(
  defineProps<{
    src: string;
    sizes: string;
    largeurs?: number[];
    prioritaire?: boolean;
    loading?: "eager" | "lazy";
  }>(),
  { largeurs: () => [320, 640, 1024], prioritaire: false, loading: "lazy" },
);

const img = useImage();
const url = (width: number) => img(props.src, { width, quality: 60 });
const srcset = computed(() =>
  props.largeurs.map((largeur) => `${url(largeur)} ${largeur}w`).join(", "),
);

if (props.prioritaire) {
  useHead({
    link: [
      {
        rel: "preload",
        as: "image",
        imagesrcset: srcset.value,
        imagesizes: props.sizes,
        fetchpriority: "high",
      },
    ],
  });
}
</script>

<template>
  <img
    v-bind="$attrs"
    :src="url(largeurs.at(-1)!)"
    :srcset="srcset"
    :sizes="sizes"
    :loading="prioritaire ? 'eager' : loading"
    :fetchpriority="prioritaire ? 'high' : undefined"
  />
</template>
