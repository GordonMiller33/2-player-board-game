<template>
  <div class="pieces">
    <h1>Add/Remove Pieces</h1>
    <PieceSettings/>
  </div>
</template>

<script setup>

</script>
<script>
// @ is an alias to /src
import PieceSettings from '@/components/PieceSettings.vue'

export default {
  name: 'CustomPieceView',
  components: {
    PieceSettings
  }
}
</script>