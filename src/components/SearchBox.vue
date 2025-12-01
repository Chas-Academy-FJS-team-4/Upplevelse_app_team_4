<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

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
  router.push({ name: "experiences" });
}

const searchInput = ref<HTMLInputElement | null>(null);

function focusSearch() {
  searchInput.value?.focus();
}

// expose metoden så andra komponenter kan anropa via ref
defineExpose({ focusSearch });
</script>
<template>
  <form
    @submit.prevent="applyFilters"
    class="bg-purple-900/40 min-h-32 flex items-center justify-center gap-2 flex-col md:flex-row p-5 md:px-6 w-6/7 max-w-5xl"
  >
    <!-- Sökfält -->
    <input
      type="text"
      placeholder="Sök upplevelse..."
      class="flex-1 p-4 rounded-lg bg-white w-full min-w-42"
      v-model="search"
      ref="searchInput"
      @keydown.enter.prevent="applyFilters"
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
          @keydown.enter.prevent="applyFilters"
        />

        <!-- Ålder -->
        <select
          class="p-4 rounded-md bg-white w-1/3 flex-2 text-gray-500"
          v-model="ageCategory"
          @keydown.enter.prevent="applyFilters"
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
        @keydown.enter.prevent="applyFilters"
      />
    </div>

    <!-- Submit knapp -->
    <button
      type="submit"
      class="bg-(--color-primary) text-white px-6 py-4 rounded-md hover:bg-(--color-primary-hover) w-full md:w-auto shadow-sm hover:shadow-md"
    >
      Sök
    </button>
  </form>
</template>
