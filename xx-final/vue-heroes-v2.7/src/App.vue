<script lang="ts">
import HeaderBar from '@/components/header-bar.vue';
import NavBar from '@/components/nav-bar.vue';

export default {
  name: 'App',
  components: { HeaderBar, NavBar },
};
</script>

<template>
  <div id="app">
    <HeaderBar />
    <div class="main-section columns">
      <NavBar />
      <main class="column">
        <router-view />
      </main>
    </div>
  </div>
</template>

<style lang="scss">
@import '@/design/index.scss';
</style>
