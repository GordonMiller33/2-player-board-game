<template>
  <div class="game">
    <h1>Playable Game Board</h1>
    <GameBoard/>
  </div>
</template>


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
