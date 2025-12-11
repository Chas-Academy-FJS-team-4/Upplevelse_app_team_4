<script setup lang="ts">
// import heroImg from "../assets/images/hero.jpg";
import heroImg from "/HeroimgExp.png";
import SearchBox from "../components/SearchBox.vue";
import Header from "../components/layout/Header.vue";
import Gallery from "../components/experiencePage/ExperienceGallery.vue";
import { ref } from "vue";

const searchBoxRef = ref<InstanceType<typeof SearchBox> | null>(null);

function focusSearch() {
  searchBoxRef.value?.focusSearch();
}

defineExpose({ focusSearch });
</script>

<template>
  <div class="">
    <img class="h-90 w-full object-cover" :src="heroImg" />
    <div class="absolute h-105 inset-0 flex justify-center items-center">
      <Header class="self-start" @focus-search="focusSearch" />
      <SearchBox ref="searchBoxRef" />
    </div>
  </div>
  <div class="bg-(--color-bg-primary) pt-10 mx-10 md:mx10 max-w-5xl lg:m-auto">
    <h2 class="mb-8">Våra Aktiviteter</h2>
    <Gallery />
  </div>
</template>
