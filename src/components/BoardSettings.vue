<template>
  <div class="design">
    <h1>Design your custom game board</h1>
    <p><b>Board Width</b></p>
    <input v-model="store.boardWidth" placeholder="edit me" />
    <h2>Head to the "Play Game" tab to see your custom board</h2>

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
      piecesPerPlayer: null,
      customPieces: null
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
