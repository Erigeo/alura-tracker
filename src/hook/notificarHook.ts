import { TipoNotificacao } from "@/Interface/INotificacoes"
import { store } from "@/store"
import { NOTIFICAR } from "@/store/typeMutation"

type notificarHook = {
    notificar: (tipo: TipoNotificacao, titulo:string, texto:string) => void
}

export default () : notificarHook => {

    const notificar = (tipo: TipoNotificacao, titulo:string, texto:string) : void => {
        store.commit(NOTIFICAR, {
            titulo, texto, tipo
        })
    }
    return {
        notificar
    }
}