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

function goToCheckout() {
  if (!allDatesSelected.value) {
    return;
  }
  isCheckoutMode.value = true;
}

function cancelCheckout() {
  isCheckoutMode.value = false;
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
}
</script>

<template>
  <Header />
  <MiniHeroSection />
  <main>
    <div class="py-20 flex flex-col max-w-5xl mx-10 lg:mx-auto">
      <div v-if="!lastOrder">
        <h2 class="text-left w-full">Kundkorg</h2>
        <p class="text-sm text-gray-500 mb-10">Sammanfattning</p>
      </div>

      <div v-if="lastOrder" class="mb-6 p-6 border rounded bg-white">
        <h3 class="font-semibold mb-2">Orderöversikt</h3>
        <ul class="text-sm text-gray-700 space-y-2">
          <li v-for="item in lastOrder.items" :key="item.id">
            - {{ item.title }} — {{ item.peopleCount }} {{ item.peopleCount === 1 ? 'person' : 'personer' }} on {{ item.selectedDate || 'Inget datum' }} — {{ (item.peopleCount * item.pricePerPerson) }} SEK
          </li>
        </ul>
        <p class="font-bold mt-4">Total: {{ lastOrder.total }} SEK</p>
        <div class="mt-4">
          <button class="bg-gray-200 px-4 py-2 rounded mr-2" @click="goHomeAfterOrder">Stäng översikt</button>
        </div>
      </div>

      <template v-if="!lastOrder">
        <div class="space-y-4 w-full">
        <template v-if="cartItems.length === 0">
          <div class="p-8 text-center border rounded bg-white">
            <p class="text-lg mb-4">There is no experiences in cart yet, <router-link to="/experiences" class="text-purple-700 underline">click here</router-link> to view our experiences!</p>
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

      <div v-if="isCheckoutMode && !lastOrder" class="mt-10 border rounded-lg p-6 shadow-sm">
        <h3 class="font-semibold mb-4">Bekräfta bokning</h3>

        <p class="text-xl font-bold mb-4">Total price: {{ totalPrice }} SEK</p>

        <ul class="space-y-2 text-sm text-gray-700 mb-6">
          <li v-for="item in cartItems" :key="item.id">
            - {{ item.peopleCount }}
            {{ item.peopleCount === 1 ? "Person" : "Persons" }} will experience
            {{ item.title }} on {{ item.selectedDate || "no date selected" }}.
          </li>
        </ul>

        <div class="flex gap-4">
          <button
            class="flex-1 bg-gray-300 text-black py-2 rounded hover:bg-gray-400"
            @click="cancelCheckout"
          >
            Ändra order
          </button>
          <button
            class="flex-1 bg-purple-800 hover:bg-purple-700 text-white py-2 rounded"
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
