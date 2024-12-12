import { createApp } from 'vue'
import { createPinia } from 'pinia'
import VCalendar from 'v-calendar'
import 'v-calendar/style.css'

import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import { useAuthStore } from '@/stores/auth'
import { useUserStore } from '@/stores/user'

loadFonts()

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(vuetify)
app.use(VCalendar, {})
app.mount('#app')

const authStore = useAuthStore()
const userStore = useUserStore()

authStore.$onAction(({ name, args, onError }) => {
  if (name === 'logout') {
    userStore.reset()
  }

  onError((error) => {
    console.log(error)
  })
})
