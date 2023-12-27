<template>
    <div class="box formulario">
        <div class="columns">
            <div class="column is-8" aria-label="formulário para a criação de uma nova tarefa">
                <input type="text" class="input" placeholder="Qual tarefa deseja iniciar?" v-model="descricao">
            </div>
            <PainelTemporizador @AoFinalizarEvento="finalizarTarefa"/>
        </div>
    </div>
</template>

<script lang="ts">

import { defineComponent } from 'vue';
import PainelTemporizador from './PainelTemporizador.vue';
export default defineComponent({
    name: 'FormCrono',
    data () {
        return {
        descricao: ''
        }
    },
    emits: ['AoFinalizarTarefa'],
    components: { PainelTemporizador },
    methods: {
        finalizarTarefa(tempoDecorrido: number) : void {
            this.$emit('AoFinalizarTarefa', {
                duracaoEmSegundos: tempoDecorrido,
                descricao: this.descricao
            });
            this.descricao = ''
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