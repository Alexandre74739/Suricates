<script setup lang="ts">
import { MapPlus } from "lucide-vue-next";
import { PLAN_PDF } from "#shared/parc";

definePageMeta({ surHero: true });

const { t } = useI18n();

useSeoMeta({
  title: () => t("parc.seo.titre"),
  description: () => t("parc.seo.description"),
  ogTitle: () => t("parc.seo.titre"),
  ogDescription: () => t("parc.seo.description"),
});
</script>

<template>
  <main>
    <LayoutSemiHero
      :titre="$t('parc.hero.titre')"
      :texte="$t('parc.hero.texte')"
      image="/images/parc/rhinoceros-soigneuse.webp"
      :alt="$t('parc.hero.alt')"
      position="object-[62%_center]"
    >
      <UiButton to="#zones" taille="xl">
        {{ $t("parc.hero.zones") }}
      </UiButton>
      <UiButton
        :to="PLAN_PDF"
        external
        download
        couleur="acacia"
        taille="xl"
      >
        <MapPlus aria-hidden="true" />
        {{ $t("parc.hero.plan") }}
      </UiButton>
    </LayoutSemiHero>
    <LazyParcNavZones id="zones" hydrate-on-visible />
    <LazyParcZones hydrate-on-visible />
  </main>
</template>
