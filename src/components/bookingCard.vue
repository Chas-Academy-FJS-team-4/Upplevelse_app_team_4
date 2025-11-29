<script setup lang="ts">
import { computed } from 'vue';
import { useBookingStore } from '../stores/bookingStore';
import type { Addon } from '../stores/bookingStore';
import Addons from './addons/Addons.vue';

const title = "Sky diving from the moon";
const description = "Hoppa från månen i en trycksatt hypersuit och landa i Stilla havet."
const price = 12000000;
const currency = "Kr";
const tags = ["Rökgalet", "Rymd", "Fallskärm"];

const store = useBookingStore();

// Minsta datum = idag
const today = new Date();
const minDateISO = today.toISOString().split("T")[0];

// Format på priset
const priceFormatted = computed(() => `${price.toLocaleString("sv-SE")} ${currency}`);

// Computed bindings mot pinia-store så ändringar sparas centralt
const selectedDate = computed({
    get: () => store.date,
    set: (v: string | null) => store.setDate(v)
});
const people = computed({
    get: () => store.people,
    set: (n: number) => store.updatePeople(n)
});
const ageCategory = computed({
    get: () => store.ageCategory,
    set: (c: string) => store.setAgeCategory(c)
});

// Emit för att skicka till parent (lägga i varukorg)
const emit = defineEmits<{
    (e: "add-to-cart", payload: { date: string | null; people: number; ageCategory: string}): void
}>();

function addToCart() {
    emit("add-to-cart", {
        date: selectedDate.value,
        people: people.value,
        ageCategory: ageCategory.value
    });
}

function formatAddonPrice(addon: Addon) {
    if(addon.priceType === 'fixed') {
        return `${addon.priceValue} Kr`;
    } else if (addon.priceType === 'percentage') {
        return `${addon.priceValue} %`;
    } else {
        return `${(addon.priceValue as any).min} - ${(addon.priceValue as any).max} Kr`;
    }

}

</script>


<template>
    <section class="flex flex-col items-center md:items-start mt-20 gap-6 max-w-3xl mx-10 sm:mx-auto">
        <h1 class="text-3xl font-bold "> Boka din upplevelse:</h1>
        <article class="flex flex-col gap-4 p-4 border border-zinc-500 rounded shadow-xl max-w-3xl">
            <div class="flex flex-col md:flex-row gap-3">
                <div class="flex md:w-1/2 shrink-0 h-96 md:h-auto ">
                    <img src="../assets/experiences/1.png" alt="Bild på månen i rymden"
                    class="w-full max-h-[90vh] object-cover rounded-lg md:bg-fixed"/>
                </div>
                <div class="flex flex-col gap-4 ml-3 justify-center">
                    <h2 class="text-zinc-800 text-2xl font-bold"> {{  title }}</h2>
                    <div class="flex items-center gap-2 flex-wrap">
                    <p v-for="tag in tags" :key="tag"
                        class="bg-orange-300 p-2 border border-orange-600 rounded-xl text-xs "> {{ tag }}</p>
                    </div>
                    <p class="text-black font-extrabold text-lg">{{ priceFormatted }} </p>
                    <p class="text-zinc-600"> {{  description }}</p>
                    <div class="flex gap-4 items-center flex-wrap">
                        <label for="datum" class="sr-only">Datum</label>
                        <input id="datum" type="date" :min="minDateISO" v-model="selectedDate"
                            class="border p-2 rounded-md text-sm"
                            aria-label="Välj Datum för upplevelsen" />

                        <label for="personer" class="sr-only">Antal personer</label>
                        <select id="personer" v-model="people" class="border p-2 rounded-md text-sm "
                                aria-label="Välj antal personer för upplevelsen" >
                            <option v-for="n in 10" :key="n" :value="n">{{ n }} person{{ n > 1 ? "er" : "" }}</option>
                        </select>

                        <label for="alderskategori" class="sr-only">Ålderskategori</label>
                        <select id="alderskategori" v-model="ageCategory" class="border p-2 rounded-md text-sm"
                                aria-label="Välj ålderskategori">
                            <option value="child">Barn (0-12)</option>
                            <option value="teen">Tonår (13-17)</option>
                            <option value="adult">Vuxen (18+)</option>
                        </select>
                    </div>

                    <div class="mt-3">
                        <h3 class="font-semibold">Valda tillval</h3>
                        <ul class="mt-2 space-y-2">
                            <li v-for="a in store.addons" :key="a.id" class="flex justify-between items-center bg-gray-50 p-2 rounded">
                                <div>
                                    <div class="font-medium">{{ a.title }}</div>
                                    <div class="text-xs text-zinc-500">{{ formatAddonPrice(a) }}</div>
                                </div>
                                <button @click="store.removeAddon(a.id)"
                                    class="text-sm text-red-600">Ta bort</button>
                            </li>
                            <li v-if="store.addons.length === 0"
                                class="text-sm text-zinc-500">Inga tillval valda</li>
                        </ul>
                    </div>

                    <div class="mt-3 flex flex-col gap-2">
                        <div class="flex justify-between text-sm">
                            <span>Upplevelse ({{ people }} personer)</span>
                            <span class="font-semibold">{{ (store.totalExperiencePrice).toLocaleString('sv-SE') }} {{ currency }}</span>
                        </div>
                        <div class="flex justify-between text-sm">
                            <span>Tillval</span>
                            <span class="font-semibold">{{ (store.addonsTotal).toLocaleString('sv-SE')}} {{ currency }}</span>
                        </div>
                        <div class="flex justify-between text-lg font-bold border-t pt-2 mt-2">
                            <span>Totalt</span>
                            <span>{{ (store.totalPrice).toLocaleString('sv-SE') }} {{ currency }}</span>
                        </div>
                    </div>
                    <button @click="addToCart" class="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md mt-2 w-max self-center">Lägg till upplevelse i varukorg</button>
                </div>
            </div>
        </article>
    </section>
    <section class="mx-10 mb-20 mt-10">
    <Addons />
    </section>
</template>


<style scoped>


</style>