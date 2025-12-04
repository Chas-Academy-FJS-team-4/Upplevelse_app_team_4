import { ref, computed } from 'vue';

export interface CartItem {
  id: number;
  title: string;
  description: string;
  peopleCount: number;
  selectedDate: string;
  pricePerPerson: number;
  image: string;
}

const cartItems = ref<CartItem[]>([]);

export function useCart() {
  const totalPrice = computed(() => {
    return cartItems.value.reduce((sum, item) => sum + (item.peopleCount * item.pricePerPerson), 0);
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

  return {
    cartItems,
    totalPrice,
    removeItem,
    increasePeople,
    decreasePeople,
    changePeopleCount,
    changeDate,
    addItem
  };
}
