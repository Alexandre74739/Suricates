<script setup lang="ts">
import { motion, useInView } from "motion-v";
import { sortirDuTerrier } from "~/animations/apparitionBas";

const props = withDefaults(
  defineProps<{
    titre: string;
    horaires: { libelle: string; valeur: string }[];
    note: string;
    rang?: number;
  }>(),
  { rang: 0 },
);

const terrier = useTemplateRef<HTMLDivElement>("terrier");
const vue = useInView(terrier, { once: true, amount: 0.3 });
const sortie = sortirDuTerrier(props.rang);
const cachee = { y: "110%" };
</script>

<template>
  <div ref="terrier" class="-m-3 overflow-hidden p-3">
    <motion.div
      :initial="cachee"
      :animate="vue ? sortie.animate : cachee"
      class="relative h-full"
    >
      <div
        class="masque-pinceau absolute inset-0 translate-x-2 translate-y-2.5 -rotate-1 bg-sauge"
        aria-hidden="true"
      />
      <div
        class="masque-pinceau relative flex h-full flex-col bg-sable px-8 py-10 text-galerie"
      >
        <h3 class="font-titre text-3xl text-acacia">{{ titre }}</h3>
        <ul class="mt-5 space-y-4">
          <li v-for="horaire in horaires" :key="horaire.libelle">
            <p class="text-sm text-galerie/70">{{ horaire.libelle }}</p>
            <p
              class="mt-0.5 text-xl font-semibold tracking-tight whitespace-nowrap tabular-nums"
            >
              {{ horaire.valeur }}
            </p>
          </li>
        </ul>
        <p class="mt-auto pt-6 text-sm text-galerie/65">{{ note }}</p>
      </div>
    </motion.div>
  </div>
</template>
