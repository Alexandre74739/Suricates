<script setup lang="ts">
import { motion } from "motion-v";
import { monterEnCascade } from "~/animations/apparitionBas";
import { auDefilement } from "~/animations/auDefilement";

const { zones } = useZones();
const { allerA } = useDefilement();
const titreId = useId();
</script>

<template>
  <section
    :aria-labelledby="titreId"
    class="px-6 pt-16 sm:px-8 md:px-12 lg:pt-20"
  >
    <div class="mx-auto max-w-3xl text-center">
      <motion.h2
        :id="titreId"
        v-bind="auDefilement(monterEnCascade(0))"
        class="font-titre text-4xl leading-tight text-balance text-acacia sm:text-5xl"
      >
        {{ $t("parc.zones.titre") }}
      </motion.h2>
      <motion.p
        v-bind="auDefilement(monterEnCascade(1))"
        class="mt-5 leading-relaxed text-pretty sm:text-lg"
      >
        {{ $t("parc.zones.texte") }}
      </motion.p>
    </div>

    <div class="relative mx-auto mt-12 max-w-7xl">
      <div
        class="masque-pinceau absolute inset-0 translate-x-2 translate-y-2.5 rotate-1 bg-terracotta-fonce"
        aria-hidden="true"
      />
      <div class="masque-pinceau relative bg-white px-8 py-9 sm:px-14 lg:px-16">
        <nav :aria-label="$t('parc.zones.navigation')">
          <ul
            class="flex flex-wrap justify-center gap-x-4 gap-y-6 lg:flex-nowrap lg:gap-6"
          >
            <li
              v-for="zone in zones"
              :key="zone.slug"
              class="basis-[calc(50%-0.5rem)] sm:basis-[calc((100%-2rem)/3)] lg:flex-1 lg:basis-0"
            >
              <a
                :href="`#${zone.slug}`"
                class="group block transition-transform duration-200 hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-terracotta"
                @click="allerA($event, `#${zone.slug}`)"
              >
                <div
                  class="masque-pinceau aspect-4/3 overflow-hidden"
                  :class="zone.fond"
                >
                  <UiPhoto
                    v-if="zone.image"
                    :src="zone.image"
                    alt=""
                    :largeurs="[320, 640]"
                    sizes="(min-width: 1024px) 240px, (min-width: 640px) 30vw, 45vw"
                    class="size-full object-cover"
                  />
                </div>
                <p
                  class="mt-3 text-center text-sm leading-snug font-semibold text-balance transition-colors duration-200 group-hover:text-acacia sm:text-base"
                >
                  {{ zone.nom }}
                </p>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </section>
</template>
