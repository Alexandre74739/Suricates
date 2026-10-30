// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/fonts'],
  css: ['~/assets/css/main.css'],
  vite: {
    plugins: [tailwindcss()]
  },
  fonts: {
    families: [
      { name: 'Rubik Dirt', provider: 'google', weights: [400] },
      { name: 'Lexend', provider: 'google', weights: [300, 400, 500, 600, 700] }
    ]
  }
})
