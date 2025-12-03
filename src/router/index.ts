import { createRouter, createWebHistory } from "vue-router";
import CartPage from "../pages/CartPage.vue";
import LandingPage from "../pages/LandingPage.vue";
import ExperiencePage from "../pages/ExperiencePage.vue";
import ExperienceId from "../pages/ExperienceIDpage.vue";
import BookingPage from "../pages/BookingPage.vue";
import BookingConfirmationPage from "../pages/BookingConfirmationPage.vue";

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: LandingPage },
    { path: "/cart", component: CartPage },
    { path: "/booking-confirmation", name: "booking-confirmation", component: BookingConfirmationPage },
    { path: "/booking/:id", name: "booking", component: BookingPage },
    { path: "/experiences", name: "experiences", component: ExperiencePage },
    { path: "/experience/:id", name: "experience", component: ExperienceId },
  ],
});
