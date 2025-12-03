<script setup lang="ts">
import type { ExperienceType } from "../../types/ExperienceType";

const { exp } = defineProps<{
  exp: ExperienceType;
}>();
</script>

<template>
   <router-link
      class="text-right text-xs text-(--color-accent-light) hover:text-(--color-accent)"
      :to="{ name: 'experience', params: { id: exp.id } }"
      >
  <div
    class="flex-1 rounded-lg shadow-md border-[0.5px] border-gray-300 p-4 flex flex-col h-86 cursor-pointer bg-white transform duration-300 hover:shadow-[0_0_10px_rgba(255,165,100)]"
  >
    <div class="w-full h-42 mb-2 ">
      <img
        :src="exp.image"
        :alt="exp.title"
        class="w-full h-full object-cover rounded-t-lg mb-2"
      />
    </div>

    <h4 class="text-center mb-1 text-fuchsia-800">{{ exp.title }}</h4>
    <p class="text-start text-gray-600 text-sm h-full line-clamp-4">
      {{ exp.description }}
    </p>
  </div>
  </router-link
   >
</template>
