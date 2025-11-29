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

const cartItems = ref<CartItem[]>([
  { id: 1, title: "Åka skidor", description: "Upplev Sälen!", peopleCount: 1, selectedDate: "", pricePerPerson: 1200, image: "/src/public/sälen.jpeg" },
  { id: 2, title: "Fallskärm", description: "Hoppa fallskärm i världens finaste städer!", peopleCount: 1, selectedDate: "", pricePerPerson: 3500, image: "/src/public/fallskärm.jpeg" },
  { id: 3, title: "Klättra", description: "Klättra på riktiga berg!", peopleCount: 1, selectedDate: "", pricePerPerson: 890, image: "/src/public/klättra.jpg" }
]);

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

  return {
    cartItems,
    totalPrice,
    removeItem,
    increasePeople,
    decreasePeople,
    changePeopleCount,
    changeDate
  };
}
