import { defineStore } from "pinia";

interface HeroesStore {
    heroes: any[],
    villains: any[],
};

export const useHeroesStore = defineStore('heroes', {
    state: (): HeroesStore => {
        return {
            heroes: [] as any[],
            villains: [] as any[],
        };
    },
    getters: {

    },
    actions: {
        
    }
});