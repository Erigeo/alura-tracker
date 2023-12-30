import IProjeto from "@/Interface/IProjeto";
import { InjectionKey } from "vue";
import { Store, createStore, useStore as vuexUseStore } from "vuex";
import { ADICIONA_PROJETO, EDITAR_PROJETO, EXCLUIR_PROJETO } from "./typeMutation";



interface estado {
    projetos: IProjeto[];
}

export const key: InjectionKey<Store<estado>> = Symbol()

export const store = createStore<estado>( {
    state: {
        projetos:  [

        ]
    },
    mutations: {
        [ADICIONA_PROJETO](state, nomeDoProjeto: string){
            const projeto = {
                id: new Date().toISOString(),
                nome: nomeDoProjeto
            } as IProjeto
            state.projetos.push(projeto)
        },
        [EDITAR_PROJETO](state, projeto : IProjeto){
            const index = state.projetos.findIndex(proj => proj.id == projeto.id)
            state.projetos[index] = projeto

        },
        [EXCLUIR_PROJETO](state, id: string){
            const index = state.projetos.findIndex(proj => proj.id == id)
            state.projetos.splice(index, 1)
        }

    }
})

export function useStore(): Store<estado> {
    return vuexUseStore(key)
}