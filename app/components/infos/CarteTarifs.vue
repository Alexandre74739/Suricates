<script setup lang="ts">
import { motion, useInView } from "motion-v";
import { sortirDuTerrier } from "~/animations/apparitionBas";

const props = withDefaults(
  defineProps<{
    titre: string;
    tarifs: { nom: string; condition: string; prix: string }[];
    bouton: { libelle: string; lien: string };
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
        class="masque-pinceau absolute inset-0 translate-x-2 translate-y-2.5 rotate-1 bg-terracotta-fonce"
        aria-hidden="true"
      />
      <div
        class="masque-pinceau relative flex h-full flex-col bg-sauge px-8 py-10 text-galerie"
      >
        <h3 class="font-titre text-3xl">{{ titre }}</h3>
        <ul class="mt-5 space-y-4">
          <li
            v-for="tarif in tarifs"
            :key="tarif.nom"
            class="grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-x-4"
          >
            <p class="font-semibold">{{ tarif.nom }}</p>
            <p class="text-2xl font-bold tracking-tight whitespace-nowrap">
              {{ tarif.prix }}
            </p>
            <p class="col-span-2 mt-0.5 text-sm text-pretty text-galerie/80">
              {{ tarif.condition }}
            </p>
          </li>
        </ul>
        <div class="mt-auto pt-7">
          <UiButton :to="bouton.lien" class="w-full">
            {{ bouton.libelle }}
          </UiButton>
        </div>
      </div>
    </motion.div>
  </div>
</template>
