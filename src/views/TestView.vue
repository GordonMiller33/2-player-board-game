<template>
  <div class="test">
    <TestVue v-for="(item, i) in boardWidth" v-bind:key="i"/>
  </div>
</template>

<script setup>
console.log("------script setup------")
import { useBaseStore } from '@/stores/BaseStore.js';
let boardWidth = parseInt(store.boardWidth);
</script>

<script>
import TestVue from '@/components/TestVue.vue'
const store = useBaseStore();

export default {
  name: 'TestView',
  components: {
    TestVue
  },
  methods: {
    
  },
  created() {
    alert(store.customPieces);
  }
}
</script>