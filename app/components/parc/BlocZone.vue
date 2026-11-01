<script setup lang="ts">
import { motion } from "motion-v";
import { PawPrint } from "lucide-vue-next";
import { monterEnCascade } from "~/animations/apparitionBas";
import { arriverDeCote } from "~/animations/apparitionCote";
import { auDefilement } from "~/animations/auDefilement";

const ESPECES_PC = 5;
const ESPECES_MOBILE = 3;

const props = withDefaults(
  defineProps<{
    lien: string;
    nom: string;
    bouton: string;
    accroche: string;
    milieu: string;
    habitants: string;
    especes: { slug: string; nom: string; lien: string }[];
    fond: string;
    image?: string;
    alt?: string;
    inverse?: boolean;
  }>(),
  { inverse: false },
);

const visibles = computed(() => props.especes.slice(0, ESPECES_PC));
</script>

<template>
  <article
    class="relative mx-auto grid max-w-6xl items-center gap-8 lg:grid-cols-12 lg:gap-14"
  >
    <motion.div
      v-bind="auDefilement(arriverDeCote(inverse ? 'droite' : 'gauche'))"
      class="relative lg:col-span-5"
      :class="{ 'lg:order-last': inverse }"
    >
      <div
        class="masque-pinceau absolute inset-0 translate-x-3 translate-y-3 rotate-2"
        :class="fond"
        aria-hidden="true"
      />
      <div
        class="masque-pinceau relative aspect-4/3 overflow-hidden lg:aspect-4/5"
        :class="fond"
      >
        <UiPhoto
          v-if="image"
          :src="image"
          :alt="alt ?? ''"
          sizes="(min-width: 1024px) 460px, calc(100vw - 3rem)"
          class="size-full object-cover"
        />
        <div
          v-else
          class="motif-feuilles flex size-full items-center justify-center bg-galerie/10"
          aria-hidden="true"
        >
          <PawPrint class="size-20 text-white/80" />
        </div>
      </div>
    </motion.div>

    <div class="lg:col-span-7">
      <motion.h3
        v-bind="auDefilement(monterEnCascade(0))"
        class="font-titre text-3xl leading-tight text-balance text-acacia sm:text-4xl xl:text-5xl"
      >
        {{ nom }}
      </motion.h3>
      <motion.p
        v-bind="auDefilement(monterEnCascade(1))"
        class="mt-4 text-lg leading-relaxed text-pretty sm:text-xl"
      >
        {{ accroche }}
      </motion.p>

      <motion.div
        v-bind="auDefilement(monterEnCascade(2))"
        class="relative mt-8"
      >
        <div
          class="masque-pinceau absolute inset-0 translate-x-2 translate-y-2.5 rotate-1"
          :class="fond"
          aria-hidden="true"
        />
        <div class="masque-pinceau relative bg-white px-8 py-10 sm:px-10">
          <h4
            class="text-sm font-semibold tracking-wider text-terracotta-fonce uppercase"
          >
            {{ $t("parc.zones.milieu") }}
          </h4>
          <p class="mt-2 leading-relaxed text-pretty text-galerie/80">
            {{ milieu }}
          </p>

          <div class="my-6 h-px bg-galerie/10" />

          <h4
            class="text-sm font-semibold tracking-wider text-terracotta-fonce uppercase"
          >
            {{ $t("parc.zones.habitants") }}
          </h4>
          <p class="mt-2 leading-relaxed text-pretty text-galerie/80">
            {{ habitants }}
          </p>
          <ul class="mt-4 flex flex-wrap items-center gap-2">
            <li
              v-for="(espece, rang) in visibles"
              :key="espece.slug"
              :class="{ 'max-lg:hidden': rang >= ESPECES_MOBILE }"
            >
              <UiButton :to="espece.lien" couleur="sable" taille="xs">
                {{ espece.nom }}
              </UiButton>
            </li>
            <li>
              <UiLienTexte
                :texte="$t('parc.zones.tous')"
                :lien="lien"
                :precision="nom"
                class="ml-1"
              />
            </li>
          </ul>
        </div>
      </motion.div>

      <motion.div v-bind="auDefilement(monterEnCascade(3))" class="mt-8">
        <UiButton :to="lien">{{ bouton }}</UiButton>
      </motion.div>
    </div>
  </article>
</template>
