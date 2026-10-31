<script setup lang="ts">
import { motion, useInView } from "motion-v";
import { empreinteCachee, poserEmpreinte } from "~/animations/empreintes";

const props = withDefaults(defineProps<{ pattes?: 2 | 3 }>(), { pattes: 3 });

const EMPREINTE =
  "M52 122.5C52 139 45.4 149.1 26 153.5C10.8 156.9 0 147.5 0 122.5C0 97.5 9.3 90.2 26 92C40.4 92 52 106 52 122.5Z" +
  "M43 83.5a10 10.5 0 1 0 20 0a10 10.5 0 1 0 -20 0Z" +
  "M80 107C80 113 75.3 118 69.5 118C63.7 118 59 113.1 59 107C59 100.9 63.7 96 69.5 96C75.3 96 80 101 80 107Z" +
  "M82 132.5C82.5 140.5 76.5 143 71 143C65.5 143 61 138.3 61 132.5C61 126.7 65.5 122 71 122C76.5 122 81.5 124 82 132.5Z" +
  "M66 154C66 162 61.7 165 56.5 165C51.3 165 46.5 163.5 47 154C47.5 144.5 51.3 143 56.5 143C61.7 143 66 146 66 154Z";
const DECALAGES = [
  [0, 0],
  [82, -73],
  [164, 3],
];
const LARGEUR = 246;
const HAUTEUR = 168;

const empreintes = computed(() =>
  Array.from({ length: props.pattes }, (_, copie) => {
    const retournee = copie % 2 === 1;
    return DECALAGES.map(
      ([x, y]) =>
        `translate(${copie * LARGEUR} ${retournee ? HAUTEUR : 0}) scale(1 ${retournee ? -1 : 1}) translate(${x} ${y})`,
    );
  }).flat(),
);
const marche = computed(() =>
  empreintes.value.map((_, i) => poserEmpreinte(i, empreintes.value.length)),
);

const piste = useTemplateRef<SVGSVGElement>("piste");
const enVue = useInView(piste, { amount: 0.3 });
</script>

<template>
  <svg
    ref="piste"
    :viewBox="`0 0 ${pattes * LARGEUR + 1} ${HAUTEUR}`"
    class="pointer-events-none fill-galerie opacity-20"
    aria-hidden="true"
  >
    <g v-for="(position, i) in empreintes" :key="i" :transform="position">
      <motion.path
        :d="EMPREINTE"
        :initial="empreinteCachee"
        :animate="enVue ? marche[i] : empreinteCachee"
        class="origin-center transform-fill motion-reduce:transform-none! motion-reduce:opacity-100!"
      />
    </g>
  </svg>
</template>
