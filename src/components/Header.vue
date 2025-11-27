<script setup>
import { ref } from "vue";
import SearchBox from "./SearchBox.vue";

const searchBoxRef = ref(null);

function focusOnSearch() {
  searchBoxRef.value?.focusSearch();
}
</script>
<template>
  <header
    class="absolute w-full bg-purple-900/40 flex flex-row justify-between items-center p-5 text-white"
  >
    <h1 class="text-2xl">WildX</h1>
    <ul class="flex flex-row sm:gap-10 gap-3 text-sm sm:textmd">
      <li>Våra upplevelser</li>
      <li @click="focusOnSearch">Sök</li>
      <li>Kundkorg</li>
    </ul>
  </header>

  <SearchBox ref="searchBoxRef" />
</template>
