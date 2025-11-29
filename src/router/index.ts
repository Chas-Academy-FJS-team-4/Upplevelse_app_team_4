import { createRouter, createWebHistory } from "vue-router";

import CartPage from "../pages/CartPage.vue";
import LandingPage from "../pages/LandingPage.vue";
import BookingPage from "../pages/BookingPage.vue";

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: LandingPage },
    { path: "/cart", component: CartPage },
    //  TODO :/id på booking sen
    { path: "/booking", name: "booking", component: BookingPage },
    { path: "/experiences", name: "experiences" },
    { path: "/experience/:id", name: "experience" },
  ],
});
