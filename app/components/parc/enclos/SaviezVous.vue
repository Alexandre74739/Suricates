<script setup lang="ts">
import { Lightbulb } from "lucide-vue-next";

defineProps<{ anecdote: string }>();

const titreId = useId();
</script>

<template>
  <UiBrushCard
    tag="aside"
    :aria-labelledby="titreId"
    background="bg-terracotta-fonce"
    shadow="bg-galerie"
    class="rotate-2 px-8 py-10 text-white sm:px-10"
  >
    <div class="flex items-center gap-3">
      <span
        class="relative flex size-12 shrink-0 items-center justify-center text-terracotta-fonce"
        aria-hidden="true"
      >
        <UiBlob :rotation="45" class="absolute inset-0 size-full fill-sable" />
        <Lightbulb class="relative size-5" />
      </span>
      <h3 :id="titreId" class="font-titre text-2xl">
        {{ $t("parc.zone.habitants.saviezVous") }}
      </h3>
    </div>
    <p class="mt-4 leading-relaxed text-pretty sm:text-lg">
      {{ anecdote }}
    </p>
  </UiBrushCard>
</template>
