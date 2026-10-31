<script setup lang="ts">
import { Expand, X } from "lucide-vue-next";

defineProps<{
  src: string;
  alt: string;
  largeur: number;
  hauteur: number;
  agrandir: string;
  fermer: string;
}>();

const fenetre = useTemplateRef<HTMLDialogElement>("fenetre");
</script>

<template>
  <div class="group relative">
    <div
      class="masque-pinceau absolute inset-0 translate-x-3 translate-y-3 rotate-2 bg-terracotta-fonce"
      aria-hidden="true"
    />
    <div
      class="masque-pinceau relative cursor-pointer bg-sable p-4 sm:p-6"
      @click="fenetre?.showModal()"
    >
      <img
        :src="src"
        :alt="alt"
        :width="largeur"
        :height="hauteur"
        loading="lazy"
        class="w-full"
      />
    </div>
    <UiButton
      taille="xs"
      couleur="galerie"
      class="absolute right-6 bottom-6 group-hover:bg-galerie-clair sm:right-10 sm:bottom-10"
      @click="fenetre?.showModal()"
    >
      <Expand aria-hidden="true" />
      {{ agrandir }}
    </UiButton>

    <dialog
      ref="fenetre"
      :aria-label="agrandir"
      class="m-0 size-full max-h-none max-w-none bg-transparent backdrop:bg-galerie/85 backdrop:backdrop-blur-sm"
      @click.self="fenetre?.close()"
    >
      <div
        class="flex size-full items-center overflow-auto p-4 sm:p-10"
        @click.self="fenetre?.close()"
      >
        <img
          :src="src"
          :alt="alt"
          :width="largeur"
          :height="hauteur"
          loading="lazy"
          class="m-auto w-full max-w-7xl min-w-3xl rounded-2xl bg-sable"
        />
      </div>
      <UiIconButton
        :label="fermer"
        autofocus
        class="fixed top-4 right-4 bg-sable shadow-lg sm:top-6 sm:right-6"
        @click="fenetre?.close()"
      >
        <X class="size-6" aria-hidden="true" />
      </UiIconButton>
    </dialog>
  </div>
</template>
