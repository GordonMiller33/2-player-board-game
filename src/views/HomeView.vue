<template>
  <div class="home">
    <img alt="My logo" src="../assets/logo.png">
    <BoardDesign/>
  </div>
</template>

<script>
// @ is an alias to /src
import BoardDesign from '@/components/BoardDesign.vue'

export default {
  name: 'HomeView',
  components: {
    BoardDesign
  }
}
</script>
