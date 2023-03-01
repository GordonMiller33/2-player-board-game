<template>
  <div class="test">
    <TestVue/>
  </div>
</template>

<script>
// @ is an alias to /src
import TestVue from '@/components/TestVue.vue'

export default {
  name: 'TestView',
  components: { TestVue }
}
</script>