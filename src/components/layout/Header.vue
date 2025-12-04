<script setup lang="ts">
import { computed } from "vue";
import { useCart } from "../../composables/useCart";
import { defineEmits } from "vue";
import { RouterLink } from "vue-router";

const emit = defineEmits<{
  (e: "focus-search"): void;
}>();

const { cartItems } = useCart();
const cartCount = computed(() => cartItems.value.length);
</script>
<template>
  <header
    class="absolute w-full bg-purple-900/40 flex flex-row justify-between items-center p-5 text-white z-100"
  >
    <h1 class="text-2xl">
      <router-link to="/">WildX</router-link>
    </h1>
    <ul
      class="flex flex-row sm:gap-8 gap-3 text-sm md:text-[0.9rem] font-semibold"
    >
      <li
        class="flex flex-row items-center justify-center pr-1 gap-1 relative after:content-[''] after:absolute after:left-0 after:h-[3px] after:w-0 after:bg-(--color-accent-dark) after:bottom-[-0.2rem] after:transition-all after:duration-300 hover:after:w-full"
        @click="emit('focus-search')"
      >
        <span class="hidden sm:flex">
          <svg
            fill="#fff"
            width="30px"
            height="30px"
            viewBox="-6 0 32 32"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              <title>space-shuttle</title>
              <path
                d="M19.36 6.6c-0.4-0.4-0.92-0.56-1.48-0.6-2.36 0-5.96 3.4-8.44 5.96l-0.24 0.28c-0.36 0.28-2.2 0.2-3.28 0.16-1.6-0.080-3.12-0.12-4.12 0.24-0.52 0.2-1.16 0.92-1.56 1.48-0.24 0.32-0.24 0.76 0.040 1.080l2.76 3.28c-0.44 0.56-0.64 1.2-0.64 1.88 0 0.56 0.16 1.12 0.44 1.6l-0.48 0.48c-0.32 0.32-0.32 0.88 0 1.2 0.16 0.16 0.4 0.24 0.6 0.24s0.44-0.080 0.6-0.24l0.48-0.48c0.48 0.28 1.040 0.44 1.6 0.44 0.68 0 1.32-0.2 1.84-0.56l3.28 2.76c0.16 0.12 0.36 0.2 0.56 0.2s0.36-0.040 0.52-0.16c0.56-0.44 1.28-1.080 1.48-1.56 0.4-0.96 0.32-2.48 0.24-4.12-0.040-1.080-0.12-2.92 0.16-3.28l0.28-0.28c2.56-2.52 5.96-6.12 5.96-8.44-0.040-0.64-0.24-1.16-0.6-1.56zM12.76 15.36l-0.28 0.28c-0.76 0.76-0.72 2.24-0.64 4.56 0.040 1.28 0.12 2.72-0.12 3.36-0.040 0.080-0.24 0.28-0.44 0.44l-3.28-2.76c-0.16-0.12-0.36-0.2-0.56-0.2-0.040 0-0.040 0-0.080 0-0.24 0-0.44 0.12-0.56 0.32-0.040 0.040-0.080 0.080-0.080 0.12-0.56 0.56-1.56 0.56-2.16 0-0.28-0.28-0.44-0.68-0.44-1.080s0.16-0.8 0.44-1.080c0.040-0.040 0.080-0.080 0.12-0.080 0.16-0.16 0.28-0.36 0.32-0.56 0-0.24-0.040-0.44-0.2-0.64l-2.76-3.28c0.2-0.2 0.36-0.36 0.44-0.44 0.64-0.24 2.080-0.2 3.36-0.12 2.32 0.080 3.8 0.12 4.56-0.64l0.28-0.28c4.64-4.76 6.52-5.44 7.24-5.48 0.2 0 0.24 0.040 0.28 0.080s0.080 0.080 0.080 0.28c-0.040 0.64-0.76 2.56-5.52 7.2z"
              ></path>
            </g>
          </svg>
        </span>
        <router-link to="/experiences">Våra upplevelser</router-link>
      </li>
      <li
        class="flex flex-row items-center justify-center gap-2 pr-1 relative after:content-[''] after:absolute after:left-0 after:h-[3px] after:w-0 after:bg-(--color-accent-dark) after:bottom-[-0.2rem] after:transition-all after:duration-300 hover:after:w-full"
      >
        <span class="hidden sm:flex"
          ><svg
            width="20px"
            height="20px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              <path
                d="M20 10L18.5145 17.4276C18.3312 18.3439 18.2396 18.8021 18.0004 19.1448C17.7894 19.447 17.499 19.685 17.1613 19.8326C16.7783 20 16.3111 20 15.3766 20H8.62337C7.6889 20 7.22166 20 6.83869 19.8326C6.50097 19.685 6.2106 19.447 5.99964 19.1448C5.76041 18.8021 5.66878 18.3439 5.48551 17.4276L4 10M20 10H18M20 10H21M4 10H3M4 10H6M6 10H18M6 10L9 4M18 10L15 4M9 13V16M12 13V16M15 13V16"
                stroke="#fff"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
            </g></svg></span>
        <router-link to="/cart">Kundkorg</router-link>
        <span v-if="cartCount > 0" class="absolute -top-2 -right-3 bg-orange-400 text-black text-xs font-bold px-2 py-0.5 rounded-full">
          {{ cartCount }}
        </span>
      </li>
    </ul>
  </header>
</template>
