<script setup lang="ts">
import { MapPin, Signpost, Users, Utensils } from "lucide-vue-next";

const props = defineProps<{
  origin: string;
  diet: string;
  headcount: number;
  zone: { name: string; link: string };
}>();

const { t } = useI18n();
const titleId = useId();

const facts = computed(() => [
  { icon: MapPin, title: t("parc.zone.habitants.origine"), text: props.origin },
  { icon: Utensils, title: t("parc.zone.habitants.regime"), text: props.diet },
  {
    icon: Users,
    title: t("parc.zone.habitants.effectif"),
    text: t("parc.zone.habitants.effectifValeur", props.headcount),
  },
]);
</script>

<template>
  <UiBrushCard
    tag="section"
    :aria-labelledby="titleId"
    class="px-7 py-10 sm:px-12 sm:py-12"
  >
    <h3
      :id="titleId"
      class="text-center font-titre text-3xl text-acacia sm:text-4xl"
    >
      {{ $t("parc.enclos.identite.carte") }}
    </h3>

    <ul role="list" class="mt-9 grid gap-8 sm:grid-cols-3 sm:gap-6">
      <li
        v-for="(fact, i) in facts"
        :key="fact.title"
        class="flex flex-col items-center text-center"
      >
        <UiPastille :decalage="i * 3" class="size-12 bg-sauge/50 text-acacia">
          <component :is="fact.icon" class="size-5" />
        </UiPastille>
        <p class="mt-3.5">
          <span
            class="block text-xs font-semibold tracking-wider text-terracotta-fonce uppercase"
          >
            {{ fact.title }}
          </span>
          <span
            class="mt-1.5 block text-lg leading-snug font-medium text-balance"
          >
            {{ fact.text }}
          </span>
        </p>
      </li>
    </ul>

    <div
      class="masque-pinceau -mx-4 mt-10 flex flex-col items-center gap-4 bg-sable px-8 py-7 text-center sm:-mx-7 sm:flex-row sm:gap-5 sm:px-12 sm:text-left"
    >
      <UiPastille :decalage="9" class="size-12 bg-acacia text-white">
        <Signpost class="size-5" />
      </UiPastille>
      <p>
        <span
          class="block text-xs font-semibold tracking-wider text-terracotta-fonce uppercase"
        >
          {{ $t("parc.enclos.identite.ouLesVoir") }}
        </span>
        <span class="mt-1 block text-lg font-semibold text-acacia">
          {{ zone.name }}
        </span>
      </p>
      <UiButton :to="zone.link" couleur="acacia" class="sm:ml-auto">
        {{ $t("parc.enclos.identite.voirZone") }}
        <span class="sr-only">: {{ zone.name }}</span>
      </UiButton>
    </div>
  </UiBrushCard>
</template>
