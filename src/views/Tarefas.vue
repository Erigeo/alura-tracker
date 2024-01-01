<template>
  
  <FormCrono/>
  <div class="field">
  <p class="control has-icons-left has-icons-right">
    <input class="input" type="text" placeholder="Digie para filtrar" v-model="filtro">
    <span class="icon is-small is-left">
      <i class="fas fa-search"></i>
    </span>
  </p>
</div>
  <div v-if="tarefas.length" class="lista">
    <TarefaDiff v-for="(tarefa,index) in tarefas" :key="index" :tarefa="tarefa" @tarefa-foi-clicada="abrirModal"/>
  </div>
  <BoxT v-else >Voce ainda nao produziu nada hoje</BoxT>
 

  <div class="modal" :class="{'is-active': tarefaSelecionada }" v-if="tarefaSelecionada">
  <div class="modal-background" @click="cancelarModal"></div>
  <div class="modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title">Modal title</p>
      <button class="delete" aria-label="close"></button>
    </header>
    <section class="modal-card-body">
      <div class="field">
            <label for="nomeProjeto" class="label">
                Nome do projeto
            </label>
            <input type="text" class="input" v-model="tarefaSelecionada.descricao" />
        </div>
    </section>
    <footer class="modal-card-foot">
      <button class="button is-success" @click="editarTarefa(tarefaSelecionada)">Save changes</button>
      <button class="button" @click="cancelarModal">Cancel</button>
    </footer>
  </div>
</div>

</template>








<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import FormCrono from '../components/FormCrono.vue';
import TarefaDiff from '../components/TarefaDiff.vue';
import BoxT from '../components/BoxT.vue';
import { useStore } from '@/store';
import { ALTERAR_TAREFA, OBTER_PROJETOS, OBTER_TAREFAS } from '@/store/typeActions';
import ITarefa from '@/Interface/ITarefa';




export default defineComponent({
    name: 'App',
    components: {  FormCrono, TarefaDiff, BoxT },
    data(){
      return {
        tarefaSelecionada: null as ITarefa | null,
      }
    },
    methods: {
      abrirModal(tarefa : ITarefa) : void {
        this.tarefaSelecionada = tarefa
      },
      cancelarModal() : void {
        this.tarefaSelecionada = null
      },
      editarTarefa(tarefa : ITarefa) : void {
        this.store.dispatch(ALTERAR_TAREFA, tarefa)
        this.tarefaSelecionada = null
      }
    }
    ,
    setup() {
      const store = useStore()
      store.dispatch(OBTER_PROJETOS)
      store.dispatch(OBTER_TAREFAS)
      const filtro = ref("")

      const tarefas = computed(() => store.state.tarefas.filter(t => t.descricao.includes(filtro.value) || !filtro.value))




        return {
            tarefas, store, filtro
        }
    }
});

</script>








