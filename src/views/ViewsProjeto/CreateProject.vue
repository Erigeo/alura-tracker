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
import { defineComponent, ref} from 'vue'
import usenotificarHook from '@/hook/notificarHook'
import { CADASTRAR_PROJETO, ALTERAR_PROJETO } from '@/store/typeActions';
import {  useRouter } from 'vue-router';

export default defineComponent({
    name: 'ProjetosPage',
    props: {
        id: {
            type: String
        },
    },
    setup(props){
        const store = useStore() 
        const {notificar} = usenotificarHook();
        const nomeDoProjeto = ref("")
        const router = useRouter()

        if(props.id){
            const projeto = store.state.projeto.projetos.find(
                (proj) => proj.id == props.id
            );
            nomeDoProjeto.value = projeto?.nome || " ";
        }

        const salvar = () => {
            if(props.id){
                store.dispatch(ALTERAR_PROJETO,  {
                    id: props.id,
                    nome: nomeDoProjeto
                }) .then(()=> {
                         notificar(TipoNotificacao.SUCESSO, 'Sucesso', 'seu projeto foi alterado' )
                        nomeDoProjeto.value = '';
                         router.push('/projetos')
                })
            }else{
                store.dispatch(CADASTRAR_PROJETO, nomeDoProjeto)
                    .then(()=> {
                        notificar(TipoNotificacao.SUCESSO, 'Sucesso', 'seu projeto foi criado' )
                        nomeDoProjeto.value = '';
                        //usa value em variavel reativa
                         router.push('/projetos')

                    })
                
            }

    }
    return {
              nomeDoProjeto, salvar
            
        }    

}
})

</script>

<style scoped>
.projetos {
    padding: 1.25rem;
}
</style>