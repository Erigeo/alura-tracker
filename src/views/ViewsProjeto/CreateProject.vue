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
import { defineComponent} from 'vue'
import usenotificarHook from '@/hook/notificarHook'
import { CADASTRAR_PROJETO, ALTERAR_PROJETO } from '@/store/typeActions';

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
    

    methods: {
        salvar() {
            if(this.id){
                this.store.dispatch(ALTERAR_PROJETO,  {
                    id: this.id,
                    nome: this.nomeDoProjeto
                }) .then(()=> {
                         this.notificar(TipoNotificacao.SUCESSO, 'Sucesso', 'seu projeto foi alterado' )
                        this.nomeDoProjeto = '';
                         this.$router.push('/projetos')
                })
            }else{
                this.store.dispatch(CADASTRAR_PROJETO, this.nomeDoProjeto)
                    .then(()=> {
                        this.notificar(TipoNotificacao.SUCESSO, 'Sucesso', 'seu projeto foi criado' )
                        this.nomeDoProjeto = '';
                         this.$router.push('/projetos')

                    })
                
            }
            
          
        }
    },
    setup(){
        const store = useStore() 
        const {notificar} = usenotificarHook();
        return {
            store, notificar
            
        }
    }

})

</script>

<style scoped>
.projetos {
    padding: 1.25rem;
}
</style>