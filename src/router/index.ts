import { createRouter, createWebHistory } from "vue-router";

import CartPage from "../pages/CartPage.vue";
import LandingPage from "../pages/LandingPage.vue";

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/cart", component: CartPage },
    { path: "/", component: LandingPage },
  ],
});
