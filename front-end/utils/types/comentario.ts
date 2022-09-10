export default interface iComentario {
    comentario: {
        comentarioId: number;
        itemId: number;
        itens: {
            itemId: number;
            nome: string;
        };
        usuarioId: number;
        usuarios: {
            usuarioId: number;
            nomeUsuarioSistema: string;
        };
        mensagem: string;
        resposta: string | null;
        isAtivo: number;
        dataEnvio: Date;

        erro: boolean | null;
        codigoErro: number | null;
        mensagemErro: string | null;
    }[]
}