interface iListaItensCompleto {
    i: number;
    usuarioId: number;
    usuarioNomeSistema: string;
    titulo: string | null;
    descricao: string | null;
    listaItens: iListaItensInterno[];
}

interface iListaItensInterno {
    nome: string;
    descricao: string;
    itensImagens: {
        caminhoImagem: string;
    }[];
    isAtivo: number;
    itemId: number;
    itemTipoId: number;
    preco: number;
    precoDesconto: number | null;
    usuarios: {
        usuarioId: number;
        nomeCompleto: string;
    };
}

export type { iListaItensCompleto, iListaItensInterno };

