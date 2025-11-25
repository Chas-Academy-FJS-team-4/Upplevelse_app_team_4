<script setup></script>
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
        placeholder="Search experiences..."
        class="flex-1 p-4 rounded-lg bg-white w-full"
      />
      <div class="flex flex-row gap-2 w-full md:w-fit">
        <!-- Antal personer -->
        <input
          type="number"
          min="1"
          placeholder="People"
          class="p-4 rounded-md md:w-32 bg-white w-1/2 flex-2"
          v-model="people"
        />

        <!-- Datum -->
        <input
          type="date"
          class="p-4 rounded-md md:w-32 bg-white w-1/2 flex-2"
          v-model="date"
        />
      </div>

      <!-- Submit knapp -->
      <button
        type="submit"
        class="bg-purple-800 text-white px-6 py-4 rounded-md hover:bg-purple-700 w-full md:w-auto"
      >
        Search
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
