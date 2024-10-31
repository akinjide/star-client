import { createRouter, createWebHistory } from 'vue-router'

import { useAuthStore } from '@/stores/auth'
import LoginView from '../views/LoginView.vue'
import StudentView from '../views/StudentView.vue'

const routes = [
  {
    path: '/',
    name: 'login',
    component: LoginView,
    meta: {
      title: 'Star - Login'
    }
  },
  {
    path: '/student',
    name: 'studentDashboard',
    component: StudentView,
    meta: {
      title: 'Star - Dashboard | Student',
      requiresAuth: true
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to) => {
  const authStore = useAuthStore()

  if (to.meta.requiresAuth && !authStore.isLoggedIn) return '/'
})

export default router
