import IProjeto from "@/Interface/IProjeto";
import ITarefas from "@/Interface/ITarefa";
import { InjectionKey } from "vue";
import { Store, createStore, useStore as vuexUseStore } from "vuex";
import { NOTIFICAR, ADICIONAR_TAREFA, ADICIONA_PROJETO, EDITAR_PROJETO, EDITAR_TAREFA, EXCLUIR_PROJETO, EXCLUIR_TAREFA } from "./typeMutation";
import INotificacoes, { TipoNotificacao } from "@/Interface/INotificacoes";



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
        }
    }})

export function useStore(): Store<estado> {
    return vuexUseStore(key)
}