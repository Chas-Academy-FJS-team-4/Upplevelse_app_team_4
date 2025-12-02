<script setup lang="ts">
import { computed, ref } from "vue";
import ExperienceCard from "../common/ExperienceCard.vue";
import experiencesData from "../../utils/experiences.json";

const topExperiences = computed(() =>
  experiencesData.filter((exp) => exp.isTop === true)
);

// Scrollref för horisontell scroll
const carouselRef = ref<HTMLElement | null>(null);

// Funktioner för pilar
const scrollLeft = () => {
  if (carouselRef.value)
    carouselRef.value.scrollBy({ left: -350, behavior: "smooth" });
};

const scrollRight = () => {
  if (carouselRef.value)
    carouselRef.value.scrollBy({ left: 350, behavior: "smooth" });
};
</script>

<template>
  <div class="max-w-5xl mx-10 lg:mx-auto pt-20">
    <h2 class="">Mest bokade upplevelser</h2>
  </div>

  <div class="pb-20 px-0 lg:px-0 max-w-7xl mx-0 lg:mx-auto">
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
        class="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-hide h-full ml-5 mr-10"
      >
        <div
          v-for="(exp, index) in topExperiences"
          :key="exp.id"
          class="shrink-0 w-80 snap-start flex flex-col h-full"
        >
          <div class="flex items-center">
            <div class="text-9xl font-bold text-(--color-primary-light) pl-3">
              {{ index + 1 }}
            </div>
            <ExperienceCard :exp="exp" />
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
