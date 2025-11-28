<script setup>
import { ref } from "vue";
import experiencesData from "../../utils/experiences.json";
import heroImg from "../../assets/images/hero.jpg";
import arrowImg from "../../assets/icons/arrow-back-ios-new-rounded.svg";

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
  <div class="mx-10 lg:mx-[90px] pt-20 mb-7">
    <h2 class="">Mest bokade upplevelser</h2>
  </div>

  <div class="pb-25 px-3 lg:px-[45px]">
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
        class="absolute left-0 top-1/2 -translate-y-1/2 bg-white/80 p-2 shadow-md z-10 hover:bg-white w-10"
      >
        <img :src="arrowImg" alt="" />
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
            <div class="text-8xl font-bold text-purple-600 pl-5">
              {{ index + 1 }}
            </div>

            <div
              class="flex-1 rounded-lg shadow-md p-4 flex flex-col h-86 overflow-hidden cursor-pointer bg-white transform duration-300 hover:shadow-xl"
            >
              <img
                :src="heroImg"
                alt=""
                class="w-full h-40 object-cover rounded-t-lg mb-2"
              />
              <h4 class="mb-1">{{ exp.title }}</h4>
              <p class="text-gray-600 text-sm line-clamp-3 h-full">
                {{ exp.description }}
              </p>
              <a
                class="text-right text-xs text-gray-600 hover:text-purple-800"
                href="#"
                >Läs mer...</a
              >
            </div>
          </div>
        </div>
      </div>

      <!-- Höger pil -->
      <button
        @click="scrollRight"
        class="absolute right-0 top-1/2 -translate-y-1/2 bg-white/80 p-2 shadow-md z-10 hover:bg-white w-10"
      >
        <img :src="arrowImg" alt="" class="scale-x-[-1]" />
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
