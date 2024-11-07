import { createApp } from 'vue'
import { createPinia } from 'pinia'
import VCalendar from 'v-calendar'
import 'v-calendar/style.css'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'

loadFonts()

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(vuetify)
app.use(VCalendar, {})
app.mount('#app')
