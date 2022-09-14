export default interface iListaComentarios {
    comentarioId: number;
    itemId: number;
    itens: {
        itemId: number;
        nome: string;
        usuarios: {
            usuarioId: number;
            nomeUsuarioSistema: string;
            foto: string | null;
        }
    };
    usuarioId: number;
    usuarios: {
        usuarioId: number;
        nomeUsuarioSistema: string;
        foto: string | null;
    };
    mensagem: string;
    dataMensagem: Date;
    resposta: string | null;
    dataResposta: Date | null;
    isAtivo: number;

    erro: boolean | null;
    codigoErro: number | null;
    mensagemErro: string | null;
};