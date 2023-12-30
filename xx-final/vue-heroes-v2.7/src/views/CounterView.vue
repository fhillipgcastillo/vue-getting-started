
<script setup lang="ts">
import { useCounterStore } from '@/stores/counter';
// import { useHeroesStore } from '@/stores/heroes';
import { storeToRefs } from 'pinia';
const store = useCounterStore();
const { counter, doubleCount }  = storeToRefs(store);
const { increment }  = store;
// const { counter, increment } = store;

</script>

<template>
    <div>
        <h3>Counter: {{counter}}</h3>
        <h3>Double count: {{ doubleCount }}</h3>
        <button v-on:click="increment">Increment</button>
        
    </div>
</template>