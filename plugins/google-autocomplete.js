import VueGoogleAutocomplete from 'vue-google-autocomplete';

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.component('vue-google-autocomplete', VueGoogleAutocomplete)
  })