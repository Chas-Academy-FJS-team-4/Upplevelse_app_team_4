<script setup lang="ts">
defineProps<{
  addon: {
    id: number;
    title: string;
    description: string;
    image?: string;
    imageUrl?: string;
    priceType: string;
    priceValue: any;
  };
}>();

const emit = defineEmits<{
  (e: "read-more", addon: any): void;
}>();
</script>

<template>
  <div
    class="relative overflow-hidden group h-50 rounded-lg shadow-md border-[0.5px] border-gray-300"
  >
    <div class="absolute inset-0">
      <img
        :src="addon.imageUrl || addon.image"
        alt="Bild på paketerbjudande"
        class="w-full h-full object-cover filter blur-sm scale-105"
      />
      <div
        class="absolute inset-0 bg-gradient-to-tr from-purple-700/25 via-orange-400/10 to-teal-400/10"
      ></div>
    </div>

    <div class="absolute inset-0 flex flex-col justify-end p-4">
      <h3 class="text-white font-semibold text-lg drop-shadow-md">
        {{ addon.title }}
      </h3>
      <div class="mt-2 flex items-center gap-3">
        <button
          @click="emit('read-more', addon)"
          class="bg-white/95 text-zinc-900 px-3 py-1 rounded-md text-sm transition-transform transform hover:-translate-y-0.5"
        >
          Läs mer
        </button>
        <span
          class="ml-auto text-xs text-white/90 bg-black/25 px-2 py-1 rounded"
        >
          {{
            addon.priceType === "fixed"
              ? addon.priceValue + " kr"
              : addon.priceType === "percentage"
              ? addon.priceValue + "%"
              : addon.priceValue.min + " - " + addon.priceValue.max + " kr"
          }}
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
@media (min-width: 768px) {
  .h-48 {
    height: 12rem;
  }
}
</style>
