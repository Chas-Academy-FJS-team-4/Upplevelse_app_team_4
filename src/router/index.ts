import { createRouter, createWebHistory } from "vue-router";
import CartPage from "../pages/CartPage.vue";
import LandingPage from "../pages/LandingPage.vue";
import ExperiencePage from "../pages/ExperiencePage.vue";
import BookingPage from "../pages/BookingPage.vue";
import BookingConfirmationPage from "../pages/BookingConfirmationPage.vue";

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: LandingPage },
    { path: "/cart", component: CartPage },
    { path: "/booking", name: "booking", component: BookingPage },
    { path: "/booking-confirmation", name: "booking-confirmation", component: BookingConfirmationPage },
    { path: "/experiences", name: "experiences", component: ExperiencePage },
    { path: "/experience/:id", name: "experience" },
  ],
});
