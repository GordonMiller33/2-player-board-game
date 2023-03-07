<template>
  <span class="piece hidden" v-on:click="updateState()"></span>
</template>


<script>

export default {
  name: 'GamePiece',
  methods: {
    updateState() {                                //eventCode that determines what caused the updateState function to be called
      this.$emit("update-state");
    }
  }
}
</script>
