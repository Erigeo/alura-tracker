
<template>
    <header>
        <h1>
            <img src="../assets/logo.png" alt="">
        </h1>
        <button class=" button " @click="ativarModoNoturno"> {{ textoButton }}</button>
    </header>

</template>

<script lang="ts">

import { defineComponent } from 'vue';

export default defineComponent({
    name: 'BarraLateral',
    emits: ['altereTema'],
    data() {
      return {
        modoNoturno: false
      }
    },
    computed: {
      textoButton() {
        if(this.modoNoturno){
          return 'Desativar Dark Mode'
        }else{
          return 'Ativar Dark Mode'
        }
      }
    } ,
    methods: {
      ativarModoNoturno() {
        this.modoNoturno = !this.modoNoturno;
        this.$emit('altereTema', this.modoNoturno );
      }
    }
});

</script>


<style scoped>
header {
  padding: 1rem;
  background: #0d3b66;
  width: 100%;
  height: 100vh;
}
@media only screen and (max-width: 768px) {
  header {
    padding: 2.5rem;
    height: auto;
  }
}

</style>