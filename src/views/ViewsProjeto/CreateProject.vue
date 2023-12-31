<template>
    <section class="projetos">
        <h1 class="title">Projetos</h1>
    
    <form @submit.prevent="salvar">
        <div class="field">
            <label for="nomeProjeto" class="label">
                Nome do projeto
            </label>
            <input type="text" class="input" v-model="nomeDoProjeto" id="nomeDoProjeto" />
        </div>
        <div class="field"> 
            <button class="button" type="submit">Salvar</button>
        </div>
    </form>
    
</section>
</template>
<script lang="ts">


import { TipoNotificacao } from '@/Interface/INotificacoes';
import { useStore } from '@/store';
import { EDITAR_PROJETO, ADICIONA_PROJETO, NOTIFICAR } from '@/store/typeMutation';
import { defineComponent} from 'vue'
import { notificarMixin } from '@/mixins/notificarMixin'

export default defineComponent({
    name: 'ProjetosPage',
    props: {
        id: {
            type: String
        },
    },
    data() {
        return {
            nomeDoProjeto: '',
        }
    },
    mounted(){
        if(this.id){
            const projeto = this.store.state.projetos.find(proj => proj.id == this.id);
            this.nomeDoProjeto = projeto?.nome || ''
        }
    },
    mixins: [notificarMixin],

    methods: {
        salvar() {
            if(this.id){
                this.store.commit(EDITAR_PROJETO,  {
                    id: this.id,
                    nome: this.nomeDoProjeto
                })
            }else{
                this.store.commit(ADICIONA_PROJETO, this.nomeDoProjeto)
                
            }
            
           this.notificar('Sucesso', 'seu projeto foi criado', TipoNotificacao.SUCESSO )
            this.nomeDoProjeto = '';
            this.$router.push('/projetos')
        }
    },
    setup(){
        const store = useStore() 
        return {
            store,
            
        }
    }

})

</script>

<style scoped>
.projetos {
    padding: 1.25rem;
}
</style>