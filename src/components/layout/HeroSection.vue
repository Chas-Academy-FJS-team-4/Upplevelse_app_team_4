<script setup lang="ts">
import heroImg from "/HeroimgExp.png";
</script>
<template>
  <div class="">
    <img class="h-screen w-full object-cover object-bottom" :src="heroImg" />
    <div
      class="absolute flex justify-center items-end inset-0 mb-15 md:mb-20 md:justify-start"
    >
      <div
        class="flex flex-col gap-40 sm:gap-65 md:gap-60 lg:gap-25 items-center md:items-start"
      >
        <p
          class="orbitron-hero mx-3 md:mx-10 text-5xl md:text-6xl lg:text-7xl leading-18 sm:leading-16 md:leading-24 text-white text-shadow-lg text-shadow-orange-950"
        >
          Try the Wildest <br />
          Experiences Today!
        </p>
        <div class="hover:scale-102 transition-transform ease-in-out">
          <router-link
            to="/experiences"
            class="md:mx-20 bg-linear-to-r from-black/10 via-(--color-accent)/30 to-(--color-accent)/50 border-[0.5px] text-white px-10 py-3 text-2xl font-semibold shadow-2xl rounded-2xl"
          >
            Utforska våra upplevelser
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
