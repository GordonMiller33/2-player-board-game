<template>
  <span class="piece hidden" v-on:click="updateState(2)"></span>
</template>


<script>

export default {
  name: 'GamePiece',
  methods: {
    updateState(eventCode) {                                //eventCode that determines what caused the updateState function to be called
      this.$parent.updateState(eventCode);
    }
}
}
</script>
