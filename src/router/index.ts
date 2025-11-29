import { createRouter, createWebHistory } from "vue-router";

import CartPage from "../pages/CartPage.vue";
import LandingPage from "../pages/LandingPage.vue";

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: LandingPage },
    { path: "/cart", component: CartPage },
    { path: "/booking/:id", name: "booking" },
    { path: "/experiences", name: "experiences" },
    { path: "/experience/:id", name: "experience" },
  ],
});
