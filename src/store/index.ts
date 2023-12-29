import IProjeto from "@/Interface/IProjeto";
import { InjectionKey } from "vue";
import { Store, createStore, useStore as vuexUseStore } from "vuex";


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
        'ADICIONA_PROJETO'(state, nomeDoProjeto: string){
            const projeto = {
                id: new Date().toISOString(),
                nome: nomeDoProjeto
            } as IProjeto
            state.projetos.push(projeto)
        }

    }
})

export function useStore(): Store<estado> {
    return vuexUseStore(key)
}