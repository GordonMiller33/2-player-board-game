<template>
  <div>
    <button v-on:click="clicked('you just clicked on button  1')">
      Button 1
    </button>
  </div>
</template>

<script>

let x = 27;

export default {
	name: "TestVue",
	methods: {
		clicked() {
			alert(x);
		}
	}
};
</script>