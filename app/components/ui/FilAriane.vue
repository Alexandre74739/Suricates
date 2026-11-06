<script setup lang="ts">
import { ChevronRight } from "lucide-vue-next";

const props = defineProps<{
  steps: { label: string; link: string }[];
}>();

const origin = useRequestURL().origin;

useHead({
  script: () => [
    {
      type: "application/ld+json",
      key: "breadcrumb",
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: props.steps.map((step, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: step.label,
          item: `${origin}${step.link}`,
        })),
      }),
    },
  ],
});
</script>

<template>
  <nav :aria-label="$t('commun.filAriane')">
    <ol class="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm font-medium">
      <li
        v-for="(step, i) in steps"
        :key="step.link"
        class="flex items-center gap-2"
      >
        <ChevronRight
          v-if="i > 0"
          class="size-4 text-galerie/40"
          aria-hidden="true"
        />
        <NuxtLink
          v-if="i < steps.length - 1"
          :to="step.link"
          class="text-terracotta-fonce underline decoration-terracotta-fonce/40 underline-offset-4 transition-colors duration-200 hover:decoration-terracotta-fonce focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracotta"
        >
          {{ step.label }}
        </NuxtLink>
        <span v-else aria-current="page" class="text-galerie/70">
          {{ step.label }}
        </span>
      </li>
    </ol>
  </nav>
</template>
