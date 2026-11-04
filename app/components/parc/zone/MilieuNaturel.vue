<script setup lang="ts">
import { motion } from "motion-v";
import { Earth, ThermometerSun, Trees } from "lucide-vue-next";
import { monterEnCascade } from "~/animations/apparitionBas";
import { arriverDeCote } from "~/animations/apparitionCote";
import { auDefilement } from "~/animations/auDefilement";

const props = defineProps<{
  titre: string;
  texte: string;
  region: string;
  climat: string;
  paysage: string;
}>();

const { t } = useI18n();
const localePath = useLocalePath();
const titreId = useId();

const points = computed(() => [
  { icone: Earth, titre: t("parc.zone.milieu.region"), texte: props.region },
  {
    icone: ThermometerSun,
    titre: t("parc.zone.milieu.climat"),
    texte: props.climat,
  },
  { icone: Trees, titre: t("parc.zone.milieu.paysage"), texte: props.paysage },
]);
</script>

<template>
  <section
    :aria-labelledby="titreId"
    class="relative overflow-x-clip px-6 py-20 sm:px-12 lg:py-28"
  >
    <UiEmpreintes
      :pattes="3"
      class="absolute top-[60%] -right-24 w-56 -rotate-80 sm:-right-28 sm:w-72 lg:w-80 xl:-right-32 xl:w-104"
    />

    <div
      class="relative mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-20"
    >
      <div>
        <motion.h2
          :id="titreId"
          v-bind="auDefilement(monterEnCascade(0))"
          class="font-titre text-3xl leading-tight text-balance text-acacia sm:text-4xl xl:text-5xl"
        >
          {{ titre }}
        </motion.h2>
        <motion.p
          v-bind="auDefilement(monterEnCascade(1))"
          class="mt-5 leading-relaxed text-pretty sm:text-lg"
        >
          {{ texte }}
        </motion.p>
        <motion.div v-bind="auDefilement(monterEnCascade(2))" class="mt-8">
          <UiButton :to="localePath('/billetterie')">
            {{ $t("menu.reserver") }}
          </UiButton>
        </motion.div>
      </div>

      <motion.div
        v-bind="auDefilement(arriverDeCote('droite'))"
        class="mx-auto w-full max-w-md"
      >
        <InfosCartePratique
          :titre="$t('parc.zone.milieu.apercu')"
          :points="points"
          teinte="blanc"
        />
      </motion.div>
    </div>
  </section>
</template>
