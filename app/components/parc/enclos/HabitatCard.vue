<script setup lang="ts">
import { Earth, ThermometerSun, Trees } from "lucide-vue-next";

const props = defineProps<{
  region: string;
  climate: string;
  landscape: string;
}>();

const { t } = useI18n();

const points = computed(() => [
  { icone: Earth, titre: t("parc.zone.milieu.region"), texte: props.region },
  {
    icone: ThermometerSun,
    titre: t("parc.zone.milieu.climat"),
    texte: props.climate,
  },
  {
    icone: Trees,
    titre: t("parc.zone.milieu.paysage"),
    texte: props.landscape,
  },
]);
</script>

<template>
  <InfosCartePratique
    :titre="$t('parc.zone.milieu.apercu')"
    :points="points"
    teinte="sauge"
  />
</template>
