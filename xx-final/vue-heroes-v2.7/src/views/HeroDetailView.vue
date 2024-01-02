
<script lang="ts">
import { mapState, mapActions } from 'pinia'
import { useHeroesStore } from "@/stores/heroes";
import type { Hero } from '@/shared/types';


interface DataState {
  hero?: Hero;
};

export default {
  name: 'HeroDetail',
  data(): DataState {
    return {
      hero: undefined,
    };
  },
  async mounted() {
    if (this.isAddMode) {
      this.hero = {
        firstName: '',
        lastName: '',
        description: '',
      } as Hero;
    } else {
      this.hero = await this.getHeroById(this.heroId);
    }
  },
  computed: {
    isAddMode() {
      return !this.heroId ;
    },
    title() {
      return `${this.isAddMode ? 'Add' : 'Edit'} Hero`;
    },
    heroId():string {
      return this.$route.params?.heroId;
    },
  },
  methods: {
    ...mapActions(useHeroesStore, ['updateHeroAction', 'addHeroAction', "getHeroById"]),
    cancelHero() {
      this.$router.push({ name: 'heroes' });
    },
    async saveHero() {
      !this.isAddMode
        ? await this.updateHeroAction(this.hero)
        : await this.addHeroAction(this.hero);
      this.$router.push({ name: 'heroes' });
    },
  },
};

</script>

<template>
  <div class="section content-title-group">
      <h2 class="title">{{ title }}</h2>
      <div class="card">
        <header class="card-header">
          <p class="card-header-title">{{ hero?.fullName }}</p>
        </header>
        <div class="card-content" v-if="hero">
          <div class="content">
            <div class="field">
              <label class="label" for="id">id</label>
              <label class="input" name="id" readonly>{{ hero?.id }}</label>
            </div>
            <div class="field">
              <label class="label" for="firstName">first name</label>
              <input class="input" name="firstName" v-model="hero.firstName" />
            </div>
            <div class="field">
              <label class="label" for="lastName">last name</label>
              <input class="input" name="lastName" v-model="hero.lastName" />
            </div>
            <div class="field">
              <label class="label" for="description">description</label>
              <input class="input" name="description" v-model="hero.description" />
            </div>
          </div>
        </div>
        <footer class="card-footer">
          <button class="link card-footer-item cancel-button" @click="cancelHero()">
            <i class="fas fa-undo"></i>
            <span>Cancel</span>
          </button>
          <button class="link card-footer-item" @click="saveHero()">
            <i class="fas fa-save"></i>
            <span>Save</span>
          </button>
        </footer>
      </div>
    </div>
</template>

