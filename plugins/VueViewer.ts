import { component as Viewer } from 'v-viewer'
import 'viewerjs/dist/viewer.css'
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component("viewer", Viewer);
});