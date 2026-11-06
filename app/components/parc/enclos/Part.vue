<script setup lang="ts">
import { motion, useInView } from "motion-v";
import { Check } from "lucide-vue-next";
import { monterEnCascade } from "~/animations/apparitionBas";
import { arriverDeCote } from "~/animations/apparitionCote";
import { auDefilement } from "~/animations/auDefilement";

const props = withDefaults(
  defineProps<{
    title: string;
    text: string;
    points?: string[];
    visual?: "left" | "right";
  }>(),
  { points: () => [], visual: "right" },
);

const titleId = useId();
const bullets = computed(() =>
  props.points.map((text, rank) => ({ text, ...monterEnCascade(2 + rank) })),
);
const list = useTemplateRef<HTMLUListElement>("list");
const listInView = useInView(list, { once: true, amount: "some" });
</script>

<template>
  <section :aria-labelledby="titleId" class="px-6 sm:px-12">
    <div
      class="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2 lg:gap-20"
    >
      <motion.div
        v-bind="
          auDefilement(arriverDeCote(visual === 'left' ? 'gauche' : 'droite'))
        "
        class="order-last mx-auto w-full max-w-md"
        :class="visual === 'left' ? 'lg:order-first' : 'lg:order-last'"
      >
        <slot name="visual" />
      </motion.div>

      <div>
        <motion.h2
          :id="titleId"
          v-bind="auDefilement(monterEnCascade(0))"
          class="font-titre text-4xl leading-tight text-balance text-acacia sm:text-5xl"
        >
          {{ title }}
        </motion.h2>
        <motion.p
          v-bind="auDefilement(monterEnCascade(1))"
          class="mt-6 leading-relaxed text-pretty sm:text-lg"
        >
          {{ text }}
        </motion.p>
        <ul v-if="bullets.length" ref="list" role="list" class="mt-6 space-y-3">
          <motion.li
            v-for="bullet in bullets"
            :key="bullet.text"
            :initial="bullet.initial"
            :animate="listInView ? bullet.animate : bullet.initial"
            class="flex items-start gap-3"
          >
            <span
              class="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-sauge/60 text-acacia"
            >
              <Check class="size-4" aria-hidden="true" />
            </span>
            {{ bullet.text }}
          </motion.li>
        </ul>
        <motion.div
          v-if="$slots.default"
          v-bind="auDefilement(monterEnCascade(2 + bullets.length))"
          class="mt-8"
        >
          <slot />
        </motion.div>
      </div>
    </div>
  </section>
</template>
