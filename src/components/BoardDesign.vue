<template>
  <div class="design">
    <h1>Design your custom game board</h1>
    <p><b>Board Width</b><br>(even numbers only)</p>
    <input v-model="store.boardWidth" placeholder="edit me" />
    <p><b>Movement Speed</b><br>(non-diagonal)</p>
    <input v-model="store.movementSpeed" placeholder="edit me" />
    <p><b>Pieces per Player</b><br>(even only, max=Board Width)</p>
    <input v-model="store.piecesPerPlayer" placeholder="edit me" />
    <h2>Head to the "Game" tab to see your custom board</h2>
  </div>
</template>

<script setup>
import { useBaseStore } from '@/stores/BaseStore.js';
const store = useBaseStore();

</script>
<script>
export default {
  name: 'BoardDesign',
  setup() {
  },
  data (){
    return {
      boardWidth: null,
      movementSpeed: null,
      piecesPerPlayer: null
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
  padding: 
  0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
