

<script lang="ts">
import { defineComponent } from 'vue';
import BarraLateral from './components/BarraLateral.vue';
import FormCrono from './components/FormCrono.vue';



export default defineComponent({
    name: 'App',
    components: { BarraLateral, FormCrono }
});

</script>


<template>
  <main class="columns is-gapless is-multiline">
    <div class="column is-one-quarter">
      <BarraLateral/>
    </div>
    <div class="column is-three-quarter">
      <FormCrono/>
    </div>
  </main>
 </template>


<style>

</style>
