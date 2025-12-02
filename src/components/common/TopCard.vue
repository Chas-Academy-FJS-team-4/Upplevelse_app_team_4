<script setup lang="ts">
import type { ExperienceType } from "../types/ExperienceType";

const { exp } = defineProps<{
  exp: ExperienceType;
}>();
</script>

<template>
  <div
    class="flex-1 rounded-lg shadow-md border-[0.5px] border-gray-300 p-4 flex flex-col h-86 cursor-pointer bg-white transform duration-300 hover:shadow-xl"
  >
    <div class="w-full h-38 mb-2">
      <img
        :src="exp.image"
        alt=""
        class="w-full h-38 object-cover rounded-t-lg mb-2"
      />
    </div>

    <h4 class="mb-1">{{ exp.title }}</h4>
    <p class="text-gray-600 text-sm h-full line-clamp-4">
      {{ exp.description }}
    </p>
    <router-link
      class="text-right text-xs text-(--color-accent-light) hover:text-(--color-accent)"
      :to="{ name: 'experience', params: { id: exp.id } }"
      >Läs mer...</router-link
    >
  </div>
</template>
