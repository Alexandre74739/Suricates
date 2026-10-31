<script setup lang="ts">
import { CalendarClock, MapPin, MapPlus, PawPrint } from "lucide-vue-next";
import { PLAN_PDF } from "#shared/parc";

const raccourcis = [
  { cle: "especes", href: "#especes", icone: PawPrint },
  { cle: "acces", href: "#horaires&tarifs", icone: MapPin },
  { cle: "programme", href: "#programme", icone: CalendarClock },
  { cle: "plan", href: PLAN_PDF, icone: MapPlus, telecharger: true },
];

const { allerA } = useDefilement();
</script>

<template>
  <nav
    :aria-label="$t('accueil.raccourcis.titre')"
    class="relative z-10 -mt-32 px-6 sm:px-8 md:px-12 lg:-mt-36"
  >
    <ul
      class="mx-auto grid max-w-7xl grid-cols-2 overflow-hidden rounded-2xl bg-terracotta-fonce shadow-lg shadow-galerie/10 lg:grid-cols-4"
    >
      <li
        v-for="(r, i) in raccourcis"
        :key="r.cle"
        class="relative flex lg:not-first:before:absolute lg:not-first:before:inset-y-8 lg:not-first:before:-left-px lg:not-first:before:w-0.5 lg:not-first:before:rounded-full lg:not-first:before:bg-sable"
      >
        <component
          :is="r.href ? 'a' : 'button'"
          :href="r.href"
          :download="r.telecharger || undefined"
          :type="r.href ? undefined : 'button'"
          @click="allerA($event, r.href)"
          class="group flex w-full flex-col items-center gap-3 bg-terracotta-fonce px-3 py-5 text-center text-base font-bold tracking-tight text-white transition-colors duration-200 hover:bg-acacia focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-white sm:py-6 sm:text-lg"
        >
          <span
            class="relative flex size-14 items-center justify-center text-terracotta-fonce transition duration-200 group-hover:scale-120 group-hover:text-acacia sm:size-16"
          >
            <svg
              viewBox="-80 -80 160 160"
              class="absolute inset-0 size-full fill-white"
              :style="{ rotate: `${i * 90}deg` }"
              aria-hidden="true"
            >
              <path
                d="M43.1-58.3C55.1-49.8 63.6-35.7 68.4-20.1 73.2-4.5 74.3 12.5 68.2 26.4 62.1 40.3 48.8 51.1 34.1 58.9 19.4 66.7 3.3 71.5-13.4 70.6-30.1 69.7-47.4 63-58.6 50.4-69.8 37.8-74.9 19.3-73.8 1.6-72.7-16-65.5-32.9-53.6-41.8-41.7-50.6-25.1-51.4-9.6-57.3 5.9-63.1 31.1-66.8 43.1-58.3Z"
              />
            </svg>
            <component
              :is="r.icone"
              class="relative size-6 sm:size-7"
              aria-hidden="true"
            />
          </span>
          {{ $t(`accueil.raccourcis.${r.cle}`) }}
        </component>
      </li>
    </ul>
  </nav>
</template>
