import IProjeto from "@/Interface/IProjeto";
import ITarefas from "@/Interface/ITarefa";
import { InjectionKey } from "vue";
import { Store, createStore, useStore as vuexUseStore } from "vuex";
import { NOTIFICAR, ADICIONAR_TAREFA, ADICIONA_PROJETO, EDITAR_PROJETO, EDITAR_TAREFA, EXCLUIR_PROJETO, EXCLUIR_TAREFA, DEFINIR_PROJETOS, DEFINIR_TAREFAS } from "./typeMutation";
import INotificacoes, { TipoNotificacao } from "@/Interface/INotificacoes";
import { ALTERAR_PROJETO, ALTERAR_TAREFA, CADASTRAR_PROJETO, CADASTRAR_TAREFA, OBTER_PROJETOS, OBTER_TAREFAS, REMOVER_PROJETO } from "./typeActions";
import http from '@/http'
import { EstadoProjeto, projeto } from "./modulo/projeto";



export interface estado {
    tarefas: ITarefas[],
    notificacoes: INotificacoes[],
    projeto: EstadoProjeto
}

export const key: InjectionKey<Store<estado>> = Symbol()

export const store = createStore<estado>({
    state: {
        tarefas: [ 

        ],
        notificacoes: [ 
        ],
        projeto: {
            projetos: []
        }
    },
    mutations: {
        
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
        
        [DEFINIR_TAREFAS] (state, tarefas: ITarefas[] ){
            state.tarefas = tarefas
        },

    },
    actions: {
    
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
    },
    modules: {
        projeto
    }
})

export function useStore(): Store<estado> {
    return vuexUseStore(key)
}