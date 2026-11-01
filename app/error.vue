<script setup lang="ts">
import type { NuxtError } from "#app";
import { House } from "lucide-vue-next";

const props = defineProps<{ error: NuxtError }>();

const { t } = useI18n();
const localePath = useLocalePath();
const introuvable = computed(() => props.error.statusCode === 404);
const titre = computed(() =>
  introuvable.value ? t("erreur.titre") : t("erreur.titreAutre"),
);

useHead({ title: () => `${props.error.statusCode} · ${titre.value}` });
useSeoMeta({ robots: "noindex" });

const retourAccueil = () => clearError({ redirect: localePath("/") });
</script>

<template>
  <div class="absolute inset-x-0 top-0 z-20">
    <LayoutHeader />
  </div>

  <main
    class="relative isolate flex min-h-svh flex-col items-center justify-center overflow-hidden bg-acacia px-6 pt-36 pb-44 text-center text-white sm:pt-44"
  >
    <div class="absolute inset-0 -z-20 bg-galerie/30" aria-hidden="true" />
    <div
      class="motif-feuilles absolute inset-0 -z-20 bg-galerie/25"
      aria-hidden="true"
    />
    <div
      class="absolute inset-0 -z-10 [&_svg]:absolute [&_svg]:opacity-45"
      aria-hidden="true"
    >
      <UiEmpreintes
        :pattes="3"
        class="bottom-40 -left-6 w-48 -rotate-[24deg] sm:w-64 md:bottom-48 md:left-[4%] md:w-80 lg:w-96"
      />
      <UiEmpreintes
        :pattes="3"
        class="top-28 -right-6 w-48 rotate-[156deg] sm:top-40 sm:w-64 md:top-56 md:right-[4%] md:w-80 lg:w-96"
      />
    </div>

    <p
      class="animate-cascade text-[clamp(5rem,15vw,10rem)] leading-[0.8] font-bold tracking-tighter text-sable motion-reduce:animate-none"
    >
      {{ error.statusCode }}
    </p>
    <div class="mt-6 overflow-hidden pb-1">
      <h1
        class="animate-terrier font-titre text-[clamp(1.75rem,4.5vw,3rem)] leading-[1.1] text-balance [animation-delay:150ms] motion-reduce:animate-none"
      >
        {{ titre }}
      </h1>
    </div>
    <p
      class="mt-4 max-w-md animate-cascade text-base leading-relaxed text-balance text-white [animation-delay:300ms] motion-reduce:animate-none sm:text-lg"
    >
      {{ introuvable ? t("erreur.texte") : t("erreur.texteAutre") }}
    </p>
    <UiButton
      taille="xl"
      class="mt-8 animate-cascade shadow-lg shadow-galerie/30 [animation-delay:450ms] motion-reduce:animate-none"
      @click="retourAccueil"
    >
      <House aria-hidden="true" />
      {{ t("erreur.retour") }}
    </UiButton>
  </main>

  <div class="relative z-10 -mt-36">
    <LayoutFooter />
  </div>
</template>
