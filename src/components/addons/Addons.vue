<script setup lang="ts">
import { ref, onMounted } from 'vue';
import AddonsCard from './AddonsCard.vue';
import BaseModal from '../BaseModal.vue';
import addonsJson from "../../utils/addons.json";
import { useBookingStore } from '../../stores/bookingStore';

interface RawAddon {
    id: number;
    title: string;
    description: string;
    image: string;
    priceType: string;
    priceValue: any;
}

interface ResolvedAddon extends RawAddon {
    imageUrl: string;
}

const store = useBookingStore();

const addons = ref<ResolvedAddon[]>([]);
const activeAddon = ref<ResolvedAddon | null>(null);

// Ladda in JSON data
onMounted(() => {
    addons.value = (addonsJson.addons as RawAddon[]).map(a => {
        const imageUrl = new URL(`../../assets/addons/${a.image}`, import.meta.url).href;
        return { ...a, imageUrl } as ResolvedAddon;
    })
});

function openModal(addon: ResolvedAddon) {
    activeAddon.value = addon;
};

function closeModal() {
    activeAddon.value = null;
};

function addActiveAddonToBooking() {
    if(!activeAddon.value) return;
    store.addAddon({
        id: activeAddon.value.id,
        title: activeAddon.value.title,
        description: activeAddon.value.description,
        image: activeAddon.value.imageUrl,
        priceType: activeAddon.value.priceType as any,
        priceValue: activeAddon.value.priceValue
    });
    closeModal();
}

</script>


<template>
<section class="max-w-5xl mx-auto">
    <h2 class="text-2xl font-bold mb-4">Paket & tillval</h2>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <AddonsCard 
            v-for="addon in addons"
            :key="addon.id"
            :addon="addon"
            @read-more="openModal"/>
    </div>

    <BaseModal v-if="activeAddon" showClose @close="closeModal">
        <div class="flex flex-col md:flex-row gap-4">
            <img
                v-if="activeAddon.imageUrl"
                :src="activeAddon.imageUrl"
                alt="Addon bild"
                class="w-full md:w-1/2 object-cover md:object-contain max-h-60 md:max-h-80 rounded-md mx-auto"/>
            <div class="flex flex-col gap-3 items-center justify-center">
                <h2 class="text-xl font-bold mb-3">{{ activeAddon.title }}</h2>
                <p class="text-gray-700 mb-4">{{ activeAddon.description }}</p>
                <div class="text-sm text-gray-500 mb-6 self-center">
                    <p v-if="activeAddon.priceType === 'fixed'">
                        Pris: {{ activeAddon.priceValue }} Kr
                    </p>
                    <p v-else-if="activeAddon.priceType === 'percentage'">
                        Pris: {{ activeAddon.priceValue }} % på upplevelsepriset
                    </p>
                    <p v-else-if="activeAddon.priceType === 'range'">
                        Pris: {{ activeAddon.priceValue.min }} - {{ activeAddon.priceValue.max }} Kr
                    </p>
                </div>
            <div class="flex gap-3 justify-center">
                <button @click="addActiveAddonToBooking"
                    class="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md">
                    Lägg till paket till upplevelsen
                </button>
                <button @click="closeModal" class="bg-gray-100 px-4 py-2 rounded-md">Stäng</button>
            </div>
            </div>
        </div>
    </BaseModal>
</section>


</template>