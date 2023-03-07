<template>
  <div class="game">
    <p>Board width is: {{ store.boardWidth }}</p>
    <h1>Playable Game Board</h1>
    <GameBoard/>
  </div>
</template>

<script setup>
import { useBaseStore } from '@/stores/BaseStore.js';
const store = useBaseStore();

</script>
<script>
// @ is an alias to /src
import GameBoard from '@/components/GameBoard.vue'

export default {
  name: 'GameView',
  components: {
    GameBoard
  }
}
</script>
