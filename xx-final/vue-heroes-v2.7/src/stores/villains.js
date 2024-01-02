import { ref } from "vue";
import { defineStore } from "pinia";
import { dataService } from "@/shared/data.service";


// export interface Villain {
//     id: string;
//     fullName: string;
//     firstName: string;
//     lastName: string;
//     description: string;
// };

// interface State {
//     villains: Villain[]
// }
export const useVillainsStore = defineStore('villains', {
    state: () => ({
        villains: [],
    }),
    getters: {
    },
    actions: {
        // actions
        async deleteVillainAction(villain) {
            const deletedVillainId = await dataService.deleteVillain(villain);
            this.deleteVillainMutation(deletedVillainId);
        },
        async getVillainsAction() {
            const villains = await dataService.getVillains();
            this.getVillainsMutation(villains);
        },
        // mutations
        addVillainMutation (addedVillain) {
            this.$state.villains.unshift(addedVillain); // mutable addition
        },
        updateVillainMutation (villain) {
            const index = this.$state.villains.findIndex((h) => h.id === villain.id);
            this.$state.villains.splice(index, 1, villain);
            this.$state.villains = [...this.$state.villains];
            return {
                ...this.$state,
            }
        },
        deleteVillainMutation(villainId) {
            this.villains = [...this.$state.villains.filter(p => p.id !== villainId)];
        },
        getVillainsMutation(villains) {
            this.villains = villains;
        },

    },
});