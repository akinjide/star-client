import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import StudentView from '../views/Student/StudentView.vue'
import AdminView from '@/views/Admin/AdminView.vue'
import AdminDashboard from '@/views/Admin/AdminDashboard.vue'

const routes = [
  {
    path: '/',
    name: 'login',
    component: LoginView,
    title: 'Login'
  },
  {
    path: '/studentDashboard',
    name: 'studentDashboard',
    component: StudentView
  },
  {
    path: '/Admin',
    name: 'AdminView',
    component: AdminView
  },

  {
    path: '/AdminDashboard',
    name: 'AdminDashboard',
    component: AdminDashboard
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
