<script setup lang="ts">
import heroImg from "../assets/images/hero.jpg";
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
    <img class="h-120 w-full object-cover" :src="heroImg" />
    <div class="absolute h-120 inset-0 flex justify-center items-center">
      <Header class="self-start" @focus-search="focusSearch" />
      <SearchBox ref="searchBoxRef" />
    </div>
  </div>
  <div class="px-24 pt-12 mb-12 bg-(--color-bg-primary)">
    <h2 class="mb-8">Våra Aktiviteter</h2>
    <Gallery />
  </div>
</template>
