<script setup lang="ts">
import type { ExperienceType } from "../../types/ExperienceType";
const { exp } = defineProps<{
  exp: ExperienceType;
}>();

const ageGroupTranslations: Record<string, string> = {
  kids: "Barn (0-17)",
  adults: "18+",
  seniors: "Seniorer",
  any: "Familj",
};

const translatedAgeGroup = ageGroupTranslations[exp.ageGroup] || exp.ageGroup;

//TODO - Bestämma färger här beroende på vårt färgschema
const tagPalette = [
  "bg-orange-400/70 text-orange-900 border-orange-800",
  "bg-green-400/70 text-green-900 border-green-800",
  "bg-blue-400/70 text-blue-900 border-blue-800",
];
</script>

<template>
  <router-link
    class="text-right text-xs text-(--color-accent-light) hover:text-(--color-accent) relative group"
    :to="{ name: 'experience', params: { id: exp.id } }"
  >
    <div
      class="flex-1 rounded-lg shadow-md border-[0.5px] border-gray-300 p-4 flex flex-col h-86 cursor-pointer bg-white transform duration-300 hover:shadow-[0_0_10px_rgba(255,165,100)]"
    >
      <div class="w-full h-36 mb-2">
        <img
          :src="exp.image"
          :alt="exp.title"
          class="w-full h-full object-cover rounded-t-lg mb-2"
        />

        <!-- Taggar på bilden -->
        <div class="absolute flex flex-col bottom-47 left-5 gap-1.5">
          <div
            v-for="(tag, i) in exp.tags"
            :key="tag"
            :class="tagPalette[i % tagPalette.length]"
            class="flex items-center overflow-hidden bg-(--color-accent-light) border rounded-full text-xs font-medium cursor-default pl-2 pr-2 w-4 h-2.5 transition-all duration-500 ease-in group-hover:w-fit group-hover:h-5"
          >
            <!-- Cirkel -->
            <span class=""></span>

            <!-- Text som glider ut -->
            <span
              class="opacity-0 transition-opacity duration-500 group-hover:opacity-500 whitespace-nowrap"
            >
              {{ tag }}
            </span>
          </div>
        </div>
      </div>

      <h4 class="text-left mb-1">{{ exp.title }}</h4>
      <p class="text-start text-gray-600 text-sm h-full line-clamp-4">
        {{ exp.description }}
      </p>
      <p class="">
        Ålder:
        <span>{{ translatedAgeGroup }}</span>
      </p>
    </div>
  </router-link>
</template>
