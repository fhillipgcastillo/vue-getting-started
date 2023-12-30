import { defineStore } from "pinia";
import { dataService } from "@/shared/data.service";
import type { Hero, Villain } from "@/shared/types";

interface HeroesStore {
    heroes: Hero[],
    villains: Villain[],
    heroToDelete: any | null,
    message: string,
    showModal: boolean,
};

export const useHeroesStore = defineStore('heroes', {
    state: (): HeroesStore => {
        return {
            heroes: [],
            villains: [],
            heroToDelete: null,
            message: '',
            showModal: false,
        };
    },
    getters: {
        modalMessage(state): string {
            const name =
                state.heroToDelete && state.heroToDelete.fullName
                    ? state.heroToDelete.fullName
                    : '';
            return `Would you like to delete ${name} ?`;
        },
    },
    actions: {
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
            // this.heroes = heroes;
            this.getHeroesMutation(heroes);
        },

        // mutations
        getHeroesMutation(heroes: Hero[]) {
            this.heroes = heroes;
        },
        deleteHeroMutation(heroId: number) {
            this.heroes = [...this.heroes.filter(p => p.id !== heroId)];
        }
    }
});