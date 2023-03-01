<template>
	<div class="tracker-container">
		<div class="red-turn-text">Red's Turn</div>&nbsp;&nbsp;|&nbsp;&nbsp;
		<div class="blue-turn-text">Blue's Turn</div>
	</div>
</template>

<script>


export default {
  name: 'TurnTracker'
}
</script>

<style>
.tracker-container {
	display: inline-flex;
	font-size: 24px;

}
</style>