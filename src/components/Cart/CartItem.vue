<script lang="ts" setup>
import { defineProps, withDefaults, ref, computed } from "vue";
import BaseModal from "../common/BaseModal.vue";
import type { Addon } from "../../stores/bookingStore";

interface CartItem {
  id: number;
  title: string;
  description: string;
  image: string;
  pricePerPerson?: number;
  addons?: Addon[];
}
type PriceRange = { min: number; max: number };
type PriceValue = number | PriceRange;

interface Props {
  item: CartItem;
  peopleCount?: number;
  selectedDate?: string;
  totalPrice?: number;
  readonly?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  peopleCount: 1,
  selectedDate: "",
  totalPrice: 0,
  readonly: false,
});

const emit = defineEmits<{
  changePeopleCount: [id: number, count: number];
  changeDate: [id: number, date: string];
  remove: [id: number];
  increasePeople: [id: number];
  decreasePeople: [id: number];
  'remove-addon': [itemId: number, addonId: number];
}>();

const showRemoveModal = ref(false);

function addonPriceValue(add: Addon, base: number) {
  if (add.priceType === "fixed") return add.priceValue as number;
  if (add.priceType === "percentage") return (base * (add.priceValue as number)) / 100;
  const range = add.priceValue as PriceRange;
  return range.min;
}
const itemTotal = computed(() => {
  const people = props.peopleCount ?? 1;
  const pricePerPerson = (props.item.pricePerPerson ?? props.totalPrice ?? 0);
  const base = pricePerPerson * people;
  const addonsSum = (props.item.addons ?? []).reduce((sum, a) => {
    return sum + addonPriceValue(a, base);
  }, 0)
  return base + addonsSum;
});

const itemTotalFormatted = computed(() => `${itemTotal.value.toLocaleString("sv-SE")}`);

const confirmRemove = () => {
  emit("remove", props.item.id);
  showRemoveModal.value = false;
};

const cancelRemove = () => {
  showRemoveModal.value = false;
};

const handlePeopleInput = (event: Event) => {
  const value = Number((event.target as HTMLInputElement).value);
  const validValue = Math.max(1, value || 1);
  emit("changePeopleCount", props.item.id, validValue);
};

const handlePeopleBlur = (event: Event) => {
  const value = Number((event.target as HTMLInputElement).value);
  const validValue = Math.max(1, value || 1);
  emit("changePeopleCount", props.item.id, validValue);
  // Force the input to show the correct value
  (event.target as HTMLInputElement).value = String(validValue);
};

const formatAddonPriceValue = (priceType: string, priceValue: PriceValue) => {
  if(priceType === "fixed") {
    return `${priceValue as number} kr`;
  }
  if(priceType === "percentage") {
    return `${priceValue as number} %`;
  }
  const range = priceValue as PriceRange;
  return `${range.min} - ${range.max} kr`;
}
function formatAddonPrice(addon: Addon) {
  return formatAddonPriceValue(addon.priceType, addon.priceValue);
}
</script>

<template>
  <div
    class="flex flex-col md:flex-row gap-4 p-4 shadow-md border-[0.5px] border-gray-300 rounded-lg bg-white"
  >
    <img
      :src="item.image"
      :alt="item.title"
      class="w-full h-70 md:w-40 md:h-auto object-cover rounded"
    />

    <div class="flex flex-col justify-between w-full gap-5">
      <div class="flex">
        <div class="w-full">
          <div class="flex justify-between">
            <h3 class="">{{ item.title }}</h3>
            <!-- Delete button - only in edit mode -->
            <button
              v-if="!readonly"
              class="flex items-center gap-1 text-sm px-3 py-1 rounded hover:bg-red-50"
              @click="showRemoveModal = true"
            >
              ✕
            </button>
          </div>
          <p class="text-sm text-gray-600">{{ item.description }}</p>
          <div v-if="item.addons && item.addons.length"
            class="mt-2 mb-2">
          <p class="text-md text-gray-700 mb-1 font-semibold">Tillval:</p>
          <ul class="text-sm text-gray-700 space-y-2">
            <li v-for="a in item.addons" :key="a.id"
              class="flex justify-between text-sm">
            <span>{{ a.title }}</span>
            <div class="flex items-center gap-3">
              <span class="ml-4 text-gray-500">
                {{ formatAddonPrice(a) }}
              </span>
              <button @click="$emit('remove-addon', item.id, a.id)" class="text-red-600 text-xs">Ta bort</button>
            </div>
          </li>
          </ul>
          </div>
        </div>
      </div>

      <!-- <div class="text-right self-center">
      </div> -->
      <div class="flex justify-between flex-col sm:flex-row gap-2 sm:gap-0">
        <div class="flex gap-2 sm:gap-5">
          <!-- People count - editable or readonly -->
          <div class="flex items-center gap-1">
            <span class="text-sm"
              ><span class="">
                <svg
                  width="20px"
                  height="20px"
                  viewBox="0 0 64 64"
                  xmlns="http://www.w3.org/2000/svg"
                  stroke-width="3"
                  stroke="#000"
                  fill="none"
                >
                  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    <circle cx="32" cy="18.14" r="11.14"></circle>
                    <path
                      d="M54.55,56.85A22.55,22.55,0,0,0,32,34.3h0A22.55,22.55,0,0,0,9.45,56.85Z"
                    ></path>
                  </g></svg></span
            ></span>
            <input
              v-if="!readonly"
              type="number"
              :key="`people-${item.id}-${peopleCount}`"
              :value="peopleCount"
              @input="handlePeopleInput"
              @blur="handlePeopleBlur"
              min="1"
              max="99"
              class="px-2 py-1 text-xs border rounded w-14"
            />
            <span v-else class="text-sm font-medium">{{ peopleCount }}</span>
          </div>

          <!-- Date - editable or readonly -->
          <div class="flex items-center gap-1">
            <input
              v-if="!readonly"
              type="date"
              :value="selectedDate"
              :min="new Date().toISOString().split('T')[0]"
              @change="
                $emit(
                  'changeDate',
                  item.id,
                  ($event.target as HTMLInputElement).value
                )
              "
              :class="[
                'px-2 py-1 text-xs border rounded',
                !selectedDate ? 'border-red-500 border' : '',
              ]"
              required
            />
            <span v-else class="text-sm font-medium">{{
              selectedDate || "Inget datum valt"
            }}</span>
          </div>
        </div>
        <p class="font-bold sm:text-lg text-right">{{ itemTotalFormatted }} SEK</p>
      </div>
    </div>
  </div>
  <BaseModal v-if="showRemoveModal" :show-close="true" @close="cancelRemove">
    <h3 class="text-lg font-semibold mb-4">Är du säker?</h3>
    <p class="text-gray-600 mb-6">Är du säker på att du vill ta bort denna upplevelse från din kundkorg?</p>
    <div class="flex justify-center gap-4">
      <button class="px-4 py-2 rounded bg-gray-300" @click="cancelRemove">Avbryt</button>
      <button class="px-4 py-2 rounded bg-red-600 text-white" @click="confirmRemove">Ja</button>
    </div>
  </BaseModal>
</template>
