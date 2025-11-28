<script setup lang="ts">
    const props = defineProps<{
        addon: {
            id: number;
            title: string;
            description: string;
            priceType: string;
            priceValue: any;
        }
    }>()

    const emit = defineEmits<{
        "read-more": [any]
    }>()

</script>


<template>
    <div class="relative rounded-md overflow-hidden shadow-lg cursor-pointer group">
        <div class="h-40 w-full bg-gray-500 bg-opacity-40 backdrop-blur-sm flex items-center justify-center text-white text-lg">
            <img src="../../assets/experiences/moon.jpg" alt="">
            <div class="p-4 flex flex-col gap-2 items-center">
            <h3 class="font-bold text-lg">{{ addon.title }}</h3>
            <button
                @click="emit('read-more', addon)"
                class="bg-black text-white px-3 py-1 rounded-md self-start">
            </button>
        </div>
        </div>
        
    </div>
</template>