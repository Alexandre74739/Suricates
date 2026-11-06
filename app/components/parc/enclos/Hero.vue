<script setup lang="ts">
import { motion } from "motion-v";
import { arriverDeCote } from "~/animations/apparitionCote";
import type { AllurePhoto } from "~/components/parc/zone/PhotoEspece.vue";

defineProps<{
  name: string;
  text: string;
  breadcrumb: { label: string; link: string }[];
  image: string | null;
}>();

const PHOTO_STYLE: AllurePhoto = {
  format: "aspect-4/5",
  inclinaison: "rotate-1",
  ombre: "bg-sauge -translate-x-3 translate-y-3 -rotate-2",
  vide: "bg-acacia",
};
</script>

<template>
  <section
    class="relative flex flex-col justify-center px-6 pt-28 pb-16 sm:px-12 sm:pt-36 lg:min-h-svh lg:pt-40 lg:pb-14 ecran-bas:pt-36 ecran-bas:pb-8"
  >
    <div
      class="mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-12 lg:gap-16"
    >
      <div class="lg:col-span-7">
        <UiFilAriane
          :steps="breadcrumb"
          class="animate-cascade motion-reduce:animate-none"
        />

        <h1 class="mt-6 ecran-bas:mt-4">
          <span class="block overflow-hidden pb-2">
            <span
              class="block animate-terrier font-titre text-6xl leading-none text-balance text-acacia [animation-delay:150ms] motion-reduce:animate-none sm:text-7xl xl:text-8xl ecran-bas:text-6xl"
            >
              {{ name }}
            </span>
          </span>
          <span
            class="mt-2 block animate-cascade text-2xl font-semibold tracking-tight text-terracotta-fonce [animation-delay:300ms] motion-reduce:animate-none sm:text-3xl ecran-bas:text-2xl"
          >
            {{ $t("parc.enclos.auDomaine") }}
          </span>
        </h1>

        <p
          class="mt-7 max-w-xl animate-cascade text-lg leading-relaxed text-pretty [animation-delay:450ms] motion-reduce:animate-none ecran-bas:mt-5 ecran-bas:text-base"
        >
          {{ text }}
        </p>

        <div
          v-if="$slots.default"
          class="mt-9 flex animate-cascade flex-wrap gap-4 [animation-delay:600ms] motion-reduce:animate-none ecran-bas:mt-6"
        >
          <slot />
        </div>
      </div>

      <motion.div v-bind="arriverDeCote('droite')" class="lg:col-span-5">
        <ParcZonePhotoEspece
          :image="image"
          :alt="name"
          :allure="PHOTO_STYLE"
          sizes="(min-width: 384px) 384px, calc(100vw - 3rem)"
          prioritaire
          class="mx-auto w-full max-w-sm lg:w-[min(24rem,calc((100svh-15rem)*0.8))]"
        />
      </motion.div>
    </div>
  </section>
</template>
