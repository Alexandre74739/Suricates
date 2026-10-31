// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/fonts', '@nuxtjs/i18n'],
  // Français sans préfixe (/parc), anglais sous /en avec des chemins traduits (/en/park).
  // Fichiers de traduction dans i18n/locales/.
  i18n: {
    strategy: 'prefix_except_default',
    defaultLocale: 'fr',
    locales: [
      { code: 'fr', language: 'fr-FR', name: 'Français', file: 'fr.json' },
      { code: 'en', language: 'en-GB', name: 'English', file: 'en.json' }
    ],
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'langue',
      redirectOn: 'root'
    },
    // Chemins anglais des pages publiques, indexés par nom de route.
    // Les pages absentes d'ici (espace employé, admin) gardent leur chemin français sous /en.
    customRoutes: 'config',
    pages: {
      'parc': { en: '/park' },
      'parc-id': { en: '/park/[id]' },
      'animations': { en: '/shows' },
      'animations-slug': { en: '/shows/[slug]' },
      'infos-pratiques': { en: '/visitor-info' },
      'billetterie': { en: '/tickets' },
      'billetterie-confirmation': { en: '/tickets/confirmation' },
      'connexion': { en: '/login' },
      'inscription': { en: '/sign-up' },
      'legal-mentions-legales': { en: '/legal/legal-notice' },
      'legal-cgv': { en: '/legal/terms' },
      'legal-confidentialite': { en: '/legal/privacy' },
      'compte': { en: '/account' },
      'compte-billets': { en: '/account/tickets' }
    }
  },
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
