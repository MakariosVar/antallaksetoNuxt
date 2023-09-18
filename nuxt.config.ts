// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  runtimeConfig: {
    // The private keys which are only available server-side
    apiSecret: 'https://antallakseto.gr',
    // Keys within public are also exposed client-side
    public: {
      apiBase: '/api'
    }
  },
  css: [
    "bootstrap/dist/css/bootstrap.min.css",
    "~/assets/styles/main.scss",
    '@fortawesome/fontawesome-svg-core/styles.css'
  ],
  script: [
    {
      src: 'bootstrap/dist/js/bootstrap.bundle.min.js'
    }
  ],
  vite: {
    define: {
      'process.env.DEBUG': true,
    },
  },
  routeRules: {
    '/': { redirect: '/home' },
  },
})
