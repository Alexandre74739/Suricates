<script setup lang="ts">
import { Clock } from "lucide-vue-next";

const props = defineProps<{ speciesSlug: string }>();

const { t } = useI18n();
const { formatHeure, formatDateHeure } = useFormatage();
const { animations } = await useAnimations(() => [props.speciesSlug]);

const animation = computed(() => {
  const candidates = animations.value.filter(
    (a) => (a.type === "FIXE" && a.heure) || a.dateHeure,
  );
  const found = candidates.find((a) => a.type === "FIXE") ?? candidates[0];
  if (!found) return undefined;
  return {
    title: found.titre,
    link: found.lien,
    description: found.description,
    schedule: found.heure
      ? t("parc.enclos.horaire.quotidien", { heure: formatHeure(found.heure) })
      : t("parc.enclos.horaire.ponctuel", formatDateHeure(found.dateHeure!)),
  };
});
</script>

<template>
  <UiBrushCard shadow="bg-acacia" class="px-8 py-10 sm:px-10">
    <h3 class="font-titre text-3xl text-acacia">
      {{
        animation
          ? $t("parc.enclos.rendezVous.titre")
          : $t("parc.enclos.rendezVous.sansTitre")
      }}
    </h3>

    <template v-if="animation">
      <p class="mt-6 flex items-center gap-4">
        <UiPastille class="size-11 bg-terracotta text-white">
          <Clock class="size-5" />
        </UiPastille>
        <span>
          <span class="block font-semibold tracking-tight">
            {{ animation.title }}
          </span>
          <span
            class="mt-0.5 block text-sm text-galerie/75 first-letter:uppercase"
          >
            {{ animation.schedule }}
          </span>
        </span>
      </p>
      <p class="mt-5 text-sm leading-relaxed text-pretty text-galerie/80">
        {{ animation.description }}
      </p>
      <UiButton :to="animation.link" couleur="terracotta" class="mt-6">
        {{ $t("parc.enclos.rendezVous.bouton") }}
        <span class="sr-only">: {{ animation.title }}</span>
      </UiButton>
    </template>
    <p v-else class="mt-5 leading-relaxed text-pretty text-galerie/80">
      {{ $t("parc.enclos.rendezVous.sans") }}
    </p>
  </UiBrushCard>
</template>
