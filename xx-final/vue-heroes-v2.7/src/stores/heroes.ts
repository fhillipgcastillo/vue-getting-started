import { computed, ref } from "vue";
import { defineStore } from "pinia";
import { dataService } from "@/shared/data.service";
import type { Hero, Villain } from "@/shared/types";

interface HeroesStore {
    heroes: Hero[],
    villains: Villain[],
    heroToDelete: any,
    message: string,
    showModal: boolean,
};

export const useHeroesStore = defineStore('heroes', () => {
    const heroes = ref<Hero[]>([]);
    const villains = ref<Villain[]>([]);
    const heroToDelete = ref<Hero>();
    const message = ref<string>("");
    const showModal = ref<boolean>(false);

    // getters
    const modalMessage = computed((state) => {
        const name =
            state.heroToDelete && state.heroToDelete.fullName
                ? state.heroToDelete.fullName
                : '';
        return `Would you like to delete ${name} ?`;
    });
    
    // actions
    function askToDelete(hero: any) {
        heroToDelete.value = hero;
        showModal.value = true;
    }
    async function  deleteHeroAction(/*{ commit }: any, */hero: any) {
        const deletedHeroId = await dataService.deleteHero(hero);
        deleteHeroMutation(deletedHeroId);
    }
    function closeModal() {
        showModal.value = false;
    }
    async function deleteHero() {
        closeModal();
        if (heroToDelete) {
            await deleteHeroAction(heroToDelete);
        }
        await loadHeroes();
    }
    async function loadHeroes() {
        message.value = 'getting the heroes, please be patient';
        await getHeroesAction();
        message.value = '';
    }
    async function getHeroesAction(/*{ commit }*/) {
        const heroes: Hero[] = await dataService.getHeroes();
        // heroes = heroes;
        getHeroesMutation(heroes);
    }

    // state => id => state.heroes.find(h => h.id === id),
    async function getHeroById (heroId: string){
        const hero: Hero = await dataService.getHero(heroId);
        return hero;
    } 


    // mutations
    function getHeroesMutation(state: Hero[]) {
        heroes.value = state;
    }
    function deleteHeroMutation(heroId: number) {
        heroes.value = [...heroes.value.filter(p => p.id !== heroId)];
    }
    return {
        heroes,
        villains,
        heroToDelete,
        message,
        showModal,

        modalMessage,
        askToDelete,
        closeModal,
        deleteHeroAction,
        deleteHero,
        loadHeroes,
        getHeroesAction,

        getHeroesMutation,
        deleteHeroMutation,

        // api calls - temps
        getHeroById,
    }
});

// export const useHeroesStore = defineStore('heroes', {
//     state: (): HeroesStore => {
//         return {
//             heroes: [],
//             villains: [],
//             heroToDelete: null,
//             message: '',
//             showModal: false,
//         };
//     },
//     getters: {
//         modalMessage(state): string {
//             const name =
//                 state.heroToDelete && state.heroToDelete.fullName
//                     ? state.heroToDelete.fullName
//                     : '';
//             return `Would you like to delete ${name} ?`;
//         },
//     },
//     actions: {
//         askToDelete(hero: any) {
//             this.heroToDelete = hero;
//             this.showModal = true;
//         },
//         async deleteHeroAction(/*{ commit }: any, */hero: any) {
//             const deletedHeroId = await dataService.deleteHero(hero);
//             this.deleteHeroMutation(deletedHeroId);
//         },
//         closeModal() {
//             this.showModal = false;
//         },
//         async deleteHero() {
//             this.closeModal();
//             if (this.heroToDelete) {
//                 await this.deleteHeroAction(this.heroToDelete);
//             }
//             await this.loadHeroes();
//         },
//         async loadHeroes() {
//             this.message = 'getting the heroes, please be patient';
//             await this.getHeroesAction();
//             this.message = '';
//         },
//         async getHeroesAction(/*{ commit }*/) {
//             const heroes: Hero[] = await dataService.getHeroes();
//             // this.heroes = heroes;
//             this.getHeroesMutation(heroes);
//         },

//         // mutations
//         getHeroesMutation(heroes: Hero[]) {
//             this.heroes = heroes;
//         },
//         deleteHeroMutation(heroId: number) {
//             this.heroes = [...this.heroes.filter(p => p.id !== heroId)];
//         }
//     }
// });