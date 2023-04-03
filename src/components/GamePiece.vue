<template>
  <span class="piece hidden" v-on:click="clickPiece()"></span>
</template>


<script>

export default {
  name: 'GamePiece',
  methods: {
    clickPiece() {                                //eventCode that determines what caused the updateState function to be called
      this.$emit("click-piece");
    }
  }
}
</script>
