<script setup lang="ts">
import { ref, computed } from 'vue';

const title = "Sky diving from the moon";
const description = "Hoppa från månen i en trycksatt hypersuit och landa i Stilla havet."
const price = 12000000;
const currency = "Kr";
const tags = ["Rökgalet", "Rymd", "Fallskärm"];

// Formulärdata
const selectedDate = ref<string | null>(null);
const people = ref<number>(1);
const ageCategory = ref<string>("vuxen");

// Minsta datum = idag
const today = new Date();
const minDateISO = today.toISOString().split("T")[0];

// Format på priset
const priceFormatted = computed(() => `${price.toLocaleString("sv-SE")} ${currency}`);

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

</script>


<template>
    <section class="flex flex-col items-center my-20 gap-6 mx-30">
        <div class="justify-self-start">
            <h1 class="text-3xl font-extrabold"> Boka din upplevelse:</h1>
        </div>
        <article class="flex flex-col gap-4 p-4 border border-zinc-500 rounded shadow-md max-w-3xl">
            <div class="flex ">
                <div class="flex w-48 h-48 shrink-0">
                    <img src="/moon.jpg" alt="Bild på månen i rymden"
                    class="w-full h-full object-cover rounded-lg"/>
                </div>
                <div class="flex flex-col gap-4 ml-3">
                    <h2 class="text-zinc-800 text-2xl font-bold"> {{  title }}</h2>
                    <div class="flex items-center gap-2 flex-wrap">
                    <p v-for="tag in tags" :key="tag"
                        class="bg-emerald-300 p-2 text-emerald-800 border border-emerald-700 rounded-md text-sm "> {{ tag }}</p>
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
                                aria-placeholder="Välj antal personer för upplevelsen" >
                            <option v-for="n in 10" :key="n" :value="n">{{ n }} person {{ n > 1 ? "er" : "" }}</option>
                        </select>

                        <label for="alderskategori" class="sr-only">Ålderskategori</label>
                        <select id="alderskategori" v-model="ageCategory" class="border p-2 rounded-md text-sm"
                                aria-label="Välj ålderskategori">
                            <option value="child">Barn (0-12)</option>
                            <option value="teen">Tonår (13-17)</option>
                            <option value="adult">Vuxen (18+)</option>
                        </select>
                    </div>
                    <button @click="addToCart" class="bg-black text-white p-3 rounded-md mt-2 w-max">Lägg till upplevelse i varukorg</button>
                </div>
            </div>
        </article>
    </section>
</template>


<style scoped>


</style>