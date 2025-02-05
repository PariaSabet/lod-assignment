import { createRouter, createWebHistory } from 'vue-router'
import DashboardHome from '@/views/DashboardHome.vue'
import UserLogin from '@/components/auth/UserLogin.vue'
import { useAuthStore } from '@/stores/auth'

const routes = [
  { path: '/', component: DashboardHome, meta: { requiresAuth: true } },
  { path: '/login', component: UserLogin },
  {
    path: '/logout',
    name: 'logout',
    component: {
      beforeRouteEnter(to, from, next) {
        const authStore = useAuthStore()
        authStore.logout()
        next('/login')
      },
    },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next('/login')
  } else {
    next()
  }
})

export default router
