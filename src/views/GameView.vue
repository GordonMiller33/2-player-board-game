<template>
  <div class="game">
    <h1>Playable Game Board</h1>
    <PlayGameBoard/>
  </div>
</template>

<script setup>

</script>
<script>
// @ is an alias to /src
import PlayGameBoard from '@/components/PlayGameBoard.vue'

export default {
  name: 'GameView',
  components: {
    PlayGameBoard
  }
}
</script>
