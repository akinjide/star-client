import { nextTick } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'

import { useAuthStore } from '@/stores/auth'

const routes = [
  {
    path: '/',
    name: 'login',
    component: () => import('../views/common/LoginView.vue'),
    meta: {
      title: 'Star - Login'
    }
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('../views/common/DashboardView.vue'),
    meta: {
      title: 'Star - Dashboard',
      requiresAuth: true
    },
    children: [
      // Student
      {
        path: '',
        name: 'home',
        component: () => import('../views/common/HomeView.vue')
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
        component: () => import('../views/student/CommunityView.vue'),
        meta: {
          title: 'Star - Community',
          requiresAuth: true,
          requireAdmin: false
        }
      },
      {
        path: 'evaluations',
        name: 'evaluations',
        component: () => import('../views/common/EvaluationView.vue'),
        meta: {
          title: 'Star - Evaluations',
          requiresAuth: true,
          requireAdmin: false
        }
      },

      // Admin
      {
        path: 'manage/users',
        name: 'user_management',
        component: () => import('../views/administrator/UserView.vue'),
        meta: {
          title: 'Star - Manage Users',
          requiresAuth: true,
          requireAdmin: true
        }
      },
      {
        path: 'manage/team',
        name: 'team_management',
        component: () => import('../views/administrator/TeamView.vue'),
        meta: {
          title: 'Star - Manage Teams',
          requiresAuth: true,
          requireAdmin: true
        }
      },
      {
        path: 'manage/projects',
        name: 'project_management',
        component: () => import('../views/administrator/ProjectView.vue'),
        meta: {
          title: 'Star - Manage Projects',
          requiresAuth: true,
          requireAdmin: true
        }
      },
      {
        path: 'manage/documentation',
        name: 'documentation',
        component: () => import('../views/administrator/DocumentationView.vue'),
        meta: {
          title: 'Star - Manage Documentation',
          requiresAuth: true,
          requireAdmin: true
        }
      }
    ]
  },

  {
    path: '/home',
    name: 'home_management',
    component: () => import('../views/administrator/HomeView.vue'),
    meta: {
      title: 'Star - Home',
      requiresAuth: true,
      requireAdmin: true
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from) => {
  const authStore = useAuthStore()

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    return {
      path: '/',
      query: {
        redirect: to.fullPath
      }
    }
  }

  if (authStore.isAuthenticated && to.meta.requireAdmin && !authStore.isAdmin) {
    return {
      path: '/dashboard'
    }
  }

  if (to.path === '/' && authStore.isAuthenticated) {
    if (authStore.isAdmin) {
      return {
        path: '/home'
      }
    }

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
