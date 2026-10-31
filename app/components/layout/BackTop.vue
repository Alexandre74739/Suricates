<script setup lang="ts">
import { ArrowUp } from "lucide-vue-next";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "motion-v";
import { sortirDuTerrier } from "~/animations/apparitionBas";

const visible = ref(false);
const { scrollY } = useScroll();
useMotionValueEvent(scrollY, "change", (y) => (visible.value = y > 80));

const { remonter } = useDefilement();
</script>

<template>
  <AnimatePresence>
    <motion.div
      v-if="visible"
      v-bind="sortirDuTerrier(0)"
      class="pointer-events-none fixed right-0 bottom-0 z-30 p-4 sm:p-6"
    >
      <button
        type="button"
        class="group pointer-events-auto flex size-13 items-center justify-center rounded-[46%_54%_42%_58%/55%_45%_55%_45%] bg-terracotta-fonce text-white shadow-lg shadow-galerie/25 transition-colors duration-200 hover:bg-terracotta focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracotta motion-safe:animate-blob sm:size-15"
        :aria-label="$t('commun.retourEnHaut')"
        :title="$t('commun.retourEnHaut')"
        @click="remonter"
      >
        <ArrowUp
          class="size-6 transition-transform duration-300 group-hover:-translate-y-1 sm:size-7"
          aria-hidden="true"
        />
      </button>
    </motion.div>
  </AnimatePresence>
</template>
