import { defineStore } from "pinia";

export const useBookingStore = defineStore('booking', {
    state: () => ({
        experience: null as null | {
            id: number;
            title: string;
            description: string;
            price: number;
            image: string;
            tags: string[];
            totalExperiencePrice: number;
        },
        date: null as string | null,
        people: 1,
        ageCategory: 'adult',

        addons: [] as Array<{
            id: number;
            title: string;
            priceType: string;
            priceValue: any;
            totalExperiencePrice?: number;
        }>
    }),

    getters: {
        totalExperiencePrice: (state) => state.experience
        ? state.experience.price * state.people
        : 0,

        addonsTotal: (state) => {
            let total = 0

            for (const add of state.addons) {
                if(add.priceType === 'fixed') {
                    total += add.priceValue;
                } else if (add.priceType === 'percentage') {
                    total += (state.totalExperiencePrice * add.priceValue) / 100
                } else if (add.priceType === 'range') {
                    total += add.priceValue.min;
                }
            }

            return total

        },

        totalPrice: (state) => {
            return state.totalExperiencePrice + state.addonsTotal
        }
    },

    actions: {
        setExperience(exp) {
            this.experience = exp;
        },
        updatePeople(n: number) {
            this.people = n;
        },
        setDate(date: string) {
            this.date = date;
        },
        setAgeCategory(cat: string) {
            this.ageCategory = cat;
        },
        addAddon(addon) {
            if(!this.addons.find(a => a.id === addon.id)) {
                this.addons.push(addon);
            }
        },
        removeAddon(id: number) {
            this.addons = this.addons.filter(a => a.id !== id);
        }
    }
})