<script setup lang="ts">
import heroImg from "../../assets/images/hero.jpg";
import SearchBox from "../SearchBox.vue";
import { ref, defineExpose } from "vue";

const searchBoxRef = ref<InstanceType<typeof SearchBox> | null>(null);

function focusSearch() {
  searchBoxRef.value?.focusSearch();
}

// expose metoden så Header kan kalla den via ref
defineExpose({ focusSearch });
</script>
<template>
  <div class="">
    <img class="h-screen w-full object-cover" :src="heroImg" />
    <div
      class="absolute inset-0 flex items-center justify-center flex-col gap-10 md:gap-15"
    >
      <SearchBox ref="searchBoxRef" />
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
