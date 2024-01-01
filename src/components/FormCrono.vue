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

import { defineComponent, ref } from 'vue';
import PainelTemporizador from './PainelTemporizador.vue';
import { computed } from "vue";
import { useStore } from 'vuex'
import {key} from '@/store'
import {  NOTIFICAR} from '@/store/typeMutation';
import { TipoNotificacao } from '@/Interface/INotificacoes';
import { CADASTRAR_TAREFA } from '@/store/typeActions';
export default defineComponent({
    name: 'FormCrono',
    components: { PainelTemporizador },

    setup(){
        const store = useStore(key)

        const descricao = ref("")
        const idProjeto = ref("")
        const projetos = computed(() => store.state.projeto.projetos)

        const salvarTarefa = (tempoDecorrido: number) : void => {
            if(idProjeto.value == ''){
                store.commit(NOTIFICAR, {
                    titulo: 'Erro', texto: 'Percebemos que um projeto não foi selecionado', tipo: TipoNotificacao.FALHA
                })
            }else{
                store.dispatch(CADASTRAR_TAREFA, {
                id: new Date().toISOString(),
                duracaoEmSegundos: tempoDecorrido,
                descricao: descricao.value,
                projeto: projetos.value.find(proj => proj.id == idProjeto.value)
            })
            descricao.value = ''

            }
            
        }

        
        
        
        
        
        
        return {
            projetos,
            tarefas: computed(() => store.state.tarefas), store, descricao, idProjeto, salvarTarefa
            
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