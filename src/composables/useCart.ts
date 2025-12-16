import { ref, computed } from "vue";
import type { Addon } from "../stores/bookingStore";

export interface CartItem {
  id: number;
  instanceId?: string;
  title: string;
  description: string;
  peopleCount: number;
  selectedDate: string;
  pricePerPerson: number;
  image: string;
  addons: Addon[];
  ageGroup?: "kids" | "adults" | "seniors" | "any";
  finalPrice?: number
}

const cartItems = ref<CartItem[]>([]);

export function useCart() {
  const totalPrice = computed(() => {
    return cartItems.value.reduce((sum, item) => {
      const base = item.peopleCount * item.pricePerPerson;

      // räkna addons för just detta item
      const addonSum = (item.addons || []).reduce((aSum, add) => {
        if (add.finalPrice !== undefined) {
          return aSum + add.finalPrice;
        }
        if(add.priceType === 'fixed') {
          return aSum + (add.priceValue as number);
        } else if (add.priceType === "percentage") {
          return aSum + (base * (add.priceValue as number)) / 100;
        } else {
          const range = add.priceValue as { min: number; max: number };
          return aSum + range.min;
        }
      }, 0);
      return sum + base + addonSum;
    }, 0);
  });

  const removeItem = (instanceId: string) => {
    cartItems.value = cartItems.value.filter((item) => item.instanceId !== instanceId);
  };

  const increasePeople = (instanceId: string) => {
    const item = cartItems.value.find((item) => item.instanceId === instanceId);
    if (item) {
      item.peopleCount++;
    }
  };

  const decreasePeople = (instanceId: string) => {
    const item = cartItems.value.find((item) => item.instanceId === instanceId);
    if (item && item.peopleCount > 1) {
      item.peopleCount--;
    }
  };

  const changePeopleCount = (instanceId: string, count: number) => {
    const item = cartItems.value.find((item) => item.instanceId === instanceId);
    if (item) {
      item.peopleCount = Math.max(1, count);
    }
  };

  const changeDate = (instanceId: string, date: string) => {
    const item = cartItems.value.find((item) => item.instanceId === instanceId);
    if (item) {
      item.selectedDate = date;
    }
  };

  const addItem = (item: CartItem) => {
    // Ensure each pushed item has a unique instanceId for distinguishing duplicates
    const iid = item.instanceId ?? String(Date.now()) + "-" + Math.random().toString(36).slice(2, 9);
    cartItems.value.push({ ...item, instanceId: iid });
  };

  const removeAddonFromItem = (instanceId: string, addonId: number) => {
    const item = cartItems.value.find((i) => i.instanceId === instanceId);
    if (!item || !item.addons) return;
    item.addons = item.addons.filter((a) => a.id !== addonId);
  };

  const clearCart = () => {
    cartItems.value = [];
  };

  return {
    cartItems,
    totalPrice,
    removeItem,
    increasePeople,
    decreasePeople,
    changePeopleCount,
    changeDate,
    addItem,
    removeAddonFromItem,
    clearCart,
  };
}
