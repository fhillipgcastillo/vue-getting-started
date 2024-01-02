<script lang="ts">
import type { Villain } from '@/shared/types';
import { useVillainsStore } from '@/stores/villains';
import { mapActions, mapState } from 'pinia';

interface DataState {
  villain?: Villain;
};

export default {
  name: 'VillainDetail',
  props: {
    id: {
      type: Number,
      default: 0,
    },
  },
  data(): DataState {
    return {
      villain: undefined,
    };
  },
  async mounted() {
    if (this.isAddMode) {
      this.villain = {
        firstName: '',
        lastName: '',
        description: '',
      } as Villain;
    } else {
      this.villain = await this.getVillainById(this.villainId);
    }
  },
  computed: {
    isAddMode() {
      return !this.villainId;
    },
    title() {
      return `${this.isAddMode ? 'Add' : 'Edit'} Villain`;
    },
    villainId(): string {
      return this.$route.params?.villainId;
    },
  },
  methods: {
    ...mapActions(useVillainsStore, ['updateVillainAction', 'addVillainAction', "getVillainById"]),
    cancelVillain() {
      this.$router.push({ name: 'villains' });
    },
    async saveVillain() {
      if (this.villain) {
        this.villainId
          ? await this.updateVillainAction(this.villain)
          : await this.addVillainAction(this.villain);
        this.$router.push({ name: 'villains' });
      }
    },
  },
};
</script>

<template>
  <div>
    <div class="section content-title-group">
      <h2 class="title">{{ title }}</h2>
      <div class="card">
        <header class="card-header">
          <p class="card-header-title">{{ villain?.fullName }}</p>
        </header>
        <div class="card-content" v-if="villain">
          <div class="content">
            <div class="field">
              <label class="label" for="id">id</label>
              <label class="input" name="id" readonly>{{ villain?.id }}</label>
            </div>
            <div class="field">
              <label class="label" for="firstName">first name</label>
              <input class="input" name="firstName" v-model="villain.firstName" />
            </div>
            <div class="field">
              <label class="label" for="lastName">last name</label>
              <input class="input" name="lastName" v-model="villain.lastName" />
            </div>
            <div class="field">
              <label class="label" for="description">description</label>
              <input class="input" name="description" v-model="villain.description" />
            </div>
          </div>
        </div>
        <footer class="card-footer">
          <button class="link card-footer-item cancel-button" @click="cancelVillain()">
            <i class="fas fa-undo"></i>
            <span>Cancel</span>
          </button>
          <button class="link card-footer-item" @click="saveVillain()">
            <i class="fas fa-save"></i>
            <span>Save</span>
          </button>
        </footer>
      </div>
    </div>
  </div>
</template>
