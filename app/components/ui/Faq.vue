<script setup lang="ts">
import { motion, useInView } from "motion-v";
import { ChevronDown } from "lucide-vue-next";
import { monterEnCascade } from "~/animations/apparitionBas";
import { arriverDeCote } from "~/animations/apparitionCote";
import { auDefilement } from "~/animations/auDefilement";

const props = defineProps<{
  id: string;
  image: string;
  alt: string;
  titre: string;
  texte?: string;
  questions: { question: string; reponse: string }[];
}>();

const items = computed(() =>
  props.questions.map((item, rang) => ({
    ...item,
    ...monterEnCascade(2 + rang),
  })),
);
const liste = useTemplateRef<HTMLDivElement>("liste");
const listeVue = useInView(liste, { once: true, amount: "some" });

const ouverte = ref<number | null>(null);
</script>

<template>
  <section
    :aria-labelledby="`${id}-titre`"
    class="relative isolate overflow-x-clip px-6 pt-20 pb-16 sm:px-12 lg:pt-24 lg:pb-32"
  >
    <UiEmpreintes
      :pattes="2"
      class="absolute top-10 -left-20 -z-10 w-44 rotate-100 sm:-left-24 sm:w-64 lg:w-72 xl:-left-36 xl:w-96"
    />
    <UiEmpreintes
      :pattes="3"
      class="absolute top-[28rem] -right-24 -z-10 w-56 -rotate-80 sm:-right-28 sm:w-72 lg:w-80 xl:-right-32 xl:w-104"
    />

    <div
      class="relative mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2 lg:gap-20"
    >
      <motion.div
        v-bind="auDefilement(arriverDeCote('gauche'))"
        class="relative mx-auto w-full max-w-md"
      >
        <div
          class="masque-pinceau absolute inset-0 translate-x-3 translate-y-3 rotate-3 bg-terracotta-fonce"
        />
        <UiPhoto
          :src="image"
          :alt="alt"
          sizes="(min-width: 640px) 448px, calc(100vw - 3rem)"
          class="masque-pinceau relative aspect-3/4 w-full object-cover"
        />
      </motion.div>

      <div>
        <motion.h2
          :id="`${id}-titre`"
          v-bind="auDefilement(monterEnCascade(0))"
          class="font-titre text-3xl leading-tight text-balance text-acacia sm:text-4xl xl:text-5xl"
        >
          {{ titre }}
        </motion.h2>
        <motion.p
          v-if="texte"
          v-bind="auDefilement(monterEnCascade(1))"
          class="mt-5 leading-relaxed text-pretty sm:text-lg"
        >
          {{ texte }}
        </motion.p>

        <div ref="liste" class="mt-8 space-y-3">
          <motion.div
            v-for="(item, rang) in items"
            :key="item.question"
            :initial="item.initial"
            :animate="listeVue ? item.animate : item.initial"
            :data-ouverte="ouverte === rang || undefined"
            class="group masque-pinceau bg-[color-mix(in_oklab,var(--color-sauge)_30%,var(--color-sable))] px-10 transition-colors duration-300 hover:bg-[color-mix(in_oklab,var(--color-sauge)_50%,var(--color-sable))] data-ouverte:bg-[color-mix(in_oklab,var(--color-sauge)_70%,var(--color-sable))]"
          >
            <h3>
              <button
                :id="`${id}-question-${rang}`"
                type="button"
                :aria-expanded="ouverte === rang"
                :aria-controls="`${id}-reponse-${rang}`"
                class="flex w-full cursor-pointer items-center justify-between gap-4 py-4 text-left font-semibold tracking-tight focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracotta"
                @click="ouverte = ouverte === rang ? null : rang"
              >
                {{ item.question }}
                <span
                  class="flex size-9 shrink-0 items-center justify-center rounded-[46%_54%_42%_58%/55%_45%_55%_45%] bg-acacia-pale text-acacia transition-colors duration-300 group-data-ouverte:bg-acacia group-data-ouverte:text-sable"
                >
                  <ChevronDown
                    class="size-5 transition-transform duration-300 group-data-ouverte:rotate-180"
                    aria-hidden="true"
                  />
                </span>
              </button>
            </h3>
            <div
              :id="`${id}-reponse-${rang}`"
              role="region"
              :aria-labelledby="`${id}-question-${rang}`"
              :inert="ouverte !== rang"
              class="grid grid-rows-[0fr] opacity-0 transition-[grid-template-rows,opacity] duration-300 ease-out group-data-ouverte:grid-rows-[1fr] group-data-ouverte:opacity-100"
            >
              <div class="overflow-hidden">
                <p class="pb-5 leading-relaxed text-pretty">
                  {{ item.reponse }}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  </section>
</template>
