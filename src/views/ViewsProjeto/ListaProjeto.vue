<template>
    <section>
        <h1 class="title">Projetos</h1>
        <router-link to="/projetos/novo" class="button">
            <span class="icon is-small">
                <i class="fas fa-plus"></i>
            </span>
            <span>Novo projeto</span>
        </router-link>


        <table class="table is-fullwidth">
            <thead>
                <tr>
                    <th>
                        ID
                    </th>
                    <th>
                        NOME
                    </th>
                    <th>AÇÕES</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="projeto in projetos" :key="projeto.id">
                    <td>
                        {{ projeto.id }}
                    </td>
                    <td>
                        {{ projeto.nome }}
                    </td>
                    <td>
                        <router-link :to="`/projetos/${projeto.id}`" class="button" :id="projeto.id">
                            <span class="icon is-small">
                                <i class="fas fa-pencil-alt"></i>
                            </span>
                        </router-link>
                        <button class="button ml-2 is-danger" @click="excluir(projeto.id)">
                            <span class="icon is-small">
                                <i class="fas fa-trash"></i>
                            </span>
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </section>
</template>
<script lang="ts">



import { useStore } from '@/store';
import { OBTER_PROJETOS, REMOVER_PROJETO } from '@/store/typeActions';

import { computed, defineComponent } from 'vue'


export default defineComponent({
    name: 'ListaProjeto',
    methods: {
        excluir(id : string){
            this.store.dispatch(REMOVER_PROJETO, id)
                
        }
    },
    setup() {
        const store = useStore()
        store.dispatch(OBTER_PROJETOS) //aqui se usa dispatch em vez do commit
        
        return {
            projetos: computed(() => store.state.projeto.projetos), store,
        }
    }

})

</script>

