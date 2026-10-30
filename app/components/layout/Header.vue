<script setup lang="ts">
import { Globe, Grid2x2Plus, Menu, Ticket, User } from "lucide-vue-next";
import logo from "~/assets/images/logos/logo-principal.svg";

const { liens, estActif } = useNavigation();
const menuOuvert = ref(false);
</script>

<template>
  <header class="px-2 pt-2 sm:px-3 sm:pt-3 md:px-6 md:pt-5">
    <div
      class="mx-auto flex max-w-7xl items-center justify-between gap-3 rounded-2xl bg-white px-4 py-3 shadow-lg shadow-galerie/5 sm:gap-8 sm:px-5 sm:py-4 md:px-8"
    >
      <NuxtLink
        to="/"
        class="min-w-0"
        aria-label="Les Suricates, retour à l'accueil"
      >
        <img
          :src="logo"
          alt="Les Suricates"
          class="h-8 w-auto max-w-full object-contain object-left sm:h-12 lg:h-16"
        />
      </NuxtLink>

      <div class="flex shrink-0 flex-col items-end lg:flex-1">
        <div class="flex items-center sm:gap-2">
          <UiIconButton to="/compte" label="Mon compte" class="max-sm:hidden">
            <User class="size-5" aria-hidden="true" />
          </UiIconButton>

          <UiIconButton label="Switch to English" lang="en">
            <Globe class="size-5 max-sm:hidden" aria-hidden="true" />
            EN
          </UiIconButton>

          <UiIconButton label="Installer l'application">
            <Grid2x2Plus class="size-5" aria-hidden="true" />
          </UiIconButton>

          <UiButton to="/billetterie" class="ml-2 max-md:hidden">
            <Ticket class="size-5" aria-hidden="true" />
            Billetterie
          </UiButton>

          <UiIconButton
            label="Ouvrir le menu"
            class="lg:hidden"
            :aria-expanded="menuOuvert"
            aria-controls="menu-lateral"
            @click="menuOuvert = true"
          >
            <Menu class="size-6" aria-hidden="true" />
          </UiIconButton>
        </div>

        <nav
          aria-label="Navigation principale"
          class="mt-3 hidden w-full border-t border-galerie/15 pt-3 lg:block"
        >
          <ul class="flex items-center justify-end gap-10">
            <li v-for="lien in liens" :key="lien.to">
              <NuxtLink
                :to="lien.to"
                class="text-base font-semibold tracking-tight transition-colors hover:text-acacia"
                :class="estActif(lien.to) ? 'text-acacia' : 'text-terracotta'"
                :aria-current="estActif(lien.to) ? 'page' : undefined"
              >
                {{ lien.label }}
              </NuxtLink>
            </li>
          </ul>
        </nav>
      </div>
    </div>

    <LayoutMenuLateral v-model="menuOuvert" />
  </header>
</template>
