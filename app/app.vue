<script setup lang="ts">
import { MotionConfig } from "motion-v";
</script>

<template>
  <!-- reduced-motion="user" : pas de déplacement si la personne a demandé à réduire les animations. -->
  <MotionConfig reduced-motion="user">
    <NuxtRouteAnnouncer />
    <LayoutHeader />
  </MotionConfig>
</template>
