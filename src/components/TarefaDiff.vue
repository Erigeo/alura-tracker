<template>
    <BoxT>
        <div class="columns">
            <div class="column is-4">
                {{ tarefa.descricao || 'Sem descricao...'}}
            </div>
            <div class="column is-3">
                {{ tarefa.projeto?.nome || 'N/D' }}
            </div>
            <div class="column">
                <CronometroExibir :tempoRegistradoEmSegundos="tarefa.duracaoEmSegundos"/>
                <button class="button ml-2 is-danger" @click="excluir(tarefa.id)">
                            <span class="icon is-small">
                                <i class="fas fa-trash"></i>
                            </span>
                        </button>
            </div>
        </div>
    </BoxT>
</template>



<script lang="ts">
import ITarefa from '@/Interface/ITarefa';
import CronometroExibir from './CronometroExibir.vue';
import { PropType, computed, defineComponent } from 'vue';
import BoxT from './BoxT.vue';
import { EXCLUIR_TAREFA } from '@/store/typeMutation';
import { useStore } from '@/store';

export default defineComponent({
    name: 'TarefaDiff',
    components: { CronometroExibir, BoxT },
    props: {
        tarefa: {
            type: Object as PropType<ITarefa>, required: true
        }
    },
    methods: {
        excluir(id : string){
        this.store.commit(EXCLUIR_TAREFA, id)
        }
    },
    setup() {
      const store = useStore()
        return {
            tarefas: computed(() => store.state.tarefas), store
        }
    }
})

</script>


<style scoped>

</style>