<script setup>
import heroImg from "../assets/images/hero.jpg";
import SearchBar from "./SearchBox.vue";
</script>
<template>
  <div class="">
    <img class="h-screen w-full object-cover" :src="heroImg" />
    <div
      class="absolute inset-0 flex items-center justify-center flex-col gap-10 md:gap-15"
    >
      <SearchBar />
      <div class="flex max-w-5xl w-6/7">
        <p
          class="absolute text-4xl sm:text-5xl md:text-7xl leading-12 sm:leading-16 md:leading-22 text-white text-shadow-md text-shadow-red-900"
        >
          Try the Wildest <br />
          Experiences Today!
        </p>
      </div>
    </div>
  </div>
</template>
