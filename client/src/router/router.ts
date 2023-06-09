import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import ProfileView from '@/views/ProfileView.vue'
import PrivacyView from '@/views/PrivacyView.vue'
import DetailsView from '@/views/DetailsView.vue'
import ShiftsView from '@/views/ShiftsView.vue'
import GuestsView from '@/views/GuestsView.vue'
import JoinView from '@/views/JoinView.vue'
import { log_out } from '@/util/graphql'
import AdminView from '@/views/AdminView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/details',
      name: 'details',
      component: DetailsView
    },
    {
      path: '/shifts',
      name: 'shifts',
      component: ShiftsView
    },
    {
      path: '/guests',
      name: 'guests',
      component: GuestsView
    },
    {
      path: '/join',
      name: 'join',
      component: JoinView
    },
    {
      path: '/profile/:challenge?',
      name: 'profile',
      component: ProfileView
    },
    {
      path: '/privacy',
      name: 'privacy',
      component: PrivacyView
    },
    {
      path: '/admin/:tab?',
      name: 'admin',
      component: AdminView
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.path === '/logout') {
    log_out()
    return router.push('/')
  } else {
    return next()
  }
})

export default router
