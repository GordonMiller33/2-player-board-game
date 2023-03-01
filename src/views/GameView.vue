<template>
  <div class="game">
    <h1>Playable Game Board</h1>
    <GameBoard/>
    <TurnTracker/>
  </div>
</template>


<script>
// @ is an alias to /src
import GameBoard from '@/components/GameBoard.vue'
import TurnTracker from '@/components/TurnTracker.vue'

export default {
  name: 'GameView',
  components: {
    GameBoard,
    TurnTracker
  }
}
</script>
