<script setup lang="ts">
import { ref, watch, onMounted, onBeforeUnmount, computed } from "vue";
import { useRouter } from "vue-router";
import data from "../../utils/experiences.json";

const router = useRouter();

/* --------------------------------------------------
 * TAG-DROPDOWN (checkbox-filter)
 * -------------------------------------------------- */

const dropdownRef = ref<HTMLElement | null>(null);
const isOpen = ref(false);
const selectedTags = ref<string[]>([]);
const allTags = computed(() => {
  const tagList = data.flatMap((item) => item.tags);
  return [...new Set(tagList)];
});

/* --------------------------------------------------
 * AGE-DROPDOWN (custom select)
 * -------------------------------------------------- */

const ageDropdownRef = ref<HTMLElement | null>(null);
const ageOpen = ref(false);

// Tillgängliga åldersval
const ageOptions = [
  { value: "any", label: "Alla åldrar" },
  { value: "kids", label: "Barn (0–17)" },
  { value: "adults", label: "Vuxna (18+)" },
  { value: "seniors", label: "Seniorer (65+)" },
];

//Valt åldersfilter
const ageCategory = ref("");

//När användaren väljer ett åldersalternativ
function selectAge(value: string) {
  ageCategory.value = value;
  ageOpen.value = false;
}

/* --------------------------------------------------
 * CLICK OUTSIDE – STÄNG DROPDOWNS
 * -------------------------------------------------- */

function handleAgeClickOutside(e: MouseEvent) {
  if (!ageDropdownRef.value) return;
  if (!ageDropdownRef.value.contains(e.target as Node)) {
    ageOpen.value = false;
  }
}

function handleTagClickOutside(e: MouseEvent) {
  if (!dropdownRef.value) return;
  if (!dropdownRef.value.contains(e.target as Node)) {
    isOpen.value = false;
  }
}

onMounted(() => {
  document.addEventListener("click", handleAgeClickOutside);
  document.addEventListener("click", handleTagClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleAgeClickOutside);
  document.removeEventListener("click", handleTagClickOutside);
});

/* --------------------------------------------------
 * ÖVRIGA FILTER
 * -------------------------------------------------- */

const people = ref<number | null>(null);
const date = ref("");

// Datuminput behöver dagens datum som min-värde
function getTodayString() {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}
const minDate = ref(getTodayString());

// Ensure date is not before today. If user somehow entered a past date, clamp it to today.
if (date.value && date.value < minDate.value) {
  date.value = minDate.value;
}

/* --------------------------------------------------
 * ROUTING & QUERY SYNC
 * -------------------------------------------------- */

// Gör så att query uppdateras när fälten ändras (replace så vi inte spammar history)
watch([selectedTags, people, date, ageCategory], () => {
  if ((router.currentRoute.value.name as string) === "experiences") {
    router.replace({
      name: "experiences",
      query: {
        q: selectedTags.value || undefined,
        people: people.value ? String(people.value) : undefined,
        date: date.value || undefined,
        age: ageCategory.value || undefined,
      },
    });
  }
});

/* --------------------------------------------------
 * SUBMIT / EMIT
 * -------------------------------------------------- */
const emit = defineEmits(["change"]);

// Function to send filters somewhere (later: to Pinia)
function applyFilters() {
  router.push({
    name: "experiences",
    query: {
      q: selectedTags.value || undefined,
      people: people.value ? String(people.value) : undefined,
      date: date.value || undefined,
      age: ageCategory.value || undefined,
    },
  });

  emit("change", {
    tags: selectedTags.value,
    ageGroup: ageCategory.value,
  });
}
</script>
<template>
  <form
    @submit.prevent="applyFilters"
    class="bg-black/30 min-h-32 flex items-center justify-center gap-2 flex-col md:flex-row p-5 md:px-10 w-6/7 max-w-5xl mt-18"
  >
    <!-- Välj taggar -->
    <div class="flex relative w-full md:w-1/5" ref="dropdownRef">
      <!-- Trigger -->
      <button
        type="button"
        @click.stop="isOpen = !isOpen"
        class="w-full p-4 bg-white rounded-md border flex justify-between items-center gap-2"
      >
        <span class="text-gray-500 truncate">
          {{
            selectedTags.length ? `${selectedTags.length} valda` : "Välj taggar"
          }}
        </span>
        <span class="text-gray-500">▾</span>
      </button>

      <!-- Dropdown -->
      <div
        v-if="isOpen"
        class="absolute left-0 right-0 -bottom-60 bg-white border rounded-md shadow-lg z-20 max-h-60 overflow-auto text-gray-500 hover:text-gray-800"
      >
        <label
          v-for="tag in allTags"
          :key="tag"
          class="flex items-center px-3 py-2 hover:bg-gray-100 cursor-pointer"
        >
          <input
            type="checkbox"
            class="mr-2"
            :value="tag"
            v-model="selectedTags"
          />
          {{ tag }}
        </label>
      </div>
    </div>

    <div class="flex flex-row gap-2 w-full md:w-3/5">
      <div class="flex flex-row gap-2 w-full md:w-fit">
        <!-- Antal personer -->
        <input
          type="number"
          min="1"
          placeholder="Antal personer"
          class="p-4 rounded-md bg-white w-1/3 flex-2"
          v-model.number="people"
          @keydown.enter.prevent="applyFilters"
        />

        <!-- Ålder Select -->
        <div ref="ageDropdownRef" class="relative w-1/3 flex-2 text-gray-500">
          <!-- Trigger -->
          <button
            type="button"
            @click.stop="ageOpen = !ageOpen"
            class="w-full p-4 bg-white rounded-md border flex items-center justify-between gap-2"
          >
            <span class="truncate">
              {{
                ageOptions.find((o) => o.value === ageCategory)?.label ||
                "Åldersgrupp"
              }}
            </span>
            <span class="shrink-0">▾</span>
          </button>

          <!-- Dropdown -->
          <div
            v-if="ageOpen"
            class="absolute left-0 right-0 bg-white border rounded-md shadow-lg z-20 hover:text-gray-800"
          >
            <button
              v-for="opt in ageOptions"
              :key="opt.value"
              type="button"
              @click="selectAge(opt.value)"
              class="w-full text-left px-4 py-3 hover:bg-gray-100"
            >
              {{ opt.label }}
            </button>
          </div>
        </div>
      </div>

      <!-- Datum -->
      <input
        type="date"
        :min="minDate"
        class="p-4 rounded-md bg-white text-gray-500 w-1/3"
        v-model="date"
        @keydown.enter.prevent="applyFilters"
      />
    </div>

    <!-- Submit knapp -->
    <button
      type="submit"
      class="bg-(--color-primary) text-white px-6 py-4 rounded-md hover:bg-(--color-primary-hover) w-full md:w-1/5 shadow-sm hover:shadow-md"
    >
      Sök
    </button>
  </form>
</template>
