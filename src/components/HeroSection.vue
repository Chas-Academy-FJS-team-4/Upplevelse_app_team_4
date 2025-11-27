<script setup>
import heroImg from "../assets/images/hero.jpg";
import SearchBar from "./SearchBox.vue";
</script>
<template>
  <div class="">
    <img class="h-screen w-full object-cover" :src="heroImg" />
    <SearchBar />
  </div>
</template>
