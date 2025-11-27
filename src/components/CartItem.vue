<template>
  <div class="flex items-start gap-4 p-4 border rounded-lg bg-white shadow-sm">
    <img :src="item.image" :alt="item.title" class="w-30 h-30 object-cover rounded" />

    <div class="flex-1">
      <div class="flex justify-between items-start">
        <div>
          <h3 class="font-semibold">{{ item.title }}</h3>
          <p class="text-sm text-gray-600">{{ item.description }}</p>
        </div>
      </div>

      <div class="text-right self-center">
          <p class="font-bold text-lg">{{ totalPrice }} SEK</p>
        </div>

      <div class="mt-3 flex items-center gap-3">
        <!-- People count - editable or readonly -->
        <div class="flex items-center gap-1">
          <span class="text-sm">👤</span>
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
            @change="$emit('changeDate', item.id, ($event.target as HTMLInputElement).value)"
            :class="['px-2 py-1 text-xs border rounded', !selectedDate ? 'border-red-500 border' : '']"
            required
          />
          <span v-else class="text-sm font-medium">{{ selectedDate || 'Inget datum valt' }}</span>
        </div>

        <!-- Delete button - only in edit mode -->
        <button
          v-if="!readonly"
          class="flex items-center gap-1 text-xs border border-red-500 text-red-500 px-3 py-1 rounded hover:bg-red-50"
          @click="$emit('remove', item.id)"
        >
          🗑️
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, withDefaults } from "vue";

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
  selectedDate: '',
  totalPrice: 0,
  readonly: false
});

const emit = defineEmits<{
  changePeopleCount: [id: number, count: number]
  changeDate: [id: number, date: string]
  remove: [id: number]
  increasePeople: [id: number]
  decreasePeople: [id: number]
}>();

const handlePeopleInput = (event: Event) => {
  const value = Number((event.target as HTMLInputElement).value);
  const validValue = Math.max(1, value || 1);
  emit('changePeopleCount', props.item.id, validValue);
};

const handlePeopleBlur = (event: Event) => {
  const value = Number((event.target as HTMLInputElement).value);
  const validValue = Math.max(1, value || 1);
  emit('changePeopleCount', props.item.id, validValue);
  // Force the input to show the correct value
  (event.target as HTMLInputElement).value = String(validValue);
};
</script>
