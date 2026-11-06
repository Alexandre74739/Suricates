<script setup lang="ts">
import { motion } from "motion-v";
import { monterEnCascade } from "~/animations/apparitionBas";
import { arriverDeCote } from "~/animations/apparitionCote";
import { auDefilement } from "~/animations/auDefilement";

defineProps<{
  title: string;
  text: string;
  origin: string;
  diet: string;
  headcount: number;
  anecdote: string;
  zone: { name: string; link: string };
}>();

const titleId = useId();
</script>

<template>
  <section
    id="identite"
    :aria-labelledby="titleId"
    class="masque-pinceau-haut -mb-28"
  >
    <div class="relative bg-acacia">
      <div
        class="motif-feuilles absolute inset-0 bg-white/8"
        aria-hidden="true"
      />

      <div
        class="relative mx-auto max-w-6xl px-6 pt-24 pb-40 sm:px-12 lg:pt-28 lg:pb-44"
      >
        <div class="mx-auto max-w-5xl text-center">
          <motion.h2
            :id="titleId"
            v-bind="auDefilement(monterEnCascade(0))"
            class="font-titre text-4xl leading-tight text-balance text-sable sm:text-5xl"
          >
            {{ title }}
          </motion.h2>
          <motion.p
            v-bind="auDefilement(monterEnCascade(1))"
            class="mx-auto mt-6 max-w-4xl leading-relaxed text-pretty text-white/90 sm:text-lg"
          >
            {{ text }}
          </motion.p>
        </div>

        <div class="mt-14 grid items-center gap-12 lg:grid-cols-12 lg:gap-0">
          <motion.div
            v-bind="auDefilement(arriverDeCote('gauche'))"
            class="lg:col-span-8"
          >
            <ParcEnclosIdentityCard
              :origin="origin"
              :diet="diet"
              :headcount="headcount"
              :zone="zone"
            />
          </motion.div>

          <motion.div
            v-bind="auDefilement(monterEnCascade(2))"
            class="relative z-10 mx-auto w-full max-w-md lg:col-span-4 lg:-ml-10 lg:max-w-none"
          >
            <ParcEnclosSaviezVous :anecdote="anecdote" />
          </motion.div>
        </div>
      </div>
    </div>
  </section>
</template>
