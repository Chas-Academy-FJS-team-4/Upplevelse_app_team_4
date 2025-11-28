<script setup lang="ts">
import { ref, onMounted } from 'vue';
import AddonsCard from './AddonsCard.vue';
import BaseModal from '../BaseModal.vue';
import addonsJson from "../../utils/addons.json";

interface Addon {
    id: number;
    title: string;
    description: string;
    priceType: string;
    priceValue: any;
}

const addons = ref<Addon[]>([]);
const activeAddon = ref<Addon | null>(null);

// Ladda in JSON data
onMounted(() => {
    addons.value = addonsJson.addons;
});

function openModal(addon: Addon) {
    activeAddon.value = addon;
};

function closeModal() {
    activeAddon.value = null;
};

</script>


<template>
<section class="max-w-5xl mx-auto mt-10">
    <h2 class="text-2xl font-bold mb-4">Paket & tillval</h2>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <AddonsCard 
            v-for="addon in addons"
            :key="addon.id"
            :addon="addon"
            @read-more="openModal"/>
    </div>

    <BaseModal v-if="activeAddon" showClose @close="closeModal">
        <h2 class="text-xl font-bold mb-3">{{ activeAddon.title }}</h2>
        <p class="text-gray-700 mb-4">{{ activeAddon.description }}</p>
        <div class="text-sm text-gray-500 mb-6">
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

        <button class="bg-black text-white px-4 py-2 rounded-md">
            Lägg till paket till upplevelsen
        </button>
    </BaseModal>
</section>


</template>