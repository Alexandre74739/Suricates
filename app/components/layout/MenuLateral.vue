<script setup lang="ts">
import { Ticket, User, X } from "lucide-vue-next";
import { AnimatePresence, motion } from "motion-v";
import { fondu, apparaitreEnCascade, glisserDepuisDroite } from "~/animations/apparitionCote";

const ouvert = defineModel<boolean>({ required: true });
const { liens, estActif } = useNavigation();
const route = useRoute();
const dialogue = ref<HTMLDialogElement>();

watch(ouvert, (valeur) => valeur && dialogue.value?.showModal(), {
  flush: "post",
});
watch(
  () => route.path,
  () => (ouvert.value = false),
);
</script>

<template>
  <dialog
    id="menu-lateral"
    ref="dialogue"
    class="m-0 size-full max-h-none max-w-none bg-transparent backdrop:bg-transparent"
    @cancel.prevent="ouvert = false"
    @close="ouvert = false"
  >
    <AnimatePresence :on-exit-complete="() => dialogue?.close()">
      <motion.div
        v-if="ouvert"
        key="fond"
        v-bind="fondu"
        class="fixed inset-0 bg-galerie/40 backdrop-blur-sm"
        @click="ouvert = false"
      />
      <motion.nav
        v-if="ouvert"
        key="panneau"
        v-bind="glisserDepuisDroite"
        aria-label="Navigation principale"
        class="fixed inset-y-0 right-0 flex w-80 max-w-[85vw] flex-col overflow-y-auto rounded-l-2xl bg-white p-5 shadow-2xl sm:p-6"
      >
        <div class="flex items-center justify-between">
          <span class="text-sm font-medium text-galerie/60">Menu</span>
          <button
            type="button"
            autofocus
            class="rounded-lg p-2 text-terracotta transition-colors hover:bg-terracotta/10"
            aria-label="Fermer le menu"
            @click="ouvert = false"
          >
            <X class="size-7" aria-hidden="true" />
          </button>
        </div>

        <ul class="mt-4 flex flex-col gap-1 sm:mt-6">
          <motion.li
            v-for="(lien, i) in liens"
            :key="lien.to"
            v-bind="apparaitreEnCascade(i)"
          >
            <NuxtLink
              :to="lien.to"
              class="block rounded-lg px-3 py-3 text-lg font-semibold tracking-tight transition-colors sm:text-xl"
              :class="
                estActif(lien.to)
                  ? 'bg-terracotta/10 text-galerie'
                  : 'text-terracotta hover:bg-acacia/10 hover:text-acacia'
              "
              :aria-current="estActif(lien.to) ? 'page' : undefined"
            >
              {{ lien.label }}
            </NuxtLink>
          </motion.li>
        </ul>

        <motion.div
          v-bind="apparaitreEnCascade(liens.length)"
          class="mt-auto flex flex-col gap-3 pt-6"
        >
          <UiButton to="/compte" couleur="acacia" class="w-full">
            <User class="size-5" aria-hidden="true" />
            Mon compte
          </UiButton>
          <UiButton to="/billetterie" class="w-full">
            <Ticket class="size-5" aria-hidden="true" />
            Réserver mes billets
          </UiButton>
        </motion.div>
      </motion.nav>
    </AnimatePresence>
  </dialog>
</template>
