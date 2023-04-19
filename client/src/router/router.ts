import { createRouter, createWebHistory } from 'vue-router'
import { get_cookie, remove_cookie } from "@/util/cookie";
import HomeView from '@/views/HomeView.vue'
import ProfileView from '@/views/ProfileView.vue'
import PrivacyView from '@/views/PrivacyView.vue'
import DetailsView from "@/views/DetailsView.vue";
import ShiftingsView from "@/views/ShiftingsView.vue";
import GuestsView from "@/views/GuestsView.vue";
import JoinView from "@/views/JoinView.vue";
import { store } from "@/util/store";

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
      path: '/shiftings',
      name: 'shiftings',
      component: ShiftingsView
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
  ]
})

router.beforeEach((to, from, next) => {
  if (to.path === "/logout") {
    remove_cookie("access_token");
    store.logged_in = false;
    router.go(0);
  }
  else if (get_cookie("access_token")) {
    store.update_logged_in().then(() => {
      if (!store.logged_in) {
        remove_cookie("access_token");
      }
      next()
    })
  } else {
    next()
  }
})

export default router
