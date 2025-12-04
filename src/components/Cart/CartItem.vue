<script lang="ts" setup>
import { defineProps, withDefaults, ref } from "vue";
import BaseModal from "../common/BaseModal.vue";

interface CartItem {
  id: number;
  title: string;
  description: string;
  image: string;
}

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
}>();

const showRemoveModal = ref(false);

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
</script>

<template>
  <div
    class="flex gap-4 p-4 shadow-md border-[0.5px] border-gray-300 rounded-lg bg-white"
  >
    <img
      :src="item.image"
      :alt="item.title"
      class="w-30 h-30 object-cover rounded"
    />

    <div class="flex flex-col justify-between w-full">
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
        <p class="font-bold sm:text-lg text-right">{{ totalPrice }} SEK</p>
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
