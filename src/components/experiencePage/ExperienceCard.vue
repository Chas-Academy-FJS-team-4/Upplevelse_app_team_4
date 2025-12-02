<script setup lang="ts">
interface Activities {
    image: string;
    description: string;
    title: string;
    id: Number;
}

const props = defineProps<{
  activity: Activities;
}>();

const { image, title, description } = props.activity;
</script>
<template class="group">
    <div class="max-w-62 p-5 shadow-xl rounded-2xl">
        <div class="w-full h-52 mb-2 overflow-hidden">
            <img
                :src="image"
                :alt="title"
                class="object-cover rounded-md w-full h-full"
            />
        </div>

        <h4 class="mb-1 font-extrabold">{{ title }}</h4>
        <p class="text-gray-600 text-sm h-full line-clamp-4">
            {{ description }}
        </p>

        <router-link
            class="text-right text-xs text-(--color-accent-light) hover:text-(--color-accent)"
            :to="{ name: 'experience', params: { id: id } }"
            >Läs mer...</router-link
        >
    </div>
    <div class="mt-4">
      <span class="text-xl font-extrabold">{{ title }}</span>
      <p class="mt-2">{{ description }}</p>
    </div>
  </div>
</template>
