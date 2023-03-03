<template>
  <td v-on:click="movePiece()"></td>
</template>


<script>

export default {
  name: 'GameTile',
  methods: {
      movePiece() {                                //eventCode that determines what caused the updateState function to be called
        this.$parent.movePiece();
      }
  }
}
</script>