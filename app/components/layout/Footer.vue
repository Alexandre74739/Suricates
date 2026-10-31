<script setup lang="ts">
import {
  Facebook,
  Instagram,
  Mail,
  MapPin,
  MapPlus,
  Phone,
  Ticket,
  Youtube,
} from "lucide-vue-next";
import logo from "~/assets/images/logos/logo-principal-clair.svg";
import { PLAN_PDF } from "#shared/parc";

const { liens } = useNavigation();
const localePath = useLocalePath();

// Comptes pas créés : les liens mènent à la page 404.
const reseaux = [
  { nom: "Facebook", icone: Facebook, to: "/facebook" },
  { nom: "Instagram", icone: Instagram, to: "/instagram" },
  { nom: "YouTube", icone: Youtube, to: "/youtube" },
];

const liensVisite = computed(() => [
  { cle: "footer.horaires", to: localePath("/infos-pratiques") },
  { cle: "header.compte", to: localePath("/compte") },
  { cle: "footer.cgv", to: localePath("/cgv") },
]);

const liensLegaux = computed(() => [
  { cle: "footer.mentionsLegales", to: localePath("/mentions-legales") },
  { cle: "footer.confidentialite", to: localePath("/confidentialite") },
  { cle: "footer.cookies", to: localePath("/cookies") },
]);

const lien =
  "text-sable/80 transition-colors duration-200 hover:text-sauge focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracotta";
</script>

<template>
  <footer
    class="masque-pinceau-haut mt-16 bg-galerie px-6 pt-24 pb-8 text-sable sm:px-12 sm:pt-28"
  >
    <div class="mx-auto max-w-6xl">
      <div class="grid gap-12 sm:grid-cols-2 lg:grid-cols-12 lg:gap-10">
        <div class="sm:col-span-2 lg:col-span-4">
          <NuxtLink
            :to="localePath('/')"
            class="inline-block"
            :aria-label="$t('header.retourAccueil')"
          >
            <img
              :src="logo"
              alt="Le Domaine des Suricates"
              width="706"
              height="174"
              loading="lazy"
              class="h-14 w-auto text-transparent sm:h-16"
            />
          </NuxtLink>
          <p class="mt-6 max-w-sm leading-relaxed text-pretty text-sable/70">
            {{ $t("footer.description") }}
          </p>
        </div>

        <nav aria-labelledby="footer-decouvrir" class="lg:col-span-2">
          <h2 id="footer-decouvrir" class="font-titre text-2xl text-sauge">
            {{ $t("footer.decouvrir") }}
          </h2>
          <ul class="mt-5 space-y-3">
            <li v-for="item in liens" :key="item.to">
              <NuxtLink :to="item.to" :class="lien">{{ item.label }}</NuxtLink>
            </li>
          </ul>
        </nav>

        <div class="lg:col-span-3">
          <h2 class="font-titre text-2xl text-sauge">
            {{ $t("footer.visite") }}
          </h2>
          <div class="mt-5 flex flex-col gap-3 sm:max-w-64">
            <UiButton :to="localePath('/billetterie')">
              <Ticket aria-hidden="true" />
              {{ $t("header.billetterie") }}
            </UiButton>
            <UiButton :to="PLAN_PDF" couleur="clair" external download>
              <MapPlus aria-hidden="true" />
              {{ $t("accueil.raccourcis.plan") }}
            </UiButton>
          </div>
          <ul class="mt-6 space-y-3">
            <li v-for="item in liensVisite" :key="item.cle">
              <NuxtLink :to="item.to" :class="lien">{{
                $t(item.cle)
              }}</NuxtLink>
            </li>
          </ul>
        </div>

        <div class="lg:col-span-3">
          <h2 class="font-titre text-2xl text-sauge">
            {{ $t("footer.nousTrouver") }}
          </h2>
          <ul class="mt-5 space-y-4 text-sable/80">
            <li class="flex gap-3">
              <MapPin
                class="mt-0.5 size-5 shrink-0 text-terracotta"
                aria-hidden="true"
              />
              <address class="not-italic">
                Le Domaine des Suricates<br />
                1 route du Désert<br />
                38380 Saint-Pierre-de-Chartreuse
              </address>
            </li>
            <li class="flex gap-3">
              <Phone
                class="mt-0.5 size-5 shrink-0 text-terracotta"
                aria-hidden="true"
              />
              <a href="tel:+33465712026" :class="lien">
                <span class="sr-only">{{ $t("footer.telephone") }} </span>
                04 65 71 20 26
              </a>
            </li>
            <li class="flex gap-3">
              <Mail
                class="mt-0.5 size-5 shrink-0 text-terracotta"
                aria-hidden="true"
              />
              <a
                href="mailto:contact@domainedessuricates.com"
                :class="lien"
                class="break-all"
              >
                contact@domainedessuricates.com
              </a>
            </li>
          </ul>
          <ul class="mt-6 flex gap-3" :aria-label="$t('footer.reseaux')">
            <li v-for="reseau in reseaux" :key="reseau.nom">
              <UiIconButton :to="reseau.to" :label="reseau.nom" clair>
                <component
                  :is="reseau.icone"
                  class="size-5"
                  aria-hidden="true"
                />
              </UiIconButton>
            </li>
          </ul>
        </div>
      </div>

      <div
        class="mt-14 flex flex-col gap-4 border-t border-sable/20 pt-6 text-sm lg:flex-row-reverse lg:items-center lg:justify-between"
      >
        <nav :aria-label="$t('footer.navLegale')">
          <ul class="flex flex-wrap gap-x-6 gap-y-2">
            <li v-for="item in liensLegaux" :key="item.cle">
              <NuxtLink :to="item.to" :class="lien">{{
                $t(item.cle)
              }}</NuxtLink>
            </li>
          </ul>
        </nav>
        <p class="text-sable/80">
          <i18n-t keypath="footer.credits" scope="global">
            <template #studio>
              <a
                href="https://fablioo.com"
                target="_blank"
                rel="noopener"
                :class="lien"
                class="underline underline-offset-2"
                >Fablioo<span class="sr-only">
                  {{ $t("commun.nouvelOnglet") }}</span
                ></a
              >
            </template>
          </i18n-t>
        </p>
      </div>
    </div>
  </footer>
</template>
