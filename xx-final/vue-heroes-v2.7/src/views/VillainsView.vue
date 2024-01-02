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
  data: ():DataState  => {
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
      <div class="column is-8">
        <div class="section content-title-group">
          <h2 class="title">Villains</h2>
          <button class="button refresh-button" @click="loadVillains()">
            <i class="fas fa-sync">Sync</i>
          </button>
          <router-link tag="button" class="button add-button" :to="{ name: 'villain-detail', params: { id: 0 } }">
            <i class="fas fa-plus">Add</i>
          </router-link>
          <ul>
            <li v-for="villain in villains" :key="villain.id">
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
                    :to="{ name: 'villain-detail', params: { id: villain.id } }">
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

