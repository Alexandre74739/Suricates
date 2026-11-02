<script setup lang="ts">
import { CalendarClock, MapPin, MapPlus, PawPrint } from "lucide-vue-next";
import { PLAN_PDF } from "#shared/parc";

const raccourcis = [
  { cle: "acces", href: "#horaires&tarifs", icone: MapPin },
  { cle: "programme", href: "#programme", icone: CalendarClock },
  { cle: "especes", href: "#especes", icone: PawPrint },
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
            <UiBlob
              :rotation="i * 90"
              class="absolute inset-0 size-full fill-white"
            />
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
