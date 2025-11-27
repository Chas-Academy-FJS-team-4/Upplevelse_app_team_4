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
    <div class="relative rounded-xl overflow-hiddenshadow-lg cursor-pointer group"></div>
    <div class="h-40 w-full bg-gray-500 bg-opacity-40 backdrop-blur-sm flex items-center justify-center text-white text-lg">
        {{ addon.title }}
    </div>
    <div class="p-4 flex flex-col gap-2">
        <h3 class="font-bold text-lg">{{ addon.title }}</h3>
        <button
            @click="emit('read-more', addon)"
            class="bg-black text-white px-3 py-1 rpunded-md self-start">
        </button>
    </div>
</template>