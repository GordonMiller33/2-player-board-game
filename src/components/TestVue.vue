<template>
  <div>
    <button v-on:click="clicked('you just clicked on button ' + i)">
      Button
    </button>
  </div>
</template>



<script>

export default {
	name: "TestVue",
	methods: {
		clicked(x) {
			alert(x);
		}
	}
};
</script>