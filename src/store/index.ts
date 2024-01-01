import IProjeto from "@/Interface/IProjeto";
import ITarefas from "@/Interface/ITarefa";
import { InjectionKey } from "vue";
import { Store, createStore, useStore as vuexUseStore } from "vuex";
import { NOTIFICAR, ADICIONAR_TAREFA, ADICIONA_PROJETO, EDITAR_PROJETO, EDITAR_TAREFA, EXCLUIR_PROJETO, EXCLUIR_TAREFA, DEFINIR_PROJETOS, DEFINIR_TAREFAS } from "./typeMutation";
import INotificacoes, { TipoNotificacao } from "@/Interface/INotificacoes";
import { ALTERAR_PROJETO, ALTERAR_TAREFA, CADASTRAR_PROJETO, CADASTRAR_TAREFA, OBTER_PROJETOS, OBTER_TAREFAS, REMOVER_PROJETO } from "./typeActions";
import http from '@/http'



interface estado {
    projetos: IProjeto[],
    tarefas: ITarefas[],
    notificacoes: INotificacoes[]
}

export const key: InjectionKey<Store<estado>> = Symbol()

export const store = createStore<estado>({
    state: {
        projetos: [

        ],
        tarefas: [ 

        ],
        notificacoes: [ 
        ]
    },
    mutations: {
        [ADICIONA_PROJETO](state, nomeDoProjeto: string) {
            const projeto = {
                id: new Date().toISOString(),
                nome: nomeDoProjeto
            } as IProjeto
            state.projetos.push(projeto)
        },
        [EDITAR_PROJETO](state, projeto: IProjeto) {
            const index = state.projetos.findIndex(proj => proj.id == projeto.id)
            state.projetos[index] = projeto

        },
        [EXCLUIR_PROJETO](state, id: string) {
            const index = state.projetos.findIndex(proj => proj.id == id)
            state.projetos.splice(index, 1)
        },
        [ADICIONAR_TAREFA](state, tarefa: ITarefas) {
            tarefa.id = new Date().toISOString();
            state.tarefas.push(tarefa)
        },
        [EDITAR_TAREFA](state, tarefa: ITarefas) {
            const index = state.tarefas.findIndex(taref => taref.id == tarefa.id)
            state.tarefas[index] = tarefa

        },
        [EXCLUIR_TAREFA](state, id: string) {
            const index = state.tarefas.findIndex(taref => taref.id == id)
            state.tarefas.splice(index, 1)
        },
        [NOTIFICAR](state, newNotificacao : INotificacoes){
           newNotificacao.id = new Date().getTime(),
            state.notificacoes.push(newNotificacao)

            setTimeout(()=> { 
                state.notificacoes = state.notificacoes.filter((noti)=> noti.id != newNotificacao.id)
            }, 3000)
        },
        [DEFINIR_PROJETOS] (state, projetos: IProjeto[] ){
            state.projetos = projetos
        },
        [DEFINIR_TAREFAS] (state, tarefas: ITarefas[] ){
            state.tarefas = tarefas
        },

    },
    actions: {
    [OBTER_PROJETOS] ({commit}) {
        http.get('projetos')
            .then(resposta => commit(DEFINIR_PROJETOS, resposta.data))
    },
    [CADASTRAR_PROJETO] (contexto, nomeDoProjeto : string){
        return http.post('/projetos', {
            nome: nomeDoProjeto,
            id: new Date().toISOString()
        })
    },
    [ALTERAR_PROJETO] ( contexto, projeto: IProjeto){
        return http.put(`/projetos/${projeto.id}`, projeto)
    },
    [REMOVER_PROJETO] ({commit}, id : string){
        return http.delete(`/projetos/${id}`)
            .then(()=> commit(EXCLUIR_PROJETO, id))
            //se faz o sincronismo com o que vem da api com o estado local
    },
    [OBTER_TAREFAS] ({commit}) {
        http.get('tarefas')
            .then(resposta => commit(DEFINIR_TAREFAS, resposta.data))
    },
    [CADASTRAR_TAREFA] ({commit}, tarefa : ITarefas){
        return http.post('/tarefas', tarefa)
            .then(resposta => commit(ADICIONAR_TAREFA, resposta.data))
            //diferente do cadastrar projeto, aqui precisamos adicionar no array 
            //local, pq é a partir dele que as operacoes sao feitas!
    },
    [ALTERAR_TAREFA] ( {commit}, tarefa: ITarefas){
        return http.put(`/tarefas/${tarefa.id}`, tarefa)
            .then(resposta => commit(EDITAR_TAREFA, resposta.data))
    },
    }
})

export function useStore(): Store<estado> {
    return vuexUseStore(key)
}