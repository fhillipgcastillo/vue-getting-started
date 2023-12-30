<script setup lang="ts">
// import { mapActions, mapState } from 'vuex';
import { storeToRefs } from 'pinia'
// import Modal from '@/components/modal';
import { useHeroesStore } from "@/stores/heroes";

const store = storeToRefs(useHeroesStore());

const {
  heroes,
  villains,
  heroToDelete,
  message,
  showModal,
  modalMessage,
  askToDelete,
  deleteHeroAction,
  closeModal,
  deleteHero,
  loadHeroes,
  getHeroesAction,
} = store;

</script>

<template>
  <div class="content-container">
    <div class="columns">
      <div class="column is-8">
        <div class="section content-title-group">
          <h2 class="title">Heroes</h2>
          <button class="button refresh-button" @click="loadHeroes()">
            <i class="fas fa-sync"></i>Load
          </button>
          <router-link tag="button" class="button add-button" :to="{ name: 'hero-detail', params: { id: 0 } }">
            <i class="fas fa-plus"></i>Add
          </router-link>
          <ul>
            <li v-for="hero in heroes" :key="hero.id">
              <div class="card">
                <div class="card-content">
                  <div class="content">
                    <div :key="hero.name" class="name">
                      {{ hero.firstName }} {{ hero.lastName }}
                    </div>
                    <div class="description">{{ hero.description }}</div>
                  </div>
                </div>
                <footer class="card-footer">
                  <button class="link card-footer-item" @click="askToDelete(hero)">
                    <i class="fas fa-trash"></i>
                    <span>Delete</span>
                  </button>
                  <router-link tag="button" class="link card-footer-item"
                    :to="{ name: 'hero-detail', params: { id: hero.id } }">
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
    <!-- <Modal :message="modalMessage" :isOpen="showModal" @handleNo="closeModal" @handleYes="deleteHero">
    </Modal> -->
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