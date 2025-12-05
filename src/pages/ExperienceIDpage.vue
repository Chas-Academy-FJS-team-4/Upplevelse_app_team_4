<script setup lang="ts">
import Header from "../components/layout/Header.vue";
import data from "../utils/experiences.json";
import heroImg from "../assets/images/hero.jpg";
import { useRoute, useRouter } from "vue-router";
import { computed } from "vue";

const route = useRoute();
const router = useRouter();
const id = Number(route.params.id);
const selectedExperience = data.find((item) => item.id === id);
const currency = "Kr";

// Format på priset
const priceFormatted = computed(
  () =>
    `${selectedExperience?.price?.toLocaleString("sv-SE") ?? "0"} ${currency}`
);

// Säker id som alltid är ett number - används i template för navigation
const selectedId = computed(() => selectedExperience?.id ?? id ?? 1);

function goToBookingPage(targetId: number) {
  router.push({
    name: "booking",
    params: { id: targetId },
    query: { ...route.query },
  });
}
// Hantera focus-event från header: navigera till experiences och sätt query.focus så searchBox kan reagera
function focusSearch() {
  router.push({ name: "experiences", query: { focus: "1" } });
}

const { title, image, location, longDescription, price, tags, ageGroup } =
  selectedExperience ?? {
    title: "",
    image: "",
    location: "",
    longDescription: "",
    price: 0,
    tags: [],
    ageGroup: "",
  };

const ageGroupTranslations: Record<string, string> = {
  kids: "Barn (0-17)",
  adults: "18+",
  seniors: "Seniorer",
  any: "Alla åldrar",
};

const translatedAgeGroup = ageGroupTranslations[ageGroup];
</script>
<template>
  <div class="flex flex-col min-h-screen bg-(--color-bg-primary)">
    <div class="">
      <img class="h-90 w-full object-cover blur-md" :src="heroImg" />
      <div class="absolute h-105 inset-0 flex justify-center items-center">
        <Header class="self-start" @focus-search="focusSearch"></Header>
        <div
          class="flex items-center justify-center flex-col text-center text-yellow-200 bg-purple-900/40 min-h-32 gap-2 p-5 md:px-6 w-6/7 max-w-5xl"
        >
          <h1 class="text-2xl md:text-6xl font-bold">{{ title }}</h1>
          <p
            class="text-md md:text-xl font-semibold flex justify-center items-center gap-1"
          >
            <span class=""
              ><svg
                width="25px"
                height="25px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                stroke="#fff085"
                stroke-width="0.00024000000000000003"
              >
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M5 9.5C5 6.09371 8.00993 3 12 3C15.9901 3 19 6.09371 19 9.5C19 11.6449 17.6877 14.0406 15.9606 16.2611C14.5957 18.016 13.0773 19.5329 12 20.5944C10.9227 19.5329 9.40427 18.016 8.03935 16.2611C6.31229 14.0406 5 11.6449 5 9.5ZM12 1C6.99007 1 3 4.90629 3 9.5C3 12.3551 4.68771 15.2094 6.46065 17.4889C7.99487 19.4615 9.7194 21.1574 10.7973 22.2173C10.9831 22.4001 11.1498 22.564 11.2929 22.7071C11.4804 22.8946 11.7348 23 12 23C12.2652 23 12.5196 22.8946 12.7071 22.7071C12.8502 22.564 13.0169 22.4001 13.2027 22.2174L13.2028 22.2173C14.2806 21.1573 16.0051 19.4615 17.5394 17.4889C19.3123 15.2094 21 12.3551 21 9.5C21 4.90629 17.0099 1 12 1ZM12 12.5C13.3807 12.5 14.5 11.3807 14.5 10C14.5 8.61929 13.3807 7.5 12 7.5C10.6193 7.5 9.5 8.61929 9.5 10C9.5 11.3807 10.6193 12.5 12 12.5Z"
                    fill="#fff085"
                  ></path>
                </g>
              </svg>
            </span>
            {{ location }}
          </p>
        </div>
      </div>
    </div>
    <section
      class="flex flex-col items-center pt-10 pb-20 gap-6 max-w-5xl mx-10 lg:mx-auto"
    >
      <article
        class="flex flex-col gap-4 p-4 rounded-lg shadow-md border-[0.5px] border-gray-300 bg-white w-full"
      >
        <div class="flex flex-col md:flex-row gap-3">
          <div class="flex md:w-1/2 shrink-0 md:h-auto">
            <img
              :src="image"
              :alt="title"
              class="w-full max-h-[30vh] md:max-h-[65vh] object-cover rounded-lg md:bg-fixed"
            />
          </div>
          <div class="flex flex-col gap-4 ml-3 justify-center">
            <div>
              <h2 class="">{{ title }}</h2>
              <p class="text-zinc-600">
                Ålder: <span>{{ translatedAgeGroup }}</span>
              </p>
            </div>
            <div class="flex items-center gap-2 flex-wrap">
              <p
                v-for="tag in tags"
                :key="tag"
                class="bg-(--color-accent-light) px-2 py-1 border border-orange-600 rounded-xl text-orange-900 text-xs"
              >
                {{ tag }}
              </p>
            </div>
            <p class="text-black font-extrabold text-lg">
              {{ priceFormatted }}
            </p>
            <p class="text-zinc-600">{{ longDescription }}</p>

            <button
              @click="goToBookingPage(selectedId)"
              class="bg-(--color-primary) rounded-md hover:bg-(--color-primary-hover) shadow-sm hover:shadow-md text-white px-4 py-2 mt-2 w-max self-center"
            >
              Boka upplevelse
            </button>
          </div>
        </div>
      </article>
    </section>
  </div>
</template>
