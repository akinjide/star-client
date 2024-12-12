import { nextTick } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'

import { useAuthStore } from '@/stores/auth'

const routes = [
  {
    path: '/',
    name: 'login',
    component: () => import('../views/LoginView.vue'),
    meta: {
      title: 'Star - Login'
    }
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('../views/DashboardView.vue'),
    meta: {
      title: 'Star - Dashboard',
      requiresAuth: true
    },
    children: [
      // Student
      {
        path: '',
        name: 'home',
        component: () => import('../views/HomeView.vue')
      },
      {
        path: 'projects',
        name: 'projects',
        component: () => import('../views/student/ProjectView.vue'),
        meta: {
          title: 'Star - Project',
          requiresAuth: true,
          requireAdmin: false
        }
      },
      {
        path: 'tasks',
        name: 'tasks',
        component: () => import('../views/student/TaskView.vue'),
        meta: {
          title: 'Star - Tasks',
          requiresAuth: true,
          requireAdmin: false
        }
      },
      {
        path: 'reports',
        name: 'reports',
        component: () => import('../views/student/ReportView.vue'),
        meta: {
          title: 'Star - Reports',
          requiresAuth: true,
          requireAdmin: false
        }
      },
      {
        path: 'community',
        name: 'community',
        component: () => import('../views/CommunityView.vue'),
        meta: {
          title: 'Star - Community',
          requiresAuth: true,
          requireAdmin: false
        }
      },
      {
        path: 'evaluations',
        name: 'evaluations',
        component: () => import('../views/EvaluationView.vue'),
        meta: {
          title: 'Star - Evaluations',
          requiresAuth: true
        }
      },

      // Admin
      {
        path: 'users',
        name: 'user management',
        component: () => import('../views/admin/UserView.vue'),
        meta: {
          title: 'Star - Users',
          requiresAuth: true,
          requireAdmin: true
        }
      },
      {
        path: 'team',
        name: 'team management',
        component: () => import('../views/admin/TeamView.vue'),
        meta: {
          title: 'Star - Team',
          requiresAuth: true,
          requireAdmin: true
        }
      },
      {
        path: 'projects',
        name: 'project management',
        component: () => import('../views/admin/ProjectView.vue'),
        meta: {
          title: 'Star - Projects',
          requiresAuth: true,
          requireAdmin: true
        }
      },
      {
        path: 'documentation',
        name: 'documentation management',
        component: () => import('../views/admin/DocumentationView.vue'),
        meta: {
          title: 'Star - Documentation',
          requiresAuth: true,
          requireAdmin: true
        }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from) => {
  const authStore = useAuthStore()

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    if (to.meta.requireAdmin && !authStore.isAdmin) {
      // return user back to previous page
      // return {
      //   path: '/',
      //   // save the location we were at to come back later
      //   query: {
      //     redirect: to.fullPath
      //   }
      // }
    }

    return {
      path: '/',
      // save the location we were at to come back later
      query: {
        redirect: to.fullPath
      }
    }
  }

  if (to.path === '/' && authStore.isAuthenticated) {
    return {
      path: '/dashboard'
    }
  }
})

router.afterEach((to) => {
  nextTick(() => {
    document.title = to.meta.title || 'Star'
  })
})

export default router
