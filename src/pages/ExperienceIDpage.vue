<script setup lang="ts">
import Header from "../components/layout/Header.vue";
import { useRoute } from "vue-router"
import data from "../utils/experiences.json"

const route = useRoute();
const id = Number(route.params.id)
const selectedExperience = data.find(item => item.id === id)

const { title, image, location, longDescription, price} = selectedExperience!

</script>
<template>
    <div class="flex flex-col min-h-screen ">
        <div class="w-full h-140 bg-fuchsia-900">
        <Header />
        <div class="flex items-center justify-center flex-col text-center text-yellow-200 margin h-full ">
            <h1 class="text-6xl font-bold">{{title}}</h1>
            <p class="text-xl font-semibold"><span class="text-[1.1rem]">Location: </span> {{location}}</p>
        </div>
    </div>
        <div class="flex justify-center gap-28 mt-12 px-10 mb-12 ">
            <div>
                <img class="w-520 rounded-2xl h-160 object-cover" :src="image" :alt="title"/>
            </div>
            <div class="flex flex-col gap-8 justify-center w-400 h-160  ">
                <span class="text-[2.5rem] font-extrabold">{{title}}</span>
                <p class="w-100 text-[1.3rem] wrap-break-word leading-relaxed tracking-wide">{{longDescription}}</p>
                <p class="font-bold text-3xl place-self-end "> <span class="text-3xl">Price: </span>€{{price}}</p>
                <button  class="bg-amber-500  text-white px-4 py-2 rounded-md hover:bg-emerald-400 font-bold text-xl hover:scale-105 transition-all duration-300"> Boka </button>
            </div>
        </div>
    </div>
</template>
