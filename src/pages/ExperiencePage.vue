<script setup lang="ts">
import heroImg from "../assets/images/hero.jpg";
import SearchBox from "../components/SearchBox.vue";
import Header from "../components/layout/Header.vue";
import Gallery from "../components/experiencePage/ExperienceGallery.vue";
import goBackButton from "../components/common/goBackButton.vue";
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
    <div class="absolute h-90 inset-0 flex justify-center items-center">
      <Header class="self-start" @focus-search="focusSearch" />
      <SearchBox ref="searchBoxRef" />
    </div>
  </div>
  <div class="bg-(--color-bg-primary) pt-10 max-w-5xl m-auto">
    <goBackButton/>
    <h2 class="mb-8 mt-4">Våra Aktiviteter</h2>
    <Gallery />
  </div>
</template>
