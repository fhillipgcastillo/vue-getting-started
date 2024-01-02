<script lang="ts">
import Modal from '@/components/modal.vue';
import { mapActions, mapState } from 'pinia';
import { useVillainsStore } from "@/stores/villains";

import type { Villain } from '@/shared/types';

interface DataState {
  villainToDelete: Villain | null;
  message: string;
  showModal: boolean;
}

export default /* new Vue(*/{
  name: 'Villains',
  data: (): DataState => {
    return {
      villainToDelete: null,
      message: '',
      showModal: false,
    }/* as dataType*/;
  },
  components: {
    Modal,
  },
  async mounted() {
    await this.loadVillains();
  },
  methods: {
    ...mapActions(useVillainsStore, ["deleteVillainAction", "getVillainsAction"]),
    askToDelete(villain: Villain) {
      this.villainToDelete = villain;
      this.showModal = true;
    },
    closeModal: function () {
      this.showModal = false;
    },
    deleteVillain: async function () {
      this.closeModal();
      if (this.villainToDelete) {
        await this.deleteVillainAction(this.villainToDelete);
      }
      await this.loadVillains();
    },
    loadVillains: async function () {
      this.message = 'getting the villains, please be patient';
      await this.getVillainsAction();
      this.message = '';
    },
  },
  computed: {
    ...mapState(useVillainsStore, ['villains']),
    modalMessage() {
      const name =
        this.villainToDelete && this.villainToDelete.fullName
          ? this.villainToDelete.fullName
          : '';
      return `Would you like to delete ${name} ?`;
    },

  },
}/*)*/;
</script>


<template>
  <div class="content-container">
    <div class="columns">
      <div class="column">
        <div class="section content-title-group">
          <h2 class="title">Villains</h2>
          <button class="button refresh-button" @click="loadVillains()">
            <i class="fas fa-sync">Refresh</i>
          </button>
          <router-link class="button add-button" to="add-villain" custom v-slot="{ navigate }">
            <button @click="navigate" @keypress.enter="navigate" role="link">
              <i class="fas fa-plus">Add</i>
            </button>
          </router-link>
          <ul class="columns">
            <li v-for="villain in  villains " :key="villain.id" class="column is-3">
              <div class="card">
                <div class="card-content">
                  <div class="content">
                    <div class="name">
                      {{ villain.firstName }} {{ villain.lastName }}
                    </div>
                    <div class="description">{{ villain.description }}</div>
                  </div>
                </div>
                <footer class="card-footer">
                  <button class="link card-footer-item" @click="askToDelete(villain)">
                    <i class="fas fa-trash"></i>
                    <span>Delete</span>
                  </button>
                  <router-link tag="button" class="link card-footer-item"
                    :to="{ path: `/villain-detail/${villain.id}`}">
                    <i class="fas fa-check"></i>
                    <span>Select</span>
                  </router-link>
                </footer>
              </div>
            </li>
          </ul>
        </div>
        <div class="notification is-info" v-show="message">{{ message }}</div>
      </div>
    </div>
    <Modal :message="modalMessage" :isOpen="showModal" @handleNo="closeModal" @handleYes="deleteVillain">
    </Modal>
  </div>
</template>

<style scoped>
ul {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: flex-start;
  gap: 16px;
  margin-top: 2rem;
}
</style>