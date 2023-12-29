<template>
    <div class="box formulario">
        <div class="columns">
            <div class="column is-5" aria-label="formulário para a criação de uma nova tarefa">
                <input type="text" class="input" placeholder="Qual tarefa deseja iniciar?" v-model="descricao">
            </div>
            <PainelTemporizador @AoFinalizarEvento="finalizarTarefa"/>
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
        finalizarTarefa(tempoDecorrido: number) : void {
            this.$emit('AoFinalizarTarefa', {
                duracaoEmSegundos: tempoDecorrido,
                descricao: this.descricao,
                projeto: this.projetos.find(proj => proj.id == this.idProjeto)
            });
            this.descricao = ''
        }
    },
    setup(){
        const store = useStore(key)
        return {
            projetos: computed(() => store.state.projetos)
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