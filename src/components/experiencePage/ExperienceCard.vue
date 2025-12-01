<script setup lang="ts">
interface Activities {
  image: string;
  description: string;
  title: string;
}

const props = defineProps<{
  activity: Activities;
}>();

const { image, title, description } = props.activity;
</script>
<template>
  <div class="max-w-72 p-5 shadow-xl rounded-2xl group">
    <div class="overflow-hidden w-full h-52">
      <img
        class="object-cover rounded-md w-full h-full transition-transform duration-300 group-hover:scale-110"
        :src="image"
        :alt="title"
      />
    </div>
    <div class="mt-4">
      <span class="text-xl font-extrabold">{{ title }}</span>
      <p class="mt-2">{{ description }}</p>
    </div>
  </div>
</template>
