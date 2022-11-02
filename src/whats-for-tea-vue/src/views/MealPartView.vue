<script setup>
  import { onMounted, reactive } from 'vue';

  const state = reactive({mp: []});

  async function getMealParts() {
    const response = await fetch('http://localhost:3000/api/meal-part');
    state.mp = await response.json();
  }

  onMounted(() => {
    console.log(`the component is now mounted.`);
    getMealParts();
  });


</script>

<template>
  <div class="about">
    <h1>Meal Parts</h1>
    <p>{{ JSON.stringify(state.mp[0] || {foo: 'bar'}) }}</p>
  </div>
</template>

<style>

</style>
