import { defineStore } from "pinia";
import { dataService } from "@/shared/data.service";
import type { Villain } from "@/shared/types";


interface State {
    villains: Villain[]
}
export const useVillainsStore = defineStore('villains', {
    state: (): State => ({
        villains: [],
    }),
    getters: {
    },
    actions: {
        // actions
        async getVillainById(villainId: string) {
            const villain = await dataService.getVillain(villainId)
            return villain as Villain;
        },
        async deleteVillainAction(villain: Villain) {
            const deletedVillainId = await dataService.deleteVillain(villain);
            this.deleteVillainMutation(deletedVillainId);
        },
        async getVillainsAction() {
            const villains: Villain[] = await dataService.getVillains();
            this.getVillainsMutation(villains);
        },
        async updateVillainAction(villain: Villain) {
            const updatedVillain = await dataService.updateVillain(villain);
            // commit(UPDATE_VILLAIN, updatedVillain);
        },
        async addVillainAction(villain: Villain) {
            const addedVillain = await dataService.addVillain(villain);
            // commit(ADD_VILLAIN, addedVillain);
        },
        // mutations
        addVillainMutation(addedVillain: Villain) {
            this.$state.villains.unshift(addedVillain); // mutable addition
        },
        updateVillainMutation(villain: Villain) {
            const index = this.$state.villains.findIndex((h) => h.id === villain.id);
            this.$state.villains.splice(index, 1, villain);
            this.$state.villains = [...this.$state.villains];
            return {
                ...this.$state,
            }
        },
        deleteVillainMutation(villainId: string) {
            this.villains = [...this.$state.villains.filter(p => p.id !== villainId)];
        },
        getVillainsMutation(villains: Villain[]) {
            this.villains = villains;
        },

    },
});