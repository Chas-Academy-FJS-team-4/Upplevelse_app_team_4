<script setup>
import { ref } from "vue";
import experiencesData from "../../utils/experiences.json";

const topExperiences = ref(experiencesData.topExperineces);

// Scrollref för horisontell scroll
const carouselRef = ref(null);

// Funktioner för pilar
const scrollLeft = () => {
  if (carouselRef.value)
    carouselRef.value.scrollBy({ left: -300, behavior: "smooth" });
};

const scrollRight = () => {
  if (carouselRef.value)
    carouselRef.value.scrollBy({ left: 300, behavior: "smooth" });
};
</script>

<template>
  <div class="mx-10 lg:mx-[90px] pt-20">
    <h2 class="">Mest bokade upplevelser</h2>
  </div>

  <div class="pb-20 px-3 lg:px-[45px]">
    <div class="relative h-96 my-5 sm:mx-5">
      <!-- Fade-sidor -->
      <div
        class="absolute left-0 top-0 h-full w-20 pointer-events-none"
        style="background: linear-gradient(to right, #fffcf9, transparent)"
      ></div>

      <div
        class="absolute right-0 top-0 h-full w-40 pointer-events-none"
        style="background: linear-gradient(to left, #fffcf9, transparent)"
      ></div>

      <!-- Vänster pil -->
      <button
        @click="scrollLeft"
        class="absolute left-0 top-1/2 -translate-y-1/2 bg-white shadow-md border-[0.5px] border-gray-100 z-10 opacity-90 hover:opacity-70 w-10 flex justify-center items-center"
      >
        <svg
          width="40px"
          height="40px"
          viewBox="0 0 24.00 24.00"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          stroke="#000"
          stroke-width="0"
        >
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            <path
              d="M14.2893 5.70708C13.8988 5.31655 13.2657 5.31655 12.8751 5.70708L7.98768 10.5993C7.20729 11.3805 7.2076 12.6463 7.98837 13.427L12.8787 18.3174C13.2693 18.7079 13.9024 18.7079 14.293 18.3174C14.6835 17.9269 14.6835 17.2937 14.293 16.9032L10.1073 12.7175C9.71678 12.327 9.71678 11.6939 10.1073 11.3033L14.2893 7.12129C14.6799 6.73077 14.6799 6.0976 14.2893 5.70708Z"
              fill="#fb965f"
            ></path>
          </g>
        </svg>
      </button>

      <!-- Carousel -->
      <div
        ref="carouselRef"
        class="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-hide h-full mr-6"
      >
        <div
          v-for="(exp, index) in topExperiences"
          :key="exp.id"
          class="shrink-0 w-72 snap-start flex flex-col h-full"
        >
          <div class="flex items-center">
            <div class="text-8xl font-bold text-(--color-primary-light) pl-5">
              {{ index + 1 }}
            </div>

            <div
              class="flex-1 rounded-lg shadow-md border-[0.5px] border-gray-300 p-4 flex flex-col h-86 cursor-pointer bg-white transform duration-300 hover:shadow-xl"
            >
              <div class="w-full h-38 mb-2">
                <img
                  :src="exp.image"
                  alt=""
                  class="w-full h-38 object-cover rounded-t-lg mb-2"
                />
              </div>

              <h4 class="mb-1">{{ exp.title }}</h4>
              <p class="text-gray-600 text-sm h-full line-clamp-4">
                {{ exp.description }}
              </p>
              <router-link
                class="text-right text-xs text-(--color-accent-light) hover:text-(--color-accent)"
                :to="{ name: 'experience', params: { id: exp.id } }"
                >Läs mer...</router-link
              >

              <!-- <a
                class="text-right text-xs text-(--color-accent-light) hover:text-(--color-accent)"
                href="#"
                >Läs mer...</a
              > -->
            </div>
          </div>
        </div>
      </div>

      <!-- Höger pil -->
      <button
        @click="scrollRight"
        class="absolute right-0 top-1/2 -translate-y-1/2 bg-white shadow-md border-[0.5px] border-gray-100 z-10 opacity-90 hover:opacity-70 w-10 flex justify-center items-center"
      >
        <svg
          width="40px"
          height="40px"
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
              d="M9.71069 18.2929C10.1012 18.6834 10.7344 18.6834 11.1249 18.2929L16.0123 13.4006C16.7927 12.6195 16.7924 11.3537 16.0117 10.5729L11.1213 5.68254C10.7308 5.29202 10.0976 5.29202 9.70708 5.68254C9.31655 6.07307 9.31655 6.70623 9.70708 7.09676L13.8927 11.2824C14.2833 11.6729 14.2833 12.3061 13.8927 12.6966L9.71069 16.8787C9.32016 17.2692 9.32016 17.9023 9.71069 18.2929Z"
              fill="#fb965f"
            ></path>
          </g>
        </svg>
      </button>
    </div>
  </div>
</template>

<style>
/* Tailwind scroll snap + dölja scrollbar */
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
