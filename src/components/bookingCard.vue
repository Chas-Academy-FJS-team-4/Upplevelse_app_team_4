<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import {
  useBookingStore,
  type Addon,
  type PriceRange,
} from "../stores/bookingStore";
import Addons from "./addons/Addons.vue";
import { useRoute, useRouter } from "vue-router";
import experienceData from "../utils/experiences.json";
import BaseModal from "./common/BaseModal.vue";
import { useCart } from "../composables/useCart";
import type { ExperienceType } from "../types/ExperienceType";
import goBackButton from "./common/GoBackButton.vue";

const fallbackTitle = "Fallback Upplevelse";
const fallbackDescription =
  "Fallback beskrivning av upplevelsen. Detta är en hårdkodad text som visas när ingen upplevelse är vald i bokningsflödet.";
const fallbackPrice = 12000000;
const currency = "Kr";
const fallbackTags = ["Rökgalet", "Rymd", "Fallskärm"];

const store = useBookingStore();
const { addItem } = useCart();

const route = useRoute();
const router = useRouter();

const showAddedModal = ref(false);
const showDateError = ref(false);

// Minsta datum = idag (lokalt, i formatet YYYY-MM-DD)
function getTodayLocalISO() {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}
const minDateISO = getTodayLocalISO();

// Format på priset
const priceFormatted = computed(() => {
  const p = store.experience ? store.experience.price : fallbackPrice;
  return `${p.toLocaleString("sv-SE")} ${currency}`;
});

// Computed bindings mot pinia-store så ändringar sparas centralt
const selectedDate = computed({
  get: () => store.date,
  set: (v: string | null) => store.setDate(v),
});
const people = computed({
  get: () => store.people,
  set: (n: number) => store.updatePeople(n),
});
const ageCategory = computed({
  get: () => store.ageCategory,
  set: (c: string) => store.setAgeCategory(c),
});

// Visningsvärden som fallback till hårdkodat om store.experience saknas
const displayTitle = computed(() => store.experience?.title ?? fallbackTitle);
const displayDescription = computed(
  () => store.experience?.description ?? fallbackDescription
);
const displayTags = computed(() => store.experience?.tags ?? fallbackTags);
const displayImage = computed(
  () => store.experience?.image ?? "/experiences/1.png"
);

const ageGroupTranslations: Record<string, string> = {
  kids: "Barn (0-17)",
  adults: "18+",
  seniors: "Seniorer",
  any: "Alla åldrar",
};

const translatedAgeGroup = computed(() => {
  const key = store.experience?.ageGroup || "any";
  return ageGroupTranslations[key] || "Alla åldrar";
});

// Läs route params / query och sätt experience + initiala värden
onMounted(() => {
  store.resetBooking(false);

  const id = Number(route.params.id);
  const found = (experienceData as any[]).find((e: any) => Number(e.id) === id);
  if (found) {
    store.setExperience(found as ExperienceType);
  }
  // init från query om present
  if (route.query.people) store.updatePeople(Number(route.query.people));
  if (route.query.date) store.setDate(String(route.query.date));
  if (route.query.age) store.setAgeCategory(String(route.query.age));
});

// Synka query när användaren ändrar people/date/age
watch(
  () => [store.people, store.date, store.ageCategory],
  () => {
    const newQuery: Record<string, any> = { ...route.query };
    if (store.people) newQuery.people = String(store.people);
    else delete newQuery.people;
    if (store.date) newQuery.date = store.date;
    else delete newQuery.date;
    if (store.ageCategory) newQuery.age = store.ageCategory;
    else delete newQuery.age;

    router.replace({
      name: (route.name as string) || "booking",
      params: route.params,
      query: newQuery,
    });
  }
);
// reset och ladda ny experience när route.params.id ändras
watch(
  () => route.params.id,
  (newId, oldId) => {
    if (String(newId) !== String(oldId)) {
      // nollställ bokningsfälten (behåll eller ta bort experience beroende på vad du vill:)
      store.resetBooking(false); // false = behåll inte experience? här väljer vi att inte nollställa experience automatiskt
      const idNum = Number(newId || route.query.id || 1);
      const found = (experienceData as any[]).find(
        (e: any) => Number(e.id) === idNum
      );
      if (found) {
        store.setExperience(found as ExperienceType);
      }
    }
  }
);

function continueDiscovering() {
  // store.resetBooking(false);
  showAddedModal.value = false;
  // if (navigate) {
  router.push({ name: "experiences" });
  // }
}

// Emit för att skicka till parent (lägg till i varukorg) - men vi hanterar add direkt här
function addToCart() {
  if (!selectedDate.value) {
    showDateError.value = true;
    return;
  }

  showDateError.value = false;
  // Ensure date is not before today
  if (selectedDate.value && selectedDate.value < minDateISO) {
    store.setDate(minDateISO);
  }
  const exp = store.experience;
  const pricePerPerson = exp ? exp.price : fallbackPrice;

  const addonsSnapshot = JSON.parse(JSON.stringify(store.addons || []));
  addItem({
    id: exp ? exp.id : Date.now(),
    title: exp ? exp.title : fallbackTitle,
    description: exp ? exp.description : fallbackDescription,
    peopleCount: store.people,
    selectedDate: store.date || "",
    pricePerPerson,
    image: displayImage.value,
    ageGroup: exp?.ageGroup as
      | "kids"
      | "adults"
      | "seniors"
      | "any"
      | undefined,

    addons: addonsSnapshot,
  });
  showAddedModal.value = true;
}

function formatAddonPrice(addon: Addon) {
  if (addon.finalPrice !== undefined) {
    return `${addon.finalPrice.toLocaleString("sv-SE")} Kr `;
  }
  if (addon.priceType === "fixed") {
    return `${addon.priceValue as number} Kr`;
  }
  if (addon.priceType === "percentage") {
    return `${addon.priceValue as number} % på upplevelsepriset`;
  }
  // range
  const range = addon.priceValue as PriceRange;
  return `${range.min} - ${range.max} Kr`;
}
</script>

<template>
  <section
    v-if="store.experience"
    class="flex flex-col items-center pt-20 gap-6 max-w-5xl mx-10 lg:mx-auto"
  >
    <div class="self-start">
      <goBackButton />
    </div>
    <h2 class="w-full">Boka din upplevelse:</h2>
    <article
      class="flex flex-col gap-4 p-4 rounded-lg shadow-md border-[0.5px] border-gray-300 bg-white w-full"
    >
      <div class="flex flex-col md:flex-row gap-3">
        <div class="flex md:w-1/2 shrink-0 md:h-auto">
          <img
            :src="displayImage"
            alt="Bild på upplevelsen"
            class="w-full object-cover rounded-lg md:bg-fixed max-h-[30vh] md:max-h-[90vh]"
          />
        </div>
        <div class="flex flex-col gap-4 ml-3 justify-center">
          <h2 class="text-zinc-800 text-2xl font-bold">{{ displayTitle }}</h2>
          <div class="flex items-center gap-2 flex-wrap">
            <p
              v-for="tag in displayTags"
              :key="tag"
              class="bg-(--color-accent-light) px-2 py-1 border border-orange-600 rounded-xl text-orange-900 text-xs"
            >
              {{ tag }}
            </p>
          </div>
          <p class="text-black font-extrabold text-lg">{{ priceFormatted }}</p>
          <p class="text-zinc-600">{{ displayDescription }}</p>
          <div class="flex gap-4 items-center flex-wrap">
            <label for="datum" class="sr-only">Datum</label>
            <input
              id="datum"
              type="date"
              :min="minDateISO"
              v-model="selectedDate"
              class="border p-2 rounded-md text-sm"
              aria-label="Välj Datum för upplevelsen"
              :class="{
                'border-red-500 bg-red-50': showDateError && !selectedDate,
              }"
            />

            <label for="personer" class="sr-only">Antal personer</label>
            <select
              id="personer"
              v-model.number="people"
              class="border p-2 rounded-md text-sm"
              aria-label="Välj antal personer för upplevelsen"
            >
              <option v-for="n in 10" :key="n" :value="n">
                {{ n }} person{{ n > 1 ? "er" : "" }}
              </option>
            </select>

            <p class="text-sm border border-black rounded-md py-[8.2px] px-2">
              Åldersgrupp: <strong>{{ translatedAgeGroup }}</strong>
            </p>
          </div>

          <div class="mt-3">
            <h3 class="font-semibold">Valda tillval</h3>
            <ul class="mt-2 space-y-2">
              <li
                v-for="a in store.addons"
                :key="a.id"
                class="flex justify-between items-center bg-gray-50 p-2 rounded"
              >
                <div>
                  <div class="font-medium">{{ a.title }}</div>
                  <div class="text-xs text-zinc-500">
                    {{ formatAddonPrice(a) }}
                  </div>
                </div>
                <button
                  @click="store.removeAddon(a.id)"
                  class="text-sm text-red-600"
                >
                  Ta bort
                </button>
              </li>
              <li
                v-if="store.addons.length === 0"
                class="text-sm text-zinc-500"
              >
                Inga tillval valda
              </li>
            </ul>
          </div>

          <div class="mt-3 flex flex-col gap-2">
            <div class="flex justify-between text-sm">
              <span>Upplevelse ({{ people }} personer)</span>
              <span class="font-semibold"
                >{{ store.totalExperiencePrice.toLocaleString("sv-SE") }}
                {{ currency }}</span
              >
            </div>
            <div class="flex justify-between text-sm">
              <span>Tillval</span>
              <span class="font-semibold"
                >{{ store.addonsTotal.toLocaleString("sv-SE") }}
                {{ currency }}</span
              >
            </div>
            <div
              class="flex justify-between text-lg font-bold border-t pt-2 mt-2"
            >
              <span>Totalt</span>
              <span
                >{{ store.totalPrice.toLocaleString("sv-SE") }}
                {{ currency }}</span
              >
            </div>
          </div>
          <button
            @click="addToCart"
            class="bg-(--color-primary) rounded-md hover:bg-(--color-primary-hover) shadow-sm hover:shadow-md text-white px-4 py-2 mt-2 w-max self-center"
          >
            Lägg till upplevelse i varukorg
          </button>
          <p
            v-if="showDateError && !selectedDate"
            class="text-red-500 text-sm text-center italic"
          >
            Du måste välja ett datum innan du kan fortsätta.
          </p>
        </div>
      </div>
    </article>
  </section>
  <BaseModal
    v-if="showAddedModal"
    :show-close="true"
    @close="showAddedModal = false"
  >
    <div class="space-y-5">
      <h3 class="text-lg font-semibold">Tillagd i kundkorg</h3>
      <p class="text-sm text-gray-600">
        Upplevelsen har lagts till i din kundkorg!
      </p>
      <div class="flex gap-3 justify-center">
        <button
          @click="continueDiscovering()"
          class="bg-gray-100 px-4 py-2 rounded-md"
        >
          Fortsätt upptäcka
        </button>
        <button
          @click="$router.push('/cart')"
          class="bg-(--color-primary) hover:bg-(--color-primary-hover) text-white px-4 py-2 rounded-md"
        >
          Gå till kundkorg
        </button>
      </div>
    </div>
  </BaseModal>
  <section class="mx-10 mb-20 mt-10">
    <Addons />
  </section>
</template>

<style scoped></style>
