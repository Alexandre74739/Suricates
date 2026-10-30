// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/fonts'],
  css: ['~/assets/css/main.css'],
  app: {
    // Favicon en SVG plutôt qu'en .ico pour rester net à toutes les tailles.
    // Contrairement à /favicon.ico, les navigateurs ne le cherchent pas seuls : il faut le déclarer ici.
    head: {
      link: [{ rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }]
    }
  },
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
