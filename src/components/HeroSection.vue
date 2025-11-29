<script setup>
import heroImg from "../assets/images/hero.jpg";
import SearchBar from "./SearchBox.vue";
</script>
<template>
  <section class="">
    <img class="h-screen w-full object-cover" :src="heroImg" />
    <SearchBar />
  </section>
</template>
