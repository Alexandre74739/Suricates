<script setup lang="ts">
withDefaults(defineProps<{ rotation?: number }>(), { rotation: 0 });
</script>

<template>
  <svg
    viewBox="-80 -80 160 160"
    :style="{ rotate: `${rotation}deg` }"
    aria-hidden="true"
  >
    <path
      d="M43.1-58.3C55.1-49.8 63.6-35.7 68.4-20.1 73.2-4.5 74.3 12.5 68.2 26.4 62.1 40.3 48.8 51.1 34.1 58.9 19.4 66.7 3.3 71.5-13.4 70.6-30.1 69.7-47.4 63-58.6 50.4-69.8 37.8-74.9 19.3-73.8 1.6-72.7-16-65.5-32.9-53.6-41.8-41.7-50.6-25.1-51.4-9.6-57.3 5.9-63.1 31.1-66.8 43.1-58.3Z"
    />
  </svg>
</template>
