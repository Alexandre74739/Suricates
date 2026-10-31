<script setup lang="ts">
import { motion } from "motion-v";
import { FERMETURE_HIVERNALE, SAISONS, TARIFS_CENTIMES } from "#shared/parc";
import { monterEnCascade } from "~/animations/apparitionBas";
import { arriverDeCote } from "~/animations/apparitionCote";
import { auDefilement } from "~/animations/auDefilement";
import suricate from "~/assets/images/illustrations/suricate-sentinelle.webp";

const { t } = useI18n();
const localePath = useLocalePath();
const { formatPrix, formatHeure, formatJour } = useFormatage();
const titreId = useId();

const horaires = computed(() => [
  ...SAISONS.map((s) => ({
    libelle: t(`horairesTarifs.horaires.saisons.${s.cle}`),
    valeur: `${formatHeure(s.ouverture)} – ${formatHeure(s.fermeture)}`,
  })),
  {
    libelle: t("horairesTarifs.horaires.periodeFermeture", {
      debut: formatJour(FERMETURE_HIVERNALE.debut),
      fin: formatJour(FERMETURE_HIVERNALE.fin),
    }),
    valeur: t("horairesTarifs.horaires.ferme"),
  },
]);

const tarifs = computed(() => [
  {
    nom: t("horairesTarifs.tarifs.plein.nom"),
    condition: t("horairesTarifs.tarifs.plein.condition"),
    prix: formatPrix(TARIFS_CENTIMES.PLEIN),
  },
  {
    nom: t("horairesTarifs.tarifs.reduit.nom"),
    condition: t("horairesTarifs.tarifs.reduit.condition"),
    prix: formatPrix(TARIFS_CENTIMES.REDUIT),
  },
  {
    nom: t("horairesTarifs.tarifs.gratuit.nom"),
    condition: t("horairesTarifs.tarifs.gratuit.condition"),
    prix: t("horairesTarifs.tarifs.gratuit.prix"),
  },
]);
</script>

<template>
  <section
    :aria-labelledby="titreId"
    class="masque-pinceau-haut-bas relative isolate overflow-hidden bg-galerie px-6 py-20 text-sable [--bord-pinceau:2.5rem] sm:px-12 sm:py-24"
  >
    <div
      class="motif-feuilles absolute inset-0 -z-10 bg-terracotta-fonce/15"
      aria-hidden="true"
    />

    <div
      class="mx-auto grid max-w-6xl gap-x-16 gap-y-12 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] xl:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] xl:gap-x-20"
    >
      <div>
        <motion.h2
          :id="titreId"
          v-bind="auDefilement(monterEnCascade(0))"
          class="font-titre text-4xl leading-tight text-balance sm:text-5xl"
        >
          {{ $t("horairesTarifs.titre") }}
        </motion.h2>
        <motion.p
          v-bind="auDefilement(monterEnCascade(1))"
          class="mt-5 max-w-xl leading-relaxed text-pretty text-sable/85 sm:text-lg"
        >
          {{ $t("horairesTarifs.intro") }}
        </motion.p>
      </div>

      <motion.div
        v-bind="auDefilement(arriverDeCote('droite'))"
        class="relative mx-auto w-full max-w-xs rotate-2 sm:max-w-sm lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:max-w-none lg:self-center"
      >
        <div
          class="masque-pinceau absolute inset-0 translate-x-3 translate-y-3 rotate-3 bg-terracotta-fonce"
          aria-hidden="true"
        />
        <img
          :src="suricate"
          :alt="$t('horairesTarifs.alt')"
          loading="lazy"
          class="masque-pinceau relative aspect-4/5 w-full object-cover"
        />
      </motion.div>

      <div class="grid gap-8 sm:grid-cols-2 sm:gap-6">
        <InfosCarteHoraires
          :titre="$t('horairesTarifs.horaires.titre')"
          :horaires="horaires"
          :note="$t('horairesTarifs.horaires.derniereEntree')"
        />
        <InfosCarteTarifs
          :titre="$t('horairesTarifs.tarifs.titre')"
          :tarifs="tarifs"
          :bouton="{
            libelle: $t('menu.reserver'),
            lien: localePath('/billetterie'),
          }"
          :rang="5"
        />
      </div>
    </div>
  </section>
</template>
