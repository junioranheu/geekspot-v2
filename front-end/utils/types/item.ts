export default interface iItem {
    item: {
        itemId: number;
        nome: string;
        descricao: string | null;
        tamanho: string | null;
        marca: string | null;
        condicao: string | null;

        itensImagens: [
            {
                itemImagemId: number;
                caminhoImagem: string;
                itemId: number;
                isFotoPrincipal: number;
                isAtivo: boolean;
                dataRegistro: Date;
            }
        ] | null;

        preco: number;
        precoDesconto: number | null;

        usuarioId: number;
        usuarios: {
            usuarioId: number;
            nomeCompleto: string;
            email: string;
            nomeUsuarioSistema: string;
            token: string | null;

            usuarioTipoId: number;
            usuariosTipos: {
                usuarioTipoId: number;
                tipo: string;
                descricao: string;
                isAtivo: boolean;
                dataRegistro: Date;
            };

            foto: string | null;
            dataRegistro: Date;
            dataOnline: Date;
            isAtivo: boolean;
            isPremium: boolean;
            isVerificado: boolean;

            usuariosInformacoes: {
                usuarioInformacaoId: number;
                usuarioId: number;
                dataAniversario: Date;
                cpf: string;
                telefone: string;
                cep: number;
                numeroResidencia: string;
                referenciaLocal: string | null;
                tituloLojinha: string;
                descricaoLojinha: string;
                qtdEstrelas: number | null;
                dataUltimaAlteracao: Date | null;
            };
        } | null;

        itemTipoId: number;
        itensTipos: {
            tipo: string;
            descricao: string;
        };

        isAtivo: boolean;
        dataRegistro: Date;

        erro: boolean | null;
        codigoErro: number | null;
        mensagem: string | null;
    }
}
