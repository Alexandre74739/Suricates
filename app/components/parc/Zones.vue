<script setup lang="ts">
const { zones } = useZones();
</script>

<template>
  <div
    class="space-y-24 overflow-x-clip px-6 py-20 sm:px-12 lg:space-y-32 lg:py-28"
  >
    <ParcBlocZone
      v-for="(zone, rang) in zones"
      :id="zone.slug"
      :key="zone.slug"
      :lien="zone.lien"
      :nom="zone.nom"
      :bouton="zone.bouton"
      :accroche="zone.accroche"
      :milieu="zone.milieu"
      :habitants="zone.habitants"
      :especes="zone.especes"
      :fond="zone.fond"
      :image="zone.image"
      :alt="zone.alt"
      :inverse="rang % 2 === 1"
      class="scroll-mt-8 focus:outline-none"
    />
  </div>
</template>
