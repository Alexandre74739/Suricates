<script setup lang="ts">
defineProps<{
  neighbours: { slug: string; nom: string; lien: string }[];
}>();
</script>

<template>
  <ul v-if="neighbours.length" role="list" class="flex flex-wrap gap-3">
    <li v-for="neighbour in neighbours" :key="neighbour.slug">
      <NuxtLink
        :to="neighbour.lien"
        class="masque-pinceau block bg-white px-5 py-2.5 font-semibold text-acacia transition-colors duration-200 hover:bg-acacia hover:text-white focus-visible:bg-acacia focus-visible:text-white focus-visible:outline-none"
      >
        {{ neighbour.nom }}
      </NuxtLink>
    </li>
  </ul>
</template>
