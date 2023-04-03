<template>
  <td v-on:click="tileClick()"></td>
</template>


<script>

export default {
  name: 'GameTile',
  methods: {
      tileClick() {
        this.$emit("tile-click");
      }
  }
}
</script>