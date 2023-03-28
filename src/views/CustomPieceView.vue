<template>
  <div class="pieces">
    <p><b>Custom Piece 1</b><br>Color(Hex Code)</p>
    <input v-model="store.customPieces[0][0]" placeholder="edit me" />
    <p>Starting X Coordinate</p>
    <input v-model="store.customPieces[0][1]" placeholder="edit me" />
    <p>Starting Y Coordinate</p>
    <input v-model="store.customPieces[0][2]" placeholder="edit me" />
  </div>
</template>

<script setup>
console.log("------script setup------")
import { useBaseStore } from '@/stores/BaseStore.js';
</script>

<script>
const store = useBaseStore();

export default {
  name: 'CustomPieceView',
  components: {
  },
  methods: {
    
  }
}
</script>