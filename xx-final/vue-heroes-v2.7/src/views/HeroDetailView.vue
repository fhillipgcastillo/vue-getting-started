
<script setup lang="ts">
import { useRoute } from 'vue-router/composables';
import { computed, onBeforeMount, onMounted, ref } from 'vue';
import { storeToRefs } from 'pinia'
import { useHeroesStore } from "@/stores/heroes";
import type { Hero } from '@/shared/types';

const store = useHeroesStore();
const route = useRoute();
const heroId = route.params?.heroId;

const {
  heroes,
  villains,
  heroToDelete,
  message,
  showModal,
  modalMessage,
} = storeToRefs(store);

const {
  askToDelete,
  deleteHeroAction,
  closeModal,
  deleteHero,
  loadHeroes,
  getHeroesAction,

  getHeroById,
} = store;

const hero = ref<Hero | null>(null);
const isAddMode = computed(() => {
  return !!heroId;
});
const title = computed(() => {
  return `${isAddMode ? 'Add' : 'Edit'} Hero`;
});

onBeforeMount(function(){
  hero.value = {
      id: undefined,
      firstName: '',
      lastName: '',
      description: '',
      capeCounter: 0,
      originDate: "",

    };
});
onMounted(async function () {
  if (heroId) {
    const result = await getHeroById(heroId);
    console.log("params", result);
    hero.value = result;
  }
});
// export const HeroDetail = {
//   name: 'HeroDetail',
//   props: {
//     heroId: {
//       type: Number,
//       default: 0,
//     },
//   },
//   data() {
//     return {
//       hero: {},
//     };
//   },
//   created() {
// if (this.isAddMode) {
//   this.hero = {
//     id: undefined,
//     firstName: '',
//     lastName: '',
//     description: '',
//   };
// } else {
//   this.hero = { ...this.getHeroById(this.id) };
// }
// },
// computed: {
// ...mapGetters(['getHeroById']),
//   isAddMode() {
//     return !this.id;
//   },
//   title() {
//     return `${this.isAddMode ? 'Add' : 'Edit'} Hero`;
//   },
// },
// methods: {
// ...mapActions(['updateHeroAction', 'addHeroAction']),
// cancelHero() {
//   this.$router.push({ name: 'heroes' });
// },
// async saveHero() {
// this.hero.id
//   ? await this.updateHeroAction(this.hero)
//   : await this.addHeroAction(this.hero);
// this.$router.push({ name: 'heroes' });
//     },
//   },
// };

</script>

<template>
  <div>
    <div class="section content-title-group">
      <h2 class="title">{{ title }}</h2>
      <div class="card">
        <header class="card-header">
          <p class="card-header-title">{{ hero.fullName }}</p>
        </header>
        <div class="card-content">
          <div class="content">
            <div class="field">
              <label class="label" for="id">id</label>
              <label class="input" name="id" readonly>{{ hero.id }}</label>
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
  </div>
</template>

