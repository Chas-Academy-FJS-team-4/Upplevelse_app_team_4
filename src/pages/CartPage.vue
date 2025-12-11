<script lang="ts" setup>
import { ref, computed } from "vue";
import CartItem from "../components/Cart/CartItem.vue";
import ConfirmationModal from "../components/Cart/ConfirmationModal.vue";
import { useCart } from "../composables/useCart";
import Header from "../components/layout/Header.vue";
import MiniHeroSection from "../components/layout/MiniHeroSection.vue";
import { useRouter } from "vue-router";

const {
  cartItems,
  totalPrice,
  removeItem,
  increasePeople,
  decreasePeople,
  changePeopleCount,
  changeDate,
  removeAddonFromItem,
  clearCart,
} = useCart();
const isCheckoutMode = ref(false);
const showModal = ref(false);
const router = useRouter();
const lastOrder = ref<{ items: any[]; total: number } | null>(null);

const allDatesSelected = computed(() => {
  return cartItems.value.every(
    (item) => item.selectedDate && item.selectedDate.trim() !== ""
  );
});

const itemTotalprice = computed(
  () => `${totalPrice.value.toLocaleString("sv-SE")}`
);

function goToCheckout() {
  if (!allDatesSelected.value) {
    return;
  }
  isCheckoutMode.value = true;
}

function cancelCheckout() {
  isCheckoutMode.value = false;
}

function onRemoveAddonFromItem(itemId: number, addonId: number) {
  removeAddonFromItem(itemId, addonId);
}

function confirmPurchase() {
  showModal.value = true;
}

function handleConfirmationClose() {
  // snapshot the current cart so we can show a receipt overview
  lastOrder.value = {
    items: cartItems.value.map((i) => ({ ...i })),
    total: totalPrice.value,
  };
  showModal.value = false;
  isCheckoutMode.value = false;
}

function goHomeAfterOrder() {
  lastOrder.value = null;
  router.push("/");
  clearCart();
}

function formatAddonPrice(addon: {
  priceType: string;
  priceValue: number | { min: number; max: number };
}) {
  if (addon.priceType === "fixed") return `${addon.priceValue} SEK`;
  if (addon.priceType === "percentage") return `${addon.priceValue}%`;
  const range = addon.priceValue as { min: number; max: number };
  return `${range.min} - ${range.max} SEK`;
}

function printReceipt() {
  if (!lastOrder.value) return;

  const receiptEl = document.getElementById("receipt");
  const printContents = receiptEl ? receiptEl.innerHTML : null;

  const win = window.open("", "_blank", "width=800,height=600");
  if (win) {
    win.document.write(`
      <html>
        <head>
          <title>Kvittens</title>
          <meta name="viewport" content="width=device-width,initial-scale=1" />
          <style>
            body{font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial; padding:20px; color:#111}
            h3{font-weight:600; margin-bottom:8px}
            li{margin-bottom:6px}
            .total{font-weight:700; margin-top:12px}
            .no-print{display:none !important}
          </style>
        </head>
        <body>
          ${printContents ?? "<p>Innehåll saknas</p>"}
        </body>
      </html>
    `);
    win.document.close();
    win.focus();
    win.print();
  } else {
    // Fallback: kör vanlig print om popup blockerade
    window.print();
  }
}
</script>

<template>
  <Header />
  <MiniHeroSection />
  <main>
    <div class="py-10 flex flex-col max-w-5xl mx-10 lg:mx-auto">
      <div v-if="!lastOrder">
        <h2 class="text-left w-full">Kundkorg</h2>
        <p class="text-sm text-gray-500 mb-10">Sammanfattning</p>
      </div>

      <div
        v-if="lastOrder"
        id="receipt"
        class="mb-6 p-6 border rounded bg-white"
      >
        <h3 class="font-semibold mb-2">Orderbekräftelse</h3>

        <div class="space-y-2 text-sm text-gray-600 mb-6">
          <div v-for="item in cartItems" :key="item.id">
            <p class="flex flex-row justify-between">
              <span>
                - {{ item.peopleCount }}
                {{ item.peopleCount === 1 ? "Person" : "Personer" }} kommer få
                uppleva {{ item.title }} den
                {{ item.selectedDate || "Inget datum angett" }}</span
              >
              <span
                >{{
                  (item.peopleCount * item.pricePerPerson).toLocaleString(
                    "sv-SE"
                  )
                }}
                SEK</span
              >
            </p>
            <ul
              v-if="item.addons && item.addons.length"
              class="text-sm text-gray-600 ml-4 my-1 flex flex-col gap-1"
            >
              <li
                v-for="a in item.addons"
                :key="a.id"
                class="flex justify-between text-sm"
              >
                - {{ a.title }}<span>{{ formatAddonPrice(a) }}</span>
              </li>
            </ul>
          </div>
        </div>

        <p class="font-bold mt-4">Total: {{ itemTotalprice }} SEK</p>
        <div class="mt-4">
          <button
            class="bg-gray-200 px-4 py-2 rounded mr-2 no-print"
            @click="printReceipt"
          >
            Skriv ut
          </button>
          <button
            class="bg-gray-200 px-4 py-2 rounded mr-2 no-print"
            @click="goHomeAfterOrder"
          >
            Till startsidan
          </button>
        </div>
      </div>

      <template v-if="!lastOrder">
        <div class="space-y-4 w-full">
          <template v-if="cartItems.length === 0">
            <div class="p-8 text-center border rounded bg-white">
              <p class="text-lg mb-4">
                Du har inga upplevelser i kundkorgen,
                <router-link to="/experiences" class="text-purple-700 underline"
                  >Klicka här</router-link
                >
                för att välja upplevelser!
              </p>
            </div>
          </template>

          <CartItem
            v-else
            v-for="item in cartItems"
            :key="item.id"
            :item="item"
            :people-count="item.peopleCount"
            :selected-date="item.selectedDate"
            :total-price="item.peopleCount * item.pricePerPerson"
            :readonly="isCheckoutMode"
            @remove-addon="onRemoveAddonFromItem"
            @remove="removeItem"
            @increase-people="increasePeople"
            @decrease-people="decreasePeople"
            @change-people-count="changePeopleCount"
            @change-date="changeDate"
          />
        </div>
      </template>

      <div class="text-center mt-10">
        <button
          v-if="!isCheckoutMode && cartItems.length > 0 && !lastOrder"
          class="bg-gray-200 px-10 py-3 rounded hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
          @click="goToCheckout"
          :disabled="!allDatesSelected"
        >
          Checkout
        </button>
      </div>

      <div
        v-if="isCheckoutMode && !lastOrder"
        class="mt-10 border rounded-lg p-6 shadow-sm"
      >
        <h3 class="font-semibold mb-4">Bekräfta bokning</h3>

        <p class="text-xl font-bold mb-4">Totalt: {{ itemTotalprice }} SEK</p>

        <div class="space-y-2 text-sm text-gray-600 mb-6">
          <div v-for="item in cartItems" :key="item.id">
            <p class="flex justify-between">
              <span>
                - {{ item.peopleCount }}
                {{ item.peopleCount === 1 ? "Person" : "Personer" }} kommer få
                uppleva {{ item.title }} den
                {{ item.selectedDate || "Inget datum angett" }}</span
              >
              <span
                >{{
                  (item.peopleCount * item.pricePerPerson).toLocaleString(
                    "sv-SE"
                  )
                }}
                SEK</span
              >
            </p>

            <ul
              v-if="item.addons && item.addons.length"
              class="text-sm text-gray-600 ml-4 my-1 flex flex-col gap-1"
            >
              <li
                v-for="a in item.addons"
                :key="a.id"
                class="flex justify-between text-sm"
              >
                - {{ a.title }} <span>{{ formatAddonPrice(a) }}</span>
              </li>
            </ul>
          </div>
        </div>

        <div class="flex gap-4">
          <button
            class="flex-1 bg-gray-300 text-black py-2 rounded hover:bg-gray-400"
            @click="cancelCheckout"
          >
            Ändra order
          </button>
          <button
            class="flex-1 bg-(--color-primary) hover:bg-(--color-primary-hover) text-white py-2 rounded"
            @click="confirmPurchase"
          >
            Bekräfta köp
          </button>
        </div>
      </div>

      <ConfirmationModal v-if="showModal" @close="handleConfirmationClose" />
    </div>
  </main>
</template>

<style>
@media print {
  .no-print {
    display: none !important;
  }
}
</style>
