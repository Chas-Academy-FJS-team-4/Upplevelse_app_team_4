import { createRouter, createWebHistory } from "vue-router";
import CartPage from "../pages/CartPage.vue";
import LandingPage from "../pages/LandingPage.vue";
import ExperiencePage from "../pages/ExperiencePage.vue";

export const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: "/", component: LandingPage },
        { path: "/cart", component: CartPage },
        { path: "/booking/:id", name: "booking" },
        { path: "/experiences", component: ExperiencePage },
        { path: "/experience/:id", name: "experience" },
    ],

});
