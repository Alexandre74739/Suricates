<script setup lang="ts">
import { Search, X } from "lucide-vue-next";

const texte = defineModel<string>({ default: "" });

withDefaults(
  defineProps<{
    libelle: string;
    exemple?: string;
    libelleEffacer: string;
    longueurMax?: number;
  }>(),
  { longueurMax: 40 },
);

const id = useId();
const champ = useTemplateRef<HTMLInputElement>("champ");

function effacer() {
  texte.value = "";
  champ.value?.focus();
}
</script>

<template>
  <form role="search" @submit.prevent>
    <label :for="id" class="sr-only">{{ libelle }}</label>
    <div
      class="flex items-center gap-3 rounded-2xl bg-white py-2 pr-2 pl-2.5 shadow-lg shadow-galerie/5 ring-2 ring-sauge/60 transition-shadow focus-within:ring-acacia"
    >
      <UiPastille class="size-10 bg-acacia text-white">
        <Search class="size-5" />
      </UiPastille>
      <input
        :id="id"
        ref="champ"
        v-model="texte"
        type="search"
        enterkeyhint="search"
        autocomplete="off"
        spellcheck="false"
        :maxlength="longueurMax"
        :placeholder="exemple"
        class="min-w-0 flex-1 bg-transparent py-2 text-galerie outline-none placeholder:text-galerie/50 [&::-webkit-search-cancel-button]:hidden"
      />
      <button
        v-if="texte"
        type="button"
        class="flex size-10 shrink-0 items-center justify-center rounded-xl text-galerie/70 transition-colors hover:bg-sauge/30 hover:text-galerie focus-visible:outline-2 focus-visible:outline-terracotta"
        @click="effacer"
      >
        <X class="size-5" aria-hidden="true" />
        <span class="sr-only">{{ libelleEffacer }}</span>
      </button>
    </div>
  </form>
</template>
