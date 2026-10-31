<script setup lang="ts">
import { motion, useInView } from "motion-v";
import { ArrowRight, Check } from "lucide-vue-next";
import { monterEnCascade } from "~/animations/apparitionBas";
import { arriverDeCote } from "~/animations/apparitionCote";
import { auDefilement } from "~/animations/auDefilement";

type Format = "carre" | "paysage" | "portrait";

const props = withDefaults(
  defineProps<{
    image: string;
    alt: string;
    format?: Format;
    titre: string;
    texte: string;
    points: string[];
    bouton?: { libelle: string; lien: string };
    cadre?: { titre: string; texte: string; libelle: string; lien: string };
    inverse?: boolean;
    empreintes?: 2 | 3;
  }>(),
  { format: "carre", inverse: false },
);

const formats: Record<Format, string> = {
  carre: "aspect-square",
  paysage: "aspect-4/3",
  portrait: "aspect-4/5",
};

const puces = computed(() => props.points.map((texte, rang) => ({ texte, ...monterEnCascade(2 + rang) })));
const liste = useTemplateRef<HTMLUListElement>("liste");
const listeVue = useInView(liste, { once: true, amount: "some" });
</script>

<template>
  <div class="relative px-6 sm:px-12">
    <UiEmpreintes
      v-if="empreintes"
      :pattes="empreintes"
      class="absolute"
      :class="
        inverse
          ? 'top-[60%] -left-20 w-44 rotate-100 sm:-left-24 sm:w-64 lg:top-[25%] lg:w-72 xl:-left-36 xl:w-96'
          : 'top-[55%] -right-24 w-56 -rotate-80 sm:-right-28 sm:w-72 lg:w-80 xl:-right-32 xl:w-104'
      "
    />

    <div
      class="relative mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2 lg:gap-20"
    >
      <motion.img
        v-bind="auDefilement(arriverDeCote(inverse ? 'droite' : 'gauche'))"
        :src="image"
        :alt="alt"
        loading="lazy"
        class="masque-pinceau mx-auto w-full max-w-md object-cover"
        :class="[formats[format], { 'lg:order-last': inverse }]"
      />

      <div>
        <motion.h3
          v-bind="auDefilement(monterEnCascade(0))"
          class="font-titre text-3xl leading-tight text-balance text-acacia sm:text-4xl xl:text-5xl"
        >
          {{ titre }}
        </motion.h3>
        <motion.p
          v-bind="auDefilement(monterEnCascade(1))"
          class="mt-5 leading-relaxed text-pretty sm:text-lg"
        >
          {{ texte }}
        </motion.p>
        <ul ref="liste" class="mt-6 space-y-3">
          <motion.li
            v-for="puce in puces"
            :key="puce.texte"
            :initial="puce.initial"
            :animate="listeVue ? puce.animate : puce.initial"
            class="flex items-start gap-3"
          >
            <span
              class="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-sauge/60 text-acacia"
            >
              <Check class="size-4" aria-hidden="true" />
            </span>
            {{ puce.texte }}
          </motion.li>
        </ul>
        <motion.div
          v-if="bouton"
          v-bind="auDefilement(monterEnCascade(2 + points.length))"
          class="mt-8"
        >
          <UiButton :to="bouton.lien">
            {{ bouton.libelle }}
            <ArrowRight aria-hidden="true" />
          </UiButton>
        </motion.div>
        <motion.div
          v-if="cadre"
          v-bind="auDefilement(monterEnCascade(2 + points.length))"
          class="mt-8"
        >
          <UiCadre v-bind="cadre" />
        </motion.div>
      </div>
    </div>
  </div>
</template>
