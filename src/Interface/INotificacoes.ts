export enum TipoNotificacao {
    SUCESSO, FALHA, ATENCAO
}

export default interface INotificacoes {
    titulo: string,
    texto: string,
    tipo: TipoNotificacao,
    id: number
}