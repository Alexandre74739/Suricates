<script setup lang="ts">
import { Globe, Grid2x2Plus, Menu, Ticket, User } from "lucide-vue-next";
import logo from "~/assets/images/logos/logo-principal.svg";

const { liens, estActif } = useNavigation();
const menuOuvert = ref(false);

const { locale } = useI18n();
const localePath = useLocalePath();
const switchLocalePath = useSwitchLocalePath();
// Le bouton propose toujours l'autre langue.
const autreLangue = computed(() => (locale.value === "fr" ? "en" : "fr"));

</script>

<template>
  <header class="px-2 pt-2 sm:px-3 sm:pt-3 md:px-6 md:pt-5">
    <div
      class="mx-auto flex max-w-7xl items-center justify-between gap-3 rounded-2xl bg-white px-4 py-3 shadow-lg shadow-galerie/5 sm:gap-8 sm:px-5 sm:py-4 md:px-8"
    >
      <NuxtLink
        :to="localePath('/')"
        class="min-w-0"
        :aria-label="$t('header.retourAccueil')"
      >
        <img
          :src="logo"
          alt="Les Suricates"
          class="h-8 w-auto max-w-full object-contain object-left sm:h-12 lg:h-16"
        />
      </NuxtLink>

      <div class="flex shrink-0 flex-col items-end lg:flex-1">
        <div class="flex items-center sm:gap-2">
          <UiIconButton :to="localePath('/compte')" :label="$t('header.compte')" class="max-sm:hidden">
            <User class="size-5" aria-hidden="true" />
          </UiIconButton>

          <UiIconButton
            :label="$t('header.changerLangue')"
            :lang="autreLangue"
            :to="switchLocalePath(autreLangue)"
          >
            <Globe class="size-5 max-sm:hidden" aria-hidden="true" />
            {{ autreLangue.toUpperCase() }}
          </UiIconButton>

          <UiIconButton :label="$t('header.installer')">
            <Grid2x2Plus class="size-5" aria-hidden="true" />
          </UiIconButton>

          <UiButton :to="localePath('/billetterie')" class="ml-2 max-md:hidden">
            <Ticket class="size-5" aria-hidden="true" />
            {{ $t("header.billetterie") }}
          </UiButton>

          <UiIconButton
            :label="$t('header.ouvrirMenu')"
            class="lg:hidden"
            :aria-expanded="menuOuvert"
            aria-controls="menu-lateral"
            @click="menuOuvert = true"
          >
            <Menu class="size-6" aria-hidden="true" />
          </UiIconButton>
        </div>

        <nav
          :aria-label="$t('nav.principale')"
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
