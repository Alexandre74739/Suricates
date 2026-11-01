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
      <div
        class="masque-pinceau relative bg-white px-10 py-9 sm:px-14 lg:px-16"
      >
        <nav :aria-label="$t('parc.zones.navigation')">
          <ul
            class="-mx-10 flex snap-x scroll-px-10 gap-4 overflow-x-auto px-10 sm:-mx-14 sm:px-14 lg:mx-0 lg:grid lg:grid-cols-5 lg:gap-6 lg:overflow-visible lg:px-0"
          >
            <li
              v-for="zone in zones"
              :key="zone.slug"
              class="w-40 shrink-0 snap-start sm:w-48 lg:w-auto"
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
                    sizes="(min-width: 1024px) 240px, 192px"
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
