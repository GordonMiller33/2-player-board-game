<template>
  <div class="home">
    <img alt="My logo" src="../assets/logo.webp">
    <BoardDesign/>
  </div>
</template>

<script>
// @ is an alias to /src
import BoardDesign from '@/components/BoardSettings.vue'

export default {
  name: 'HomeView',
  components: {
    BoardDesign
  }
}
</script>
