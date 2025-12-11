import { ref, computed } from 'vue';
import type { Addon } from '../stores/bookingStore';

export interface CartItem {
  id: number;
  title: string;
  description: string;
  peopleCount: number;
  selectedDate: string;
  pricePerPerson: number;
  image: string;
  addons: Addon[];
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
        } else if(add.priceType === 'percentage') {
          return aSum + (base * (add.priceValue as number)) / 100;
        } else {
          const range = add.priceValue as { min: number; max: number };
          return aSum + range.min;
        }
      }, 0);
      return sum + base + addonSum
    }, 0)
  });

  const removeItem = (id: number) => {
    cartItems.value = cartItems.value.filter((item) => item.id !== id);
  };

  const increasePeople = (id: number) => {
    const item = cartItems.value.find((item) => item.id === id);
    if (item) {
      item.peopleCount++;
    }
  };

  const decreasePeople = (id: number) => {
    const item = cartItems.value.find((item) => item.id === id);
    if (item && item.peopleCount > 1) {
      item.peopleCount--;
    }
  };

  const changePeopleCount = (id: number, count: number) => {
    const item = cartItems.value.find((item) => item.id === id);
    if (item) {
      item.peopleCount = Math.max(1, count);
    }
  };

  const changeDate = (id: number, date: string) => {
    const item = cartItems.value.find((item) => item.id === id);
    if (item) {
      item.selectedDate = date;
    }
  };

  const addItem = (item: CartItem) => {
    cartItems.value.push(item);
  };

  const removeAddonFromItem = (itemId: number, addonId: number) => {
    const item = cartItems.value.find(i => i.id === itemId);
    if (!item || !item.addons) return;
    item.addons = item.addons.filter(a => a.id !== addonId);
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
    removeAddonFromItem
  };
}
