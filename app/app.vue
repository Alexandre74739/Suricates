<script setup lang="ts">
import { MotionConfig } from "motion-v";
import type { RouteLocationNormalizedLoaded } from "vue-router";

// Met à jour <html lang> selon la langue choisie (lecteurs d'écran, moteurs de recherche).
const head = useLocaleHead();
useHead(() => ({ htmlAttrs: head.value.htmlAttrs }));

const routeBaseName = useRouteBaseName();
const clePage = (route: RouteLocationNormalizedLoaded) =>
  `${String(routeBaseName(route))}:${JSON.stringify(route.params)}`;
</script>

<template>
  <!-- reduced-motion="user" : pas de déplacement si la personne a demandé à réduire les animations. -->
  <MotionConfig reduced-motion="user">
    <NuxtRouteAnnouncer />
    <LayoutHeader />
    <NuxtPage :page-key="clePage" />
  </MotionConfig>
</template>
