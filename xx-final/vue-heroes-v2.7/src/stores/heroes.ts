import { computed, ref } from "vue";
import { defineStore } from "pinia";
import { dataService } from "@/shared/data.service";
import type { Hero, Villain } from "@/shared/types";

interface HeroesStore {
    heroes: Hero[],
    villains: Villain[],
    heroToDelete?: Hero,
    message: string,
    showModal: boolean,
};
export const useHeroesStore = defineStore('heroes', {
    state: (): HeroesStore => {
        return {
            heroes: [],
            villains: [],
            heroToDelete: undefined,
            message: '',
            showModal: false,
        };
    },
    getters: {
        modalMessage(state): string {
            const name =
                state.heroToDelete && state.heroToDelete?.fullName
                    ? state.heroToDelete?.fullName
                    : '';
            return `Would you like to delete ${name} ?`;
        },
    },
    actions: {
        async getHeroById(heroId: string) {
            const hero = await dataService.getHero(heroId)
            return hero as Hero;
        },
        askToDelete(hero: any) {
            this.heroToDelete = hero;
            this.showModal = true;
        },
        async deleteHeroAction(/*{ commit }: any, */hero: any) {
            const deletedHeroId = await dataService.deleteHero(hero);
            this.deleteHeroMutation(deletedHeroId);
        },
        closeModal() {
            this.showModal = false;
        },
        async deleteHero() {
            this.closeModal();
            if (this.heroToDelete) {
                await this.deleteHeroAction(this.heroToDelete);
            }
            await this.loadHeroes();
        },
        async loadHeroes() {
            this.message = 'getting the heroes, please be patient';
            await this.getHeroesAction();
            this.message = '';
        },
        async getHeroesAction(/*{ commit }*/) {
            const heroes: Hero[] = await dataService.getHeroes();
            this.getHeroesMutation(heroes);
        },
        async updateHeroAction(hero: Hero) {
            const updatedHero: Hero = await dataService.updateHero(hero);
            this.updateHeroMutation(updatedHero);
        },
        async addHeroAction(hero: Hero) {
            const addedHero = await dataService.addHero(hero);
            // commit(ADD_HERO, addedHero);
        },
        // mutating the state
        getHeroesMutation(heroes: Hero[]) {
            this.heroes = heroes;
        },
        deleteHeroMutation(heroId: string) {
            this.heroes = [...this.heroes.filter(p => p.id !== heroId)];
        },
        async updateHeroMutation(hero: Hero) {
        },
    }
});