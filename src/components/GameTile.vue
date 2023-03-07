<template>
  <td v-on:click="movePiece()"></td>
</template>


<script>

export default {
  name: 'GameTile',
  methods: {
      movePiece() {
        this.$emit("move-piece");
      }
  }
}
</script>