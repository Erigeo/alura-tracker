import IProjeto from "@/Interface/IProjeto";
import http from "@/http";
import { estado } from "@/store";
import { OBTER_PROJETOS, CADASTRAR_PROJETO, ALTERAR_PROJETO, REMOVER_PROJETO } from "@/store/typeActions";
import { ADICIONA_PROJETO, EDITAR_PROJETO, EXCLUIR_PROJETO, DEFINIR_PROJETOS } from "@/store/typeMutation";
import { onActivated } from "vue";
import { Module } from "vuex";

export interface EstadoProjeto {
    projetos: IProjeto[ ]
}

export const projeto: Module<EstadoProjeto, estado > = {
    mutations:{
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
        [DEFINIR_PROJETOS] (state, projetos: IProjeto[] ){
            state.projetos = projetos
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

    }
}