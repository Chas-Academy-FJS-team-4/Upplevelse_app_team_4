<script setup lang="ts">
// import heroImg from "../../assets/images/hero.jpg";
// import SearchBox from "../SearchBox.vue";
// import { ref } from "vue";
import heroImg from "/HeroimgExp.png";

// const searchBoxRef = ref<InstanceType<typeof SearchBox> | null>(null);

// function focusSearch() {
//   searchBoxRef.value?.focusSearch();
// }

// expose metoden så Header kan kalla den via ref
// defineExpose({ focusSearch });
</script>
<template>
  <div class="">
    <img class="h-screen w-full object-cover object-bottom" :src="heroImg" />
    <div
      class="absolute flex justify-center items-end inset-0 mb-15 md:mb-20 md:justify-start"
    >
      <div
        class="flex flex-col gap-40 sm:gap-65 md:gap-30 items-center md:items-start"
      >
        <p
          class="mx-5 md:mx-10 text-5xl md:text-7xl leading-16 sm:leading-16 md:leading-22 text-white text-shadow-lg text-shadow-orange-950"
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
