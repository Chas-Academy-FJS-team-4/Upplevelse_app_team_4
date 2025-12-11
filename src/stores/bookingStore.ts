import { defineStore } from "pinia";
import type { ExperienceType } from "../types/ExperienceType";

export type PriceRange = { min: number; max: number };
export type PriceValue = number | PriceRange;

export interface Addon {
  id: number;
  title: string;
  description: string;
  image: string;
  priceType: "fixed" | "percentage" | "range";
  priceValue: PriceValue;
  finalPrice?: number;
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
    basePrice: (state) => (state.experience ? state.experience.price : 0),

    totalExperiencePrice: (state) => {
      const base = state.experience ? state.experience.price : 0;
      return base * state.people;
    },

    addonsTotal: (state): number => {
      const baseTotal = state.experience ? state.experience.price * state.people : 0;
      return state.addons.reduce((sum, add) => {
        if (add.finalPrice !== undefined) {
          return sum + add.finalPrice;
        }
        if (add.priceType === "fixed") {
          return sum + (add.priceValue as number);
        }
        if (add.priceType === "percentage") {
          return sum + (baseTotal * (add.priceValue as number)) / 100;
        }
        // range
        const range = add.priceValue as PriceRange;
        return sum + range.min;
      }, 0);
    },

    totalPrice: (state): number => {
      const exp = state.experience ? state.experience.price * state.people : 0;
      // beräkna addons samma sätt som ovan
      const addonsSum = state.addons.reduce((sum, add) => {
        if (add.finalPrice !== undefined) return sum + add.finalPrice;
        if (add.priceType === "fixed") return sum + (add.priceValue as number);
        if (add.priceType === "percentage")
          return sum + ((state.experience ? state.experience.price * state.people : 0) * (add.priceValue as number)) / 100;
        const range = add.priceValue as PriceRange;
        return sum + range.min;
      }, 0);
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
      // lägg bara till om det inte redan finns
      if (this.addons.find((a) => a.id === addon.id)) return;

      let finalPrice: number | undefined;

      if (this.experience?.addons) {
        const expAddons = this.experience.addons as Record<string, any>;

        // 1) Försök hitta via addon-id (rekommenderat schema)
        const idKey = String(addon.id);
        const byId = expAddons[idKey];
        if (typeof byId === "number") {
          finalPrice = byId;
        } else {
          // 2) Fallback: normaliserad titel-nyckel (bakåtkompatibilitet)
          const normalize = (s: string) =>
            String(s)
              .replace(/\s+/g, "")
              .replace(/upgrade/i, "price")
              .replace(/[^a-z0-9]/gi, "")
              .toLowerCase();

          const desired = normalize(addon.title);
          for (const [k, v] of Object.entries(expAddons)) {
            if (normalize(k) === desired && typeof v === "number") {
              finalPrice = v;
              break;
            }
          }

          // 3) Enkel fallbacks (utan normalisering)
          if (finalPrice === undefined) {
            const noSpaceKey = addon.title.replace(/\s+/g, "");
            const v1 = expAddons[noSpaceKey];
            const v2 = expAddons[addon.title];
            if (typeof v1 === "number") finalPrice = v1;
            else if (typeof v2 === "number") finalPrice = v2;
          }
        }
      }
      // temporär debug — ta bort när du är klar
    console.debug("[addAddon] addon:", addon.id, addon.title, "expAddonsKeys:", Object.keys(this.experience?.addons || {}), "finalPriceFound:", finalPrice);

      const pushObj: Addon = { ...addon };
      if (finalPrice !== undefined) pushObj.finalPrice = finalPrice;

      this.addons.push(pushObj);
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