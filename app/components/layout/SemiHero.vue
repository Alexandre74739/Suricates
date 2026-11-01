<script setup lang="ts">
withDefaults(
  defineProps<{
    titre: string;
    texte: string;
    image?: string;
    alt?: string;
    fond?: string;
    position?: string;
  }>(),
  { fond: "bg-acacia", position: "object-center" },
);
</script>

<template>
  <section
    class="masque-pinceau-bas relative isolate flex min-h-[95svh] flex-col justify-center overflow-hidden"
    :class="fond"
  >
    <UiPhoto
      v-if="image"
      :src="image"
      :alt="alt ?? ''"
      :largeurs="[640, 1024, 1280, 1536]"
      sizes="(max-width: 767px) 640px, max(100vw, 168vh)"
      prioritaire
      class="absolute inset-0 -z-10 size-full object-cover"
      :class="position"
    />
    <div
      v-else
      class="motif-feuilles absolute inset-0 -z-10 bg-galerie/20"
      aria-hidden="true"
    />
    <div
      class="absolute inset-0 -z-10 bg-linear-to-t from-galerie/85 via-galerie/40 to-galerie/20 lg:bg-linear-to-r lg:from-galerie/85 lg:via-galerie/45 lg:to-transparent"
      aria-hidden="true"
    />

    <div
      class="mx-auto w-full max-w-6xl px-6 pt-32 pb-40 text-white sm:px-12 sm:pt-40 lg:pb-48"
    >
      <div class="max-w-2xl">
        <div class="overflow-hidden pb-1">
          <h1
            class="animate-terrier font-titre text-4xl leading-[1.05] text-balance [animation-delay:150ms] motion-reduce:animate-none sm:text-5xl md:text-6xl xl:text-7xl"
          >
            {{ titre }}
          </h1>
        </div>
        <p
          class="mt-6 animate-cascade text-base leading-relaxed text-pretty [animation-delay:450ms] motion-reduce:animate-none sm:text-lg"
        >
          {{ texte }}
        </p>
        <div
          v-if="$slots.default"
          class="mt-10 flex animate-cascade flex-wrap gap-4 [animation-delay:650ms] motion-reduce:animate-none"
        >
          <slot />
        </div>
      </div>
    </div>
  </section>
</template>
