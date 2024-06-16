// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,
  app: {
    meta: {
      title: 'Αντάλλαξέ το',
    },
    head: {
      script: [
        {
          crossorigin: "anonymous",
          async:true,
          src:"https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5907299200218208"
        }
      ],
    },
  },
  modules: [
    '@nuxt/image',
  ],
  devtools: { enabled: true },
  runtimeConfig: {
    // The private keys which are only available server-side
    apiSecret: process.env.API_URL,
    // Keys within public are also exposed client-side
    apiUrl: process.env.API_URL+'/api',
    storageUrl: process.env.API_URL+'/storage',
    backendBasePath: process.env.API_URL,
    public: {
      googleApiKey :process.env.GOOGLE_MAPS_API_KEY
    }
  },
  nitro: {
    routeRules: {
      '/api/updateProfileImage/**': { 
        proxy: `${process.env.API_URL}/api/profile/**`,
      },
      '/api/sendMessage': { 
        proxy: `${process.env.API_URL}/api/sendMessage`,
      },
      '/api/readMessage/**': { 
        proxy: `${process.env.API_URL}/api/readMessage/**`,
      },
      '/api/postStore/**': { 
        proxy: `${process.env.API_URL}/api/p/store/**`,
      },
      '/api/postUpdate/**': { 
        proxy: `${process.env.API_URL}/api/p/**`,
      },
      '/api/user-verificate/**': { 
        proxy: `${process.env.API_URL}/api/user-verificate/**`,
      },
    }
  },
  plugins: [
    '~/plugins/VueViewer.ts',
    { src: "~/plugins/google-autocomplete.js", ssr: false } 
  ],
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