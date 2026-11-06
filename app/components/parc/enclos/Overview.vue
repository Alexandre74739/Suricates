<script setup lang="ts">
import type { PropType } from "vue";
import { ArrowRight } from "lucide-vue-next";

type Zone = ReturnType<typeof useZones>["zones"]["value"][number];
type Species = ReturnType<ReturnType<typeof useFichesEspeces>["fiche"]>;

const props = defineProps({
  zone: { type: Object as PropType<Zone>, required: true },
  species: { type: Object as PropType<Species>, required: true },
});

const { t } = useI18n();
const localePath = useLocalePath();

const wellBeing = computed(() =>
  ["repli", "enrichissement", "veterinaire"].map((key) =>
    t(`accueil.apropos.bienEtre.points.${key}`),
  ),
);

const neighbours = computed(() =>
  props.zone.especes.filter((e) => e.slug !== props.species.slug),
);
const speciesName = computed(() => props.species.nom.toLocaleLowerCase());
const zoneName = computed(
  () => props.zone.nom.charAt(0).toLocaleLowerCase() + props.zone.nom.slice(1),
);
</script>

<template>
  <div
    class="space-y-24 overflow-x-clip pt-16 pb-24 lg:space-y-32 lg:pt-20 lg:pb-32"
  >
    <ParcEnclosPart
      :title="$t('parc.enclos.vie')"
      :text="species.presentation"
      :points="wellBeing"
    >
      <template #visual>
        <ParcEnclosFeaturedAnimation :species-slug="species.slug" />
      </template>
    </ParcEnclosPart>

    <ParcEnclosPart
      :title="$t('parc.enclos.milieu.titre', { nom: speciesName })"
      :text="zone.milieuNaturel.texte"
      visual="left"
    >
      <template #visual>
        <ParcEnclosHabitatCard
          :region="zone.milieuNaturel.region"
          :climate="zone.milieuNaturel.climat"
          :landscape="zone.milieuNaturel.paysage"
        />
      </template>
      <UiButton :to="localePath('/billetterie')">
        {{ $t("menu.reserver") }}
        <ArrowRight aria-hidden="true" />
      </UiButton>
    </ParcEnclosPart>

    <ParcEnclosPart
      :title="$t('parc.enclos.voisins.titre', { zone: zoneName })"
      :text="$t('parc.enclos.voisins.texte')"
    >
      <template #visual>
        <ParcEnclosZoneCard
          :name="zone.nom"
          :tagline="zone.accroche"
          :link="zone.lien"
          :button="zone.bouton"
        />
      </template>
      <ParcEnclosNeighbourLinks :neighbours="neighbours" />
    </ParcEnclosPart>
  </div>
</template>
