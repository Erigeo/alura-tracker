import { TipoNotificacao } from "@/Interface/INotificacoes";
import { store } from "@/store";
import { NOTIFICAR } from "@/store/typeMutation";



export const notificarMixin = {
    methods: {
        notificar(titulo : string, texto: string, tipo: TipoNotificacao) : void {
            store.commit(NOTIFICAR, {
                titulo, texto, tipo
            })
        }
    }
}
