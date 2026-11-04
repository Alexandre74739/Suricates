<script setup lang="ts">
import { motion } from "motion-v";
import { Lightbulb, MapPin, Users, Utensils } from "lucide-vue-next";
import { monterEnCascade } from "~/animations/apparitionBas";
import { arriverDeCote } from "~/animations/apparitionCote";
import { auDefilement } from "~/animations/auDefilement";
import type { AllurePhoto } from "./PhotoEspece.vue";

const ALLURE: AllurePhoto = {
  format: "aspect-4/3 lg:aspect-4/5",
  inclinaison: "rotate-0",
  ombre:
    "bg-sauge translate-x-3 translate-y-3 rotate-2 group-hover/photo:rotate-3",
  vide: "bg-acacia",
};

const props = defineProps<{
  nom: string;
  texte: string;
  presentation: string;
  origine: string;
  regime: string;
  effectif: number;
  anecdote: string;
  lien: string;
  image: string | null;
}>();

const { t } = useI18n();

const cascade = (rang: number) => auDefilement(monterEnCascade(rang));

const infos = computed(() => [
  {
    icone: MapPin,
    titre: t("parc.zone.habitants.origine"),
    texte: props.origine,
  },
  {
    icone: Utensils,
    titre: t("parc.zone.habitants.regime"),
    texte: props.regime,
  },
  {
    icone: Users,
    titre: t("parc.zone.habitants.effectif"),
    texte: t("parc.zone.habitants.effectifValeur", props.effectif),
  },
]);
</script>

<template>
  <article class="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
    <motion.div
      v-bind="auDefilement(arriverDeCote('gauche'))"
      class="lg:col-span-5"
    >
      <ParcZonePhotoEspece
        :lien="lien"
        :image="image"
        :allure="ALLURE"
        sizes="(min-width: 1024px) 460px, calc(100vw - 3rem)"
      />
    </motion.div>

    <div class="lg:col-span-7">
      <motion.h3
        v-bind="cascade(0)"
        class="font-titre text-4xl leading-tight text-balance text-acacia sm:text-5xl"
      >
        {{ nom }}
      </motion.h3>
      <motion.p
        v-bind="cascade(1)"
        class="mt-5 leading-relaxed text-pretty sm:text-lg"
      >
        {{ texte }} {{ presentation }}
      </motion.p>

      <motion.div v-bind="cascade(2)" class="relative mt-9">
        <div
          class="masque-pinceau absolute inset-0 translate-x-2 translate-y-2.5 rotate-1 bg-acacia"
          aria-hidden="true"
        />
        <div class="masque-pinceau relative bg-white p-5 sm:p-6">
          <ul
            role="list"
            class="grid gap-6 px-6 pt-4 pb-7 sm:grid-cols-3 sm:gap-0 sm:divide-x sm:divide-dashed sm:divide-galerie/15 sm:px-0 sm:pt-5 sm:pb-8"
          >
            <li
              v-for="(info, i) in infos"
              :key="info.titre"
              class="flex items-start gap-4 sm:flex-col sm:items-center sm:gap-3.5 sm:px-4 sm:text-center"
            >
              <UiPastille
                :decalage="i * 3"
                class="size-11 bg-acacia text-white"
              >
                <component :is="info.icone" class="size-5" />
              </UiPastille>
              <p class="pt-0.5 sm:pt-0">
                <span
                  class="block text-xs font-semibold tracking-wider text-terracotta-fonce uppercase"
                >
                  {{ info.titre }}
                </span>
                <span
                  class="mt-1.5 block leading-snug font-medium text-balance"
                >
                  {{ info.texte }}
                </span>
              </p>
            </li>
          </ul>

          <aside
            class="masque-pinceau flex items-start gap-4 bg-sable px-6 py-6 sm:px-8 sm:py-7"
          >
            <UiPastille :decalage="5" class="size-11 bg-terracotta text-white">
              <Lightbulb class="size-5" />
            </UiPastille>
            <div>
              <h4
                class="text-xs font-semibold tracking-wider text-terracotta-fonce uppercase"
              >
                {{ $t("parc.zone.habitants.saviezVous") }}
              </h4>
              <p class="mt-1.5 leading-relaxed text-pretty">{{ anecdote }}</p>
            </div>
          </aside>
        </div>
      </motion.div>

      <motion.div v-bind="cascade(3)" class="mt-10">
        <UiButton :to="lien">
          {{ $t("parc.zone.habitants.voir") }}
          <span class="sr-only">: {{ nom }}</span>
        </UiButton>
      </motion.div>
    </div>
  </article>
</template>
