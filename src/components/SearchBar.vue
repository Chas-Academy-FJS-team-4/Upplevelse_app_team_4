<script setup></script>
<template>
  <div
    class="absolute inset-0 flex items-center justify-center flex-col gap-10 mt-30"
  >
    <div
      class="bg-purple-900/40 w-2/3 h-32 flex items-center justify-center px-6 gap-2"
    >
      <!-- Sökfält -->
      <input
        type="text"
        placeholder="Search experiences..."
        class="flex-1 p-4 rounded-lg bg-white"
      />

      <!-- Antal personer -->
      <input
        type="number"
        min="1"
        placeholder="People"
        class="p-4 rounded-md w-32 bg-white"
        v-model="people"
      />

      <!-- Datum -->
      <input type="date" class="p-4 rounded-md w-48 bg-white" v-model="date" />

      <!-- Submit knapp -->
      <button
        type="submit"
        class="bg-purple-800 text-white px-6 py-4 rounded-md hover:bg-purple-700"
      >
        Search
      </button>
    </div>
    <div class="w-2/3 flex">
      <p
        class="text-6xl leading-20 text-white text-shadow-md text-shadow-red-900"
      >
        Try the Wildest <br />
        Experiences Today!
      </p>
    </div>
  </div>
</template>
