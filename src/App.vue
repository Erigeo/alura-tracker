<template>
  <main class="columns is-gapless is-multiline" :class="{'modo-escuro': modoAtivo}">
    <div class="column is-one-quarter">
      <BarraLateral @altere-tema="mudarTema"/>
    </div>
    <div class="column is-three-quarter conteudo">
     <NotificacoesTracker/>
      <RouterView> </RouterView>
    </div>
  </main>
 </template>





<script lang="ts">
import { defineComponent } from 'vue';
import BarraLateral from './components/BarraLateral.vue';
import NotificacoesTracker from './components/NotificacoesTracker.vue'
import ITarefa from './Interface/ITarefa';





export default defineComponent({
    name: 'App',
    components: { BarraLateral, NotificacoesTracker},
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
