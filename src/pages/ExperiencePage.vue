<script setup lang="ts">
// import heroImg from "../assets/images/hero.jpg";
import heroImg from "/HeroimgExp.png";
import SearchBox from "../components/ExperiencePage/SearchBox.vue";
import Header from "../components/Layout/Header.vue";
import Gallery from "../components/ExperiencePage/ExperienceGallery.vue";
import goBackButton from "../components/Common/GoBackButton.vue";
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useBookingStore } from "../stores/bookingStore";
import { onBeforeRouteLeave } from "vue-router";

onBeforeRouteLeave((to) => {
  // resetta INTE när vi går till experiences
  if (to.name !== "experiences") {
    store.resetBooking(true);
  }
});

const route = useRoute();
const store = useBookingStore();

// const searchBoxRef = ref<InstanceType<typeof SearchBox> | null>(null);
const experienceFilter = ref({});

function searchProps(value: object) {
  experienceFilter.value = value;
  console.log(value);
}

onMounted(() => {
  if (!route.params.id && !route.query.id) {
    store.resetBooking(true); // här är det rimligt
  }
});
</script>

<template>
  <div class="">
    <img class="h-90 w-full object-cover" :src="heroImg" />
    <div class="absolute h-90 inset-0 flex justify-center items-center">
      <Header class="self-start" />
      <SearchBox ref="searchBoxRef" @change="searchProps" />
    </div>
  </div>
  <div class="bg-(--color-bg-primary) pt-10 mx-10 max-w-5xl lg:m-auto">
    <goBackButton />
    <h2 class="mb-8">Våra Aktiviteter</h2>
    <Gallery :filter="experienceFilter" />
  </div>
</template>
