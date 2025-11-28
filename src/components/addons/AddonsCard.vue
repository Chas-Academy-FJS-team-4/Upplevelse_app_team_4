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
    <div class="relative rounded-md overflow-hidden shadow-lg group">
        <div class="relative h-40 w-full overflow-hidden bg-gray-300">
            <img src="../../assets/experiences/moon.jpg" alt=""
                class="absolute inset-0 w-full h-full object-cover filter blur-sm scale-105"/>
            <div class="absolute inset-0 bg-gradient-to-tr from-purple-600/20 via-orange-400/10 to-teal-400/15"></div>
            <div class="absolute inset-0 flex flex-col justify-end p-4">
                <h3 class="font-bold text-lg text-white drop-shadow-md">{{ addon.title }}</h3>
                <div class="mt-2 flex gap-2">
                    <button
                        @click="emit('read-more', addon)"
                        class="bg-white/90 text-zinc-900 px-3 py-1 rounded-md text-sm hover:scale-105 transition">
                        Läs mer
                    </button>
                    <span class="ml-auto text-xs text-white/90 bg-black/30 px-2 py-1 rounded">
                        {{ addon.priceType === 'fixed' ? (addon.priceValue + ' kr') :
                            addon.priceType === 'percentage' ? (addon.priceValue + '%') :
                            (addon.priceValue.min + ' - ' + addon.priceValue.max + ' kr') }}
                    </span>
                </div>
            </div>
        </div>
        
    </div>
</template>