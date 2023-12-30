<template>
  
  <FormCrono/>
  <div v-if="tarefas.length" class="lista">
    <TarefaDiff v-for="(tarefa,index) in tarefas" :key="index" :tarefa="tarefa"/>
  </div>
  <BoxT v-else >Voce ainda nao produziu nada hoje</BoxT>

</template>








<script lang="ts">
import { computed, defineComponent } from 'vue';
import FormCrono from '../components/FormCrono.vue';
import TarefaDiff from '../components/TarefaDiff.vue';
import BoxT from '../components/BoxT.vue';
import { useStore } from '@/store';




export default defineComponent({
    name: 'App',
    components: {  FormCrono, TarefaDiff, BoxT },
    
    setup() {
      const store = useStore()
        return {
            tarefas: computed(() => store.state.tarefas), store
        }
    }
});

</script>








