<script setup lang="ts" generic="T">
import { useInView } from "motion-v";

const props = withDefaults(
  defineProps<{
    elements: T[];
    cle: (element: T) => string;
    libellePrecedent: string;
    libelleSuivant: string;
    delai?: number;
  }>(),
  { delai: 5000 },
);

defineSlots<{
  default(props: { element: T; clone: boolean; charger: boolean }): unknown;
}>();

const COPIES = 5;
const MILIEU = Math.floor(COPIES / 2);
const SEUIL_GLISSE = 6;
const ELAN = 180;

const piste = useTemplateRef<HTMLUListElement>("piste");
const fenetre = useTemplateRef<HTMLDivElement>("fenetre");
const visible = useInView(fenetre, { amount: 0.3 });
// Les images se chargent un peu avant que le carrousel n'arrive à l'écran.
const charger = useInView(fenetre, { once: true, margin: "600px 0px" });

// Nombre de cartes affichées à la fois, lu dans la variable CSS --par.
const parVue = ref(3);
const total = computed(() => props.elements.length);
const defile = computed(() => total.value > parVue.value);

// Quand il y a plus de cartes que de places, la liste est rendue en plusieurs exemplaires :
// à l'arrêt, on se recale sans animation dans celui du milieu, d'où le défilement infini.
const cartes = computed(() => {
  const copies = defile.value ? COPIES : 1;
  return Array.from({ length: copies }, (_, copie) =>
    props.elements.map((element) => ({
      element,
      cle: `${copie}-${props.cle(element)}`,
      clone: defile.value && copie !== MILIEU,
    })),
  ).flat();
});

const position = ref(defile.value ? MILIEU * total.value : 0);
const decalage = ref(0);
const animer = ref(true);
const focus = ref(false);
const glisse = ref(false);
const ongletVisible = ref(true);
const relance = ref(0);
let mouvementReduit = false;

watch([defile, total], () => {
  animer.value = false;
  position.value = defile.value ? MILIEU * total.value : 0;
});

const pas = () => {
  const carte = piste.value?.firstElementChild as HTMLElement | null;
  if (!carte || !piste.value) return 1;
  return (
    carte.offsetWidth +
    parseFloat(getComputedStyle(piste.value).columnGap || "0")
  );
};

function recaler() {
  if (!defile.value) return;
  const recalee =
    (((position.value % total.value) + total.value) % total.value) +
    MILIEU * total.value;
  if (recalee === position.value) return;
  animer.value = false;
  position.value = recalee;
}

async function aller(cartes: number) {
  if (!defile.value) return;
  const cible = position.value + cartes;
  if (cible < total.value || cible > (COPIES - 1) * total.value) {
    recaler();
    await nextTick();
    piste.value?.getBoundingClientRect();
  }
  animer.value = true;
  position.value += cartes;
}

function allerManuellement(cartes: number) {
  relance.value++;
  aller(cartes);
}

function finTransition(event: TransitionEvent) {
  if (event.target === event.currentTarget) recaler();
}

// Glisser à la souris ou au doigt ; le défilement vertical de la page reste natif.
let departX = 0;
let dernierX = 0;
let dernierTemps = 0;
let vitesse = 0;
let aGlisse = false;
let image = 0;

function attraper(event: PointerEvent) {
  if (!defile.value || (event.pointerType === "mouse" && event.button !== 0))
    return;
  departX = dernierX = event.clientX;
  dernierTemps = event.timeStamp;
  vitesse = 0;
  aGlisse = false;
  window.addEventListener("pointermove", deplacer);
  window.addEventListener("pointerup", lacher);
  window.addEventListener("pointercancel", lacher);
}

// Fige le carrousel là où il est affiché, même au milieu d'une transition.
function figer() {
  const el = piste.value;
  if (!el) return;
  animer.value = false;
  position.value = -new DOMMatrix(getComputedStyle(el).transform).m41 / pas();
  recaler();
}

function deplacer(event: PointerEvent) {
  const ecart = event.clientX - departX;
  if (!aGlisse) {
    if (Math.abs(ecart) < SEUIL_GLISSE) return;
    aGlisse = true;
    glisse.value = true;
    figer();
  }
  const duree = event.timeStamp - dernierTemps;
  if (duree > 0) vitesse = (event.clientX - dernierX) / duree;
  dernierX = event.clientX;
  dernierTemps = event.timeStamp;
  cancelAnimationFrame(image);
  image = requestAnimationFrame(() => (decalage.value = ecart));
}

function lacher() {
  window.removeEventListener("pointermove", deplacer);
  window.removeEventListener("pointerup", lacher);
  window.removeEventListener("pointercancel", lacher);
  cancelAnimationFrame(image);
  if (!glisse.value) return;
  const projete = (decalage.value + vitesse * ELAN) / pas();
  const cible = Math.round(position.value - projete);
  animer.value = true;
  position.value = Math.max(
    position.value - total.value,
    Math.min(position.value + total.value, cible),
  );
  decalage.value = 0;
  glisse.value = false;
  relance.value++;
}

function bloquerClicApresGlisse(event: MouseEvent) {
  if (!aGlisse) return;
  event.preventDefault();
  event.stopPropagation();
  aGlisse = false;
}

function montrer(index: number) {
  if (
    !defile.value ||
    (index >= position.value && index < position.value + parVue.value)
  )
    return;
  animer.value = true;
  position.value = index;
}

function mesurer() {
  if (piste.value)
    parVue.value =
      Number(getComputedStyle(piste.value).getPropertyValue("--par")) || 1;
}

function changerOnglet() {
  ongletVisible.value = document.visibilityState === "visible";
}

onMounted(() => {
  mouvementReduit = matchMedia("(prefers-reduced-motion: reduce)").matches;
  mesurer();
  changerOnglet();
  window.addEventListener("resize", mesurer);
  document.addEventListener("visibilitychange", changerOnglet);
});

onBeforeUnmount(() => {
  lacher();
  window.removeEventListener("resize", mesurer);
  document.removeEventListener("visibilitychange", changerOnglet);
});

const defilementAuto = computed(
  () =>
    defile.value &&
    !mouvementReduit &&
    visible.value &&
    ongletVisible.value &&
    !focus.value &&
    !glisse.value,
);

watch([defilementAuto, relance], ([actif], _, onCleanup) => {
  if (!actif) return;
  const minuteur = setInterval(() => aller(1), props.delai);
  onCleanup(() => clearInterval(minuteur));
});

// Seul le focus clavier met en pause : un clic sur une flèche ne doit pas l'arrêter.
function entrerFocus(event: FocusEvent) {
  focus.value = (event.target as Element).matches(":focus-visible");
}

function quitterFocus(event: FocusEvent) {
  const zone = event.currentTarget as HTMLElement;
  if (!zone.contains(event.relatedTarget as Node | null)) focus.value = false;
}
</script>

<template>
  <div>
    <div class="relative" @focusin="entrerFocus" @focusout="quitterFocus">
      <UiFleche
        v-if="defile"
        sens="precedent"
        :label="libellePrecedent"
        class="absolute top-[37%] -left-3 z-10 -translate-y-1/2 max-sm:hidden lg:-left-6"
        @click="allerManuellement(-1)"
      />

      <div ref="fenetre" class="-mx-4 overflow-clip px-4 pt-2 pb-8">
        <ul
          ref="piste"
          class="flex gap-4 [--ecart:1rem] [--par:2] sm:gap-6 sm:[--ecart:1.5rem] lg:gap-8 lg:[--ecart:2rem] lg:[--par:3]"
          :class="[
            defile
              ? 'touch-pan-y select-none will-change-transform'
              : 'justify-center',
            animer && defile
              ? 'transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none'
              : '',
            { 'cursor-grabbing': glisse },
          ]"
          :style="
            defile
              ? {
                  transform: `translate3d(calc(${-position} * (100% + var(--ecart)) / var(--par) + ${decalage}px), 0, 0)`,
                }
              : undefined
          "
          @transitionend="finTransition"
          @pointerdown="attraper"
          @dragstart.prevent
          @click.capture="bloquerClicApresGlisse"
        >
          <li
            v-for="(carte, index) in cartes"
            :key="carte.cle"
            :aria-hidden="carte.clone || undefined"
            class="w-[calc((100%-1rem)/2)] shrink-0 sm:w-[calc((100%-1.5rem)/2)] lg:w-[calc((100%-4rem)/3)]"
            @focusin="montrer(index)"
          >
            <slot
              :element="carte.element"
              :clone="carte.clone"
              :charger="charger"
            />
          </li>
        </ul>
      </div>

      <UiFleche
        v-if="defile"
        sens="suivant"
        :label="libelleSuivant"
        class="absolute top-[37%] -right-3 z-10 -translate-y-1/2 max-sm:hidden lg:-right-6"
        @click="allerManuellement(1)"
      />
    </div>

    <div v-if="defile" class="flex justify-center gap-4 sm:hidden">
      <UiFleche
        sens="precedent"
        :label="libellePrecedent"
        @click="allerManuellement(-1)"
      />
      <UiFleche
        sens="suivant"
        :label="libelleSuivant"
        @click="allerManuellement(1)"
      />
    </div>
  </div>
</template>
