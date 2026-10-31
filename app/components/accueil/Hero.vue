<script setup lang="ts">
const localePath = useLocalePath();

// onload en attribut : se déclenche avant le chargement de Vue.
const SIGNALER_PHOTO = "document.documentElement.dataset.heroPret = ''";

const hero = useTemplateRef<HTMLElement>("hero");
if (import.meta.client && !useNuxtApp().isHydrating) {
  delete document.documentElement.dataset.heroPret;
}
onMounted(() => {
  if (hero.value?.querySelector("img")?.complete)
    document.documentElement.dataset.heroPret = "";
});
</script>

<template>
  <section ref="hero">
    <div
      class="masque-pinceau-bas relative flex min-h-svh flex-col justify-center overflow-hidden"
    >
      <UiPhoto
        src="/images/illustrations/suricates-tronc.webp"
        :alt="$t('accueil.hero.alt')"
        :largeurs="[640, 1024, 1280, 1920]"
        sizes="max(100vw, 139vh)"
        prioritaire
        :onload="SIGNALER_PHOTO"
        class="absolute inset-0 size-full object-cover object-[72%_45%] lg:object-top"
      />
      <div
        class="absolute inset-0 bg-radial-[ellipse_at_50%_50%] from-galerie/75 via-galerie/40 via-45% to-galerie/10 to-80%"
        aria-hidden="true"
      />

      <p
        class="absolute top-1/2 right-5 hidden -translate-y-1/2 rotate-180 text-sm font-semibold tracking-[0.3em] text-sable uppercase [writing-mode:vertical-rl] lg:block"
        aria-hidden="true"
      >
        {{ $t("accueil.hero.nomVertical") }}
      </p>

      <div
        class="relative mx-auto flex w-full max-w-6xl flex-col items-center px-6 pt-26 pb-40 text-center sm:px-12 sm:pt-32 lg:pt-48 lg:pb-48"
      >
        <div class="overflow-hidden pb-1">
          <h1
            class="animate-terrier attendre-photo-hero font-titre [animation-delay:150ms] motion-reduce:animate-none text-4xl leading-[1.05] text-balance text-white sm:text-5xl md:text-6xl xl:text-7xl"
          >
            {{ $t("accueil.hero.titre") }}
          </h1>
        </div>

        <p
          class="mt-6 animate-cascade attendre-photo-hero [animation-delay:550ms] motion-reduce:animate-none max-w-4xl text-base leading-relaxed text-balance text-white sm:text-lg"
        >
          {{ $t("accueil.hero.texte") }}
        </p>

        <div
          class="mt-10 animate-cascade attendre-photo-hero [animation-delay:750ms] motion-reduce:animate-none flex flex-wrap justify-center gap-4"
        >
          <UiButton :to="localePath('/billetterie')" taille="xl">
            {{ $t("menu.reserver") }}
          </UiButton>
          <UiButton :to="localePath('/parc')" couleur="acacia" taille="xl">
            {{ $t("accueil.hero.decouvrir") }}
          </UiButton>
        </div>
      </div>
    </div>
  </section>
</template>
