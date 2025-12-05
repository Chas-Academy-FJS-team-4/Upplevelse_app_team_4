import { defineStore } from "pinia";
import type { ExperienceType } from "../types/ExperienceType";

// interface Experience {
//     id: number;
//     title: string;
//     description: string;
//     price: number;
//     image: string;
//     tags: string[];
// };

type PriceRange = { min: number; max: number };
type PriceValue = number | PriceRange;

export interface Addon {
  id: number;
  title: string;
  description: string;
  image: string;
  priceType: "fixed" | "percentage" | "range";
  priceValue: PriceValue;
}

interface BookingState {
  experience: ExperienceType | null;
  date: string | null;
  people: number;
  ageCategory: string;
  addons: Addon[];
}

export const useBookingStore = defineStore("booking", {
  state: (): BookingState => ({
    experience: null,
    date: null,
    people: 1,
    ageCategory: "adult",
    addons: [],
  }),

  getters: {
    // Basspris (per person)
    basePrice: (state) => (state.experience ? state.experience.price : 0),

    // totalpris för upplevelsen beroende på antal personer
    totalExperiencePrice: (state) => {
      const base = state.experience ? state.experience.price : 0;
      return base * state.people;
    },

    addonsTotal: (state): number => {
      const baseTotal = state.experience
        ? state.experience.price * state.people
        : 0;
      let total = 0;
      for (const add of state.addons) {
        if (add.priceType === "fixed") {
          total += add.priceValue as number;
        } else if (add.priceType === "percentage") {
          total += (baseTotal * (add.priceValue as number)) / 100;
        } else if (add.priceType === "range") {
          const range = add.priceValue as PriceRange;
          total += range.min;
        }
      }
      return total;
    },

    totalPrice: (state): number => {
      const exp = state.experience ? state.experience.price * state.people : 0;
      // note: we access the computed addonsTotal via this (Pinia gör getters till properties)
      // In TS context inside this getter 'this' refers to the store instance; keep calculation consistent by recomputing addonsTotal here:
      let addonsSum = 0;
      for (const add of state.addons) {
        if (add.priceType === "fixed") {
          addonsSum += add.priceValue as number;
        } else if (add.priceType === "percentage") {
          addonsSum += (exp * (add.priceValue as number)) / 100;
        } else if (add.priceType === "range") {
          addonsSum += (add.priceValue as PriceRange).min;
        }
      }
      return exp + addonsSum;
    },
  },

  actions: {
    setExperience(exp: ExperienceType) {
      this.experience = exp;
    },
    updatePeople(n: number) {
      this.people = n;
    },
    setDate(date: string | null) {
      this.date = date;
    },
    setAgeCategory(cat: string) {
      this.ageCategory = cat;
    },
    addAddon(addon: Addon) {
      if (!this.addons.find((a) => a.id === addon.id)) {
        this.addons.push(addon);
      }
    },
    removeAddon(id: number) {
      this.addons = this.addons.filter((a) => a.id !== id);
    },
    clearAddons() {
      this.addons = [];
    },
    resetBooking(resetExperience = false) {
      this.date = null;
      this.people = 1;
      this.ageCategory = "adult";
      this.addons = [];
      if (resetExperience) {
        this.experience = null;
      }
    },
  },
});
