<script setup lang="ts">
import { Lightbulb } from "lucide-vue-next";

defineProps<{ anecdote: string }>();

const titreId = useId();
</script>

<template>
  <aside
    :aria-labelledby="titreId"
    class="relative isolate rotate-2 px-8 py-10 text-white sm:px-10"
  >
    <div
      class="masque-pinceau-haut-bas absolute inset-0 -z-10 translate-x-2 translate-y-2.5 -scale-x-100"
      aria-hidden="true"
    >
      <div class="masque-pinceau-cotes size-full bg-galerie/25" />
    </div>
    <div
      class="masque-pinceau-haut-bas absolute inset-0 -z-10"
      aria-hidden="true"
    >
      <div class="masque-pinceau-cotes size-full bg-terracotta-fonce" />
    </div>

    <div class="flex items-center gap-3">
      <span
        class="relative flex size-12 shrink-0 items-center justify-center text-terracotta-fonce"
        aria-hidden="true"
      >
        <UiBlob :rotation="45" class="absolute inset-0 size-full fill-sable" />
        <Lightbulb class="relative size-5" />
      </span>
      <h2 :id="titreId" class="font-titre text-2xl">
        {{ $t("parc.zone.habitants.saviezVous") }}
      </h2>
    </div>
    <p class="mt-4 leading-relaxed text-pretty sm:text-lg">
      {{ anecdote }}
    </p>
  </aside>
</template>
