import { createApp } from 'vue'
import { createPinia } from 'pinia'
import VCalendar from 'v-calendar'
import 'v-calendar/style.css'

import App from '@/App.vue'
import router from '@/router'
import vuetify from '@/plugins/vuetify'
import { loadFonts } from '@/plugins/webfontloader'
import timePlugin from '@/plugins/time'
import { useAuthStore, useUserStore, useMainStore } from '@/stores'

loadFonts()

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(vuetify)
app.use(timePlugin, {
  pattern: 'ddd, YYYY-MM-DD HH:mm'
})
app.use(VCalendar, {})

app.mount('#app')

const authStore = useAuthStore()
const userStore = useUserStore()
const mainStore = useMainStore()

authStore.$onAction(({ name, args, onError }) => {
  if (name === 'logout') {
    userStore.reset()
    mainStore.reset()
  }

  onError((error) => {
    console.log(error)
  })
})
