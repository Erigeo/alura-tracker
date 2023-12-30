<script lang="ts">
import { defineComponent } from 'vue';
import FormCrono from '../components/FormCrono.vue';
import TarefaDiff from '../components/TarefaDiff.vue';
import ITarefa from '../Interface/ITarefa'
import BoxT from '../components/BoxT.vue';



export default defineComponent({
    name: 'App',
    components: {  FormCrono, TarefaDiff, BoxT },
    data() {
      return {
        tarefas: [] as ITarefa[],
      }
    },
    methods: {
      salvar(tarefa : ITarefa) : void {
        this.tarefas.push(tarefa);
      }
    }
});

</script>


<template>
  
      <FormCrono @ao-finalizar-tarefa="salvar"/>
      <div v-if="tarefas.length" class="lista">
        <TarefaDiff v-for="(tarefa,index) in tarefas" :key="index" :tarefa="tarefa"/>
      </div>
      <BoxT v-else >Voce ainda nao produziu nada hoje</BoxT>
   
 </template>





