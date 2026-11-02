<script setup lang="ts">
import type { Component } from "vue";

withDefaults(
  defineProps<{
    titre: string;
    points: { icone: Component; titre: string; texte: string }[];
    boutons?: {
      libelle: string;
      lien: string;
      couleur?: "terracotta" | "acacia";
      icone?: Component;
      telecharger?: boolean;
    }[];
    teinte?: "clair" | "blanc";
  }>(),
  { teinte: "clair" },
);

const TEINTES = {
  clair: {
    fond: "bg-sable text-galerie",
    ombre: "bg-sauge",
    titre: "font-titre text-3xl text-acacia",
    liste: "mt-5 space-y-4",
    point: "",
    blob: "fill-acacia-pale",
    icone: "text-acacia",
    texte: "text-galerie/70",
  },
  blanc: {
    fond: "bg-white text-galerie sm:p-10",
    ombre: "bg-terracotta",
    titre:
      "text-sm font-semibold tracking-wider text-terracotta-fonce uppercase",
    liste: "mt-5 space-y-5",
    point: "",
    blob: "fill-terracotta",
    icone: "text-white",
    texte: "text-galerie/75",
  },
};
</script>

<template>
  <div class="relative">
    <!-- Miroir plutôt que rotation : une ombre masquée et tournée laisse
         un trait d'un pixel sous la carte dans certains navigateurs. -->
    <div
      class="masque-pinceau absolute inset-0 translate-x-2 translate-y-2.5 -scale-x-100"
      :class="TEINTES[teinte].ombre"
      aria-hidden="true"
    />
    <div class="masque-pinceau relative p-8" :class="TEINTES[teinte].fond">
      <h3 :class="TEINTES[teinte].titre">{{ titre }}</h3>
      <ul :class="TEINTES[teinte].liste">
        <li
          v-for="(point, i) in points"
          :key="point.titre"
          class="flex gap-4"
          :class="TEINTES[teinte].point"
        >
          <span
            class="relative flex size-11 shrink-0 items-center justify-center"
            :class="TEINTES[teinte].icone"
          >
            <UiBlob
              :rotation="i * 90"
              class="absolute inset-0 size-full"
              :class="TEINTES[teinte].blob"
            />
            <component
              :is="point.icone"
              class="relative size-5"
              aria-hidden="true"
            />
          </span>
          <div>
            <p class="font-semibold tracking-tight">{{ point.titre }}</p>
            <p
              class="mt-0.5 text-sm leading-relaxed"
              :class="TEINTES[teinte].texte"
            >
              {{ point.texte }}
            </p>
          </div>
        </li>
      </ul>
      <div v-if="boutons?.length" class="mt-6 flex flex-col gap-3">
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
