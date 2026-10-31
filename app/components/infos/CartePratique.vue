<script setup lang="ts">
import type { Component } from "vue";

defineProps<{
  titre: string;
  points: { icone: Component; titre: string; texte: string }[];
  boutons: {
    libelle: string;
    lien: string;
    couleur?: "terracotta" | "acacia";
    icone?: Component;
    telecharger?: boolean;
  }[];
}>();
</script>

<template>
  <div class="relative">
    <div
      class="masque-pinceau absolute inset-0 translate-x-2 translate-y-2.5 -rotate-1 bg-sauge"
      aria-hidden="true"
    />
    <div class="masque-pinceau relative bg-sable p-8 text-galerie">
      <h3 class="font-titre text-3xl text-acacia">{{ titre }}</h3>
      <ul class="mt-5 space-y-4">
        <li v-for="point in points" :key="point.titre" class="flex gap-4">
          <span
            class="flex size-10 shrink-0 items-center justify-center rounded-[46%_54%_42%_58%/55%_45%_55%_45%] bg-acacia-pale text-acacia"
          >
            <component :is="point.icone" class="size-5" aria-hidden="true" />
          </span>
          <div>
            <p class="font-semibold tracking-tight">{{ point.titre }}</p>
            <p class="mt-0.5 text-sm leading-relaxed text-galerie/70">
              {{ point.texte }}
            </p>
          </div>
        </li>
      </ul>
      <div class="mt-6 flex flex-col gap-3">
        <UiButton
          v-for="bouton in boutons"
          :key="bouton.lien"
          :to="bouton.lien"
          :couleur="bouton.couleur"
          :external="bouton.telecharger || undefined"
          :download="bouton.telecharger || undefined"
          class="w-full"
        >
          <component
            :is="bouton.icone"
            v-if="bouton.icone"
            aria-hidden="true"
          />
          {{ bouton.libelle }}
        </UiButton>
      </div>
    </div>
  </div>
</template>
