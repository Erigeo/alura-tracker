<template>
    <BoxT>
        <div class="columns">
            <div class="column is-7">
                {{ tarefa.descricao || 'Sem descricao...'}}
            </div>
            <div class="column">
                <CronometroExibir :tempoRegistradoEmSegundos="tarefa.duracaoEmSegundos"/>
            </div>
        </div>
    </BoxT>
</template>


<script lang="ts">
import ITarefa from '@/Interface/ITarefa';
import CronometroExibir from './CronometroExibir.vue';
import { PropType, defineComponent } from 'vue';
import BoxT from './BoxT.vue';

export default defineComponent({
    name: 'TarefaDiff',
    components: { CronometroExibir, BoxT },
    props: {
        tarefa: {
            type: Object as PropType<ITarefa>, required: true
        }
    }
})

</script>


<style scoped>

</style>