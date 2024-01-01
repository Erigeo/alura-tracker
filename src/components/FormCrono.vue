<template>
    <div class="box formulario">
        <div class="columns">
            <div class="column is-5" aria-label="formulário para a criação de uma nova tarefa">
                <input type="text" class="input" placeholder="Qual tarefa deseja iniciar?" v-model="descricao">
            </div>
            <PainelTemporizador @AoFinalizarEvento="salvarTarefa"/>
        </div>
        <div class="column is-3">
        <div class="select">
          <select v-model="idProjeto">
            <option value="">Selecione o projeto</option>
            <option
              :value="projeto.id"
              v-for="projeto in projetos"
              :key="projeto.id"
            >
              {{ projeto.nome }}
            </option>
          </select>
        </div>
      </div>
    </div>
</template>

<script lang="ts">

import { defineComponent } from 'vue';
import PainelTemporizador from './PainelTemporizador.vue';
import { computed } from "vue";
import { useStore } from 'vuex'
import {key} from '@/store'
import {  NOTIFICAR} from '@/store/typeMutation';
import { TipoNotificacao } from '@/Interface/INotificacoes';
import { CADASTRAR_TAREFA } from '@/store/typeActions';
export default defineComponent({
    name: 'FormCrono',
    data () {
        return {
        descricao: '',
        idProjeto: '', 
        }
    },
    emits: ['AoFinalizarTarefa'],
    components: { PainelTemporizador },
    methods: {
        salvarTarefa(tempoDecorrido: number){
            if(this.idProjeto == ''){
                this.store.commit(NOTIFICAR, {
                    titulo: 'Erro', texto: 'Percebemos que um projeto não foi selecionado', tipo: TipoNotificacao.FALHA
                })
            }else{
                this.store.dispatch(CADASTRAR_TAREFA, {
                id: new Date().toISOString(),
                duracaoEmSegundos: tempoDecorrido,
                descricao: this.descricao,
                projeto: this.projetos.find(proj => proj.id == this.idProjeto)
            })
            this.descricao = ''

            }
            
        }
    },
    setup(){
        const store = useStore(key)
        return {
            projetos: computed(() => store.state.projetos), 
            tarefas: computed(() => store.state.tarefas), store,
            
        }
    }
});

</script>

<style scoped>
.formulario {
    background-color: var(--bg-primario);
    color: var(--texto-primario);
}

</style>