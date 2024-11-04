import { nextTick } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'

import { useAuthStore } from '@/stores/auth'
import LoginView from '../views/LoginView.vue'
import DashboardView from '../views/DashboardView.vue'
import HomeView from '../views/HomeView.vue'
import ProjectView from '../views/ProjectView.vue'
import TaskView from '../views/TaskView.vue'
import ReportView from '../views/ReportView.vue'
import CommunityView from '../views/CommunityView.vue'

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
    component: DashboardView,
    meta: {
      title: 'Star - Dashboard',
      requiresAuth: true
    },
    children: [
      {
        path: '',
        name: 'home',
        component: HomeView
      },
      {
        path: 'projects',
        name: 'projects',
        component: ProjectView,
        meta: {
          title: 'Star - Project',
          requiresAuth: true
        }
      },
      {
        path: 'tasks',
        name: 'tasks',
        component: TaskView,
        meta: {
          title: 'Star - Tasks',
          requiresAuth: true
        }
      },
      {
        path: 'reports',
        name: 'reports',
        component: ReportView,
        meta: {
          title: 'Star - Reports',
          requiresAuth: true
        }
      },
      {
        path: 'community',
        name: 'community',
        component: CommunityView,
        meta: {
          title: 'Star - Community',
          requiresAuth: true
        }
      }
    ]
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

router.afterEach((to) => {
  nextTick(() => {
    document.title = to.meta.title || 'Star'
  })
})

export default router
