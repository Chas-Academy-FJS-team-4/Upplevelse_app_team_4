<script setup>
import { ref } from "vue";

// Local refs — dessa kommer senare ersättas av en Pinia store
const ageCategory = ref("");
const people = ref("");
const date = ref("");
const search = ref("");

// Function to send filters somewhere (later: to Pinia)
function applyFilters() {
  const filters = {
    ageCategory: ageCategory.value,
    people: people.value,
    date: date.value,
    search: search.value,
  };

  // TODO: Replace with Pinia store
  // const filterStore = useFilterStore();
  // filterStore.setFilters(filters);

  console.log("Filters to save:", filters);
}

const searchInput = ref(null);

function focusSearch() {
  searchInput.value?.focus();
}

defineExpose({ focusSearch });
</script>
<template>
  <div
    class="absolute inset-0 flex items-center justify-center flex-col gap-10 md:gap-20 mt-30"
  >
    <div
      class="bg-purple-900/40 min-h-32 flex items-center justify-center gap-2 flex-col md:flex-row p-5 md:px-6 w-3/4 max-w-7xl"
    >
      <!-- Sökfält -->
      <input
        type="text"
        placeholder="Sök upplevelse..."
        class="flex-1 p-4 rounded-lg bg-white w-full min-w-42"
        v-model="search"
        ref="searchInput"
      />
      <div class="flex flex-row gap-2">
        <div class="flex flex-row gap-2 w-full md:w-fit">
          <!-- Antal personer -->
          <input
            type="number"
            min="1"
            placeholder="Antal personer"
            class="p-4 rounded-md bg-white w-1/3 flex-2"
            v-model="people"
          />

          <!-- Ålder -->
          <select
            class="p-4 rounded-md bg-white w-1/3 flex-2 text-gray-500"
            v-model="ageCategory"
          >
            <option value="" hidden>Åldersgrupp</option>
            <option value="any">Familj</option>
            <option value="kids">Barn (0–12)</option>
            <option value="adult">Vuxna (13–64)</option>
            <option value="senior">Senior (65+)</option>
          </select>
        </div>

        <!-- Datum -->
        <input
          type="date"
          class="p-4 rounded-md bg-white text-gray-500 w-1/3"
          v-model="date"
        />
      </div>

      <!-- Submit knapp -->
      <button
        @click="applyFilters()"
        type="submit"
        class="bg-(--color-primary) text-white px-6 py-4 rounded-md hover:bg-(--color-primary-hover) w-full md:w-auto"
      >
        Sök
      </button>
    </div>
    <div class="w-3/4 flex max-w-7xl">
      <p
        class="text-4xl sm:text-5xl md:text-7xl leading-12 sm:leading-16 md:leading-22 text-white text-shadow-md text-shadow-red-900"
      >
        Try the Wildest <br />
        Experiences Today!
      </p>
    </div>
  </div>
</template>
