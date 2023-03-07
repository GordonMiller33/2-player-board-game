<template>
  <div class="design">
    <h1>Design your custom game board</h1>
    <p>Board width is: {{ store.boardWidth }}</p>
    <input v-model="store.boardWidth" placeholder="edit me" />
    <p>Number of pieces is: {{ numPiecesPerPlayer }}</p>
    <input v-model="numPiecesPerPlayer" placeholder="edit me" />
    <p>Movement Speed is: {{ movementSpeed }}</p>
    <input v-model="movementSpeed" placeholder="edit me" />
  </div>
</template>

<script setup>
import { useBaseStore } from '@/stores/BaseStore.js';
const store = useBaseStore();

</script>
<script>
export default {
  name: 'HelloWorld',
  setup() {
  },
  data (){
    return {
      boardWidth: null,
      numPiecesPerPlayer: null,
      movementSpeed: null
    }
  }
}

</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
