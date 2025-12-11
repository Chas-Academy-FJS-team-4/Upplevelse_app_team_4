<template>
  <footer class="bg-(--color-primary-dark) text-gray-100">
    <div
      class="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-8"
    >
      <div>
        <h4 class="text-lg font-semibold mb-3">Upplevelse</h4>
        <p class="text-sm text-gray-300">
          Upptäck och boka lokala upplevelser enkelt — för alla sinnen.
        </p>
      </div>

      <div>
        <h4 class="text-lg font-semibold mb-3">Utforska</h4>
        <ul class="space-y-2 text-sm text-gray-300">
          <li><a class="hover:underline" href="/">Populära upplevelser</a></li>
          <li><a class="hover:underline" href="/">Nyheter</a></li>
          <li><a class="hover:underline" href="/">Kategorier</a></li>
        </ul>
      </div>

      <div>
        <h4 class="text-lg font-semibold mb-3">Kundtjänst</h4>
        <ul class="space-y-2 text-sm text-gray-300">
          <li><a class="hover:underline" href="/contact">Kontakta oss</a></li>
          <li><a class="hover:underline" href="/faq">Vanliga frågor</a></li>
          <li><a class="hover:underline" href="/terms">Köpvillkor</a></li>
        </ul>
      </div>

      <div>
        <h4 class="text-lg font-semibold mb-3">Kontakt</h4>
        <p class="text-sm text-gray-300">
          E-post:
          <a
            class="text-orange-400 hover:underline"
            href="mailto:info@upplevelse.example"
            >info@upplevelse.com</a
          >
        </p>
        <p class="text-sm text-gray-300 mt-2">
          Telefon: <span class="text-gray-100">+46 70 123 45 67</span>
        </p>

        <div class="flex gap-3 mt-4">
          <a
            aria-label="Facebook"
            class="w-8 h-8 bg-gray-800 rounded flex items-center justify-center hover:bg-orange-500 transition"
          >
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
              <path
                d="M22 12a10 10 0 10-11.5 9.9v-7h-2.2V12h2.2V9.8c0-2.2 1.3-3.4 3.2-3.4.9 0 1.9.1 1.9.1v2.1h-1.1c-1.1 0-1.4.7-1.4 1.4V12h2.4l-.4 2.9h-2v7A10 10 0 0022 12z"
              />
            </svg>
          </a>
          <a
            aria-label="Instagram"
            class="w-8 h-8 bg-gray-800 rounded flex items-center justify-center hover:bg-orange-500 transition"
          >
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
              <path
                d="M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5zm5 6.2A4.8 4.8 0 1016.8 13 4.8 4.8 0 0012 8.2zM18.5 6.1a1.1 1.1 0 11-1.1-1.1 1.1 1.1 0 011.1 1.1z"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>

    <div class="border-t border-gray-800">
      <div
        class="max-w-6xl mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between text-sm text-gray-400"
      >
        <p>
          © <span class="font-medium text-gray-200">Upplevelse</span> 2025. Alla
          rättigheter förbehållna.
        </p>
        <div class="flex gap-4 mt-3 md:mt-0">
          <a class="hover:underline" href="/privacy">Integritetspolicy</a>
          <a class="hover:underline" href="/cookies">Cookies</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
// Insert logic if needed
</script>

<style scoped>
.bg-gray-900 {
  background-color: #0f1720;
}
.text-gray-100 {
  color: #eef2f7;
}
.text-gray-300 {
  color: #cbd5e1;
}
.text-gray-400 {
  color: #94a3b8;
}
.text-orange-400 {
  color: #fb923c;
}
</style>
