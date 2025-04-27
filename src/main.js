import { createApp } from 'vue'
import './style.css'
import '@mdi/font/css/materialdesignicons.css'
import "@flaticon/flaticon-uicons/css/all/all.css";

import App from './App.vue'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
    components,
    directives,
  })

//註冊 pinia
import { createPinia } from 'pinia'
const pinia = createPinia()


createApp(App).use(vuetify).use(pinia).mount('#app')
