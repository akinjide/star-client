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
    path: '/dashboard',
    name: 'dashboard',
    component: StudentView,
    meta: {
      title: 'Star - Dashboard',
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

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    return {
      path: '/login',
      // save the location we were at to come back later
      query: {
        redirect: to.fullPath
      }
    }
  }
})

export default router
