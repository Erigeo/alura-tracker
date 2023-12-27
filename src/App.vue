

<script lang="ts">
import { defineComponent } from 'vue';
import BarraLateral from './components/BarraLateral.vue';
import FormCrono from './components/FormCrono.vue';
import TarefaDiff from './components/TarefaDiff.vue';
import ITarefa from './Interface/ITarefa'
import BoxT from './components/BoxT.vue';



export default defineComponent({
    name: 'App',
    components: { BarraLateral, FormCrono, TarefaDiff, BoxT },
    data() {
      return {
        tarefas: [] as ITarefa[],
        modoAtivo: false
      }
    },
    methods: {
      salvar(tarefa : ITarefa) : void {
        this.tarefas.push(tarefa);
      },
      mudarTema(modoN : boolean) {
        this.modoAtivo = modoN;

      }
    }
});

</script>


<template>
  <main class="columns is-gapless is-multiline" :class="{'modo-escuro': modoAtivo}">
    <div class="column is-one-quarter">
      <BarraLateral @altere-tema="mudarTema"/>
    </div>
    <div class="column is-three-quarter conteudo">
      <FormCrono @ao-finalizar-tarefa="salvar"/>
      <div v-if="tarefas.length" class="lista">
        <TarefaDiff v-for="(tarefa,index) in tarefas" :key="index" :tarefa="tarefa"/>
      </div>
      <BoxT v-else >Voce ainda nao produziu nada hoje</BoxT>
    </div>
  </main>
 </template>


<style>
.lista {
    padding: 1.25rem;
    
}

main.modo-escuro {
  --bg-primario: #2b2d42;
  --texto-primario: #ddd;
}
main{
  --bg-primario: #fff;
  --texto-primario: #000 ;
}

.conteudo {
  background-color: var(--bg-primario);

}



</style>
