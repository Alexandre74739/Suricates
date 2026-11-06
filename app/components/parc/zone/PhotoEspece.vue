<script setup lang="ts">
import { PawPrint } from "lucide-vue-next";

export type AllurePhoto = {
  format: string;
  inclinaison: string;
  ombre: string;
  vide: string;
};

const props = withDefaults(
  defineProps<{
    lien?: string;
    image: string | null;
    sizes: string;
    allure: AllurePhoto;
    alt?: string;
    prioritaire?: boolean;
  }>(),
  { alt: "", prioritaire: false },
);

const NuxtLink = resolveComponent("NuxtLink");
const lienPhoto = computed(() =>
  props.lien
    ? {
        to: props.lien,
        tabindex: -1,
        "aria-hidden": "true",
        draggable: "false",
      }
    : {},
);
</script>

<template>
  <div class="group/photo relative">
    <div
      class="masque-pinceau absolute inset-0 transition-transform duration-500 motion-reduce:transition-none"
      :class="allure.ombre"
      aria-hidden="true"
    />
    <component
      :is="lien ? NuxtLink : 'div'"
      v-bind="lienPhoto"
      class="masque-pinceau relative block overflow-hidden bg-sauge"
      :class="[allure.format, allure.inclinaison]"
    >
      <UiPhoto
        v-if="image"
        :src="image"
        :alt="lien ? '' : alt"
        :sizes="sizes"
        :prioritaire="prioritaire"
        :decoding="prioritaire ? undefined : 'async'"
        draggable="false"
        class="size-full object-cover"
        :class="{
          'transition duration-700 group-hover/photo:scale-105 motion-reduce:transition-none motion-reduce:group-hover/photo:scale-100':
            lien,
        }"
      />
      <div
        v-else
        class="relative flex size-full items-center justify-center"
        :class="allure.vide"
      >
        <div class="motif-feuilles absolute inset-0 bg-white/20" />
        <PawPrint class="relative size-16 text-sable/90" />
      </div>
    </component>
  </div>
</template>
